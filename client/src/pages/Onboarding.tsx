import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { HeartHandshake, Copy, Check, Loader2 } from "lucide-react"
import { api } from "@/services/api"

export function Onboarding() {
  const navigate = useNavigate()
  const [inviteCode, setInviteCode] = useState("SKY-88A9F2")
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function getCode() {
      try {
        const res = await api.createInvitation()
        if (res?.invitationCode) {
          setInviteCode(res.invitationCode)
        }
      } catch (err) {
        console.warn("API offline, using default invitation code.")
      } finally {
        setIsLoading(false)
      }
    }
    getCode()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <HeartHandshake className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Invite Your Partner</h1>
          <p className="text-text-secondary text-sm">
            OurSky is built for two. Invite your partner to start your shared journey.
          </p>
        </div>

        <Card className="w-full border-border/50 bg-surfaceVariant/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Send Invitation</CardTitle>
            <CardDescription>Share this code with your partner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              {isLoading ? (
                <div className="flex-1 h-10 bg-surface border rounded-md flex items-center justify-center text-primary">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Generating...
                </div>
              ) : (
                <Input value={inviteCode} readOnly className="bg-surface text-center font-mono tracking-widest font-bold" />
              )}
              <Button onClick={handleCopy} disabled={isLoading} variant="secondary" className="bg-secondary hover:bg-secondary-hover text-white">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/40" />
              </div>
            </div>

            <Button onClick={() => navigate("/dashboard")} className="w-full bg-primary hover:bg-primary-hover text-white">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
