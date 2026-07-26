import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Gift, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { api } from "@/services/api"

export function Countdown() {
  const navigate = useNavigate()
  const [countdowns, setCountdowns] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadCountdowns() {
      setIsLoading(true)
      try {
        const res = await api.getCountdowns()
        if (Array.isArray(res)) {
          setCountdowns(res)
        }
      } catch (err) {
        console.warn("Using offline empty countdowns state.")
        setCountdowns([])
      } finally {
        setIsLoading(false)
      }
    }
    loadCountdowns()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <header className="p-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2 text-text-secondary hover:text-text-primary">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold text-text-primary">Countdowns</h1>
      </header>

      <main className="px-6 space-y-4 flex-1">
        <p className="text-sm text-text-secondary">Automatically calculated count of remaining days for your Important Days.</p>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-xs text-text-secondary">Calculating countdowns...</p>
          </div>
        ) : countdowns.length === 0 ? (
          <div className="bg-surfaceVariant/30 border border-dashed border-border/50 rounded-2xl p-8 text-center text-xs text-text-tertiary">
            No active countdowns calculated yet. Add an Important Day to see your countdown here!
          </div>
        ) : (
          countdowns.map((item: any, index: number) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-surface border-border/50 shadow-sm overflow-hidden">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border text-primary bg-primary/10 border-primary/20">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                        {item.category || "Event"} • {item.eventDate ? new Date(item.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                      </span>
                      <h3 className="font-semibold text-base text-text-primary mt-0.5">{item.title}</h3>
                    </div>
                  </div>

                  <div className="bg-surfaceVariant/60 px-4 py-2 rounded-xl text-center border border-border/40">
                    <span className="text-2xl font-extrabold text-primary block leading-none">{item.daysLeft ?? 0}</span>
                    <span className="text-[9px] font-semibold text-text-tertiary uppercase tracking-wider">Days</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </main>
    </div>
  )
}
