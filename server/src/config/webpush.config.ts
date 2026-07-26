import webpush from "web-push"

// Valid W3C VAPID Key Pair (Public Key is 65-byte uncompressed P-256 EC curve)
const DEFAULT_PUBLIC = "BCtwDpMOybhnLrjpPd8rCIiRuh_qJ0bAxqUGgMdqUp543rGzSwCFvd1np0v74QjQfKH5T_gyNqZQCkYBMLdMeG4"
const DEFAULT_PRIVATE = "nYRjaEwxKMeuFEg24Zf385GqOfc9pkG4rEh-vQEo1bc"

export const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || DEFAULT_PUBLIC
export const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || DEFAULT_PRIVATE

export function initWebPush() {
  try {
    webpush.setVapidDetails(
      "mailto:admin@oursky.farrasazhary.my.id",
      VAPID_PUBLIC_KEY,
      VAPID_PRIVATE_KEY
    )
    console.log("🔔 [WebPush] VAPID keys initialized successfully")
  } catch (err: any) {
    console.warn("⚠️ [WebPush] VAPID init error, using dynamic fallback:", err?.message || err)
    try {
      const keys = webpush.generateVAPIDKeys()
      webpush.setVapidDetails(
        "mailto:admin@oursky.farrasazhary.my.id",
        keys.publicKey,
        keys.privateKey
      )
      console.log("🔔 [WebPush] Dynamic VAPID keys initialized successfully")
    } catch (fallbackErr) {
      console.error("❌ [WebPush] Dynamic VAPID fallback failed:", fallbackErr)
    }
  }
}
