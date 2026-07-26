import { useEffect, useRef } from "react"
import { api } from "@/services/api"
import { useAuth } from "@/contexts/AuthContext"

/**
 * Custom hook that listens for new unread notifications from partner in real-time
 * and dispatches native OS System Push Notifications via browser Notification API and Web Vibration API.
 */
export function useNotificationListener() {
  const { isAuthenticated } = useAuth()
  const seenIdsRef = useRef<Set<string>>(new Set())

  // Request system notification permission on mount
  useEffect(() => {
    if (!isAuthenticated) return

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => null)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) return

    const checkNotifications = async () => {
      try {
        const list = await api.getNotifications()
        if (!Array.isArray(list)) return

        // Filter unread notifications
        const unreadList = list.filter((n: any) => !n.isRead)

        // Dispatch real-time unread count update for UI badge animation
        window.dispatchEvent(new CustomEvent("oursky_unread_count_updated", { detail: unreadList.length }))

        // Find brand new notifications not yet seen during this session
        for (const notif of unreadList) {
          const id = notif.id.toString()
          if (!seenIdsRef.current.has(id)) {
            seenIdsRef.current.add(id)

            // Dispatch Foreground Toast Banner Notification
            window.dispatchEvent(new CustomEvent("oursky_show_toast", { detail: notif }))

            // Trigger physical Web Vibration API (Double Heartbeat Pattern)
            if (notif.type === "HEARTBEAT" || notif.title?.includes("Heartbeat")) {
              if ("vibrate" in navigator) {
                try {
                  navigator.vibrate([800, 200, 800, 200])
                } catch (e) {
                  // Vibration API unsupported or muted
                }
              }
              // Dispatch custom window event to trigger floating hearts burst in UI
              window.dispatchEvent(new CustomEvent("oursky_heartbeat_received", { detail: notif }))
            }

            // Trigger OS System Push Notification if permission granted
            if ("Notification" in window && Notification.permission === "granted") {
              try {
                const sysNotif = new Notification(notif.title, {
                  body: notif.message,
                  icon: "/pwa-192x192.png",
                  badge: "/favicon.svg",
                  tag: `oursky-notif-${id}`,
                })

                sysNotif.onclick = () => {
                  window.focus()
                  window.location.href = "/notifications"
                }
              } catch (err) {
                console.warn("System Notification dispatch failed:", err)
              }
            }
          }
        }
      } catch (err) {
        // Silent catch for background polling
      }
    }

    // Initial check
    checkNotifications()

    // Fast polling every 3 seconds for near-instant partner activity delivery
    const interval = setInterval(checkNotifications, 3000)
    return () => clearInterval(interval)
  }, [isAuthenticated])
}
