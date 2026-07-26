import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Heart, MessageCircle, Sparkles, X } from "lucide-react"

export interface ToastItem {
  id: string
  title: string
  message: string
  type?: string
}

export function NotificationToast() {
  const [toast, setToast] = useState<ToastItem | null>(null)

  useEffect(() => {
    const handleNewToast = (event: CustomEvent<ToastItem>) => {
      if (event.detail) {
        setToast(event.detail)
        // Auto dismiss after 5 seconds
        setTimeout(() => {
          setToast((current) => (current?.id === event.detail.id ? null : current))
        }, 5000)
      }
    }

    window.addEventListener("oursky_show_toast" as any, handleNewToast)
    return () => window.removeEventListener("oursky_show_toast" as any, handleNewToast)
  }, [])

  if (!toast) return null

  const getIcon = () => {
    if (toast.type === "HEARTBEAT" || toast.title.includes("Heartbeat")) {
      return <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-bounce" />
    }
    if (toast.type === "QUESTION") {
      return <MessageCircle className="w-5 h-5 text-secondary" />
    }
    return <Bell className="w-5 h-5 text-primary" />
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-md w-[92%] z-50 pointer-events-auto">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="bg-surface/95 backdrop-blur-xl border border-primary/40 shadow-2xl rounded-2xl p-4 flex items-center justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              {getIcon()}
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                {toast.title} <Sparkles className="w-3 h-3 text-amber-400" />
              </h4>
              <p className="text-[11px] text-text-secondary line-clamp-2 mt-0.5">{toast.message}</p>
            </div>
          </div>

          <button
            onClick={() => setToast(null)}
            className="text-text-tertiary hover:text-text-primary p-1 rounded-full hover:bg-surfaceVariant/60 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
