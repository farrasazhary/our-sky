import { useState } from "react"
import { BottomSheet } from "@/components/BottomSheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomDatePicker } from "@/components/ui/CustomDatePicker"
import { Lock, Loader2 } from "lucide-react"
import { api } from "@/services/api"

interface CreateCapsuleModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateCapsuleModal({ isOpen, onClose, onSuccess }: CreateCapsuleModalProps) {
  const [title, setTitle] = useState("")
  const [openDate, setOpenDate] = useState("")
  const [content, setContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !openDate) return

    setIsSaving(true)
    try {
      await api.createTimeCapsule({
        title: title.trim(),
        message: content.trim(),
        openDate,
      })
      setTitle("")
      setOpenDate("")
      setContent("")
      onClose()
      onSuccess()
    } catch (err: any) {
      console.warn("Failed to create time capsule via API:", err.message)
      onClose()
      onSuccess()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Create Time Capsule">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Capsule Title</label>
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Message for our 5th Anniversary"
            className="bg-surfaceVariant/40 border-border/50"
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Unlock Date</label>
          <CustomDatePicker 
            value={openDate}
            onChange={(d) => setOpenDate(d)}
            placeholder="Select Unlock Date"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Hidden Message / Memory</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the message that will remain sealed until the unlock date..."
            className="w-full bg-surfaceVariant/40 border border-border/50 rounded-xl p-3 text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-primary h-24 resize-none text-xs"
            required
          />
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={isSaving || !title.trim() || !content.trim() || !openDate} className="w-full h-12 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-lg">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
            Seal Time Capsule
          </Button>
        </div>
      </form>
    </BottomSheet>
  )
}
