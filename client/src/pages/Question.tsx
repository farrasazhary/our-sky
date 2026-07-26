import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Send, Lock, History, MessageCircle, Loader2, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { api } from "@/services/api"

export function Question() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<"today" | "history">("today")
  const [answered, setAnswered] = useState(false)
  const [answer, setAnswer] = useState("")
  const [todayQuestion, setTodayQuestion] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadQuestionData = async () => {
    setIsLoading(true)
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
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadQuestionData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!answer.trim() || !todayQuestion?.id) return

    setIsSubmitting(true)
    try {
      const res: any = await api.answerQuestion(todayQuestion.id, answer.trim())
      setAnswered(true)
      setTodayQuestion((prev: any) => ({
        ...prev,
        myAnswer: { answerText: answer.trim(), answeredAt: new Date().toISOString() },
        isBothAnswered: res?.isBothAnswered || prev?.isBothAnswered
      }))
      
      const hRes = await api.getQuestionHistory().catch(() => [])
      if (Array.isArray(hRes)) setHistory(hRes)
    } catch (err: any) {
      console.warn("Failed to submit answer:", err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 select-none">
      <header className="p-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border/30">
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
                <span className="text-xs font-semibold tracking-wider text-primary uppercase mb-2 block">
                  Today's Prompt (Day #{todayQuestion.dayNumber})
                </span>
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
                    placeholder="Type your answer here..."
                    className="flex-1 w-full min-h-[160px] bg-surface border border-border/50 rounded-2xl p-4 text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none shadow-sm"
                  />
                  <Button type="submit" disabled={!answer.trim() || isSubmitting} className="mt-4 w-full h-12 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover disabled:opacity-50 transition-all">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                    Lock Answer
                  </Button>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <Card className="bg-primary/10 border-primary/20 shadow-none">
                    <CardContent className="p-4">
                      <span className="text-xs font-medium text-primary mb-1 block">You</span>
                      <p className="text-sm text-text-primary">{answer}</p>
                    </CardContent>
                  </Card>

                  {todayQuestion.partnerAnswer ? (
                    <Card className="bg-secondary/10 border-secondary/20 shadow-none">
                      <CardContent className="p-4">
                        <span className="text-xs font-medium text-secondary mb-1 block">
                          Partner ({todayQuestion.partnerAnswer.partnerName || "Partner"})
                        </span>
                        <p className="text-sm text-text-primary">{todayQuestion.partnerAnswer.answerText}</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-surfaceVariant/50 border-dashed border-border shadow-none flex flex-col items-center justify-center p-8 text-center">
                      <Lock className="w-8 h-8 text-text-disabled mb-3" />
                      <h3 className="text-sm font-medium text-text-secondary">Waiting for Partner</h3>
                      <p className="text-xs text-text-tertiary mt-1">Their answer will be revealed once they submit.</p>
                    </Card>
                  )}
                </motion.div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-text-tertiary" />
              <h3 className="text-base font-semibold text-text-primary">No Question Available</h3>
              <p className="text-xs text-text-secondary max-w-xs">
                Check back later for today's daily question or connect with your partner first.
              </p>
            </div>
          )
        ) : (
          /* Question History View */
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">Past Answers</h3>
            
            {history.length > 0 ? (
              history.map((item: any) => (
                <Card key={item.id || item.questionId} className="bg-surface border-border/50 shadow-sm">
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-semibold text-sm text-text-primary">{item.questionText}</h4>
                    
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/30 text-xs">
                      <div className="bg-surfaceVariant/40 p-2.5 rounded-xl">
                        <span className="text-[10px] font-semibold text-primary block mb-0.5">You</span>
                        <p className="text-text-secondary font-medium">
                          {item.myAnswer?.answerText ? item.myAnswer.answerText : "Not answered"}
                        </p>
                      </div>
                      <div className="bg-surfaceVariant/40 p-2.5 rounded-xl">
                        <span className="text-[10px] font-semibold text-secondary block mb-0.5">
                          {item.partnerAnswer?.partnerName || "Partner"}
                        </span>
                        <p className="text-text-secondary font-medium">
                          {item.partnerAnswer?.answerText ? item.partnerAnswer.answerText : "Not answered"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="bg-surfaceVariant/30 border border-dashed border-border/50 rounded-2xl p-8 text-center text-xs text-text-tertiary">
                No past questions answered yet.
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  )
}
