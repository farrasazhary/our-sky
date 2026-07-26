import type { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[100] flex justify-center items-end"
          />

          {/* Bottom Sheet Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface border-t border-border/50 rounded-t-3xl shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Drag Handle Indicator */}
            <div className="w-full py-3 flex justify-center items-center shrink-0 cursor-pointer" onClick={onClose}>
              <div className="w-12 h-1.5 bg-surfaceVariant rounded-full" />
            </div>

            {/* Sheet Header */}
            <div className="px-6 pb-4 flex justify-between items-center border-b border-border/40 shrink-0">
              <h2 className="text-lg font-bold text-text-primary">{title}</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surfaceVariant/50 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sheet Content Area */}
            <div className="p-6 pb-10 overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
