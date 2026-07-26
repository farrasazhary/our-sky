import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Sparkles, 
  MessageCircleHeart, 
  BookImage, 
  Dices, 
  Calendar, 
  Lock, 
  Compass, 
  Mail,
  ChevronRight,
  UserPlus,
  KeyRound,
  Heart,
  ShieldCheck,
  Stars
} from "lucide-react"
import { NotificationBell } from "@/components/NotificationBell"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { CountdownCard } from "@/components/CountdownCard"
import { InvitePartnerModal } from "@/components/modals/InvitePartnerModal"
import { EnterCodeModal } from "@/components/modals/EnterCodeModal"
import { ConnectedSuccessModal } from "@/components/modals/ConnectedSuccessModal"
import { FloatingHeartBurst } from "@/components/FloatingHeartBurst"
import { api } from "@/services/api"

export function Dashboard() {
  const navigate = useNavigate()
  const { user, relationship } = useAuth()
  
  // Connection State
  const [isConnected, setIsConnected] = useState(false)
  const [partnerName, setPartnerName] = useState("Partner")
  const [daysTogether, setDaysTogether] = useState<number>(1)

  // Real-time Summary Data States
  const [upcomingCountdown, setUpcomingCountdown] = useState<any | null>(null)
  const [starsCount, setStarsCount] = useState<number>(0)
  const [timeCapsulesCount, setTimeCapsulesCount] = useState<number>(0)
  const [dreamsCount, setDreamsCount] = useState<number>(0)
  const [openWhensCount, setOpenWhensCount] = useState<number>(0)
  const [unreadNotifCount, setUnreadNotifCount] = useState<number>(0)

  // Heartbeat Pulse states
  const [isHeartBurstActive, setIsHeartBurstActive] = useState(false)
  const [heartbeatStats, setHeartbeatStats] = useState<{ totalCount: number; latest: any | null }>({ totalCount: 0, latest: null })
  const [isSendingHeartbeat, setIsSendingHeartbeat] = useState(false)

  // Modals state
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isEnterCodeOpen, setIsEnterCodeOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const handleSendHeartbeat = async () => {
    if (isSendingHeartbeat) return
    setIsSendingHeartbeat(true)
    setIsHeartBurstActive(true)
    
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate([2000])
      } catch (e) {}
    }

    try {
      const res = await api.sendHeartbeat("Aku lagi kangen banget sama kamu! 💓")
      if (res) {
        setHeartbeatStats(prev => ({ ...prev, totalCount: res.totalCount }))
      }
    } catch (err) {
      console.warn("Failed to send heartbeat:", err)
    } finally {
      setIsSendingHeartbeat(false)
    }
  }

  useEffect(() => {
    const handleIncomingHeartbeat = () => {
      setIsHeartBurstActive(true)
      api.getHeartbeatStats().then(res => {
        if (res) setHeartbeatStats(res)
      }).catch(() => null)
    }
    window.addEventListener("oursky_heartbeat_received", handleIncomingHeartbeat)
    return () => window.removeEventListener("oursky_heartbeat_received", handleIncomingHeartbeat)
  }, [])

  // Fetch real relationship status and summary stats from backend on mount
  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [relRes, cdRes, starRes, tcRes, drRes, owRes, notifRes, hbRes] = await Promise.all([
          api.getRelationshipStatus().catch(() => null),
          api.getCountdowns().catch(() => []),
          api.getConstellationStars().catch(() => []),
          api.getTimeCapsules().catch(() => []),
          api.getDreams().catch(() => []),
          api.getOpenWhens().catch(() => []),
          api.getNotifications().catch(() => []),
          api.getHeartbeatStats().catch(() => null),
        ])

        if (hbRes) {
          setHeartbeatStats(hbRes)
        }

        if (Array.isArray(notifRes)) {
          const unread = notifRes.filter((n: any) => !n.isRead).length
          setUnreadNotifCount(unread)
        }

        if (relRes?.isConnected) {
          setIsConnected(true)
          if (relRes.relationship?.partner?.fullName) {
            setPartnerName(relRes.relationship.partner.fullName)
          }
          if (relRes.relationship?.startedAt) {
            const diffTime = Math.abs(Date.now() - new Date(relRes.relationship.startedAt).getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            setDaysTogether(diffDays || 1)
          }
        }

        if (Array.isArray(cdRes) && cdRes.length > 0) {
          setUpcomingCountdown(cdRes[0])
        }

        if (Array.isArray(starRes)) {
          setStarsCount(starRes.length)
        }

        if (Array.isArray(tcRes)) {
          setTimeCapsulesCount(tcRes.length)
        }

        if (Array.isArray(drRes)) {
          setDreamsCount(drRes.length)
        }

        if (Array.isArray(owRes)) {
          setOpenWhensCount(owRes.length)
        }
      } catch (err) {
        console.warn("Unable to fetch dashboard stats from server.")
      }
    }

    loadDashboardData()
  }, [])

  const handleConnectSuccess = async (code: string) => {
    try {
      const res: any = await api.acceptInvitation(code)
      if (res?.partner?.fullName) {
        setPartnerName(res.partner.fullName)
      }
    } catch (err) {
      console.warn("Invitation acceptance error.")
    }
    setIsSuccessOpen(true)
  }

  const handleFinishSuccessModal = () => {
    setIsSuccessOpen(false)
    setIsConnected(true)
  }

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background">
      {/* Header Greeting */}
      <header className="p-6 pt-12 pb-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/40 shadow-sm flex-shrink-0">
                <img src="/OurSkyNewIcon.jpeg" alt="OurSky Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary tracking-tight">OurSky</h1>
            </div>
            <p className="text-sm text-text-secondary mt-0.5">
              {isConnected ? `Day ${daysTogether} with ${partnerName}` : "Not Connected"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Bell Notification Button */}
            <NotificationBell initialCount={unreadNotifCount} />

            {/* Profile Avatar Stack */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/profile")} title="View Profile">
            {isConnected ? (
              <div className="flex -space-x-3">
                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-surface flex items-center justify-center font-bold text-primary shadow-sm overflow-hidden relative">
                  {user?.profilePicture && (user.profilePicture.startsWith("/") || user.profilePicture.startsWith("http")) ? (
                    <img 
                      src={user.profilePicture} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none"
                      }}
                    />
                  ) : (
                    user?.profilePicture || (user?.fullName ? user.fullName[0].toUpperCase() : "U")
                  )}
                </div>

                {/* Partner Avatar */}
                <div className="w-10 h-10 rounded-full bg-secondary/20 border-2 border-surface flex items-center justify-center font-bold text-secondary shadow-sm overflow-hidden relative">
                  {relationship?.partner?.profilePicture && (relationship.partner.profilePicture.startsWith("/") || relationship.partner.profilePicture.startsWith("http")) ? (
                    <img 
                      src={relationship.partner.profilePicture} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none"
                      }}
                    />
                  ) : (
                    relationship?.partner?.profilePicture || (partnerName ? partnerName[0].toUpperCase() : "P")
                  )}
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-surface flex items-center justify-center font-bold text-primary shadow-sm overflow-hidden relative">
                {user?.profilePicture && (user.profilePicture.startsWith("/") || user.profilePicture.startsWith("http")) ? (
                  <img 
                    src={user.profilePicture} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none"
                    }}
                  />
                ) : (
                  user?.profilePicture || (user?.fullName ? user.fullName[0].toUpperCase() : "U")
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
      </header>

      {/* ========================================================================= */}
      {/* SCENARIO 1: NOT CONNECTED DASHBOARD (EMPTY STATE)                         */}
      {/* ========================================================================= */}
      {!isConnected ? (
        <main className="px-6 py-6 flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            {/* Floating Heart Illustration */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary/20 via-primary/10 to-transparent border border-secondary/30 flex items-center justify-center mx-auto text-secondary shadow-[0_0_35px_rgba(244,162,97,0.2)]">
              <Heart className="w-12 h-12 fill-secondary/20" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-text-primary">Welcome to OurSky</h2>
              <p className="text-sm text-text-secondary leading-relaxed px-4">
                You haven't connected with your partner yet. Start by inviting them to create your private digital space.
              </p>
            </div>
          </motion.div>

          {/* Action Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-surface border border-border/50 rounded-3xl p-6 space-y-5 shadow-lg"
          >
            {/* Primary Action: Invite Partner */}
            <div className="space-y-2">
              <Button 
                onClick={() => setIsInviteOpen(true)}
                className="w-full h-14 rounded-2xl bg-secondary text-white font-semibold hover:bg-secondary-hover shadow-lg shadow-secondary/20 text-base"
              >
                <UserPlus className="w-5 h-5 mr-2.5" />
                Invite Partner
              </Button>
              <p className="text-[11px] text-center text-text-tertiary">
                Generates a shareable code & link for your partner
              </p>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-border/40 w-full" />
              <span className="bg-surface px-3 text-[10px] font-bold text-text-tertiary uppercase tracking-widest absolute">
                OR
              </span>
            </div>

            {/* Secondary Action: Enter Invitation Code */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-text-secondary text-center">Already have an invitation code?</p>
              <Button 
                onClick={() => setIsEnterCodeOpen(true)}
                variant="outline"
                className="w-full h-13 rounded-2xl bg-surfaceVariant/40 border-border/60 text-text-primary font-medium hover:border-primary/50 hover:bg-primary/5 text-sm"
              >
                <KeyRound className="w-4 h-4 mr-2 text-primary" />
                Enter Invitation Code
              </Button>
            </div>
          </motion.div>

          {/* Value Props / Features Preview List */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="bg-surfaceVariant/20 border border-border/30 rounded-2xl p-4 space-y-3"
          >
            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block text-center">
              What awaits you after connecting
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary">
              <div className="flex items-center gap-2 bg-surface/50 p-2 rounded-xl border border-border/30">
                <Stars className="w-4 h-4 text-primary shrink-0" />
                <span>Star Constellation</span>
              </div>
              <div className="flex items-center gap-2 bg-surface/50 p-2 rounded-xl border border-border/30">
                <MessageCircleHeart className="w-4 h-4 text-secondary shrink-0" />
                <span>Daily Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-surface/50 p-2 rounded-xl border border-border/30">
                <BookImage className="w-4 h-4 text-info shrink-0" />
                <span>Little Memory</span>
              </div>
              <div className="flex items-center gap-2 bg-surface/50 p-2 rounded-xl border border-border/30">
                <Lock className="w-4 h-4 text-warning shrink-0" />
                <span>Time Capsules</span>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-center gap-1 text-[10px] text-text-tertiary">
              <ShieldCheck className="w-3.5 h-3.5 text-success" /> Private & End-to-End Encrypted Space
            </div>
          </motion.div>
        </main>
      ) : (
        /* ========================================================================= */
        /* SCENARIO 2: CONNECTED DASHBOARD                                           */
        /* ========================================================================= */
        <main className="space-y-4">
          {/* Floating Particle Overlay when sending or receiving heartbeat */}
          <FloatingHeartBurst isActive={isHeartBurstActive} onComplete={() => setIsHeartBurstActive(false)} />

          {/* Interactive Instant Heartbeat Pulse Widget */}
          <section className="px-6 pt-1">
            <Card className="bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-rose-500/15 border-pink-500/30 p-3.5 shadow-md flex items-center justify-between relative overflow-hidden group">
              <div className="flex items-center gap-3 relative z-10">
                <button
                  onClick={handleSendHeartbeat}
                  disabled={isSendingHeartbeat}
                  className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer border-2 border-white/30 animate-pulse shrink-0"
                  title="Click to Send Heartbeat Pulse to Partner 💓"
                >
                  <Heart className="w-5 h-5 fill-white" />
                </button>
                <div>
                  <h3 className="text-xs font-extrabold text-text-primary flex items-center gap-1.5">
                    Instant Heartbeat Pulse <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h3>
                  <p className="text-[10px] text-text-secondary mt-0.5">
                    {heartbeatStats.totalCount > 0 
                      ? `${heartbeatStats.totalCount} heartbeats sent together ❤️` 
                      : "Tap the heart to send a virtual hug! 💓"}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSendHeartbeat}
                disabled={isSendingHeartbeat}
                size="sm"
                className="rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/40 text-xs font-bold px-3 h-8 z-10 shadow-xs shrink-0"
              >
                Send 💓
              </Button>
            </Card>
          </section>

          {/* Countdown Widget */}
          <section className="px-6 py-1">
            {upcomingCountdown ? (
              <CountdownCard 
                title={upcomingCountdown.title} 
                date={new Date(upcomingCountdown.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} 
                daysLeft={upcomingCountdown.daysLeft ?? 0} 
                category={upcomingCountdown.category || "Event"} 
              />
            ) : (
              <Card onClick={() => navigate('/important-days')} className="bg-surface border-border/50 hover:border-primary/50 cursor-pointer shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-sm text-text-primary">No Upcoming Countdowns</h4>
                      <p className="text-xs text-text-secondary">Tap to add an Important Day</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-tertiary" />
                </CardContent>
              </Card>
            )}
          </section>

          {/* Constellation Preview Card */}
          <section className="px-6 py-2">
            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              onClick={() => navigate('/constellation')}
              className="w-full h-44 rounded-2xl bg-gradient-to-br from-surfaceVariant via-surface to-background border border-border/50 relative overflow-hidden flex items-center justify-center shadow-md cursor-pointer hover:border-primary/50 transition-colors group"
            >
              {/* Glowing Stars Background */}
              <div className="absolute top-10 left-10 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_2px_#9D8CFF]" />
              <div className="absolute top-20 left-24 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_1px_#fff]" />
              <div className="absolute bottom-12 right-16 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_2px_#F4A261]" />
              
              <div className="text-center z-10">
                <Sparkles className="w-7 h-7 text-primary mx-auto mb-2 opacity-80 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-text-primary">Our Constellation</p>
                <p className="text-xs text-text-tertiary mt-0.5">
                  {starsCount > 0 ? `Explore ${starsCount} shared moments in the stars` : "No stars in sky yet. Add memories!"}
                </p>
              </div>
            </motion.div>
          </section>

          {/* Daily Actions (Today) */}
          <section className="px-6 py-2 space-y-3">
            <h2 className="text-sm font-semibold text-text-primary mb-3">Today's Experience</h2>
            
            {/* 1. Question of the Day */}
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card onClick={() => navigate('/question')} className="bg-surface border-border/50 hover:border-primary/50 transition-all cursor-pointer shadow-sm">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MessageCircleHeart className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-text-primary">Question of the Day</h3>
                    <p className="text-xs text-text-secondary">Answer to see {partnerName}'s reply</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-white text-xs">Answer</Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* 2. Little Memory */}
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card onClick={() => navigate('/memory')} className="bg-surface border-border/50 hover:border-primary/50 transition-all cursor-pointer shadow-sm">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <BookImage className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-text-primary">Little Memory</h3>
                    <p className="text-xs text-text-secondary">Record today's 1 special photo</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 rounded-full border-secondary/50 text-secondary hover:bg-secondary hover:text-white text-xs">Record</Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* 3. Random Date Spinner */}
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card onClick={() => navigate('/random-date')} className="bg-surface border-border/50 hover:border-primary/50 transition-all cursor-pointer shadow-sm">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-info/10 flex items-center justify-center text-info shrink-0">
                    <Dices className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-text-primary">Random Date Activity</h3>
                    <p className="text-xs text-text-secondary">Spin for a fun date idea today</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-tertiary" />
                </CardContent>
              </Card>
            </motion.div>
          </section>

          {/* Quick Access Shortcuts */}
          <section className="px-6 pt-2 space-y-3">
            <h2 className="text-sm font-semibold text-text-primary mb-2">Relationship Hub</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <Card onClick={() => navigate('/important-days')} className="bg-surface border-border/50 hover:border-success/50 transition-all cursor-pointer shadow-sm">
                <CardContent className="p-3.5 flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-success shrink-0" />
                  <div>
                    <h4 className="font-semibold text-xs text-text-primary">Important Days</h4>
                    <span className="text-[10px] text-text-tertiary">Events & Dates</span>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/time-capsule')} className="bg-surface border-border/50 hover:border-warning/50 transition-all cursor-pointer shadow-sm">
                <CardContent className="p-3.5 flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-warning shrink-0" />
                  <div>
                    <h4 className="font-semibold text-xs text-text-primary">Time Capsule</h4>
                    <span className="text-[10px] text-text-tertiary">
                      {timeCapsulesCount} {timeCapsulesCount === 1 ? 'Locked Msg' : 'Locked Msgs'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/dream-board')} className="bg-surface border-border/50 hover:border-primary/50 transition-all cursor-pointer shadow-sm">
                <CardContent className="p-3.5 flex items-center space-x-3">
                  <Compass className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold text-xs text-text-primary">Dream Board</h4>
                    <span className="text-[10px] text-text-tertiary">
                      {dreamsCount} {dreamsCount === 1 ? 'Goal' : 'Goals'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => navigate('/open-when')} className="bg-surface border-border/50 hover:border-secondary/50 transition-all cursor-pointer shadow-sm">
                <CardContent className="p-3.5 flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <h4 className="font-semibold text-xs text-text-primary">Open When</h4>
                    <span className="text-[10px] text-text-tertiary">
                      {openWhensCount} {openWhensCount === 1 ? 'Sealed Letter' : 'Sealed Letters'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      )}

      {/* Invitation Modals */}
      <InvitePartnerModal 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
      />

      <EnterCodeModal 
        isOpen={isEnterCodeOpen} 
        onClose={() => setIsEnterCodeOpen(false)} 
        onSuccess={handleConnectSuccess} 
      />

      <ConnectedSuccessModal 
        isOpen={isSuccessOpen} 
        partnerName={partnerName} 
        onClose={handleFinishSuccessModal} 
      />
    </div>
  )
}
