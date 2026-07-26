import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center p-8 h-full min-h-[300px]"
    >
      <div className="w-16 h-16 bg-surfaceVariant/50 rounded-full flex items-center justify-center text-text-tertiary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary mb-6 max-w-[250px]">
        {description}
      </p>
      {action && <div>{action}</div>}
    </motion.div>
  )
}
