import { useState, useRef } from "react"
import { BottomSheet } from "@/components/BottomSheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, ImagePlus, Upload, X, Loader2, Calendar } from "lucide-react"
import { compressImageToFile } from "@/lib/imageCompressor"
import { api } from "@/services/api"

interface AddMemoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddMemoryModal({ isOpen, onClose, onSuccess }: AddMemoryModalProps) {
  const [title, setTitle] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsCompressing(true)
      setSelectedFile(file)
      setErrorMessage(null)
      try {
        const blob = await compressImageToFile(file, 1080, 1080, 0.8)
        setCompressedBlob(blob)
        const previewUrl = URL.createObjectURL(blob)
        setImagePreview(previewUrl)
      } catch (err) {
        console.warn("Client compression failed, using original file:", err)
        setCompressedBlob(file)
        setImagePreview(URL.createObjectURL(file))
      } finally {
        setIsCompressing(false)
      }
    }
  }

  const getLocalTodayStr = () => {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || (!selectedFile && !compressedBlob)) return

    setIsSaving(true)
    setErrorMessage(null)
    try {
      const todayDateStr = getLocalTodayStr()
      const formData = new FormData()
      formData.append("title", title.trim())
      formData.append("memoryDate", todayDateStr)

      const fileToSend = compressedBlob || selectedFile!
      formData.append("photo", fileToSend, "memory.webp")

      await api.createMemory(formData)
      setTitle("")
      setImagePreview(null)
      setSelectedFile(null)
      setCompressedBlob(null)
      onClose()
      onSuccess()
    } catch (err: any) {
      console.warn("Failed to create memory via API:", err.message)
      setErrorMessage(err.message || "Failed to save memory photo.")
    } finally {
      setIsSaving(false)
    }
  }

  const todayFormatted = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Add New Memory">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-error/10 border border-error/30 text-error text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Date Auto-Assignment Banner */}
        <div className="flex items-center justify-between p-3 bg-surfaceVariant/40 border border-border/50 rounded-xl text-xs">
          <span className="text-text-secondary font-medium flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" /> Memory Date
          </span>
          <span className="font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
            Today ({todayFormatted})
          </span>
        </div>

        {/* Native Camera & File Inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Image Capture / Selection Area */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
            Today's Memory Photo
          </label>

          {!imagePreview ? (
            <div className="bg-surfaceVariant/30 border-2 border-dashed border-border/70 rounded-2xl p-5 text-center space-y-4">
              {isCompressing ? (
                <div className="flex flex-col items-center text-primary space-y-2 py-4">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-xs font-medium">Optimizing & Compressing Photo...</span>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-text-primary">Take a photo or choose from gallery</h4>
                    <p className="text-[10px] text-text-tertiary">Photos are automatically compressed to ~50KB WebP for super fast load times.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {/* Direct Native Camera Button */}
                    <Button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="h-11 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md flex items-center justify-center gap-2"
                    >
                      <Camera className="w-4 h-4" /> Ambil Foto Kamera 📷
                    </Button>

                    {/* Gallery Picker Button */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => galleryInputRef.current?.click()}
                      className="h-11 rounded-xl border-border/60 text-text-primary hover:bg-surfaceVariant/60 text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <ImagePlus className="w-4 h-4 text-secondary" /> Galeri Foto 🖼️
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-surfaceVariant aspect-[4/3] shadow-md">
              <img src={imagePreview} alt="Memory preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null)
                  setSelectedFile(null)
                  setCompressedBlob(null)
                }}
                className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full hover:bg-black transition-colors backdrop-blur-md border border-white/20"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
            Memory Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Kencan romantis sore ini, Nonton film berdua..."
            className="bg-surfaceVariant/40 border-border/50"
            maxLength={150}
            required
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={!title.trim() || (!selectedFile && !compressedBlob) || isSaving || isCompressing}
            className="w-full h-12 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover disabled:opacity-50 transition-all shadow-lg"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
            Save Today's Memory
          </Button>
        </div>
      </form>
    </BottomSheet>
  )
}
