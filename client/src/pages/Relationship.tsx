import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Calendar, Award, LogOut, Shield, Heart, Camera, Loader2, User as UserIcon, Sparkles, Image, MessageCircle, Flame } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/services/api"
import { EditProfileModal } from "@/components/modals/EditProfileModal"
import { EditConnectedDateModal } from "@/components/modals/EditConnectedDateModal"

export function Relationship() {
  const navigate = useNavigate()
  const { user, relationship, logout, refreshStatus } = useAuth()
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isEditDateOpen, setIsEditDateOpen] = useState(false)
  const [isUploadingCover, setIsUploadingCover] = useState(false)
  const coverInputRef = useRef<HTMLInputElement>(null)

  // Real-time relationship stats state
  const [stats, setStats] = useState({
    daysTogether: 0,
    memoriesCount: 0,
    questionsCount: 0,
    dreamsCount: 0
  })

  const isConnected = !!relationship && !!relationship.partner
  const userName = user?.fullName || "User"
  const partnerName = relationship?.partner?.fullName || "Partner"

  const rawDate = relationship?.startedAt || relationship?.relationshipDate || relationship?.started_at
  const startedAt = rawDate 
    ? new Date(rawDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "Not set"

  // Fetch real-time stats from backend
  useEffect(() => {
    async function fetchStats() {
      try {
        const [memoriesRes, historyRes, dreamsRes] = await Promise.all([
          api.getMemories().catch(() => []),
          api.getQuestionHistory().catch(() => []),
          api.getDreams().catch(() => [])
        ])

        // Calculate Days Together
        let days = 0
        if (rawDate) {
          const startDate = new Date(rawDate)
          const today = new Date()
          const diffTime = Math.abs(today.getTime() - startDate.getTime())
          days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        }

        const memCount = Array.isArray(memoriesRes) ? memoriesRes.length : 0
        const qCount = Array.isArray(historyRes) ? historyRes.length : 0
        const dCount = Array.isArray(dreamsRes) ? dreamsRes.filter((d: any) => d.status === "COMPLETED").length : 0

        setStats({
          daysTogether: days,
          memoriesCount: memCount,
          questionsCount: qCount,
          dreamsCount: dCount
        })
      } catch (err) {
        console.warn("Failed to load love stats:", err)
      }
    }

    fetchStats()
  }, [rawDate])

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploadingCover(true)
      await api.updateRelationshipCover(file)
      await refreshStatus()
    } catch (err: any) {
      alert(err.message || "Failed to update cover banner")
    } finally {
      setIsUploadingCover(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background">
      {/* Header */}
      <header className="px-6 py-3.5 flex justify-between items-center sticky top-0 bg-background/90 backdrop-blur-md z-30 border-b border-border/30 shadow-xs">
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Profile</h1>
        <Button variant="ghost" size="icon" onClick={() => navigate('/settings')} className="text-text-secondary hover:text-text-primary rounded-full hover:bg-surfaceVariant/60 transition-colors">
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      <div className="px-6 pt-5 space-y-6">
        {/* Couple Profile Card with Custom Banner (100% UNTOUCHED HERO CARD) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-surface border-border/50 overflow-hidden relative shadow-sm">
            {/* Banner Background Area */}
            <div className="h-32 relative overflow-hidden bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 group">
              {relationship?.coverImage ? (
                <img 
                  src={relationship.coverImage} 
                  alt="Relationship Cover" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30" />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-black/20 pointer-events-none" />

              {/* Upload Cover Camera Button */}
              <button
                onClick={() => coverInputRef.current?.click()}
                disabled={isUploadingCover}
                className="absolute top-3 right-3 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all opacity-80 group-hover:opacity-100 shadow-sm border border-white/15 cursor-pointer z-0"
                title="Change Cover Banner Photo"
              >
                {isUploadingCover ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Cover Photo</span>
              </button>

              <input 
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </div>

            {/* Overlapping Avatars & Heart Connector Section */}
            <div className="-mt-10 flex justify-center items-start gap-6 relative z-10 px-4">
              {/* User 1 Column */}
              <div 
                onClick={() => setIsEditProfileOpen(true)}
                className="flex flex-col items-center justify-center text-center cursor-pointer group w-28"
                title="Click to Edit Profile"
              >
                <div className="w-20 h-20 rounded-full border-4 border-surface shadow-xl bg-surface overflow-hidden relative flex-shrink-0 transition-transform active:scale-95 group-hover:border-primary/60">
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
                    <div className="w-full h-full flex items-center justify-center text-2xl bg-primary/20 text-primary font-bold">
                      {user?.profilePicture || (userName[0] || "👤")}
                    </div>
                  )}
                </div>
                <span className="font-bold text-sm text-text-primary group-hover:text-primary transition-colors mt-2 text-center truncate w-full">
                  {userName}
                </span>
              </div>

              {/* Heart Connector Badge */}
              <div className="bg-surface p-2 rounded-full shadow-md border border-border/50 flex items-center justify-center z-20 flex-shrink-0 mt-6">
                <Heart className="w-4 h-4 text-primary fill-primary/40" />
              </div>

              {/* Partner Column */}
              <div className="flex flex-col items-center justify-center text-center w-28">
                <div className="w-20 h-20 rounded-full border-4 border-surface shadow-xl bg-surface overflow-hidden relative flex-shrink-0">
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
                    <div className="w-full h-full flex items-center justify-center text-2xl bg-secondary/20 text-secondary font-bold">
                      {relationship?.partner?.profilePicture || (partnerName[0] || "❤️")}
                    </div>
                  )}
                </div>
                <span className="font-bold text-sm text-text-primary mt-2 text-center truncate w-full">
                  {partnerName}
                </span>
              </div>
            </div>

            {/* Profile Info Body */}
            <CardContent className="pt-2 pb-5 text-center px-4 space-y-3">
              {/* Anniversary Subtitle & Status Badge */}
              <div className="space-y-1.5">
                <p className="text-text-secondary text-xs font-medium">
                  {isConnected ? `Together since ${startedAt}` : "Single Space (Not Connected)"}
                </p>
                <div>
                  <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold tracking-wide gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> {isConnected ? "Connected Partner Space ✨" : "Awaiting Partner Code ⏳"}
                  </span>
                </div>
              </div>

              {/* Dedicated Professional Edit Profile Action Button */}
              <div className="pt-2 max-w-xs mx-auto">
                <Button 
                  onClick={() => setIsEditProfileOpen(true)} 
                  variant="outline" 
                  className="w-full h-10 rounded-xl bg-surfaceVariant/40 border-border/60 hover:bg-primary/10 hover:border-primary/40 text-text-primary hover:text-primary text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <UserIcon className="w-4 h-4 text-primary" /> Edit Profile Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* NEW FEATURE: Love Stats & Activity Counter Grid */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="space-y-3">
          <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 ml-1">Love Stats & Activity</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Days Together */}
            <Card className="bg-surface/90 border-border/50 shadow-xs relative overflow-hidden group hover:border-primary/50 transition-colors">
              <CardContent className="p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0">
                  <Flame className="w-5 h-5 text-pink-400 fill-pink-400" />
                </div>
                <div>
                  <span className="text-[11px] text-text-tertiary font-medium block">Hari Bersama</span>
                  <span className="text-sm font-bold text-text-primary">{stats.daysTogether} Hari 💖</span>
                </div>
              </CardContent>
            </Card>

            {/* Shared Memories */}
            <Card onClick={() => navigate('/memory')} className="bg-surface/90 border-border/50 shadow-xs relative overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                  <Image className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <span className="text-[11px] text-text-tertiary font-medium block">Memori Foto</span>
                  <span className="text-sm font-bold text-text-primary">{stats.memoriesCount} Foto</span>
                </div>
              </CardContent>
            </Card>

            {/* Questions Answered */}
            <Card onClick={() => navigate('/question')} className="bg-surface/90 border-border/50 shadow-xs relative overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center text-amber-400 shrink-0">
                  <MessageCircle className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-[11px] text-text-tertiary font-medium block">Pertanyaan</span>
                  <span className="text-sm font-bold text-text-primary">{stats.questionsCount} Dijawab</span>
                </div>
              </CardContent>
            </Card>

            {/* Dreams Completed */}
            <Card onClick={() => navigate('/dream-board')} className="bg-surface/90 border-border/50 shadow-xs relative overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/15 flex items-center justify-center text-emerald-400 shrink-0">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] text-text-tertiary font-medium block">Impian Terwujud</span>
                  <span className="text-sm font-bold text-text-primary">{stats.dreamsCount} Impian</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Relationship Milestones */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
          <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 ml-1">Relationship Milestones</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Connected Date Card (Clickable to Edit) */}
            <Card 
              onClick={() => setIsEditDateOpen(true)}
              className="bg-surface border-border/50 hover:border-primary/60 cursor-pointer transition-all shadow-sm group relative"
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="relative">
                  <Calendar className="w-6 h-6 text-primary mb-2" />
                </div>
                <span className="text-xs text-text-secondary">Connected Date ✏️</span>
                <span className="font-semibold text-sm text-text-primary mt-1">{startedAt}</span>
              </CardContent>
            </Card>

            <Card className="bg-surface border-border/50 shadow-sm">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Award className="w-6 h-6 text-secondary mb-2" />
                <span className="text-xs text-text-secondary">Space Status</span>
                <span className="font-semibold text-sm text-text-primary mt-1">
                  {isConnected ? "Active Pair" : "Single Account"}
                </span>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Quick Settings Action */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
          <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 ml-1">Account & Security</h3>
          <Card onClick={() => navigate('/settings')} className="bg-surface border-border/50 hover:bg-surfaceVariant/30 transition-colors cursor-pointer shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm text-text-primary">App Settings & Security</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="pt-4">
          <Button onClick={handleLogout} variant="ghost" className="w-full text-error hover:bg-error/10 hover:text-error h-12 rounded-xl">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>
      </div>

      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
      />

      <EditConnectedDateModal 
        isOpen={isEditDateOpen} 
        onClose={() => setIsEditDateOpen(false)} 
      />
    </div>
  )
}
