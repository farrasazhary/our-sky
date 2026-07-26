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
      requireInteraction: true,
      timestamp: Date.now(),
      vibrate: [2000],
      data: {
        url: payload.targetUrl || (notifType === "HEARTBEAT" ? "/dashboard" : "/notifications"),
        type: notifType
      },
      actions: [
        { action: "open", title: "Buka Aplikasi 🌌" }
      ]
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

// Clear active OS notifications from top status bar when app is opened or focused
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "CLEAR_NOTIFICATIONS") {
    self.registration.getNotifications().then(function (notifications) {
      for (const notification of notifications) {
        notification.close()
      }
    })
  }
})
