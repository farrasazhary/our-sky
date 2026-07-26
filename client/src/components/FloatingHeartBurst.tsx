import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Particle {
  id: number
  x: number
  scale: number
  rotation: number
  duration: number
  emoji: string
}

interface FloatingHeartBurstProps {
  isActive: boolean
  onComplete?: () => void
}

const HEART_EMOJIS = ["💓", "💖", "💗", "💘", "💝", "✨", "❤️"]

export function FloatingHeartBurst({ isActive, onComplete }: FloatingHeartBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (isActive) {
      const generated: Particle[] = Array.from({ length: 18 }).map((_, index) => ({
        id: Date.now() + index,
        x: (Math.random() - 0.5) * 280, // Horizontal spread
        scale: 0.8 + Math.random() * 0.8,
        rotation: (Math.random() - 0.5) * 60,
        duration: 2 + Math.random() * 1.5,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)]
      }))

      setParticles(generated)

      const timer = setTimeout(() => {
        setParticles([])
        if (onComplete) onComplete()
      }, 3500)

      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-end justify-center pb-20">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0, x: p.x, scale: 0.2, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: -500 - Math.random() * 200,
              x: p.x + (Math.random() - 0.5) * 100,
              scale: p.scale,
              rotate: p.rotation
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              ease: "easeOut"
            }}
            className="absolute text-3xl select-none filter drop-shadow-md"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
