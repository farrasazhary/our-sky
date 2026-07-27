import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Heart, Loader2, Sparkles, Compass, Globe } from "lucide-react"
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
        <div className="flex flex-col items-center justify-center py-6 text-primary">
          <Loader2 className="w-7 h-7 animate-spin mb-2" />
          <p className="text-xs text-text-secondary font-medium">Menghitung koordinat jarak cinta...</p>
        </div>
      </Card>
    )
  }

  const myLoc = data?.myLocation
  const partnerLoc = data?.partnerLocation
  const isTogether = data?.distanceKm !== null && data?.distanceKm < 0.1

  return (
    <Card className="bg-gradient-to-br from-[#121326] via-[#1A1C38] to-[#0F1020] border border-indigo-500/25 shadow-2xl rounded-3xl overflow-hidden relative group">
      {/* Dynamic Cosmic Background Orbs */}
      <div className="absolute -top-12 -left-12 w-44 h-44 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* Constellation Grid Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#9D8CFF_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

      <CardContent className="p-5 relative z-10 space-y-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-pink-400 shadow-inner">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5 drop-shadow">
                Jarak Pasangan <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              </h3>
              <p className="text-[10px] text-indigo-300/70 font-medium">Celestial Couple Radar</p>
            </div>
          </div>

          <Button
            onClick={handleUpdateLocation}
            disabled={isUpdating}
            size="sm"
            className="rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 text-white border border-purple-400/40 text-xs font-bold h-8 px-3.5 shadow-lg transition-all active:scale-95"
          >
            {isUpdating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
            ) : (
              <Navigation className="w-3.5 h-3.5 mr-1.5 text-pink-400" />
            )}
            {isUpdating ? "Mendeteksi..." : "Update Lokasi"}
          </Button>
        </div>

        {/* Main Cosmic Illustrated Radar Stage */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden shadow-2xl min-h-[160px] flex flex-col justify-between">
          
          {/* Connecting Curved Glowing Laser Beam */}
          <div className="absolute top-[52px] left-14 right-14 -translate-y-1/2 z-0 pointer-events-none">
            {/* Glowing Laser Track */}
            <div className="w-full h-[2px] bg-gradient-to-r from-purple-500/20 via-pink-500/60 to-purple-500/20 relative rounded-full shadow-[0_0_12px_#EC4899]">
              {/* Traveling Glowing Heart Pulse */}
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2.5 left-0"
              >
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-pink-500/40 blur-md absolute -inset-0.5" />
                  <Heart className="w-4 h-4 fill-pink-400 text-white drop-shadow-[0_0_8px_#EC4899] relative z-10" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* User & Partner Celestial Avatar Pods */}
          <div className="flex items-start justify-between relative z-10">
            {/* User Pod */}
            <div className="flex flex-col items-center text-center space-y-2 w-28">
              <div className="relative group/user">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-[0_0_20px_rgba(157,140,255,0.4)]">
                  <div className="w-full h-full rounded-full bg-background overflow-hidden flex items-center justify-center font-black text-white text-base">
                    {myLoc?.profilePicture && (myLoc.profilePicture.startsWith("/") || myLoc.profilePicture.startsWith("http")) ? (
                      <img src={myLoc.profilePicture} alt="" className="w-full h-full object-cover" />
                    ) : (
                      myLoc?.fullName?.[0]?.toUpperCase() || "ME"
                    )}
                  </div>
                </div>
                {myLoc?.latitude && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_8px_#34D399]" />
                )}
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-extrabold text-white block truncate max-w-[95px] drop-shadow">
                  {myLoc?.fullName || "Saya"}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] text-purple-200/80 font-medium bg-purple-950/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-purple-500/30 truncate max-w-[95px]">
                  <MapPin className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                  <span className="truncate">{myLoc?.locationName || (myLoc?.latitude ? "GPS Aktif" : "Belum Set")}</span>
                </span>
              </div>
            </div>

            {/* Middle Glowing Distance Capsule */}
            <div className="flex flex-col items-center justify-center pt-1 z-20">
              <motion.div
                animate={isTogether ? { scale: [1, 1.08, 1] } : { scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`px-4 py-2 rounded-2xl border shadow-xl flex items-center gap-2 backdrop-blur-xl ${
                  isTogether
                    ? "bg-gradient-to-r from-pink-600/90 to-rose-600/90 border-pink-400/60 shadow-pink-500/30 text-white"
                    : "bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-indigo-950/80 border-indigo-400/40 text-purple-200 shadow-indigo-500/20"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center shrink-0">
                  <Heart className={`w-3.5 h-3.5 ${isTogether ? "fill-white text-white" : "fill-pink-400 text-pink-400"}`} />
                </div>
                <span className="font-black text-sm text-white tracking-wide drop-shadow">
                  {data?.distanceFormatted || "--"}
                </span>
              </motion.div>
            </div>

            {/* Partner Pod */}
            <div className="flex flex-col items-center text-center space-y-2 w-28">
              <div className="relative group/partner">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 p-0.5 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                  <div className="w-full h-full rounded-full bg-background overflow-hidden flex items-center justify-center font-black text-white text-base">
                    {partnerLoc?.profilePicture && (partnerLoc.profilePicture.startsWith("/") || partnerLoc.profilePicture.startsWith("http")) ? (
                      <img src={partnerLoc.profilePicture} alt="" className="w-full h-full object-cover" />
                    ) : (
                      partnerLoc?.fullName?.[0]?.toUpperCase() || "P"
                    )}
                  </div>
                </div>
                {partnerLoc?.latitude && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_8px_#34D399]" />
                )}
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-extrabold text-white block truncate max-w-[95px] drop-shadow">
                  {partnerLoc?.fullName || "Pasangan"}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] text-pink-200/80 font-medium bg-pink-950/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-pink-500/30 truncate max-w-[95px]">
                  <Globe className="w-2.5 h-2.5 text-pink-400 shrink-0" />
                  <span className="truncate">{partnerLoc?.locationName || (partnerLoc?.latitude ? "GPS Aktif" : "Belum Set")}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Status Message */}
        <div className="text-center space-y-1 pt-0.5">
          <p className="text-xs font-bold text-indigo-200/90 flex items-center justify-center gap-1.5">
            <span>{data?.statusText || "Memuat status lokasi..."}</span>
          </p>

          {errorMsg && (
            <p className="text-[11px] text-rose-300 font-semibold bg-rose-950/60 border border-rose-500/30 p-2 rounded-xl">
              {errorMsg}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
