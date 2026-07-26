import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { 
  Sparkles, 
  MessageCircleHeart, 
  Dices, 
  Calendar, 
  Clock,
  Lock, 
  Compass, 
  Mail, 
  ChevronRight 
} from "lucide-react"

export function Features() {
  const navigate = useNavigate()

  const featureList = [
    {
      id: "constellation",
      title: "Constellation",
      desc: "Interactive star map of your shared moments",
      icon: Sparkles,
      color: "text-primary bg-primary/10 border-primary/20",
      path: "/constellation"
    },
    {
      id: "question",
      title: "Question of the Day",
      desc: "Daily deep questions to connect with each other",
      icon: MessageCircleHeart,
      color: "text-info bg-info/10 border-info/20",
      path: "/question"
    },
    {
      id: "random-date",
      title: "Random Date Generator",
      desc: "Spin for unique and exciting date ideas",
      icon: Dices,
      color: "text-secondary bg-secondary/10 border-secondary/20",
      path: "/random-date"
    },
    {
      id: "important-days",
      title: "Important Days",
      desc: "Never forget anniversaries, birthdays & events",
      icon: Calendar,
      color: "text-success bg-success/10 border-success/20",
      path: "/important-days"
    },
    {
      id: "countdowns",
      title: "Countdowns",
      desc: "Automatic countdowns to your next special moments",
      icon: Clock,
      color: "text-primary bg-primary/10 border-primary/20",
      path: "/countdowns"
    },
    {
      id: "time-capsule",
      title: "Time Capsule",
      desc: "Lock memories to open together in the future",
      icon: Lock,
      color: "text-warning bg-warning/10 border-warning/20",
      path: "/time-capsule"
    },
    {
      id: "dream-board",
      title: "Dream Board",
      desc: "Your shared bucket list & future aspirations",
      icon: Compass,
      color: "text-primary bg-primary/10 border-primary/20",
      path: "/dream-board"
    },
    {
      id: "open-when",
      title: "Open When Letters",
      desc: "Digital letters written for special emotional moments",
      icon: Mail,
      color: "text-secondary bg-secondary/10 border-secondary/20",
      path: "/open-when"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="p-6 pt-12 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-text-primary">Features</h1>
          <p className="text-sm text-text-secondary mt-1">Explore all the ways to nurture your connection</p>
        </motion.div>
      </header>

      {/* Feature Grid */}
      <main className="px-6 space-y-3">
        {featureList.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                onClick={() => navigate(item.path)}
                className="bg-surface border-border/50 hover:border-primary/50 transition-all cursor-pointer shadow-sm group hover:scale-[1.01]"
              >
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-text-primary group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </main>
    </div>
  )
}
