import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation, Loader2, MapPin, Globe, Radio, Sparkles, Heart } from "lucide-react"
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
          <p className="text-xs text-text-secondary font-medium">Mendeteksi koordinat GPS radar...</p>
        </div>
      </Card>
    )
  }

  const myLoc = data?.myLocation
  const partnerLoc = data?.partnerLocation
  const isTogether = data?.distanceKm !== null && data?.distanceKm < 0.1

  return (
    <Card className="bg-surface border border-border/60 shadow-2xl rounded-3xl overflow-hidden relative group">
      {/* Latitude / Longitude Radar Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8E75FF15_1px,transparent_1px),linear-gradient(to_bottom,#8E75FF15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <CardContent className="p-5 relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary relative">
              <Radio className="w-4 h-4 text-primary animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-success animate-ping" />
            </div>
            <div>
              <h3 className="text-xs font-black text-text-primary uppercase tracking-widest flex items-center gap-1.5">
                Jarak Pasangan <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h3>
              <p className="text-[10px] text-text-tertiary font-bold tracking-wider uppercase">
                GPS Satellite Radar
              </p>
            </div>
          </div>

          <Button
            onClick={handleUpdateLocation}
            disabled={isUpdating}
            variant="outline"
            size="sm"
            className="rounded-full border-primary/40 text-primary hover:bg-primary/10 text-xs font-bold h-8 px-3.5 shadow-sm transition-all"
          >
            {isUpdating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
            ) : (
              <Navigation className="w-3.5 h-3.5 mr-1.5 text-primary" />
            )}
            {isUpdating ? "Mendeteksi..." : "Update GPS"}
          </Button>
        </div>

        {/* Satellite Map Stage */}
        <div className="bg-background/90 backdrop-blur-md border border-border/60 rounded-2xl p-5 relative overflow-hidden shadow-inner min-h-[150px]">
          {/* Radar Waves / Connecting Laser Beam */}
          <div className="absolute top-[48px] left-12 right-12 -translate-y-1/2 z-0 pointer-events-none">
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

          {/* Absolute Centered GPS Badge */}
          <div className="absolute left-1/2 top-[48px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <motion.div
              animate={isTogether ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`px-4 py-1.5 rounded-full border shadow-lg font-black text-xs flex items-center gap-1.5 backdrop-blur-md ${
                isTogether
                  ? "bg-secondary text-white border-secondary/60 shadow-secondary/30"
                  : "bg-surface/95 border-primary/50 text-primary shadow-primary/20"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-primary shrink-0 animate-spin-slow" />
              <span className="text-xs font-black">{data?.distanceFormatted || "--"}</span>
            </motion.div>
          </div>

          {/* User & Partner Radar Markers */}
          <div className="flex items-start justify-between relative z-10">
            {/* User GPS Pod */}
            <div className="flex flex-col items-center text-center space-y-1.5 w-28 shrink-0">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary p-0.5 shadow-lg overflow-hidden">
                  <div className="w-full h-full rounded-full bg-surface overflow-hidden flex items-center justify-center font-black text-primary text-sm">
                    {myLoc?.profilePicture && (myLoc.profilePicture.startsWith("/") || myLoc.profilePicture.startsWith("http")) ? (
                      <img src={myLoc.profilePicture} alt="" className="w-full h-full object-cover" />
                    ) : (
                      myLoc?.fullName?.[0]?.toUpperCase() || "ME"
                    )}
                  </div>
                </div>
                {myLoc?.latitude && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-success border-2 border-background flex items-center justify-center text-[8px] text-white font-bold" />
                )}
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-black text-text-primary block truncate max-w-[95px]">
                  {myLoc?.fullName || "Saya"}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 truncate max-w-[95px]">
                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                  <span className="truncate">{myLoc?.locationName || (myLoc?.latitude ? "GPS Aktif" : "Belum Set")}</span>
                </span>
                {myLoc?.latitude && (
                  <span className="text-[8px] text-text-tertiary font-mono block truncate max-w-[95px]">
                    {myLoc.latitude.toFixed(2)}°, {myLoc.longitude.toFixed(2)}°
                  </span>
                )}
              </div>
            </div>

            {/* Partner GPS Pod */}
            <div className="flex flex-col items-center text-center space-y-1.5 w-28 shrink-0">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary p-0.5 shadow-lg overflow-hidden">
                  <div className="w-full h-full rounded-full bg-surface overflow-hidden flex items-center justify-center font-black text-secondary text-sm">
                    {partnerLoc?.profilePicture && (partnerLoc.profilePicture.startsWith("/") || partnerLoc.profilePicture.startsWith("http")) ? (
                      <img src={partnerLoc.profilePicture} alt="" className="w-full h-full object-cover" />
                    ) : (
                      partnerLoc?.fullName?.[0]?.toUpperCase() || "P"
                    )}
                  </div>
                </div>
                {partnerLoc?.latitude && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-success border-2 border-background flex items-center justify-center text-[8px] text-white font-bold" />
                )}
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-black text-text-primary block truncate max-w-[95px]">
                  {partnerLoc?.fullName || "Pasangan"}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] text-secondary font-bold bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20 truncate max-w-[95px]">
                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                  <span className="truncate">{partnerLoc?.locationName || (partnerLoc?.latitude ? "GPS Aktif" : "Belum Set")}</span>
                </span>
                {partnerLoc?.latitude && (
                  <span className="text-[8px] text-text-tertiary font-mono block truncate max-w-[95px]">
                    {partnerLoc.latitude.toFixed(2)}°, {partnerLoc.longitude.toFixed(2)}°
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Status Message */}
        <div className="text-center space-y-1">
          <p className="text-xs font-semibold text-text-secondary">
            {data?.statusText || "Memuat status lokasi..."}
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
