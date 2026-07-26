import { useEffect } from "react"
import { api } from "@/services/api"
import { useAuth } from "@/contexts/AuthContext"

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function useWebPushSubscription() {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) return

    async function registerWebPush() {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        return
      }

      try {
        // Explicitly check/request Notification permission
        if ("Notification" in window && Notification.permission !== "granted") {
          const perm = await Notification.requestPermission()
          if (perm !== "granted") return
        }

        const registration = await navigator.serviceWorker.ready

        // 1. Get VAPID public key from backend
        const keyRes = await api.getVapidKey().catch(() => null)
        if (!keyRes?.publicKey) return

        // 2. Check or subscribe to push manager
        let subscription = await registration.pushManager.getSubscription()
        if (!subscription) {
          const applicationServerKey = urlBase64ToUint8Array(keyRes.publicKey)
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey
          })
        }

        // 3. Send subscription object to backend
        if (subscription) {
          const subJson = subscription.toJSON()
          if (subJson.endpoint && subJson.keys) {
            await api.subscribePush(subJson as any).catch(() => null)
          }
        }
      } catch (err) {
        console.warn("[WebPush] Push subscription registration failed:", err)
      }
    }

    registerWebPush()
  }, [isAuthenticated])
}
