import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Plus, Calendar as CalendarIcon, Gift, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AddEventModal } from "@/components/modals/AddEventModal"
import { api } from "@/services/api"

export function ImportantDays() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [events, setEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchEvents = async () => {
    setIsLoading(true)
    try {
      const res = await api.getImportantDays()
      if (Array.isArray(res)) {
        setEvents(res)
      }
    } catch (err) {
      console.warn("Using offline empty important days state.")
      setEvents([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <header className="p-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2 text-text-secondary hover:text-text-primary">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-text-primary">Important Days</h1>
        </div>

        <Button onClick={() => setIsModalOpen(true)} size="sm" className="rounded-full bg-primary text-white text-xs font-semibold">
          <Plus className="w-4 h-4 mr-1" /> Add Day
        </Button>
      </header>

      <main className="px-6 space-y-4 flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-xs text-text-secondary">Loading important days...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
            <CalendarIcon className="w-10 h-10 text-text-tertiary" />
            <h3 className="text-base font-semibold text-text-primary">No Important Days Added</h3>
            <p className="text-xs text-text-secondary max-w-xs">
              Add your anniversaries, birthdays, and special milestones to get countdown reminders.
            </p>
            <Button onClick={() => setIsModalOpen(true)} size="sm" className="bg-primary text-white text-xs rounded-full">
              Add First Day
            </Button>
          </div>
        ) : (
          events.map((item: any, index: number) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-surface border-border/50 shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-text-primary">{item.title}</h4>
                      <span className="text-[10px] text-text-tertiary">
                        {new Date(item.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • {item.category || "Event"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                    {item.repeatRule || "YEARLY"}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </main>

      <AddEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchEvents} 
      />
    </div>
  )
}
