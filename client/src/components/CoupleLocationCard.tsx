import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation, Loader2, Plane, MapPin } from "lucide-react"
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
          <p className="text-xs text-text-secondary font-medium">Memuat rute penerbangan cinta...</p>
        </div>
      </Card>
    )
  }

  const myLoc = data?.myLocation
  const partnerLoc = data?.partnerLocation
  const isTogether = data?.distanceKm !== null && data?.distanceKm < 0.1

  return (
    <Card className="bg-surface border border-border/60 shadow-2xl rounded-3xl overflow-hidden relative group">
      {/* Decorative Starry Grid Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(#8E75FF_1px,transparent_1px)] [background-size:18px_18px] opacity-10 pointer-events-none" />

      {/* Ticket Cutout Notches (Left & Right) */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border border-border/60 z-20 pointer-events-none" />
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border border-border/60 z-20 pointer-events-none" />

      <CardContent className="p-0 relative z-10">
        {/* Ticket Header Bar */}
        <div className="bg-surfaceVariant/40 px-6 py-3 border-b border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black text-primary tracking-widest uppercase block">
                OURSKY AIRLINES ✈️
              </span>
              <span className="text-[9px] text-text-tertiary font-bold tracking-wider uppercase">
                Direct Love Pass
              </span>
            </div>
          </div>

          {/* Update Location Button (Moved to Header) */}
          <Button
            onClick={handleUpdateLocation}
            disabled={isUpdating}
            size="sm"
            className="rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold h-8 px-3.5 shadow-md transition-all active:scale-95 shrink-0"
          >
            {isUpdating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
            ) : (
              <Navigation className="w-3.5 h-3.5 mr-1.5" />
            )}
            {isUpdating ? "Mendeteksi..." : "Update Lokasi"}
          </Button>
        </div>

        {/* Main Flight Path Section */}
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between relative">
            {/* Origin (User) */}
            <div className="flex flex-col items-center text-center space-y-2 w-28 shrink-0 z-10">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary p-0.5 shadow-lg overflow-hidden">
                  <div className="w-full h-full rounded-full bg-surface overflow-hidden flex items-center justify-center font-bold text-primary text-sm">
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
                <span className="inline-flex items-center gap-1 text-[9px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 truncate max-w-[95px] uppercase tracking-wider">
                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                  <span className="truncate">{myLoc?.locationName || (myLoc?.latitude ? "GPS AKTIF" : "ORIGIN")}</span>
                </span>
              </div>
            </div>

            {/* Flight Path Arc & Animated Airplane Badge */}
            <div className="flex-1 px-2 relative flex flex-col items-center justify-center z-10">
              {/* Dashed Flight Path Track */}
              <div className="w-full h-[2px] border-b-2 border-dashed border-primary/40 relative">
                {/* Traveling Airplane Icon */}
                <motion.div
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 left-0"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg shadow-secondary/40">
                    <Plane className="w-3.5 h-3.5 transform rotate-90 fill-white" />
                  </div>
                </motion.div>
              </div>

              {/* Distance Ticket Badge */}
              <div className="mt-4">
                <motion.div
                  animate={isTogether ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`px-3.5 py-1.5 rounded-2xl border shadow-lg font-black text-xs flex items-center gap-1.5 ${
                    isTogether
                      ? "bg-secondary text-white border-secondary/60 shadow-secondary/30"
                      : "bg-surfaceVariant/90 border-primary/40 text-primary shadow-primary/10"
                  }`}
                >
                  <Plane className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{data?.distanceFormatted || "--"}</span>
                </motion.div>
              </div>
            </div>

            {/* Destination (Partner) */}
            <div className="flex flex-col items-center text-center space-y-2 w-28 shrink-0 z-10">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary p-0.5 shadow-lg overflow-hidden">
                  <div className="w-full h-full rounded-full bg-surface overflow-hidden flex items-center justify-center font-bold text-secondary text-sm">
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
                <span className="inline-flex items-center gap-1 text-[9px] text-secondary font-bold bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20 truncate max-w-[95px] uppercase tracking-wider">
                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                  <span className="truncate">{partnerLoc?.locationName || (partnerLoc?.latitude ? "GPS AKTIF" : "DESTINATION")}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Stub Footer - Centered Status Text */}
        <div className="bg-surfaceVariant/30 px-6 py-3.5 border-t border-dashed border-border/60 flex items-center justify-center text-center">
          <p className="text-xs font-bold text-text-secondary text-center w-full">
            {data?.statusText || "Memuat status..."}
          </p>
        </div>

        {errorMsg && (
          <div className="px-6 pb-4">
            <p className="text-[11px] text-error font-medium bg-error/10 border border-error/20 p-2 rounded-xl text-center">
              {errorMsg}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
