import { useState } from "react"
import { BottomSheet } from "@/components/BottomSheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, KeyRound, Loader2 } from "lucide-react"

interface EnterCodeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (code: string) => void
}

export function EnterCodeModal({ isOpen, onClose, onSuccess }: EnterCodeModalProps) {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!code.trim()) {
      setError("Please enter invitation code.")
      return
    }

    setIsSubmitting(true)

    try {
      setCode("")
      onClose()
      onSuccess(code.trim().toUpperCase())
    } catch (err: any) {
      setError(err.message || "Failed to accept invitation.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Enter Invitation Code">
      <form onSubmit={handleSubmit} className="space-y-4 py-1">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
            <KeyRound className="w-6 h-6" />
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Enter the 6-character code sent by your partner to connect your accounts.
          </p>
        </div>

        <div className="space-y-2">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. SKY-88A9F2"
            className="text-center font-mono text-xl font-bold tracking-wider h-14 bg-surfaceVariant/40 border-border/50 uppercase"
            maxLength={10}
            required
          />
          {error && <p className="text-xs text-error text-center">{error}</p>}
        </div>

        <div className="pt-2">
          <Button 
            type="submit" 
            disabled={isSubmitting || !code.trim()} 
            className="w-full h-12 rounded-xl bg-secondary text-white font-medium hover:bg-secondary-hover shadow-lg"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Heart className="w-4 h-4 mr-2 fill-white" />}
            Connect With Partner
          </Button>
        </div>
      </form>
    </BottomSheet>
  )
}
