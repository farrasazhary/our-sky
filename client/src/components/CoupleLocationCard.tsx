import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation, Loader2, Heart, Sparkles, MapPin } from "lucide-react"
import { api } from "@/services/api"

export function CoupleLocationCard() {
  const [data, setData] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const fetchDistance = async () => {
    try {
      const res = await api.getCoupleDistance()
      if (res) {
        setData(res)
      }
    } catch (err) {
      console.warn("Failed to fetch couple distance:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDistance()
  }, [])

  const handleUpdateLocation = () => {
    if (!("geolocation" in navigator)) {
      setErrorMsg("Perangkat ini tidak mendukung fitur lokasi GPS.")
      return
    }

    setIsUpdating(true)
    setErrorMsg(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          let locationName = "Lokasi Saya"
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            )
            const geoData = await geoRes.json()
            if (geoData?.address) {
              const city = geoData.address.city || geoData.address.town || geoData.address.suburb || geoData.address.county
              if (city) locationName = city
            }
          } catch (e) {
            // Fallback if nominatim fetch is blocked
          }

          await api.updateLocation({ latitude, longitude, locationName })
          await fetchDistance()
        } catch (err: any) {
          setErrorMsg(err.message || "Gagal memperbarui lokasi.")
        } finally {
          setIsUpdating(false)
        }
      },
      (err) => {
        setIsUpdating(false)
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMsg("Izin lokasi ditolak. Mohon aktifkan izin GPS di browser/HP Anda.")
        } else {
          setErrorMsg("Gagal mendeteksi lokasi GPS Anda.")
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  if (isLoading) {
    return (
      <Card className="bg-surface/60 border-border/40 p-6 text-center shadow-lg rounded-3xl">
        <div className="flex flex-col items-center justify-center py-6 text-pink-400">
          <Loader2 className="w-7 h-7 animate-spin mb-2" />
          <p className="text-xs text-text-secondary font-medium">Menghubungkan Benang Merah Takdir...</p>
        </div>
      </Card>
    )
  }

  const myLoc = data?.myLocation
  const partnerLoc = data?.partnerLocation
  const isTogether = data?.distanceKm !== null && data?.distanceKm < 0.1

  return (
    <Card className="bg-gradient-to-br from-[#1E1728] via-[#261B30] to-[#1A1424] border border-pink-500/30 shadow-2xl rounded-3xl overflow-hidden relative group">
      {/* Ambient Romantic Pink Light Glows */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Starry Heart Sparkles Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#EC4899_1px,transparent_1px)] [background-size:22px_22px] opacity-10 pointer-events-none" />

      <CardContent className="p-5 relative z-10 space-y-4">
        {/* Romantic Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 shadow-md">
              <Heart className="w-4 h-4 fill-pink-400 text-pink-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-black text-pink-100 tracking-widest uppercase flex items-center gap-1.5 drop-shadow">
                Benang Merah Takdir <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              </h3>
              <p className="text-[10px] text-pink-300/70 font-medium">Two Hearts Under One Sky</p>
            </div>
          </div>

          <Button
            onClick={handleUpdateLocation}
            disabled={isUpdating}
            size="sm"
            className="rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-500/40 text-xs font-bold h-8 px-3.5 shadow-md transition-all active:scale-95"
          >
            {isUpdating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
            ) : (
              <Navigation className="w-3.5 h-3.5 mr-1.5 text-pink-400" />
            )}
            {isUpdating ? "Mendeteksi..." : "Update Lokasi"}
          </Button>
        </div>

        {/* Main Romantic Red Thread Stage */}
        <div className="bg-black/30 backdrop-blur-xl border border-pink-500/20 rounded-2xl p-5 relative overflow-hidden shadow-inner min-h-[155px]">
          {/* Glowing Red Thread Line (Benang Merah Takdir) */}
          <div className="absolute top-[52px] left-12 right-12 -translate-y-1/2 z-0 pointer-events-none">
            <div className="w-full h-[2px] bg-gradient-to-r from-pink-500/40 via-rose-400 to-pink-500/40 relative shadow-[0_0_10px_#EC4899]">
              {/* Floating Heart Signal Travelling Across the Thread */}
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 left-0"
              >
                <div className="relative">
                  <Heart className="w-4 h-4 fill-pink-400 text-white drop-shadow-[0_0_8px_#EC4899]" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Center Pulsating Love Distance Capsule */}
          <div className="absolute left-1/2 top-[52px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <motion.div
              animate={isTogether ? { scale: [1, 1.1, 1] } : { scale: [1, 1.05, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className={`px-4 py-1.5 rounded-full border shadow-xl flex items-center gap-1.5 backdrop-blur-xl ${
                isTogether
                  ? "bg-gradient-to-r from-pink-600 to-rose-600 border-pink-300 text-white shadow-pink-500/40"
                  : "bg-[#2D1B36]/90 border-pink-500/50 text-pink-200 shadow-pink-500/20"
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 animate-pulse" />
              <span className="text-xs font-black text-white tracking-wide">{data?.distanceFormatted || "--"}</span>
            </motion.div>
          </div>

          {/* User & Partner Avatars */}
          <div className="flex items-start justify-between relative z-10">
            {/* User Pod */}
            <div className="flex flex-col items-center text-center space-y-1.5 w-28 shrink-0">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-pink-500/20 border-2 border-pink-400 p-0.5 shadow-[0_0_15px_rgba(236,72,153,0.3)] overflow-hidden">
                  <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center font-black text-pink-300 text-sm">
                    {myLoc?.profilePicture && (myLoc.profilePicture.startsWith("/") || myLoc.profilePicture.startsWith("http")) ? (
                      <img src={myLoc.profilePicture} alt="" className="w-full h-full object-cover" />
                    ) : (
                      myLoc?.fullName?.[0]?.toUpperCase() || "ME"
                    )}
                  </div>
                </div>
                {myLoc?.latitude && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_6px_#34D399]" />
                )}
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-black text-pink-100 block truncate max-w-[95px]">
                  {myLoc?.fullName || "Saya"}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] text-pink-300 font-bold bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-500/30 truncate max-w-[95px]">
                  <MapPin className="w-2.5 h-2.5 text-pink-400 shrink-0" />
                  <span className="truncate">{myLoc?.locationName || (myLoc?.latitude ? "GPS Aktif" : "Belum Set")}</span>
                </span>
              </div>
            </div>

            {/* Partner Pod */}
            <div className="flex flex-col items-center text-center space-y-1.5 w-28 shrink-0">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-rose-500/20 border-2 border-rose-400 p-0.5 shadow-[0_0_15px_rgba(244,63,94,0.3)] overflow-hidden">
                  <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center font-black text-rose-300 text-sm">
                    {partnerLoc?.profilePicture && (partnerLoc.profilePicture.startsWith("/") || partnerLoc.profilePicture.startsWith("http")) ? (
                      <img src={partnerLoc.profilePicture} alt="" className="w-full h-full object-cover" />
                    ) : (
                      partnerLoc?.fullName?.[0]?.toUpperCase() || "P"
                    )}
                  </div>
                </div>
                {partnerLoc?.latitude && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_6px_#34D399]" />
                )}
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-black text-pink-100 block truncate max-w-[95px]">
                  {partnerLoc?.fullName || "Pasangan"}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] text-pink-300 font-bold bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-500/30 truncate max-w-[95px]">
                  <MapPin className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                  <span className="truncate">{partnerLoc?.locationName || (partnerLoc?.latitude ? "GPS Aktif" : "Belum Set")}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Emotional Romantic Status Footer */}
        <div className="text-center space-y-1">
          <p className="text-xs font-bold text-pink-200/90 flex items-center justify-center gap-1.5">
            <span>
              {isTogether
                ? "Kalian sedang berada di lokasi yang sama! ❤️"
                : data?.distanceKm
                ? `Terpisah ${data.distanceFormatted}, namun selalu dekat di dalam hati 💖`
                : data?.statusText || "Memuat status benang merah..."}
            </span>
          </p>

          {errorMsg && (
            <p className="text-[11px] text-rose-300 font-medium bg-rose-950/60 border border-rose-500/30 p-2 rounded-xl">
              {errorMsg}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
