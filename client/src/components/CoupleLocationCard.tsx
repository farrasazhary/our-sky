import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Heart, Loader2, Sparkles } from "lucide-react"
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
          <p className="text-xs text-text-secondary font-medium">Menghitung lokasi...</p>
        </div>
      </Card>
    )
  }

  const myLoc = data?.myLocation
  const partnerLoc = data?.partnerLocation
  const isTogether = data?.distanceKm !== null && data?.distanceKm < 0.1

  return (
    <Card className="bg-surface border-border/50 shadow-xl rounded-3xl overflow-hidden relative">
      <CardContent className="p-5 relative z-10 space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-text-primary uppercase tracking-widest flex items-center gap-1.5">
                Jarak Pasangan <Sparkles className="w-3 h-3 text-amber-400" />
              </h3>
              <p className="text-[10px] text-text-tertiary">Real-time Location Distance</p>
            </div>
          </div>

          <Button
            onClick={handleUpdateLocation}
            disabled={isUpdating}
            variant="outline"
            size="sm"
            className="rounded-full border-primary/30 text-primary hover:bg-primary/10 text-xs font-semibold h-8 px-3 transition-all"
          >
            {isUpdating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
            ) : (
              <Navigation className="w-3.5 h-3.5 mr-1" />
            )}
            {isUpdating ? "Mendeteksi..." : "Update Lokasi"}
          </Button>
        </div>

        {/* First Style Map Stage - With Equal Pod Widths for 100% Perfect Centering */}
        <div className="bg-background/90 border border-border/60 rounded-2xl p-5 relative overflow-hidden shadow-inner">
          {/* Connecting Dashed Line across the center of 48px avatars */}
          <div className="absolute top-[44px] left-12 right-12 -translate-y-1/2 z-0 pointer-events-none">
            <div className="w-full border-b-2 border-dashed border-primary/40 relative">
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 left-0"
              >
                <Heart className="w-4 h-4 fill-secondary text-secondary drop-shadow" />
              </motion.div>
            </div>
          </div>

          {/* User & Partner Cards - Using Equal Widths (w-28) to guarantee 100% Middle Centering */}
          <div className="flex items-start justify-between relative z-10">
            {/* Left User Pod (Fixed Width w-28) */}
            <div className="flex flex-col items-center text-center space-y-1.5 w-28 shrink-0">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-bold text-primary shadow-md overflow-hidden">
                  {myLoc?.profilePicture && (myLoc.profilePicture.startsWith("/") || myLoc.profilePicture.startsWith("http")) ? (
                    <img src={myLoc.profilePicture} alt="" className="w-full h-full object-cover" />
                  ) : (
                    myLoc?.fullName?.[0]?.toUpperCase() || "ME"
                  )}
                </div>
                {myLoc?.latitude && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-success border-2 border-background flex items-center justify-center text-[8px] text-white font-bold" />
                )}
              </div>
              <span className="text-[11px] font-extrabold text-text-primary truncate max-w-[95px]">
                {myLoc?.fullName || "Saya"}
              </span>
              <span className="text-[9px] text-text-tertiary truncate max-w-[95px] bg-surfaceVariant/60 px-2 py-0.5 rounded-full border border-border/40 font-medium">
                {myLoc?.locationName || (myLoc?.latitude ? "GPS Aktif" : "Belum Set")}
              </span>
            </div>

            {/* Middle Centered Distance Badge */}
            <div className="flex flex-col items-center justify-center pt-1 z-20 shrink-0">
              <motion.div
                animate={isTogether ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`px-3.5 py-1.5 rounded-full border shadow-md font-extrabold text-xs flex items-center gap-1.5 backdrop-blur-md ${
                  isTogether
                    ? "bg-secondary text-white border-secondary/50 shadow-secondary/30"
                    : "bg-surface/95 border-primary/50 text-primary shadow-primary/20"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isTogether ? "fill-white" : "fill-primary"}`} />
                <span className="text-xs font-black">{data?.distanceFormatted || "--"}</span>
              </motion.div>
            </div>

            {/* Right Partner Pod (Fixed Width w-28) */}
            <div className="flex flex-col items-center text-center space-y-1.5 w-28 shrink-0">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center font-bold text-secondary shadow-md overflow-hidden">
                  {partnerLoc?.profilePicture && (partnerLoc.profilePicture.startsWith("/") || partnerLoc.profilePicture.startsWith("http")) ? (
                    <img src={partnerLoc.profilePicture} alt="" className="w-full h-full object-cover" />
                  ) : (
                    partnerLoc?.fullName?.[0]?.toUpperCase() || "P"
                  )}
                </div>
                {partnerLoc?.latitude && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-success border-2 border-background flex items-center justify-center text-[8px] text-white font-bold" />
                )}
              </div>
              <span className="text-[11px] font-extrabold text-text-primary truncate max-w-[95px]">
                {partnerLoc?.fullName || "Pasangan"}
              </span>
              <span className="text-[9px] text-text-tertiary truncate max-w-[95px] bg-surfaceVariant/60 px-2 py-0.5 rounded-full border border-border/40 font-medium">
                {partnerLoc?.locationName || (partnerLoc?.latitude ? "GPS Aktif" : "Belum Set")}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Status Text */}
        <div className="text-center space-y-1">
          <p className="text-xs font-semibold text-text-secondary">
            {data?.statusText}
          </p>

          {errorMsg && (
            <p className="text-[11px] text-error font-medium bg-error/10 border border-error/20 p-2 rounded-xl">
              {errorMsg}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
