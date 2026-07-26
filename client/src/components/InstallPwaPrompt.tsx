import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, X, Sparkles } from "lucide-react"

export function InstallPwaPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setIsVisible(false)
    }
    setDeferredPrompt(null)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <div className="bg-surface/95 backdrop-blur-xl border border-primary/40 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3 relative overflow-hidden ring-1 ring-primary/20">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-md flex-shrink-0">
              <img src="/OurSkyNewIcon.jpeg" alt="OurSky App" className="w-full h-full object-cover rounded-[10px]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-text-primary flex items-center gap-1 truncate">
                Install OurSky App <Sparkles className="w-3 h-3 text-amber-400" />
              </h4>
              <p className="text-[11px] text-text-secondary leading-tight mt-0.5 line-clamp-1">
                Add to Home Screen for System Push Notifications & Full Screen mode.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={handleInstall}
              size="sm"
              className="bg-primary hover:bg-primary-hover text-white text-xs rounded-xl h-9 px-3 font-semibold shadow-md"
            >
              <Download className="w-3.5 h-3.5 mr-1" /> Install
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-text-tertiary hover:text-text-primary p-1 rounded-lg"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
