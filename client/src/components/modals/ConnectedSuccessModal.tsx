import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart } from "lucide-react"

interface ConnectedSuccessModalProps {
  isOpen: boolean
  partnerName: string
  onClose: () => void
}

export function ConnectedSuccessModal({ isOpen, partnerName, onClose }: ConnectedSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[250] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full max-w-sm bg-gradient-to-br from-surface via-surface to-surfaceVariant border border-primary/40 rounded-3xl p-8 text-center space-y-5 shadow-2xl relative overflow-hidden"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto shadow-[0_0_30px_rgba(157,140,255,0.3)]">
              <Sparkles className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                Relationship Unlocked
              </span>
              <h2 className="text-2xl font-extrabold text-text-primary">Welcome Together! 🎉</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                You are now connected with <span className="text-primary font-bold">{partnerName}</span>. Your private digital sky is now live!
              </p>
            </div>

            <div className="flex justify-center -space-x-3 py-2">
              <div className="w-12 h-12 rounded-full bg-primary/30 border-2 border-surface flex items-center justify-center font-bold text-primary text-lg shadow-md">S</div>
              <div className="w-12 h-12 rounded-full bg-secondary/30 border-2 border-surface flex items-center justify-center font-bold text-secondary text-lg shadow-md">A</div>
            </div>

            <Button onClick={onClose} className="w-full h-12 rounded-2xl bg-primary text-white font-semibold hover:bg-primary-hover shadow-lg">
              <Heart className="w-4 h-4 mr-2 fill-white" />
              Explore OurSky
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
