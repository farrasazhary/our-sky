import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { api } from "@/services/api"

export function NotificationBell({ initialCount = 0 }: { initialCount?: number }) {
  const navigate = useNavigate()
  const [unreadCount, setUnreadCount] = useState(initialCount)
  const [isPopping, setIsPopping] = useState(false)
  const [showLoveBurst, setShowLoveBurst] = useState(false)

  // Listen for real-time notification events
  useEffect(() => {
    // Sync initial count from API
    api.getNotifications().then(list => {
      if (Array.isArray(list)) {
        const count = list.filter((n: any) => !n.isRead).length
        setUnreadCount(count)
      }
    }).catch(() => null)

    const handleCountUpdate = (e: CustomEvent<number>) => {
      const newCount = e.detail
      setUnreadCount(prev => {
        if (newCount > prev) {
          triggerBurstAnimation()
        }
        return newCount
      })
    }

    const handleToastShow = () => {
      triggerBurstAnimation()
    }

    window.addEventListener("oursky_unread_count_updated" as any, handleCountUpdate)
    window.addEventListener("oursky_show_toast" as any, handleToastShow)

    return () => {
      window.removeEventListener("oursky_unread_count_updated" as any, handleCountUpdate)
      window.removeEventListener("oursky_show_toast" as any, handleToastShow)
    }
  }, [])

  const triggerBurstAnimation = () => {
    setIsPopping(true)
    setShowLoveBurst(true)
    setTimeout(() => setIsPopping(false), 800)
    setTimeout(() => setShowLoveBurst(false), 1600)
  }

  return (
    <button
      onClick={() => navigate("/notifications")}
      className="relative p-2.5 rounded-full bg-surface border border-border/50 text-text-secondary hover:text-text-primary hover:border-primary/50 transition-all shadow-sm active:scale-95 group"
      title="Notifications"
    >
      <motion.div
        animate={isPopping ? { rotate: [0, -20, 20, -10, 10, 0], scale: [1, 1.25, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Bell className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      </motion.div>

      {/* Floating Love Burst Animation around Bell when notification arrives */}
      <AnimatePresence>
        {showLoveBurst && (
          <>
            <motion.div
              initial={{ opacity: 1, y: 0, x: -8, scale: 0.5 }}
              animate={{ opacity: 0, y: -26, x: -14, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-0 left-0 pointer-events-none z-20"
            >
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 drop-shadow" />
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 0, x: 6, scale: 0.5 }}
              animate={{ opacity: 0, y: -32, x: 12, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
              className="absolute top-0 right-0 pointer-events-none z-20"
            >
              <Heart className="w-4 h-4 fill-secondary text-secondary drop-shadow" />
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -38, x: -2, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-20"
            >
              <Heart className="w-3 h-3 fill-amber-400 text-amber-400 drop-shadow" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Animated Pop-Up Badge */}
      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.span
            key={unreadCount}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-extrabold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-background shadow-md"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
