import { useState, useEffect, useRef } from "react"
import { BottomSheet } from "@/components/BottomSheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Loader2, Save, Upload, Camera } from "lucide-react"
import { api } from "@/services/api"
import { useAuth } from "@/contexts/AuthContext"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

const AVATAR_PRESETS = ["👑", "💖", "✨", "🌸", "🐻", "🐱", "🦊", "🚀", "🎨", "🌟"]

/**
 * Frontend Image Compression Helper
 * Resizes file on HTML5 Canvas to max 400x400 px, converting to WebP at 80% quality.
 * Reduces file size down to ~30-80KB to save memory & bandwidth.
 */
async function compressImage(file: File, maxDim = 400, quality = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }

        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        if (!ctx) return reject(new Error("Failed to get canvas context"))

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error("Canvas blob compression failed"))
            }
          },
          "image/webp",
          quality
        )
      }
      img.onerror = (err) => reject(err)
    }
    reader.onerror = (err) => reject(err)
  })
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, refreshStatus } = useAuth()
  const [fullName, setFullName] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isCompressing, setIsCompressing] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      if (user.fullName === "User" && user.email) {
        const prefix = user.email.split("@")[0]
        setFullName(prefix.charAt(0).toUpperCase() + prefix.slice(1))
      } else {
        setFullName(user.fullName || "")
      }
      
      const currentPic = user.profilePicture || "👑"
      if (currentPic.startsWith("/") || currentPic.startsWith("http")) {
        setPreviewImage(currentPic)
        setSelectedAvatar("")
      } else {
        setSelectedAvatar(currentPic)
        setPreviewImage(null)
      }
      setCompressedFile(null)
    }
  }, [user, isOpen])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsCompressing(true)
    try {
      // 1. Frontend Image Compression
      const blob = await compressImage(file, 400, 0.8)
      setCompressedFile(blob)
      const previewUrl = URL.createObjectURL(blob)
      setPreviewImage(previewUrl)
      setSelectedAvatar("")
    } catch (err) {
      console.warn("Image compression failed, using original file:", err)
      setCompressedFile(file)
      setPreviewImage(URL.createObjectURL(file))
    } finally {
      setIsCompressing(false)
    }
  }

  const handleSelectEmoji = (emoji: string) => {
    setSelectedAvatar(emoji)
    setPreviewImage(null)
    setCompressedFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) return

    setIsSaving(true)
    try {
      let avatarToSend: string | undefined = selectedAvatar
      if (!compressedFile && previewImage && (previewImage.startsWith("/") || previewImage.startsWith("http"))) {
        avatarToSend = previewImage
      }

      await api.updateProfile(fullName.trim(), avatarToSend, compressedFile || undefined)
      await refreshStatus()
      onClose()
    } catch (err: any) {
      console.warn("Failed to update profile:", err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Edit Profile Details">
      <form onSubmit={handleSubmit} className="space-y-6 py-2">
        {/* Avatar Upload / Selection Section */}
        <div className="space-y-4 text-center">
          <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest block">
            Profile Avatar & Photo
          </label>
          
          <div className="flex flex-col items-center justify-center gap-3">
            {/* Circular Avatar Badge with Glassmorphic Hover */}
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 rounded-full border-4 border-surface shadow-2xl bg-surfaceVariant/60 flex items-center justify-center text-4xl overflow-hidden relative ring-2 ring-primary/40 group-hover:ring-primary transition-all">
                {isCompressing ? (
                  <Loader2 className="w-7 h-7 text-primary animate-spin" />
                ) : previewImage ? (
                  <img src={previewImage} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  selectedAvatar || "👤"
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1">
                  <Camera className="w-5 h-5" />
                  <span className="text-[10px] font-bold tracking-wide">Change</span>
                </div>
              </div>

              {/* Camera Trigger Pill */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
                className="absolute bottom-0 right-0 bg-primary hover:bg-primary-hover text-white p-2 rounded-full shadow-lg border-2 border-surface transition-transform active:scale-90"
                title="Upload Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs rounded-full border-primary/30 text-primary hover:bg-primary/10 transition-all px-4 py-1.5 h-9 font-semibold"
            >
              <Upload className="w-3.5 h-3.5 mr-2" /> Upload Custom Photo
            </Button>
          </div>

          {/* Preset Emojis (Balanced 5x2 Grid) */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider block mb-2">
              Or Choose an Emoji Avatar
            </span>
            <div className="grid grid-cols-5 gap-2.5 max-w-xs mx-auto">
              {AVATAR_PRESETS.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => handleSelectEmoji(avatar)}
                  className={`w-11 h-11 rounded-2xl text-xl flex items-center justify-center transition-all ${
                    selectedAvatar === avatar && !previewImage
                      ? "bg-primary/20 border-2 border-primary scale-110 shadow-md ring-2 ring-primary/30"
                      : "bg-surfaceVariant/40 border border-border/40 hover:bg-surfaceVariant hover:scale-105"
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Full Name Input */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest block">
            Full Name / Display Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your real name or nickname"
              className="pl-10 h-11 bg-surfaceVariant/40 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium rounded-xl"
              required
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSaving || isCompressing || !fullName.trim()}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-primary via-primary-hover to-secondary text-white font-bold hover:opacity-95 shadow-lg shadow-primary/25 transition-all active:scale-[0.99] text-sm"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
            Save Profile Details
          </Button>
        </div>
      </form>
    </BottomSheet>
  )
}
