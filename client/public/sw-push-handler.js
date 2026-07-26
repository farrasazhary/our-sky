// Service Worker Background Push & Notification Click Event Listener
self.addEventListener("push", function (event) {
  if (!event.data) return

  try {
    const payload = event.data.json()
    const title = payload.title || "OurSky Notification 🌌"
    const message = payload.message || "You have a new update from your partner!"
    const notifType = payload.type || "INFO"

    const options = {
      body: message,
      icon: "/OurSkyNewIcon.jpeg",
      badge: "/pwa-192x192.png",
      tag: `oursky-push-${Date.now()}`,
      renotify: true,
      silent: false,
      requireInteraction: notifType === "HEARTBEAT" || notifType === "QUESTION",
      data: {
        url: payload.targetUrl || (notifType === "HEARTBEAT" ? "/dashboard" : "/notifications"),
        type: notifType
      },
      vibrate: notifType === "HEARTBEAT" ? [300, 150, 300, 150, 300] : [200, 100, 200]
    }

    event.waitUntil(self.registration.showNotification(title, options))
  } catch (err) {
    console.warn("[ServiceWorker] Push payload parse failed:", err)
  }
})

self.addEventListener("notificationclick", function (event) {
  event.notification.close()

  const targetUrl = event.notification.data?.url || "/notifications"

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      for (const client of clientList) {
        if ("focus" in client) {
          client.focus()
          client.postMessage({ type: "NAVIGATE", url: targetUrl })
          return
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl)
      }
    })
  )
})
