import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  ChevronLeft, 
  Dices, 
  SkipForward, 
  Heart, 
  History, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Loader2, 
  Send 
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { api } from "@/services/api"

const LOCAL_DATE_IDEAS = [
  { title: "Cook a completely new recipe together", category: "Food & Drink", duration: "2 Hours" },
  { title: "Go for a walk in a park you've never visited", category: "Outdoor", duration: "1 Hour" },
  { title: "Build a blanket fort and watch a movie", category: "Cozy Home", duration: "3 Hours" },
  { title: "Take a pottery or art class", category: "Creative", duration: "2 Hours" },
  { title: "Have a picnic in the living room", category: "Cozy Home", duration: "1.5 Hours" },
  { title: "Go stargazing on a clear night", category: "Outdoor", duration: "2 Hours" },
  { title: "Bake chocolate chip cookies from scratch", category: "Cozy Home", duration: "1 Hour" }
]

export function RandomDate() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<"roll" | "history">("roll")
  const [ideaIndex, setIdeaIndex] = useState(0)
  const [currentIdea, setCurrentIdea] = useState(LOCAL_DATE_IDEAS[0])
  const [activeProposal, setActiveProposal] = useState<any | null>(null)
  const [history, setHistory] = useState<any[]>([])
  
  const [isLoading, setIsLoading] = useState(true)
  const [isRolling, setIsRolling] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [skippedCount, setSkippedCount] = useState(0)

  const fetchStatus = async () => {
    setIsLoading(true)
    try {
      const res = await api.getRandomDateStatus()
      if (res) {
        setActiveProposal(res.activeProposal || null)
        if (Array.isArray(res.completedHistory)) {
          setHistory(res.completedHistory)
        }
      }
    } catch (err) {
      console.warn("Using offline random date status.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  const handleRoll = async () => {
    setIsRolling(true)
    try {
      const res = await api.rollRandomDate()
      if (res?.title) {
        setCurrentIdea({
          title: res.title,
          category: res.category || "Date Idea",
          duration: res.duration || "1-2 Hours",
        })
      } else {
        const nextIdx = (ideaIndex + 1) % LOCAL_DATE_IDEAS.length
        setIdeaIndex(nextIdx)
        setCurrentIdea(LOCAL_DATE_IDEAS[nextIdx])
      }
    } catch (err) {
      const nextIdx = (ideaIndex + 1) % LOCAL_DATE_IDEAS.length
      setIdeaIndex(nextIdx)
      setCurrentIdea(LOCAL_DATE_IDEAS[nextIdx])
    } finally {
      setIsRolling(false)
      setSkippedCount((prev) => prev + 1)
    }
  }

  const handlePropose = async () => {
    setIsSubmitting(true)
    try {
      const res: any = await api.proposeRandomDate({
        title: currentIdea.title,
        category: currentIdea.category,
        duration: currentIdea.duration,
      })
      if (res) {
        setActiveProposal({
          id: res.id,
          title: currentIdea.title,
          category: currentIdea.category,
          duration: currentIdea.duration,
          isProposedByMe: true,
        })
      }
    } catch (err) {
      console.warn("Proposing date locally.")
      setActiveProposal({
        id: Date.now().toString(),
        title: currentIdea.title,
        category: currentIdea.category,
        duration: currentIdea.duration,
        isProposedByMe: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApprove = async () => {
    if (!activeProposal?.id) return
    setIsSubmitting(true)
    try {
      await api.approveRandomDate(activeProposal.id)
      setActiveProposal(null)
      fetchStatus()
    } catch (err) {
      console.warn("Approving proposal locally.")
      setActiveProposal(null)
      fetchStatus()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDecline = async () => {
    if (!activeProposal?.id) return
    setIsSubmitting(true)
    try {
      await api.declineRandomDate(activeProposal.id)
      setActiveProposal(null)
    } catch (err) {
      console.warn("Declining proposal locally.")
      setActiveProposal(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <header className="p-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2 text-text-secondary hover:text-text-primary">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-text-primary">Random Date</h1>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setViewMode(viewMode === "roll" ? "history" : "roll")}
          className="rounded-full border-border/50 text-xs font-medium"
        >
          {viewMode === "roll" ? (
            <>
              <History className="w-3.5 h-3.5 mr-1.5" /> Completed ({history.length})
            </>
          ) : (
            <>
              <Dices className="w-3.5 h-3.5 mr-1.5" /> Spinner
            </>
          )}
        </Button>
      </header>

      <main className="flex-1 px-6 flex flex-col justify-center max-w-md mx-auto w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-xs text-text-secondary">Checking date status...</p>
          </div>
        ) : viewMode === "roll" ? (
          <div className="space-y-6 text-center">
            {/* SCENARIO A: Waiting for partner approval */}
            {activeProposal?.isProposedByMe && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="bg-primary/10 border-primary/30 p-6 space-y-4 shadow-lg text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                    Proposal Sent
                  </span>
                  <h2 className="text-xl font-extrabold text-text-primary">
                    "{activeProposal.title}"
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Waiting for your partner to accept. Both of you must agree before this date is logged into your constellation!
                  </p>
                  <Button 
                    onClick={handleDecline} 
                    disabled={isSubmitting} 
                    variant="ghost" 
                    className="text-error hover:bg-error/10 text-xs rounded-xl"
                  >
                    Cancel Proposal
                  </Button>
                </Card>
              </motion.div>
            )}

            {/* SCENARIO B: Partner proposed a date to me (Approval Required!) */}
            {activeProposal && !activeProposal.isProposedByMe && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="bg-secondary/10 border-secondary/30 p-6 space-y-4 shadow-xl text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mx-auto">
                    <Heart className="w-6 h-6 fill-secondary" />
                  </div>
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                    Partner Proposed a Date!
                  </span>
                  <h2 className="text-xl font-extrabold text-text-primary">
                    "{activeProposal.title}"
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Your partner wants to do this activity together. Do you agree?
                  </p>

                  <div className="flex gap-3 pt-2">
                    <Button 
                      onClick={handleDecline} 
                      disabled={isSubmitting} 
                      variant="outline" 
                      className="flex-1 h-12 rounded-2xl border-error/50 text-error hover:bg-error/10 text-xs font-semibold"
                    >
                      <XCircle className="w-4 h-4 mr-1.5" /> Decline
                    </Button>
                    <Button 
                      onClick={handleApprove} 
                      disabled={isSubmitting} 
                      className="flex-1 h-12 rounded-2xl bg-secondary hover:bg-secondary-hover text-white text-xs font-semibold shadow-md"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <CheckCircle2 className="w-4 h-4 mr-1.5" />}
                      Agree & Accept ❤️
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* SCENARIO C: No active proposal -> Roll & Propose */}
            {!activeProposal && (
              <>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider bg-surfaceVariant/50 px-3 py-1 rounded-full border border-border/40">
                    {skippedCount} Ideas Explored
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={currentIdea.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <Card className="bg-surface border-border/50 shadow-xl overflow-hidden p-6 space-y-4">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full inline-block">
                        {currentIdea.category}
                      </span>
                      <h2 className="text-2xl font-extrabold text-text-primary leading-snug">
                        "{currentIdea.title}"
                      </h2>
                      <p className="text-xs text-text-tertiary">Estimated Duration: {currentIdea.duration}</p>
                    </Card>
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-3">
                  <Button onClick={handleRoll} disabled={isRolling || isSubmitting} variant="outline" className="flex-1 h-12 rounded-2xl border-border/60 text-xs">
                    {isRolling ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <SkipForward className="w-4 h-4 mr-2" />}
                    Skip Idea
                  </Button>
                  <Button onClick={handlePropose} disabled={isSubmitting} className="flex-1 h-12 rounded-2xl bg-secondary text-white text-xs font-semibold shadow-md">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                    Propose Date 💌
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* History View */
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
              Mutually Agreed Completed Dates
            </h3>
            {history.length > 0 ? (
              history.map((item) => (
                <Card key={item.id} className="bg-surface border-border/50 shadow-sm p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-text-primary">{item.title}</h4>
                    <span className="text-[10px] text-text-tertiary">{item.category} • {item.date}</span>
                  </div>
                  <div className="flex items-center text-success text-xs font-bold gap-1 bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
                    <CheckCircle2 className="w-4 h-4" /> Agreed
                  </div>
                </Card>
              ))
            ) : (
              <div className="bg-surfaceVariant/30 border border-dashed border-border/50 rounded-2xl p-8 text-center text-xs text-text-tertiary">
                No mutually agreed dates completed yet. Propose a date to your partner to start!
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
