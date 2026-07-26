import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Plus, Mail, Lock, Loader2, MailOpen, Eye, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { WriteLetterModal } from "@/components/modals/WriteLetterModal"
import { ReadLetterModal } from "@/components/modals/ReadLetterModal"
import { api } from "@/services/api"

export function OpenWhen() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLetter, setSelectedLetter] = useState<any | null>(null)
  const [letters, setLetters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"for_me" | "from_me">("for_me")

  const fetchLetters = async () => {
    setIsLoading(true)
    try {
      const res = await api.getOpenWhens()
      if (Array.isArray(res)) {
        setLetters(res)
      }
    } catch (err) {
      console.warn("Using offline empty Open When state.")
      setLetters([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLetters()
  }, [])

  const handleOpenLetter = async (item: any) => {
    try {
      const res: any = await api.openOpenWhen(item.id)
      if (res && (res.message || res.title)) {
        setSelectedLetter(res)
      } else {
        setSelectedLetter(item)
      }
      fetchLetters()
    } catch (err) {
      console.warn("Opening letter locally.")
      setSelectedLetter(item)
    }
  }

  const forMeLetters = letters.filter(l => !l.isMine)
  const fromMeLetters = letters.filter(l => l.isMine)

  const currentTabLetters = activeTab === "for_me" ? forMeLetters : fromMeLetters

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <header className="p-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2 text-text-secondary hover:text-text-primary">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-text-primary">Open When...</h1>
        </div>

        <Button onClick={() => setIsModalOpen(true)} size="sm" className="rounded-full bg-primary text-white text-xs font-semibold">
          <Plus className="w-4 h-4 mr-1" /> Write Letter
        </Button>
      </header>

      <main className="px-6 space-y-4 flex-1">
        <p className="text-sm text-text-secondary">Personalized digital letters sealed until specific moments.</p>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-surfaceVariant/40 rounded-xl border border-border/40 text-xs font-medium">
          <button
            onClick={() => setActiveTab("for_me")}
            className={`py-2 rounded-lg transition-all text-center ${
              activeTab === "for_me"
                ? "bg-surface text-text-primary shadow-sm font-semibold"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            For Me ({forMeLetters.length})
          </button>
          <button
            onClick={() => setActiveTab("from_me")}
            className={`py-2 rounded-lg transition-all text-center ${
              activeTab === "from_me"
                ? "bg-surface text-text-primary shadow-sm font-semibold"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            From Me ({fromMeLetters.length})
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-xs text-text-secondary">Retrieving letters...</p>
          </div>
        ) : currentTabLetters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
            <Mail className="w-10 h-10 text-text-tertiary" />
            <h3 className="text-base font-semibold text-text-primary">
              {activeTab === "for_me" ? "No Letters For You Yet" : "You Haven't Written Any Letters"}
            </h3>
            <p className="text-xs text-text-secondary max-w-xs">
              {activeTab === "for_me"
                ? "Letters written by your partner will appear here sealed until you decide to open them."
                : "Write a letter for your partner to open when they miss you, feel stressed, or celebrate a win."}
            </p>
            {activeTab === "from_me" && (
              <Button onClick={() => setIsModalOpen(true)} size="sm" className="bg-primary text-white text-xs rounded-full">
                Write First Letter
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {currentTabLetters.map((item: any, index: number) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  onClick={() => handleOpenLetter(item)}
                  className="bg-surface border-border/50 hover:border-secondary/50 cursor-pointer transition-all shadow-sm group p-4 flex flex-col justify-between h-36 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-2xl">
                      {item.category === "SAD" ? "🥺" : item.category === "HAPPY" ? "🎉" : item.category === "MOTIVATION" ? "💪" : item.category === "ANNIVERSARY" ? "❤️" : "💌"}
                    </span>
                    {activeTab === "from_me" ? (
                      item.isOpened ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-full">
                          <Eye className="w-3 h-3" /> Preview
                        </div>
                      )
                    ) : item.isOpened ? (
                      <MailOpen className="w-4 h-4 text-secondary" />
                    ) : (
                      <Lock className="w-4 h-4 text-text-tertiary group-hover:text-secondary transition-colors" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">
                      Open When...
                    </span>
                    <h4 className="font-bold text-sm text-text-primary mt-0.5 line-clamp-2">{item.title}</h4>
                    <span className="text-[10px] text-text-disabled block mt-1">
                      {activeTab === "from_me"
                        ? item.isOpened ? "Opened by partner" : "Sealed for partner"
                        : item.isOpened ? "Opened" : "Sealed"}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <WriteLetterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchLetters} 
      />

      <ReadLetterModal 
        isOpen={!!selectedLetter}
        onClose={() => setSelectedLetter(null)}
        letter={selectedLetter}
      />
    </div>
  )
}
