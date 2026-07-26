import { useState, useEffect } from "react"
import { BottomSheet } from "@/components/BottomSheet"
import { Button } from "@/components/ui/button"
import { Copy, Check, Share2, Clock, Sparkles, Loader2 } from "lucide-react"
import { api } from "@/services/api"

interface InvitePartnerModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InvitePartnerModal({ isOpen, onClose }: InvitePartnerModalProps) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [invitationCode, setInvitationCode] = useState("SKY-88A9F2")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      async function generateCode() {
        setIsLoading(true)
        try {
          const res = await api.createInvitation()
          if (res?.invitationCode) {
            setInvitationCode(res.invitationCode)
          }
        } catch (err) {
          console.warn("Using offline invitation code mockup.")
        } finally {
          setIsLoading(false)
        }
      }
      generateCode()
    }
  }, [isOpen])

  const invitationLink = `https://oursky.app/invite/${invitationCode}`

  const handleCopyCode = () => {
    navigator.clipboard.writeText(invitationCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Join me on OurSky, our private digital space for couples! ❤️ Enter my code: ${invitationCode} or click: ${invitationLink}`)
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Invite Your Partner">
      <div className="space-y-5 py-1">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Share this code or invitation link with your partner. Once they accept, your private sky will unlock together!
          </p>
        </div>

        {/* Option 1: Invitation Code */}
        <div className="bg-surfaceVariant/40 border border-border/50 p-4 rounded-2xl space-y-2 text-center relative">
          <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Invitation Code</span>
          <div className="flex items-center justify-center gap-3">
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary my-1" />
            ) : (
              <>
                <span className="font-mono text-2xl font-extrabold text-primary tracking-widest">{invitationCode}</span>
                <Button size="icon" variant="ghost" onClick={handleCopyCode} className="h-8 w-8 text-primary hover:bg-primary/10">
                  {copiedCode ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Option 2: Share Link */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">Share Direct Link</span>
          <div className="flex gap-2">
            <Button onClick={handleShareWhatsApp} className="flex-1 h-11 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-medium">
              <Share2 className="w-4 h-4 mr-2" /> Share via WhatsApp
            </Button>
            <Button onClick={handleCopyLink} variant="outline" className="h-11 rounded-xl border-border/50 text-text-secondary text-xs">
              {copiedLink ? <Check className="w-4 h-4 text-success mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copiedLink ? "Copied" : "Copy Link"}
            </Button>
          </div>
        </div>

        {/* Expiration Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-text-tertiary pt-2 border-t border-border/30">
          <Clock className="w-3.5 h-3.5" />
          <span>Code expires in 48 hours</span>
        </div>
      </div>
    </BottomSheet>
  )
}
