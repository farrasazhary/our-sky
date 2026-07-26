import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Plus, CheckCircle2, Circle, Compass, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AddDreamModal } from "@/components/modals/AddDreamModal"
import { api } from "@/services/api"

export function DreamBoard() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [dreams, setDreams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchDreams = async () => {
    setIsLoading(true)
    try {
      const res = await api.getDreams()
      if (Array.isArray(res)) {
        setDreams(res)
      }
    } catch (err) {
      console.warn("Using offline empty dream board state.")
      setDreams([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDreams()
  }, [])

  const toggleDone = async (id: string) => {
    try {
      await api.toggleDreamStatus(id)
      fetchDreams()
    } catch (err) {
      console.warn("Toggling dream status locally.")
    }
  }

  const filteredDreams = selectedCategory === "All" 
    ? dreams 
    : dreams.filter(d => d.category?.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <header className="p-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2 text-text-secondary hover:text-text-primary">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-text-primary">Dream Board</h1>
        </div>

        <Button onClick={() => setIsModalOpen(true)} size="sm" className="rounded-full bg-primary text-white text-xs font-semibold">
          <Plus className="w-4 h-4 mr-1" /> Add Goal
        </Button>
      </header>

      <div className="px-6 pb-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {["All", "Travel", "Life", "Home", "Finance"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border shrink-0 transition-colors ${
                selectedCategory === cat 
                  ? "bg-primary text-white border-primary" 
                  : "bg-surface border-border/50 text-text-secondary hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="px-6 pt-2 space-y-4 flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-xs text-text-secondary">Loading dream goals...</p>
          </div>
        ) : filteredDreams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
            <Compass className="w-10 h-10 text-text-tertiary" />
            <h3 className="text-base font-semibold text-text-primary">No Dreams Added</h3>
            <p className="text-xs text-text-secondary max-w-xs">
              Add your shared bucket list goals, trips, and life dreams to achieve together!
            </p>
            <Button onClick={() => setIsModalOpen(true)} size="sm" className="bg-primary text-white text-xs rounded-full">
              Add First Goal
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredDreams.map((item: any, index: number) => {
              const isCompleted = item.status === "COMPLETED"
              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-surface border-border/50 overflow-hidden shadow-sm group">
                    <div className="h-36 relative overflow-hidden bg-surfaceVariant">
                      <img 
                        src={item.coverImage ? `/uploads/memories/${item.coverImage}` : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"} 
                        alt={item.title} 
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isCompleted ? 'grayscale opacity-60' : ''}`} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <button 
                        onClick={() => toggleDone(item.id)}
                        className="absolute top-3 right-3 text-white backdrop-blur-md bg-black/40 p-1.5 rounded-full hover:scale-110 transition-transform"
                      >
                        {isCompleted ? <CheckCircle2 className="w-6 h-6 text-success fill-success/20" /> : <Circle className="w-6 h-6 text-white/80" />}
                      </button>

                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                          {item.category || "Goal"}
                        </span>
                        <h3 className={`text-base font-bold text-white mt-1 ${isCompleted ? 'line-through opacity-80' : ''}`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </main>

      <AddDreamModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchDreams} 
      />
    </div>
  )
}
