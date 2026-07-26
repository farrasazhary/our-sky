import { useState } from "react"
import { BottomSheet } from "@/components/BottomSheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Loader2 } from "lucide-react"
import { api } from "@/services/api"

interface WriteLetterModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function WriteLetterModal({ isOpen, onClose, onSuccess }: WriteLetterModalProps) {
  const [trigger, setTrigger] = useState("")
  const [category, setCategory] = useState("MISS_YOU")
  const [content, setContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trigger.trim() || !content.trim()) return

    setIsSaving(true)
    try {
      await api.createOpenWhen({
        title: trigger.trim(),
        category,
        message: content.trim(),
      })
      setTrigger("")
      setContent("")
      onClose()
      onSuccess()
    } catch (err: any) {
      console.warn("Failed to create Open When letter via API:", err.message)
      onClose()
      onSuccess()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Write 'Open When' Letter">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Open When...</label>
          <Input 
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            placeholder="e.g. You miss me, We argue, You feel sad"
            className="bg-surfaceVariant/40 border-border/50"
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-10 bg-surfaceVariant/40 border border-border/50 rounded-xl px-3 text-xs text-text-primary focus:outline-none"
          >
            <option value="MISS_YOU">Miss You 💌</option>
            <option value="SAD">Sad / Down 🥺</option>
            <option value="HAPPY">Happy / Excited 🎉</option>
            <option value="MOTIVATION">Needs Motivation 💪</option>
            <option value="ANNIVERSARY">Anniversary ❤️</option>
            <option value="OTHER">Other ✨</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Letter Content</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your heart out. This letter will be ready for them when they need it most..."
            className="w-full bg-surfaceVariant/40 border border-border/50 rounded-xl p-3 text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-primary h-28 resize-none text-xs"
            required
          />
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={isSaving || !trigger.trim() || !content.trim()} className="w-full h-12 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-lg">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
            Seal Letter
          </Button>
        </div>
      </form>
    </BottomSheet>
  )
}
