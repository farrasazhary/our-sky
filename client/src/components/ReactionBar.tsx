import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, Loader2 } from "lucide-react"
import { api } from "@/services/api"

interface Reaction {
  id: string
  userId: string
  emoji: string
}

interface Comment {
  id: string
  userId: string
  userName?: string
  text: string
  createdAt: string
}

interface ReactionBarProps {
  targetId: string | number
  type: "answer" | "memory"
  reactions?: Reaction[]
  comments?: Comment[]
  currentUserId?: string
  onUpdate?: () => void
}

const EMOJI_OPTIONS = [
  { key: "LOVE", label: "❤️" },
  { key: "AMAZED", label: "😍" },
  { key: "TOUCHED", label: "🥺" },
  { key: "FUNNY", label: "😂" },
  { key: "FIRE", label: "🔥" },
  { key: "KISS", label: "💋" },
]

export function ReactionBar({
  targetId,
  type,
  reactions = [],
  comments = [],
  currentUserId,
  onUpdate,
}: ReactionBarProps) {
  const [localReactions, setLocalReactions] = useState<Reaction[]>(reactions)
  const [localComments, setLocalComments] = useState<Comment[]>(comments)
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isReacting, setIsReacting] = useState(false)

  // Find user's active reaction
  const myReaction = localReactions.find((r) => r.userId === currentUserId)

  const handleToggleEmoji = async (emojiKey: string) => {
    if (isReacting) return
    setIsReacting(true)

    const isSameEmoji = myReaction?.emoji === emojiKey

    // Optimistic UI update
    if (isSameEmoji) {
      setLocalReactions((prev) => prev.filter((r) => r.userId !== currentUserId))
    } else {
      setLocalReactions((prev) => [
        ...prev.filter((r) => r.userId !== currentUserId),
        { id: "temp-" + Date.now(), userId: currentUserId || "me", emoji: emojiKey },
      ])
    }

    try {
      const idStr = String(targetId)
      if (isSameEmoji) {
        if (type === "answer") {
          await api.removeAnswerReaction(idStr)
        } else {
          await api.removeMemoryReaction(idStr)
        }
      } else {
        if (type === "answer") {
          await api.reactToAnswer(idStr, emojiKey)
        } else {
          await api.reactToMemory(idStr, emojiKey)
        }
      }
      onUpdate?.()
    } catch (err) {
      console.warn("Failed to toggle reaction:", err)
      // Rollback optimistic update
      setLocalReactions(reactions)
    } finally {
      setIsReacting(false)
    }
  }

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim() || isSubmittingComment) return

    const textToSend = commentText.trim()
    const idStr = String(targetId)
    setIsSubmittingComment(true)

    try {
      let newComment: any
      if (type === "answer") {
        newComment = await api.commentOnAnswer(idStr, textToSend)
      } else {
        newComment = await api.commentOnMemory(idStr, textToSend)
      }

      setLocalComments((prev) => [
        ...prev,
        {
          id: newComment?.id || "temp-" + Date.now(),
          userId: currentUserId || "me",
          userName: newComment?.userName || "Saya",
          text: textToSend,
          createdAt: new Date().toISOString(),
        },
      ])

      setCommentText("")
      onUpdate?.()
    } catch (err: any) {
      alert(err.message || "Gagal mengirim komentar.")
    } finally {
      setIsSubmittingComment(false)
    }
  }

  // Count grouped reactions
  const reactionCounts = EMOJI_OPTIONS.map((opt) => {
    const count = localReactions.filter((r) => r.emoji === opt.key).length
    return { ...opt, count }
  })

  return (
    <div className="pt-2 border-t border-border/40 space-y-2">
      {/* Emoji Bar & Comment Button Toggle */}
      <div className="flex items-center justify-between gap-1 flex-wrap">
        <div className="flex items-center gap-1 bg-surfaceVariant/50 p-1 rounded-full border border-border/30">
          {reactionCounts.map((opt) => {
            const isSelected = myReaction?.emoji === opt.key
            return (
              <motion.button
                key={opt.key}
                whileTap={{ scale: 0.85 }}
                onClick={() => handleToggleEmoji(opt.key)}
                className={`relative px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                  isSelected
                    ? "bg-primary/20 border border-primary/50 text-primary scale-105 shadow-xs"
                    : "hover:bg-surfaceVariant text-text-secondary"
                }`}
                title={opt.key}
              >
                <span className="text-base">{opt.label}</span>
                {opt.count > 0 && (
                  <span className="text-[10px] font-bold text-text-primary">
                    {opt.count}
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>

        <button
          onClick={() => setIsCommentOpen((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            isCommentOpen || localComments.length > 0
              ? "bg-secondary/15 border-secondary/40 text-secondary"
              : "bg-surfaceVariant/40 border-border/40 text-text-tertiary hover:text-text-primary"
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{localComments.length > 0 ? localComments.length : "Komen"}</span>
        </button>
      </div>

      {/* Collapsible Mini Comment Section */}
      <AnimatePresence>
        {isCommentOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden space-y-2 pt-1"
          >
            {/* Comments List */}
            {localComments.length > 0 && (
              <div className="space-y-1.5 max-h-36 overflow-y-auto no-scrollbar pr-1">
                {localComments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-surfaceVariant/60 border border-border/30 p-2 rounded-xl text-xs space-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary text-[10px]">
                        {c.userName || "Pasangan"}
                      </span>
                      <span className="text-[9px] text-text-tertiary">
                        {new Date(c.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-text-primary whitespace-pre-wrap leading-tight">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleSendComment} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value.slice(0, 200))}
                  placeholder="Tulis komentar manis... (max 200 huruf)"
                  className="w-full h-8 px-3 pr-10 text-xs bg-surface border border-border/50 rounded-full text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary/60"
                  maxLength={200}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-text-tertiary">
                  {commentText.length}/200
                </span>
              </div>
              <button
                type="submit"
                disabled={!commentText.trim() || isSubmittingComment}
                className="w-8 h-8 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center disabled:opacity-40 transition-all shrink-0"
              >
                {isSubmittingComment ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
