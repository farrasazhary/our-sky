import { useState, useRef } from "react"
import { BottomSheet } from "@/components/BottomSheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Compass, Upload, X, Loader2 } from "lucide-react"
import { compressImage } from "@/lib/imageCompressor"
import { api } from "@/services/api"

interface AddDreamModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddDreamModal({ isOpen, onClose, onSuccess }: AddDreamModalProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Travel")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsCompressing(true)
      setSelectedFile(file)
      try {
        const compressedUrl = await compressImage(file, 1080, 1080, 0.75)
        setImagePreview(compressedUrl)
      } catch (err) {
        setImagePreview(URL.createObjectURL(file))
      } finally {
        setIsCompressing(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append("title", title.trim())
      formData.append("category", category)
      if (selectedFile) {
        formData.append("coverImage", selectedFile)
      }

      await api.createDream(formData)
      setTitle("")
      setCategory("Travel")
      setImagePreview(null)
      setSelectedFile(null)
      onClose()
      onSuccess()
    } catch (err: any) {
      console.warn("Failed to create dream via API:", err.message)
      onClose()
      onSuccess()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Add New Dream Goal">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Cover Photo (Optional)</label>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />

          {!imagePreview ? (
            <div 
              onClick={() => !isCompressing && fileInputRef.current?.click()}
              className="w-full h-32 border-2 border-dashed border-border/60 rounded-2xl bg-surfaceVariant/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all p-4 text-center"
            >
              {isCompressing ? (
                <div className="flex flex-col items-center text-primary space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-xs font-medium">Compressing...</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-primary mb-1" />
                  <span className="text-xs font-medium text-text-primary">Tap to select photo from device</span>
                </>
              )}
            </div>
          ) : (
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-border/50 group">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <button 
                type="button" 
                onClick={() => { setImagePreview(null); setSelectedFile(null); }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Dream Title</label>
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Visit Paris together"
            className="bg-surfaceVariant/40 border-border/50"
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Category</label>
          <div className="flex gap-2">
            {["Travel", "Life", "Home", "Finance"].map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-colors ${
                  category === cat 
                    ? "bg-primary text-white border-primary" 
                    : "bg-surfaceVariant/40 text-text-secondary border-border/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={!title.trim() || isCompressing || isSaving} className="w-full h-12 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-lg">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Compass className="w-4 h-4 mr-2" />}
            Add to Dream Board
          </Button>
        </div>
      </form>
    </BottomSheet>
  )
}
