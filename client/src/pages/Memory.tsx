import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Calendar as CalendarIcon, Grid, ChevronLeft, ChevronRight, Lock, Loader2, BookImage, CheckCircle2, UserCheck, Heart } from "lucide-react"
import { AddMemoryModal } from "@/components/modals/AddMemoryModal"
import { ImageViewerModal } from "@/components/modals/ImageViewerModal"
import { api } from "@/services/api"

interface MemoryItem {
  id: string | number
  title: string
  date: string
  dayNum: number
  img: string
  caption: string
  isMine: boolean
  authorName: string
}

function parseLocalDate(dateInput: any): { dateStr: string; dayNum: number } {
  if (!dateInput) {
    const today = new Date()
    return {
      dateStr: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
      dayNum: today.getDate()
    }
  }

  const str = typeof dateInput === "string" ? dateInput : dateInput.toISOString ? dateInput.toISOString() : String(dateInput)
  const dateOnly = str.split("T")[0] // e.g. "2026-07-26"
  const parts = dateOnly.split("-")
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const day = parseInt(parts[2], 10)
    return {
      dateStr: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      dayNum: day
    }
  }

  const d = new Date(dateInput)
  return {
    dateStr: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    dayNum: d.getDate()
  }
}

export function Memory() {
  const [viewMode, setViewMode] = useState<"calendar" | "gallery">("calendar")
  const [authorFilter, setAuthorFilter] = useState<"all" | "mine" | "partner">("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null)
  
  // Month / Year Navigation State
  const [viewDate, setViewDate] = useState<Date>(new Date())
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [memories, setMemories] = useState<MemoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const viewYear = viewDate.getFullYear()
  const viewMonth = viewDate.getMonth()

  const handlePrevMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1))
  }

  const handleNextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1))
  }

  const monthTitle = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const fetchMemories = async () => {
    setIsLoading(true)
    try {
      const res = await api.getMemories()
      if (Array.isArray(res)) {
        const formatted = res.map((m: any) => {
          const { dateStr, dayNum } = parseLocalDate(m.memoryDate)
          const rawPhoto = m.photos?.[0] || m.media?.[0]?.fileUrl
          const imgUrl = rawPhoto
            ? (rawPhoto.startsWith("http") || rawPhoto.startsWith("/uploads") || rawPhoto.startsWith("/storage") ? rawPhoto : `/uploads/${rawPhoto}`)
            : "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80"

          const isMine = m.isMine !== undefined ? m.isMine : (m.author === "Mine")
          const authorName = isMine ? "Mine" : "Partner"

          return {
            id: m.id,
            title: m.title,
            date: dateStr,
            dayNum,
            img: imgUrl,
            caption: m.description || "Captured moment.",
            isMine,
            authorName,
          }
        })
        setMemories(formatted)
      }
    } catch (err) {
      console.warn("Using offline empty memory state.")
      setMemories([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMemories()
  }, [])

  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  
  // Check if I (current user) have already uploaded a memory for today
  const hasMyTodayMemory = memories.some(m => m.date === todayStr && m.isMine === true)

  // Calendar Math
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonthCount = new Date(viewYear, viewMonth + 1, 0).getDate()
  const daysInPrevMonthCount = new Date(viewYear, viewMonth, 0).getDate()
  
  const filteredMemories = memories.filter(m => {
    if (authorFilter === "mine") return m.isMine === true
    if (authorFilter === "partner") return m.isMine === false
    return true
  })

  const activeDateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
  const activeMemoriesForSelectedDay = memories.filter(m => m.date === activeDateStr)

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 relative overflow-x-hidden">
      {/* Header */}
      <header className="p-6 pt-12 pb-4 sticky top-0 bg-background/90 backdrop-blur-md z-10 border-b border-border/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Little Memory</h1>
            <p className="text-xs text-text-secondary mt-0.5">Shared Album (1 Photo / User / Day)</p>
          </div>

          <div className="flex bg-surfaceVariant/60 p-1 rounded-xl border border-border/50">
            <button 
              onClick={() => setViewMode("calendar")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "calendar" ? "bg-primary text-white" : "text-text-tertiary hover:text-text-primary"}`}
              title="Calendar View"
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("gallery")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "gallery" ? "bg-primary text-white" : "text-text-tertiary hover:text-text-primary"}`}
              title="Gallery View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Partner / Mine Filter Chips */}
        <div className="flex items-center gap-2">
          {[
            { label: `All (${memories.length})`, value: "all" },
            { label: `Mine (${memories.filter(m => m.isMine).length})`, value: "mine" },
            { label: `Partner's ❤️ (${memories.filter(m => !m.isMine).length})`, value: "partner" }
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setAuthorFilter(f.value as any)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                authorFilter === f.value
                  ? "bg-primary text-white border-primary"
                  : "bg-surface border-border/50 text-text-secondary hover:text-text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {viewMode === "gallery" && (
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <Input className="pl-9 bg-surface border-border/50" placeholder="Search memories..." />
          </div>
        )}
      </header>

      {/* Main Content View */}
      <main className="px-6 py-4 flex-1">
        {/* Per-User 1 Photo Limit Status Banner */}
        {hasMyTodayMemory && (
          <div className="bg-success/10 border border-success/30 text-success text-xs px-4 py-2.5 rounded-2xl flex items-center justify-between mb-4 shadow-sm">
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Your Today's Memory Photo Recorded (1 Photo / User / Day)
            </span>
          </div>
        )}

        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16 text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-xs text-text-secondary">Loading memory collection...</p>
          </div>
        ) : viewMode === "calendar" ? (
          <div className="space-y-6">
            {/* Dynamic Month Header Controls */}
            <div className="flex items-center justify-between bg-surface p-3 rounded-2xl border border-border/50 shadow-sm">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrevMonth}
                className="h-8 w-8 text-text-secondary hover:text-text-primary hover:bg-surfaceVariant"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <span className="font-bold text-sm text-text-primary tracking-wide">
                {monthTitle}
              </span>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNextMonth}
                className="h-8 w-8 text-text-secondary hover:text-text-primary hover:bg-surfaceVariant"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i} className="text-[10px] font-bold text-text-tertiary uppercase py-1">{d}</span>
              ))}

              {/* Prev Month Padding Days */}
              {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                <div key={`prev-${idx}`} className="aspect-square rounded-xl flex items-center justify-center text-[11px] text-text-disabled/40 select-none border border-transparent">
                  {daysInPrevMonthCount - firstDayOfWeek + idx + 1}
                </div>
              ))}

              {/* Current Month Days */}
              {Array.from({ length: daysInMonthCount }).map((_, i) => {
                const day = i + 1
                const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                
                const dayMems = memories.filter(m => m.date === dateStr)
                const isSelected = selectedDay === day && selectedMonth === viewMonth && selectedYear === viewYear

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDay(day)
                      setSelectedMonth(viewMonth)
                      setSelectedYear(viewYear)
                    }}
                    className={`aspect-square rounded-xl relative flex items-center justify-center text-xs font-semibold transition-all overflow-hidden border ${
                      isSelected 
                        ? "border-primary ring-2 ring-primary/40 bg-primary/20 text-white shadow-md scale-105" 
                        : dayMems.length > 0
                          ? "border-primary/50 bg-surface text-text-primary shadow-sm hover:border-primary" 
                          : "border-border/40 bg-surface/40 text-text-disabled hover:bg-surfaceVariant/50 hover:text-text-primary"
                    }`}
                  >
                    {dayMems.length > 0 ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={dayMems[0].img} 
                          alt="" 
                          className="w-full h-full object-cover opacity-70" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80"
                          }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center font-extrabold text-white shadow-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-xs">
                          {day}
                        </span>
                        {dayMems.length > 1 && (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary shadow-sm" />
                        )}
                      </div>
                    ) : (
                      <span>{day}</span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="pt-2">
              <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
                Memories for {viewDate.toLocaleDateString("en-US", { month: "short" })} {selectedDay}, {selectedYear} ({activeMemoriesForSelectedDay.length})
              </h3>

              {activeMemoriesForSelectedDay.length > 0 ? (
                <div className="space-y-4">
                  {activeMemoriesForSelectedDay.map((mem) => (
                    <motion.div 
                      key={mem.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedPhoto(mem)}
                      className="bg-surface rounded-2xl overflow-hidden border border-border/50 shadow-md cursor-pointer group"
                    >
                      <div className="h-44 relative">
                        <img 
                          src={mem.img} 
                          alt={mem.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80"
                          }}
                        />
                        
                        {/* Clear Tag: By Mine vs By Partner */}
                        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 border backdrop-blur-md ${
                          mem.isMine 
                            ? "bg-primary/80 border-primary/40" 
                            : "bg-secondary/80 border-secondary/40"
                        }`}>
                          {mem.isMine ? (
                            <>
                              <UserCheck className="w-3 h-3" /> By Mine
                            </>
                          ) : (
                            <>
                              <Heart className="w-3 h-3 fill-white" /> By Partner
                            </>
                          )}
                        </div>

                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-medium text-white flex items-center gap-1">
                          <Lock className="w-3 h-3 text-primary" /> Saved
                        </div>
                      </div>

                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-text-primary text-base">{mem.title}</h4>
                          <p className="text-xs text-text-secondary leading-relaxed font-serif italic mt-0.5">
                            "{mem.caption}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-surfaceVariant/30 border border-dashed border-border/50 rounded-2xl p-6 text-center">
                  <p className="text-xs text-text-tertiary mb-3">No memory recorded for this day yet.</p>
                  <Button 
                    onClick={() => setIsModalOpen(true)} 
                    disabled={hasMyTodayMemory}
                    size="sm" 
                    className="bg-primary text-white text-xs rounded-full disabled:opacity-50"
                  >
                    {hasMyTodayMemory ? "Your Today's Photo Recorded" : "Record Today's Memory"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Gallery Grid View */
          filteredMemories.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredMemories.map((memory, index) => (
                <motion.div 
                  key={memory.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedPhoto(memory)}
                  className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-surfaceVariant cursor-pointer shadow-sm border border-border/50"
                >
                  <img 
                    src={memory.img} 
                    alt={memory.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Clear Tag on Grid */}
                  <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white border backdrop-blur-md ${
                    memory.isMine ? "bg-primary/80 border-primary/40" : "bg-secondary/80 border-secondary/40"
                  }`}>
                    {memory.isMine ? "Mine" : "Partner"}
                  </div>

                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <h3 className="text-white font-medium text-sm line-clamp-1">{memory.title}</h3>
                    <p className="text-white/70 text-[10px] mt-0.5">{memory.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <BookImage className="w-10 h-10 text-text-tertiary" />
              <h3 className="text-base font-semibold text-text-primary">No Memories Found</h3>
              <p className="text-xs text-text-secondary max-w-xs">
                Start recording your daily photos to build your shared memory album.
              </p>
              <Button 
                onClick={() => setIsModalOpen(true)} 
                disabled={hasMyTodayMemory}
                size="sm" 
                className="bg-primary text-white text-xs rounded-full disabled:opacity-50"
              >
                {hasMyTodayMemory ? "Your Today's Photo Recorded" : "Add First Memory"}
              </Button>
            </div>
          )
        )}
      </main>

      {/* Floating Action Button */}
      <div className="absolute bottom-20 right-6 z-40">
        <motion.button 
          whileHover={{ scale: hasMyTodayMemory ? 1 : 1.08 }}
          whileTap={{ scale: hasMyTodayMemory ? 1 : 0.92 }}
          onClick={() => !hasMyTodayMemory && setIsModalOpen(true)}
          disabled={hasMyTodayMemory}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all ${
            hasMyTodayMemory 
              ? "bg-surfaceVariant text-text-disabled cursor-not-allowed opacity-60 border border-border/50" 
              : "bg-primary text-white hover:bg-primary-hover"
          }`}
          title={hasMyTodayMemory ? "You already uploaded your photo today (1 photo per user/day)" : "Add Memory"}
        >
          {hasMyTodayMemory ? <CheckCircle2 className="w-6 h-6 text-success" /> : <Plus className="w-6 h-6" />}
        </motion.button>
      </div>

      <AddMemoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchMemories} 
      />

      <ImageViewerModal 
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        memory={selectedPhoto}
      />
    </div>
  )
}
