import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Send, Lock, History, MessageCircle, Loader2, Sparkles, RefreshCw } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { api } from "@/services/api"
import { ReactionBar } from "@/components/ReactionBar"

export function Question() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState<"today" | "history">("today")
  const [answered, setAnswered] = useState(false)
  const [answer, setAnswer] = useState("")
  const [todayQuestion, setTodayQuestion] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRerolling, setIsRerolling] = useState(false)

  const loadQuestionData = async (showLoading = true) => {
    if (showLoading) setIsLoading(true)
    try {
      const [qRes, hRes] = await Promise.all([
        api.getTodayQuestion().catch(() => null),
        api.getQuestionHistory().catch(() => []),
      ])

      if (qRes) {
        setTodayQuestion(qRes)
        if (qRes.myAnswer) {
          setAnswer(qRes.myAnswer.answerText || "")
          setAnswered(true)
        } else {
          setAnswered(false)
          setAnswer("")
        }
      }

      if (Array.isArray(hRes)) {
        setHistory(hRes)
      }
    } catch (err) {
      console.warn("Using offline empty question state.")
    } finally {
      if (showLoading) setIsLoading(false)
    }
  }

  useEffect(() => {
    loadQuestionData()
  }, [])

  // Auto deep-link scroll to answerId when arriving from notification
  useEffect(() => {
    const targetAnswerId = searchParams.get("answerId")
    if (targetAnswerId && history.length > 0) {
      const inHistory = history.some(
        (h) =>
          String(h.myAnswer?.id) === String(targetAnswerId) ||
          String(h.partnerAnswer?.id) === String(targetAnswerId)
      )
      if (inHistory) {
        setViewMode("history")
      }

      setTimeout(() => {
        const el = document.getElementById(`ans-${targetAnswerId}`)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 400)
    }
  }, [searchParams, history])

  const handleRerollQuestion = async () => {
    if (isRerolling || answered) return
    setIsRerolling(true)
    try {
      const newQ = await api.rerollTodayQuestion(todayQuestion?.id)
      if (newQ) {
        setTodayQuestion((prev: any) => ({
          ...prev,
          id: newQ.id,
          questionText: newQ.questionText,
          category: newQ.category,
          isAiGenerated: newQ.isAiGenerated,
          myAnswer: null,
          partnerAnswer: null,
          isBothAnswered: false
        }))
        setAnswer("")
        setAnswered(false)
      }
    } catch (err: any) {
      alert(err.message || "Failed to reroll question")
    } finally {
      setIsRerolling(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!answer.trim() || !todayQuestion?.id || isSubmitting) return

    setIsSubmitting(true)
    try {
      const res: any = await api.answerQuestion(todayQuestion.id, answer.trim())
      setAnswered(true)
      setTodayQuestion((prev: any) => ({
        ...prev,
        myAnswer: {
          answerText: answer.trim(),
          answeredAt: new Date()
        },
        isBothAnswered: res?.isBothAnswered || false
      }))
    } catch (err: any) {
      alert(err.message || "Failed to submit answer")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="p-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border/40">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2 text-text-secondary hover:text-text-primary">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-text-primary">Question of the Day</h1>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setViewMode(viewMode === "today" ? "history" : "today")}
          className="rounded-full border-border/50 text-xs font-medium"
        >
          {viewMode === "today" ? (
            <>
              <History className="w-3.5 h-3.5 mr-1.5" /> History
            </>
          ) : (
            <>
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Today
            </>
          )}
        </Button>
      </header>

      <main className="flex-1 px-6 flex flex-col pt-4">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-xs text-text-secondary">Loading today's question...</p>
          </div>
        ) : viewMode === "today" ? (
          todayQuestion ? (
            <>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold tracking-wider text-primary uppercase block">
                      Today's Prompt (Day #{todayQuestion.dayNumber})
                    </span>
                    {todayQuestion.isAiGenerated && (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-3 h-3" /> AI Generated
                      </span>
                    )}
                  </div>

                  {!todayQuestion?.myAnswer && !todayQuestion?.isBothAnswered && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRerollQuestion}
                      disabled={isRerolling}
                      className="text-[11px] h-7 px-2.5 rounded-full border-border/60 text-text-secondary hover:text-primary hover:border-primary/40 font-medium"
                      title="Reroll/Ganti Pertanyaan Hari Ini 🎲"
                    >
                      {isRerolling ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <RefreshCw className="w-3 h-3 mr-1" />}
                      Ganti Pertanyaan 🎲
                    </Button>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-text-primary leading-tight">
                  {todayQuestion.questionText}
                </h2>
              </motion.div>

              {!answered ? (
                <motion.form 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  onSubmit={handleSubmit} 
                  className="flex-1 flex flex-col"
                >
                  <textarea 
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Tuliskan jawaban jujur, mendalam, dan penuh makna disini..."
                    className="w-full flex-1 min-h-[180px] p-4 bg-surface border border-border/50 rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary/60 transition-colors resize-y shadow-sm text-sm leading-relaxed whitespace-pre-wrap"
                    required
                  />
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={!answer.trim() || isSubmitting}
                      className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-all shadow-md"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                      Submit My Answer
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <div className="space-y-4 flex-1">
                  {/* My Answer */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} id={todayQuestion.myAnswer?.id ? `ans-${todayQuestion.myAnswer.id}` : undefined}>
                    <Card className="bg-primary/10 border-primary/30 shadow-md">
                      <CardContent className="p-4 space-y-2">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                          Your Answer
                        </span>
                        <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">{todayQuestion.myAnswer?.answerText}</p>
                        
                        {todayQuestion.myAnswer?.id && (
                          <ReactionBar
                            targetId={todayQuestion.myAnswer.id}
                            type="answer"
                            reactions={todayQuestion.myAnswer.reactions}
                            comments={todayQuestion.myAnswer.comments}
                            onUpdate={() => loadQuestionData(false)}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Partner's Answer */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} id={todayQuestion.partnerAnswer?.id ? `ans-${todayQuestion.partnerAnswer.id}` : undefined}>
                    {todayQuestion.partnerAnswer ? (
                      <Card className="bg-secondary/10 border-secondary/30 shadow-md">
                        <CardContent className="p-4 space-y-2">
                          <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                            {todayQuestion.partnerAnswer.partnerName}'s Answer
                          </span>
                          <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">{todayQuestion.partnerAnswer.answerText}</p>

                          {todayQuestion.partnerAnswer?.id && (
                            <ReactionBar
                              targetId={todayQuestion.partnerAnswer.id}
                              type="answer"
                              reactions={todayQuestion.partnerAnswer.reactions}
                              comments={todayQuestion.partnerAnswer.comments}
                              onUpdate={() => loadQuestionData(false)}
                            />
                          )}
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-surfaceVariant/40 border border-dashed border-border/60 p-6 text-center space-y-2 rounded-2xl">
                        <div className="w-10 h-10 rounded-full bg-surfaceVariant flex items-center justify-center text-text-tertiary mx-auto">
                          <Lock className="w-5 h-5" />
                        </div>
                        <h4 className="font-semibold text-sm text-text-primary">Waiting for Partner...</h4>
                        <p className="text-xs text-text-tertiary max-w-xs mx-auto">
                          Your partner hasn't answered today's prompt yet. Once they submit their answer, theirs will be unlocked!
                        </p>
                      </Card>
                    )}
                  </motion.div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <p className="text-xs text-text-tertiary">No prompt available right now.</p>
            </div>
          )
        ) : (
          /* History Mode */
          <div className="space-y-4 pb-8">
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
              Past Questions & Unlocked Answers
            </h3>
            {history.length > 0 ? (
              history.map((item) => (
                <Card key={item.id} className="bg-surface border-border/50 shadow-sm p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                      Answered
                    </span>
                    {item.isAiGenerated && (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-text-primary leading-snug">{item.questionText}</h4>
                  
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {item.myAnswer && (
                      <div id={item.myAnswer.id ? `ans-${item.myAnswer.id}` : undefined} className="bg-primary/5 border border-primary/20 p-2.5 rounded-xl text-xs space-y-1">
                        <span className="font-semibold text-primary block text-[10px] uppercase">You</span>
                        <p className="text-text-primary mt-0.5">{item.myAnswer.answerText}</p>
                        {item.myAnswer.id && (
                          <ReactionBar
                            targetId={item.myAnswer.id}
                            type="answer"
                            reactions={item.myAnswer.reactions}
                            comments={item.myAnswer.comments}
                            onUpdate={() => loadQuestionData(false)}
                          />
                        )}
                      </div>
                    )}
                    {item.partnerAnswer && (
                      <div id={item.partnerAnswer.id ? `ans-${item.partnerAnswer.id}` : undefined} className="bg-secondary/5 border border-secondary/20 p-2.5 rounded-xl text-xs space-y-1">
                        <span className="font-semibold text-secondary block text-[10px] uppercase">{item.partnerAnswer.partnerName}</span>
                        <p className="text-text-primary mt-0.5">{item.partnerAnswer.answerText}</p>
                        {item.partnerAnswer.id && (
                          <ReactionBar
                            targetId={item.partnerAnswer.id}
                            type="answer"
                            reactions={item.partnerAnswer.reactions}
                            comments={item.partnerAnswer.comments}
                            onUpdate={() => loadQuestionData(false)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="bg-surfaceVariant/30 border border-dashed border-border/50 rounded-2xl p-8 text-center text-xs text-text-tertiary">
                No past answered questions history yet.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
