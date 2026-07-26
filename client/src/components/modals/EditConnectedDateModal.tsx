import { useState, useEffect } from "react"
import { BottomSheet } from "@/components/BottomSheet"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart, Loader2, Save } from "lucide-react"
import { api } from "@/services/api"
import { useAuth } from "@/contexts/AuthContext"

interface EditConnectedDateModalProps {
  isOpen: boolean
  onClose: () => void
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const DAYS_HEADER = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export function EditConnectedDateModal({ isOpen, onClose }: EditConnectedDateModalProps) {
  const { relationship, refreshStatus } = useAuth()
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMonth, setViewMonth] = useState<number>(new Date().getMonth())
  const [viewYear, setViewYear] = useState<number>(new Date().getFullYear())
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (relationship?.startedAt) {
      const d = new Date(relationship.startedAt)
      if (!isNaN(d.getTime())) {
        setSelectedDate(d)
        setViewMonth(d.getMonth())
        setViewYear(d.getFullYear())
      }
    } else {
      const now = new Date()
      setSelectedDate(now)
      setViewMonth(now.getMonth())
      setViewYear(now.getFullYear())
    }
  }, [relationship, isOpen])

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const handleSelectDay = (day: number) => {
    const newD = new Date(viewYear, viewMonth, day, 12, 0, 0)
    setSelectedDate(newD)
  }

  // Calendar Grid Math
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate()

  // Calculate Duration Together Preview
  const calculateDaysTogether = (d: Date) => {
    const diffTime = new Date().getTime() - d.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return "Future Anniversary Date ✨"
    if (diffDays === 0) return "Today is your Special Day! 🎉"
    if (diffDays === 1) return "Together for 1 Day ❤️"
    
    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)
    
    let parts = []
    if (years > 0) parts.push(`${years} Year${years > 1 ? 's' : ''}`)
    if (months > 0) parts.push(`${months} Month${months > 1 ? 's' : ''}`)
    
    return parts.length > 0 ? `Together for ${parts.join(', ')} (${diffDays.toLocaleString()} Days) ❤️` : `Together for ${diffDays} Days ❤️`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Format YYYY-MM-DD
    const y = selectedDate.getFullYear()
    const m = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const d = String(selectedDate.getDate()).padStart(2, '0')
    const dateStr = `${y}-${m}-${d}`

    setIsSaving(true)
    try {
      await api.updateConnectedDate(dateStr)
      await refreshStatus()
      onClose()
    } catch (err: any) {
      console.warn("Failed to update connection date:", err.message)
    } finally {
      setIsSaving(false)
    }
  }

  // Formatted date string for banner
  const formattedSelectedBanner = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  // Generate Year Options (1990 to currentYear + 5)
  const currentYearNow = new Date().getFullYear()
  const yearOptions = Array.from({ length: 40 }, (_, i) => currentYearNow + 2 - i)

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Edit Connected Date">
      <form onSubmit={handleSubmit} className="space-y-4 py-1">
        {/* Special Date Banner */}
        <div className="bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 border border-primary/30 rounded-2xl p-4 text-center space-y-1 shadow-inner relative">
          <div className="flex items-center justify-center gap-1.5 text-xs text-primary font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-primary text-primary" /> Connected Anniversary Date
          </div>
          <h3 className="text-base font-bold text-text-primary">{formattedSelectedBanner}</h3>
          <p className="text-xs text-secondary font-medium">{calculateDaysTogether(selectedDate)}</p>
        </div>

        {/* Custom Dark Theme Calendar */}
        <div className="bg-surfaceVariant/40 border border-border/50 rounded-2xl p-4 space-y-3 shadow-sm">
          {/* Header Controls: Month/Year Dropdown & Nav Buttons */}
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <div className="flex items-center gap-2">
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(parseInt(e.target.value))}
                className="bg-surface border border-border/50 rounded-lg px-2.5 py-1 text-xs font-semibold text-text-primary focus:outline-none focus:border-primary"
              >
                {MONTH_NAMES.map((month, idx) => (
                  <option key={month} value={idx}>{month}</option>
                ))}
              </select>

              <select
                value={viewYear}
                onChange={(e) => setViewYear(parseInt(e.target.value))}
                className="bg-surface border border-border/50 rounded-lg px-2.5 py-1 text-xs font-semibold text-text-primary focus:outline-none focus:border-primary"
              >
                {yearOptions.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-7 h-7 rounded-lg bg-surface border border-border/50 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-7 h-7 rounded-lg bg-surface border border-border/50 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 text-center">
            {DAYS_HEADER.map((dh) => (
              <span key={dh} className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider py-1">
                {dh}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Previous month padding days */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`prev-${idx}`} className="h-9 flex items-center justify-center text-xs text-text-disabled/40 select-none">
                {daysInPrevMonth - firstDayOfMonth + idx + 1}
              </div>
            ))}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1
              const isSelected = 
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === viewMonth &&
                selectedDate.getFullYear() === viewYear

              const isToday = 
                new Date().getDate() === day &&
                new Date().getMonth() === viewMonth &&
                new Date().getFullYear() === viewYear

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-md shadow-primary/30 scale-105"
                      : isToday
                      ? "bg-surface border-2 border-primary/60 text-primary font-bold hover:bg-primary/10"
                      : "text-text-primary hover:bg-surfaceVariant/80 hover:text-primary"
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full h-12 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-lg"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Save Connected Date
          </Button>
        </div>
      </form>
    </BottomSheet>
  )
}
