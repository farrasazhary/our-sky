import { motion, AnimatePresence } from "framer-motion"
import { X, Lock } from "lucide-react"

interface ImageViewerModalProps {
  isOpen: boolean
  onClose: () => void
  memory: { 
    title: string
    date: string
    img: string
    caption?: string
    authorName?: string
    authorAvatar?: string 
  } | null
}

export function ImageViewerModal({ isOpen, onClose, memory }: ImageViewerModalProps) {
  if (!memory) return null

  const authorName = memory.authorName || "Sam"

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex flex-col justify-between p-6">
          {/* Header */}
          <div className="flex justify-between items-center text-white z-10 pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center font-bold text-sm text-primary">
                {authorName[0]}
              </div>
              <div>
                <span className="text-xs text-white/70">{memory.date} • by {authorName}</span>
                <h3 className="text-lg font-bold">{memory.title}</h3>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fullscreen Photo */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            className="my-auto relative max-h-[60vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
          >
            <img src={memory.img} alt={memory.title} className="w-full h-full object-contain" />
          </motion.div>

          {/* Caption Footer */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white mb-6">
            <p className="text-sm italic font-serif leading-relaxed">
              "{memory.caption || "A cherished moment captured in time."}"
            </p>
            <div className="mt-3 flex items-center justify-between text-[10px] text-white/70 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-primary" /> Memory Sealed</span>
              <span className="bg-primary/20 px-2 py-0.5 rounded text-primary font-medium">Uploaded by {authorName}</span>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
