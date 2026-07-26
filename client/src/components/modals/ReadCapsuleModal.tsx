import { BottomSheet } from "@/components/BottomSheet"
import { Unlock, Heart } from "lucide-react"

interface ReadCapsuleModalProps {
  isOpen: boolean
  onClose: () => void
  capsule: { title: string; openDate: string; content: string } | null
}

export function ReadCapsuleModal({ isOpen, onClose, capsule }: ReadCapsuleModalProps) {
  if (!capsule) return null

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={capsule.title}>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 bg-secondary/10 border border-secondary/20 p-4 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
            <Unlock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Unsealed Capsule</span>
            <p className="text-xs text-text-secondary">Opened on {capsule.openDate}</p>
          </div>
        </div>

        <div className="bg-surfaceVariant/30 border border-border/40 p-5 rounded-2xl space-y-3">
          <h4 className="font-semibold text-sm text-text-primary">Unsealed Message:</h4>
          <p className="text-sm text-text-primary leading-relaxed font-serif italic">
            "{capsule.content}"
          </p>
          <div className="pt-3 border-t border-border/30 flex justify-between items-center text-xs text-text-tertiary">
            <span>Preserved for the future</span>
            <Heart className="w-4 h-4 text-secondary fill-secondary/20" />
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}
