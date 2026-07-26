import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  ChevronLeft, 
  CheckCheck, 
  Loader2, 
  Camera, 
  MessageCircle, 
  Mail, 
  Lock, 
  Sparkles,
  Dices,
  ExternalLink
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { api } from "@/services/api"

interface NotificationItem {
  id: string
  title: string
  message: string
  type: string
  targetUrl?: string
  isRead: boolean
  createdAt: string
}

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return "Just now"

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHours = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSec < 60) return "Just now"
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function getTypeIcon(type: string) {
  switch (type.toUpperCase()) {
    case "MEMORY":
    case "MEMORY_CREATED":
      return <Camera className="w-4 h-4 text-primary" />
    case "QUESTION":
      return <MessageCircle className="w-4 h-4 text-secondary" />
    case "OPEN_WHEN":
      return <Mail className="w-4 h-4 text-rose-400" />
    case "TIME_CAPSULE":
      return <Lock className="w-4 h-4 text-teal-400" />
    case "RELATIONSHIP":
      return <Sparkles className="w-4 h-4 text-amber-400" />
    case "RANDOM_DATE":
      return <Dices className="w-4 h-4 text-amber-400" />
    default:
      return <Bell className="w-4 h-4 text-primary" />
  }
}

export function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [filter, setFilter] = useState<"all" | "unread">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isMarkingAll, setIsMarkingAll] = useState(false)

  const fetchNotifications = async () => {
    setIsLoading(true)
    try {
      const res = await api.getNotifications()
      if (Array.isArray(res)) {
        setNotifications(res)
      }
    } catch (err) {
      console.warn("Failed to fetch notifications.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const handleMarkRead = async (id: string) => {
    try {
      await api.markNotificationRead(id)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
    } catch (err) {
      console.warn("Failed to mark notification as read:", err)
    }
  }

  const handleMarkAllRead = async () => {
    setIsMarkingAll(true)
    try {
      await api.markAllNotificationsRead()
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    } catch (err) {
      console.warn("Failed to mark all as read:", err)
    } finally {
      setIsMarkingAll(false)
    }
  }

  const handleNotificationClick = async (n: NotificationItem) => {
    if (!n.isRead) {
      handleMarkRead(n.id)
    }

    const target = n.targetUrl || (
      n.type === "HEARTBEAT" ? "/dashboard" :
      n.type === "QUESTION" ? "/question" :
      n.type === "MEMORY" || n.type === "MEMORY_CREATED" ? "/memory" :
      n.type === "RANDOM_DATE" ? "/random-date" :
      n.type === "DREAM" || n.type === "DREAM_COMPLETED" ? "/dream-board" :
      n.type === "TIME_CAPSULE" ? "/time-capsule" :
      n.type === "OPEN_WHEN" ? "/open-when" : "/dashboard"
    )

    navigate(target)
  }

  const unreadCount = notifications.filter(n => !n.isRead).length
  const filteredList = notifications.filter(n => filter === "unread" ? !n.isRead : true)

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 select-none">
      {/* Header */}
      <header className="p-6 pt-12 pb-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border/30">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2 text-text-secondary hover:text-text-primary">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-primary/20 text-primary border border-primary/30 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {unreadCount} new
                </span>
              )}
            </h1>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleMarkAllRead}
            disabled={isMarkingAll}
            className="text-xs text-primary hover:bg-primary/10 rounded-full font-medium"
          >
            {isMarkingAll ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <CheckCheck className="w-3.5 h-3.5 mr-1" />}
            Mark all read
          </Button>
        )}
      </header>

      <div className="px-6 py-4 space-y-4 flex-1">
        {/* Filter Chips */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === "all"
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-surface border-border/50 text-text-secondary hover:text-text-primary"
            }`}
          >
            All ({notifications.length})
          </button>

          <button
            onClick={() => setFilter("unread")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === "unread"
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-surface border-border/50 text-text-secondary hover:text-text-primary"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-xs text-text-secondary">Loading notifications...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-16 px-4 space-y-3 max-w-xs mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto">
              <Bell className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="text-base font-semibold text-text-primary">All Caught Up!</h3>
            <p className="text-xs text-text-tertiary leading-relaxed">
              {filter === "unread" ? "You have no unread notifications right now." : "No activity notifications yet. When your partner updates photos or answers questions, notifications will appear here!"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredList.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => handleNotificationClick(n)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  n.isRead
                    ? "bg-surface/50 border-border/40 opacity-75 hover:opacity-100"
                    : "bg-surface border-primary/40 shadow-sm ring-1 ring-primary/20 hover:border-primary/70"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Icon Avatar */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
                    n.isRead ? "bg-surfaceVariant/40 border-border/40" : "bg-primary/15 border-primary/30"
                  }`}>
                    {getTypeIcon(n.type)}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-xs font-bold truncate flex items-center gap-1.5 ${n.isRead ? "text-text-secondary" : "text-text-primary"}`}>
                        {n.title}
                        <ExternalLink className="w-3 h-3 text-text-tertiary group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                      </h4>
                      <span className="text-[10px] text-text-tertiary flex-shrink-0 font-medium">
                        {getRelativeTime(n.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary mt-1 leading-relaxed line-clamp-2">
                      {n.message}
                    </p>
                  </div>

                  {/* Unread Glow Dot */}
                  {!n.isRead && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse flex-shrink-0 mt-1 shadow-sm shadow-primary" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
