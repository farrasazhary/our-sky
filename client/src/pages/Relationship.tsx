import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Calendar, Award, LogOut, Shield, Heart, Camera, Loader2, User as UserIcon, Sparkles, Edit3 } from "lucide-react"
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

  const isConnected = !!relationship && !!relationship.partner
  const userName = user?.fullName || "User"
  const partnerName = relationship?.partner?.fullName || "Partner"

  const startedAt = relationship?.relationshipDate 
    ? new Date(relationship.relationshipDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "Not set"

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
    <div className="flex flex-col min-h-screen pb-24 bg-background selection:bg-primary/30">
      {/* Sleek Professional Sticky Header */}
      <header className="px-6 py-4 flex justify-between items-center sticky top-0 bg-background/90 backdrop-blur-md z-30 border-b border-border/30 shadow-xs">
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Profile</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/settings')} 
          className="text-text-secondary hover:text-text-primary rounded-full hover:bg-surfaceVariant/60 transition-colors"
          title="App Settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      <div className="px-5 space-y-6 pt-4">
        {/* Couple Profile Card with Custom Banner */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Card className="bg-surface/90 border-border/60 overflow-hidden relative shadow-lg rounded-3xl ring-1 ring-primary/10">
            {/* Banner Background Area */}
            <div className="h-44 sm:h-48 relative overflow-hidden bg-gradient-to-br from-primary/30 via-surface to-secondary/20 group">
              {relationship?.coverImage ? (
                <img 
                  src={relationship.coverImage} 
                  alt="Relationship Cover" 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30" />
              )}
              
              {/* Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-black/30 pointer-events-none" />

              {/* Upload Cover Camera Button (Placed at Bottom Right for Professional Framing) */}
              <button
                onClick={() => coverInputRef.current?.click()}
                disabled={isUploadingCover}
                className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-md border border-white/20 cursor-pointer z-10"
                title="Change Cover Banner Photo"
              >
                {isUploadingCover ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                <span>Change Banner</span>
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
            <div className="-mt-14 flex justify-center items-start gap-5 relative z-10 px-4">
              {/* User 1 Column (Avatar + Nickname) */}
              <div 
                onClick={() => setIsEditProfileOpen(true)}
                className="flex flex-col items-center cursor-pointer group w-24"
                title="Click to Edit Profile"
              >
                <div className="w-20 h-20 rounded-full ring-4 ring-surface shadow-2xl bg-surface overflow-hidden relative flex-shrink-0 transition-transform active:scale-95 group-hover:ring-primary/60 border border-primary/20">
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
                <span className="font-bold text-xs text-text-primary group-hover:text-primary transition-colors mt-2 text-center truncate w-full flex items-center justify-center gap-1">
                  {userName} <Edit3 className="w-3 h-3 text-text-tertiary group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>

              {/* Heart Connector Badge */}
              <div className="bg-surface/90 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-primary/30 flex items-center justify-center z-20 flex-shrink-0 mt-6 text-primary">
                <Heart className="w-4 h-4 fill-primary/40 text-primary animate-pulse" />
              </div>

              {/* Partner Column (Avatar + Nickname) */}
              <div className="flex flex-col items-center w-24">
                <div className="w-20 h-20 rounded-full ring-4 ring-surface shadow-2xl bg-surface overflow-hidden relative flex-shrink-0 border border-secondary/20">
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
                <span className="font-bold text-xs text-text-primary mt-2 text-center truncate w-full">
                  {partnerName}
                </span>
              </div>
            </div>

            {/* Profile Info Body */}
            <CardContent className="pt-3 pb-6 text-center px-4 space-y-3.5">
              {/* Anniversary Subtitle & Status Badge */}
              <div className="space-y-1.5">
                <p className="text-text-secondary text-xs font-medium">
                  {isConnected ? `Together since ${startedAt}` : "Single Space (Not Connected)"}
                </p>
                <div>
                  <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] font-semibold tracking-wide gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3 text-amber-400" /> {isConnected ? "Connected Partner Space ✨" : "Awaiting Partner Code ⏳"}
                  </span>
                </div>
              </div>

              {/* Dedicated Professional Edit Profile Action Button */}
              <div className="pt-1 max-w-xs mx-auto">
                <Button 
                  onClick={() => setIsEditProfileOpen(true)} 
                  variant="outline" 
                  className="w-full h-9 rounded-xl bg-surfaceVariant/40 border-border/60 hover:bg-primary/10 hover:border-primary/40 text-text-primary hover:text-primary text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <UserIcon className="w-3.5 h-3.5 text-primary" /> Edit Profile Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Relationship Stats & Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-2.5">
          <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider ml-1">Relationship Milestones</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Connected Date Card (Clickable to Edit) */}
            <Card 
              onClick={() => setIsEditDateOpen(true)}
              className="bg-surface border-border/50 hover:border-primary/60 cursor-pointer transition-all shadow-xs group relative rounded-2xl"
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-2">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-text-secondary">Connected Date ✏️</span>
                <span className="font-semibold text-xs text-text-primary mt-1">{startedAt}</span>
              </CardContent>
            </Card>

            <Card className="bg-surface border-border/50 shadow-xs rounded-2xl">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-text-secondary">Space Status</span>
                <span className="font-semibold text-xs text-text-primary mt-1">
                  {isConnected ? "Active Pair" : "Single Account"}
                </span>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Quick Settings Action */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-2.5">
          <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider ml-1">Account & Security</h3>
          <Card onClick={() => navigate('/settings')} className="bg-surface border-border/50 hover:bg-surfaceVariant/30 transition-colors cursor-pointer shadow-xs rounded-2xl">
            <CardContent className="p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-medium text-xs text-text-primary">App Settings & Security</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="pt-2">
          <Button onClick={handleLogout} variant="ghost" className="w-full text-error hover:bg-error/10 hover:text-error h-11 rounded-xl text-xs font-semibold">
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
