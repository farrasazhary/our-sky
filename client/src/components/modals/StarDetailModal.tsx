import { BottomSheet } from "@/components/BottomSheet"
import { Sparkles, Calendar, MapPin } from "lucide-react"

interface StarDetailModalProps {
  isOpen: boolean
  onClose: () => void
  star: { title: string; date: string; location: string; memoriesCount: number } | null
}

export function StarDetailModal({ isOpen, onClose, star }: StarDetailModalProps) {
  if (!star) return null

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Constellation Star Detail">
      <div className="space-y-4">
        <div className="flex items-center space-x-4 bg-primary/10 border border-primary/20 p-4 rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-text-primary">{star.title}</h3>
            <p className="text-xs text-primary font-medium mt-0.5">{star.memoriesCount} Memories Linked</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-text-tertiary" />
            <span>Date: {star.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-text-tertiary" />
            <span>Location: {star.location}</span>
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}
