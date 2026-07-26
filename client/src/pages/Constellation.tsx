import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Stars, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { StarDetailModal } from "@/components/modals/StarDetailModal"
import { api } from "@/services/api"

interface StarData {
  id: string
  title: string
  date: string
  location: string
  memoriesCount: number
  x: number
  y: number
  color: string
  size: number
}

// Well-spaced celestial coordinates filling full height & width without empty voids
const calculateStarPositions = (rawStars: any[]): StarData[] => {
  const colors = ["#9D8CFF", "#F4A261", "#2A9D8F", "#E76F51", "#E9C46A"]
  const sizes = [14, 18, 22, 16, 20]

  // Balanced grid distribution across full screen (X: 10% to 88%, Y: 5% to 88%)
  const gridSlots = [
    { x: 18, y: 5 },   // Top left
    { x: 82, y: 8 },   // Top right
    { x: 50, y: 14 },  // Top center
    { x: 22, y: 28 },  // Upper left
    { x: 78, y: 26 },  // Upper right
    { x: 52, y: 36 },  // Upper center
    { x: 12, y: 48 },  // Mid left
    { x: 88, y: 50 },  // Mid right
    { x: 38, y: 58 },  // Mid center
    { x: 65, y: 66 },  // Lower right
    { x: 20, y: 78 },  // Bottom left
    { x: 80, y: 82 },  // Bottom right
    { x: 50, y: 88 },  // Bottom center
    { x: 32, y: 42 },  // Center left
    { x: 70, y: 15 },  // Upper far-right
    { x: 42, y: 74 }   // Lower mid-left
  ]

  return rawStars.map((s, i) => {
    let rawX: number
    let rawY: number

    if (i < gridSlots.length) {
      rawX = gridSlots[i].x
      rawY = gridSlots[i].y
    } else {
      // Deterministic distribution for additional stars
      rawX = (i * 41 + 17) % 80 + 10
      rawY = (i * 59 + 23) % 82 + 6
    }

    return {
      id: s.id || i.toString(),
      title: s.description || s.eventType || "Relationship Milestone",
      date: s.eventDate ? new Date(s.eventDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : "Recent",
      location: s.location || "Shared Memory",
      memoriesCount: s.memoriesCount || 1,
      x: rawX,
      y: rawY,
      color: colors[i % colors.length],
      size: sizes[i % sizes.length],
    }
  })
}

export function Constellation() {
  const navigate = useNavigate()
  const [stars, setStars] = useState<StarData[]>([])
  const [selectedStar, setSelectedStar] = useState<StarData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStars() {
      setIsLoading(true)
      try {
        const res = await api.getConstellationStars()
        if (Array.isArray(res)) {
          setStars(calculateStarPositions(res))
        }
      } catch (err) {
        console.warn("Using offline empty constellation state.")
        setStars([])
      } finally {
        setIsLoading(false)
      }
    }
    loadStars()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden select-none pb-16">
      {/* Background Starry Dust Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      {/* Header */}
      <header className="p-6 pt-12 pb-2 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2 text-text-secondary hover:text-text-primary">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Our Constellation</h1>
            <p className="text-xs text-text-tertiary">{stars.length} Stars in your sky</p>
          </div>
        </div>
      </header>

      {/* Main Interactive Celestial Canvas */}
      <main className="flex-1 relative flex items-center justify-center min-h-[75vh] px-4 py-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-xs text-text-secondary">Mapping star constellation...</p>
          </div>
        ) : stars.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center p-8 space-y-3 max-w-xs border border-dashed border-border/40 rounded-3xl bg-surfaceVariant/20 z-10"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
              <Stars className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-text-primary">Empty Sky</h3>
            <p className="text-xs text-text-tertiary leading-relaxed">
              Your sky doesn't have any stars yet. Record memories, answer daily questions, or approve date activities to light up your constellation!
            </p>
          </motion.div>
        ) : (
          <div className="relative w-full h-[72vh] max-w-xl mx-auto">
            {/* Pure Glowing Star Dots */}
            {stars.map((star, i) => (
              <motion.div
                key={star.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, ease: "easeOut" }}
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedStar(star)}
                style={{
                  top: `${star.y}%`,
                  left: `${star.x}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute cursor-pointer z-10 p-3"
              >
                {/* Pure Glowing Star Core */}
                <div 
                  className="rounded-full animate-pulse transition-all duration-300"
                  style={{
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    backgroundColor: star.color,
                    boxShadow: `0 0 16px 5px ${star.color}bb`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <StarDetailModal
        isOpen={!!selectedStar}
        onClose={() => setSelectedStar(null)}
        star={selectedStar}
      />
    </div>
  )
}
