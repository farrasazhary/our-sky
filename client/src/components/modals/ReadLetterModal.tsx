import { BottomSheet } from "@/components/BottomSheet"
import { Heart, Lock, CheckCircle2 } from "lucide-react"

interface ReadLetterModalProps {
  isOpen: boolean
  onClose: () => void
  letter: {
    title: string
    category?: string
    message?: string
    content?: string
    isMine?: boolean
    isOpened?: boolean
    senderName?: string
  } | null
}

export function ReadLetterModal({ isOpen, onClose, letter }: ReadLetterModalProps) {
  if (!letter) return null

  const letterText = letter.message || letter.content || "No letter message written."
  const isMine = letter.isMine ?? false

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={`Open when ${letter.title}`}>
      <div className="space-y-4 text-center py-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-3xl">
            {letter.category === "SAD" ? "🥺" : letter.category === "HAPPY" ? "🎉" : letter.category === "MOTIVATION" ? "💪" : letter.category === "ANNIVERSARY" ? "❤️" : "💌"}
          </span>
          {isMine ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              ✍️ Written by You (Sender View)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20">
              💌 From {letter.senderName || "Your Partner"}
            </span>
          )}
        </div>

        <div className="bg-surfaceVariant/30 border border-border/40 rounded-2xl p-6 text-left space-y-3 relative shadow-inner">
          <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap font-serif italic">
            "{letterText}"
          </p>
          <div className="pt-4 border-t border-border/30 flex justify-between items-center text-xs text-text-tertiary">
            <span className="flex items-center gap-1">
              {isMine ? (
                letter.isOpened ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 inline" /> Opened by partner
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-400 inline" /> Sealed for partner
                  </>
                )
              ) : (
                "Written with love"
              )}
            </span>
            <Heart className="w-4 h-4 text-primary fill-primary/30" />
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}
