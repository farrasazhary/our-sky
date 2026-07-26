import { useState } from "react"
import { BottomSheet } from "@/components/BottomSheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomDatePicker } from "@/components/ui/CustomDatePicker"
import { Calendar, Loader2 } from "lucide-react"
import { api } from "@/services/api"

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddEventModal({ isOpen, onClose, onSuccess }: AddEventModalProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("Anniversary")
  const [repeat, setRepeat] = useState("Yearly")
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !date) return

    setIsSaving(true)
    try {
      await api.createImportantDay({
        title: title.trim(),
        eventDate: date,
        category,
        repeatRule: repeat.toUpperCase().replace(" ", "_"),
      })
      setTitle("")
      setDate("")
      onClose()
      onSuccess()
    } catch (err: any) {
      console.warn("Failed to create important day via API:", err.message)
      onClose()
      onSuccess()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Add Important Day">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Event Title</label>
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. First Kiss, Partner's Birthday"
            className="bg-surfaceVariant/40 border-border/50"
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</label>
          <CustomDatePicker 
            value={date}
            onChange={(d) => setDate(d)}
            placeholder="Select Event Date"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Category</label>
          <div className="flex gap-2">
            {["Anniversary", "Birthday", "Trip", "Other"].map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-colors ${
                  category === cat 
                    ? "bg-primary text-white border-primary" 
                    : "bg-surfaceVariant/40 text-text-secondary border-border/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Repeat Rule</label>
          <div className="flex gap-2">
            {[
              { label: "Repeat Yearly 🔄", value: "Yearly" },
              { label: "One Time 📌", value: "One Time" }
            ].map((r) => (
              <button
                type="button"
                key={r.value}
                onClick={() => setRepeat(r.value)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                  repeat === r.value 
                    ? "bg-secondary text-white border-secondary font-bold" 
                    : "bg-surfaceVariant/40 text-text-secondary border-border/50"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={isSaving || !title.trim() || !date} className="w-full h-12 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-lg">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Calendar className="w-4 h-4 mr-2" />}
            Save Important Day
          </Button>
        </div>
      </form>
    </BottomSheet>
  )
}
