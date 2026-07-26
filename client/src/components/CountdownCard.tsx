import { Card, CardContent } from "@/components/ui/card"
import { Clock, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface CountdownCardProps {
  title: string
  date: string
  daysLeft: number
  category?: string
}

export function CountdownCard({ title, date, daysLeft, category = "Anniversary" }: CountdownCardProps) {
  const navigate = useNavigate()

  return (
    <Card 
      onClick={() => navigate('/countdowns')}
      className="bg-gradient-to-r from-primary/20 via-surface to-surface border border-primary/30 hover:border-primary/60 transition-all cursor-pointer shadow-sm overflow-hidden"
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex flex-col items-center justify-center shrink-0 text-primary border border-primary/30">
            <Clock className="w-5 h-5 mb-0.5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                {category}
              </span>
              <span className="text-xs text-text-tertiary">{date}</span>
            </div>
            <h3 className="font-semibold text-sm text-text-primary mt-1">{title}</h3>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-xl font-extrabold text-primary block leading-none">{daysLeft}</span>
            <span className="text-[10px] text-text-tertiary font-medium uppercase">Days Left</span>
          </div>
          <ChevronRight className="w-4 h-4 text-text-tertiary" />
        </div>
      </CardContent>
    </Card>
  )
}
