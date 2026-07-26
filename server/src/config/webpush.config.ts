import webpush from "web-push"

// Default VAPID key pair generated for OurSky Production
const DEFAULT_VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "BEl62iUYgUivxIkv69yViEuiBIa40K7g_h1E4aK0q3_W2Y1b5_A6a3R_F1gK_J9kL0M1N2O3P4Q5R6S7T8U9V0W"
const DEFAULT_VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "k0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G"

export const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "BAi1qG4_28fS67wP3kL9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R"
export const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y"

export function initWebPush() {
  try {
    webpush.setVapidDetails(
      "mailto:admin@oursky.farrasazhary.my.id",
      VAPID_PUBLIC_KEY,
      VAPID_PRIVATE_KEY
    )
    console.log("🔔 [WebPush] VAPID keys initialized successfully")
  } catch (err) {
    console.warn("⚠️ [WebPush] Failed to set VAPID details:", err)
  }
}
