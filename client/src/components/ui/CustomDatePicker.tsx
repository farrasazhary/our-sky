import { useState, useRef, useEffect } from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

interface CustomDatePickerProps {
  value: string // YYYY-MM-DD format
  onChange: (dateStr: string) => void
  placeholder?: string
  className?: string
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const DAYS_HEADER = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]

export function CustomDatePicker({ value, onChange, placeholder = "Select Date", className = "" }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Parse initial date or default to today
  const parsedDate = value ? new Date(value + "T00:00:00") : new Date()
  const initialDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate

  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth())
  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear())

  useEffect(() => {
    if (value) {
      const d = new Date(value + "T00:00:00")
      if (!isNaN(d.getTime())) {
        setViewMonth(d.getMonth())
        setViewYear(d.getFullYear())
      }
    }
  }, [value])

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const handleSelectDay = (day: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const mStr = String(viewMonth + 1).padStart(2, '0')
    const dStr = String(day).padStart(2, '0')
    const dateStr = `${viewYear}-${mStr}-${dStr}`
    onChange(dateStr)
    setIsOpen(false)
  }

  // Calendar Math
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate()

  // Formatted date string for button display
  const formattedDisplay = value ? (() => {
    const d = new Date(value + "T00:00:00")
    return isNaN(d.getTime()) ? placeholder : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  })() : placeholder

  const currentYearNow = new Date().getFullYear()
  const yearOptions = Array.from({ length: 35 }, (_, i) => currentYearNow + 2 - i)

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-10 px-3 rounded-xl bg-surfaceVariant/40 border border-border/50 text-xs font-medium flex items-center justify-between text-text-primary hover:border-primary/50 transition-all ${className}`}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          <span className={value ? "text-text-primary font-medium" : "text-text-disabled"}>
            {formattedDisplay}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
      </button>

      {/* Calendar Dropdown Card */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-12 z-50 p-3 bg-[#181D2D] border border-border/60 rounded-2xl shadow-2xl space-y-2.5 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <div className="flex items-center gap-1.5">
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(parseInt(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1F263B] border border-border/50 rounded-lg px-2 py-1 text-xs font-semibold text-white focus:outline-none focus:border-primary cursor-pointer"
              >
                {MONTH_NAMES.map((month, idx) => (
                  <option key={month} value={idx} className="bg-[#181D2D] text-white">
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={viewYear}
                onChange={(e) => setViewYear(parseInt(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1F263B] border border-border/50 rounded-lg px-2 py-1 text-xs font-semibold text-white focus:outline-none focus:border-primary cursor-pointer"
              >
                {yearOptions.map((yr) => (
                  <option key={yr} value={yr} className="bg-[#181D2D] text-white">
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-7 h-7 rounded-lg bg-[#1F263B] border border-border/50 flex items-center justify-center text-text-secondary hover:text-white hover:border-primary/50 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-7 h-7 rounded-lg bg-[#1F263B] border border-border/50 flex items-center justify-center text-text-secondary hover:text-white hover:border-primary/50 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 text-center">
            {DAYS_HEADER.map((dh) => (
              <span key={dh} className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider py-1">
                {dh}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Prev month padding */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`prev-${idx}`} className="h-8 flex items-center justify-center text-[11px] text-text-disabled/40 select-none">
                {daysInPrevMonth - firstDayOfMonth + idx + 1}
              </div>
            ))}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1
              const mStr = String(viewMonth + 1).padStart(2, '0')
              const dStr = String(day).padStart(2, '0')
              const dateStr = `${viewYear}-${mStr}-${dStr}`

              const isSelected = value === dateStr
              const isToday = 
                new Date().getDate() === day &&
                new Date().getMonth() === viewMonth &&
                new Date().getFullYear() === viewYear

              return (
                <button
                  key={day}
                  type="button"
                  onClick={(e) => handleSelectDay(day, e)}
                  className={`h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-md shadow-primary/30 scale-105"
                      : isToday
                      ? "bg-[#1F263B] border border-primary/60 text-primary font-bold hover:bg-primary/10"
                      : "text-text-primary hover:bg-[#1F263B] hover:text-primary"
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
