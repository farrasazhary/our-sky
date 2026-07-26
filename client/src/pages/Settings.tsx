import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Bell, Shield, Palette, HelpCircle, Download, CheckCircle2, Sparkles, Smartphone } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Settings() {
  const navigate = useNavigate()
  const [notifPermission, setNotifPermission] = useState<string>("default")
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    if ("Notification" in window) {
      setNotifPermission(Notification.permission)
    }

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
  }, [])

  const handleRequestPermission = async () => {
    if ("Notification" in window) {
      const res = await Notification.requestPermission()
      setNotifPermission(res)
    }
  }

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
    } else {
      alert("To install OurSky App on iOS: Tap the Share button in Safari, then select 'Add to Home Screen' 📲")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background select-none">
      <header className="p-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border/30">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2 text-text-secondary hover:text-text-primary">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold text-text-primary">Settings</h1>
      </header>

      <main className="px-6 space-y-6 py-4 pb-24 flex-1">
        {/* PWA App Banner Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-gradient-to-br from-primary/20 via-surface to-secondary/15 p-5 rounded-2xl border border-primary/30 shadow-md relative overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                <Smartphone className="w-7 h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                  OurSky App <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                  {isInstalled ? "OurSky is installed as a Standalone App on your Home Screen!" : "Install App to your Home Screen for full screen mode and push notifications."}
                </p>
              </div>
            </div>

            {!isInstalled && (
              <Button
                onClick={handleInstallApp}
                className="mt-4 w-full h-10 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md"
              >
                <Download className="w-4 h-4 mr-2" /> Install OurSky App
              </Button>
            )}
          </div>
        </motion.div>

        {/* System Push Notifications Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 ml-1">System Notifications</h3>
          <div className="bg-surface rounded-2xl border border-border/50 p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary">Push Notifications</h4>
                <p className="text-[11px] text-text-tertiary">Real-time alerts for partner activities</p>
              </div>
            </div>

            {notifPermission === "granted" ? (
              <span className="text-[11px] font-bold text-success bg-success/15 border border-success/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Enabled
              </span>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={handleRequestPermission}
                className="text-xs rounded-full border-primary/40 text-primary hover:bg-primary/10 font-semibold"
              >
                Enable
              </Button>
            )}
          </div>
        </motion.div>

        {/* Other Preference Groups */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 ml-1">Preferences & Privacy</h3>
          <div className="bg-surface rounded-2xl border border-border/50 overflow-hidden shadow-sm">
            {[
              { icon: Palette, label: "Appearance", action: () => {} },
              { icon: Shield, label: "Privacy & Security", action: () => {} },
              { icon: HelpCircle, label: "Help & Support", action: () => {} },
            ].map((item, j) => (
              <div 
                key={j} 
                onClick={item.action}
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-surfaceVariant/50 transition-colors border-b border-border/40 last:border-b-0"
              >
                <div className="w-8 h-8 rounded-xl bg-surfaceVariant/60 flex items-center justify-center text-text-secondary">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-text-primary text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center pt-4">
          <p className="text-[11px] text-text-tertiary font-mono">OurSky PWA v1.0.0 • Made with ❤️ for Couples</p>
        </div>
      </main>
    </div>
  )
}
