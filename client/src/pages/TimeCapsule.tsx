import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Plus, Lock, LockKeyholeOpen, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { CreateCapsuleModal } from "@/components/modals/CreateCapsuleModal"
import { ReadCapsuleModal } from "@/components/modals/ReadCapsuleModal"
import { api } from "@/services/api"

export function TimeCapsule() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCapsule, setSelectedCapsule] = useState<any | null>(null)
  const [capsules, setCapsules] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCapsules = async () => {
    setIsLoading(true)
    try {
      const res = await api.getTimeCapsules()
      if (Array.isArray(res)) {
        setCapsules(res)
      }
    } catch (err) {
      console.warn("Using offline empty time capsule state.")
      setCapsules([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCapsules()
  }, [])

  const handleOpenCapsule = async (item: any) => {
    if (item.status === "LOCKED") return
    try {
      await api.openTimeCapsule(item.id)
    } catch (err) {
      console.warn("Opening time capsule locally.")
    }
    setSelectedCapsule(item)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <header className="p-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2 text-text-secondary hover:text-text-primary">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-text-primary">Time Capsule</h1>
        </div>

        <Button onClick={() => setIsModalOpen(true)} size="sm" className="rounded-full bg-primary text-white text-xs font-semibold">
          <Plus className="w-4 h-4 mr-1" /> Seal Capsule
        </Button>
      </header>

      <main className="px-6 space-y-4 flex-1">
        <p className="text-sm text-text-secondary">Messages sealed in digital time capsules until a future date.</p>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-xs text-text-secondary">Retrieving time capsules...</p>
          </div>
        ) : capsules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
            <Lock className="w-10 h-10 text-text-tertiary" />
            <h3 className="text-base font-semibold text-text-primary">No Time Capsules Sealed</h3>
            <p className="text-xs text-text-secondary max-w-xs">
              Seal a secret message or memory for your partner to unlock on an upcoming anniversary or future date.
            </p>
            <Button onClick={() => setIsModalOpen(true)} size="sm" className="bg-primary text-white text-xs rounded-full">
              Create First Capsule
            </Button>
          </div>
        ) : (
          capsules.map((item: any, index: number) => {
            const isUnlocked = item.status === "OPENED" || new Date(item.openDate) <= new Date()
            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  onClick={() => isUnlocked && handleOpenCapsule(item)}
                  className={`bg-surface border-border/50 shadow-sm transition-all ${isUnlocked ? 'cursor-pointer hover:border-primary/50' : ''}`}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isUnlocked ? 'bg-primary/10 text-primary' : 'bg-surfaceVariant text-text-tertiary'}`}>
                        {isUnlocked ? <LockKeyholeOpen className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-text-primary">{item.title}</h4>
                        <span className="text-[10px] text-text-tertiary">
                          Unlock Date: {new Date(item.openDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${isUnlocked ? 'bg-success/10 text-success border-success/20' : 'bg-surfaceVariant text-text-tertiary border-border/40'}`}>
                      {isUnlocked ? 'Ready to Read' : 'Locked'}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </main>

      <CreateCapsuleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchCapsules} 
      />

      <ReadCapsuleModal 
        isOpen={!!selectedCapsule}
        onClose={() => setSelectedCapsule(null)}
        capsule={selectedCapsule}
      />
    </div>
  )
}
