import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { api } from "@/services/api"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)

    try {
      await api.register(fullName, email, password)
      const res: any = await api.login(email, password)
      login(res.token, res.user || { id: "1", email, fullName })
      navigate("/onboarding")
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">OurSky</h1>
          <p className="text-text-secondary text-sm">Create your personal relationship space.</p>
        </div>

        <Card className="w-full border-border/50 bg-surfaceVariant/30 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Start your shared journey together</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase">Full Name</label>
                <Input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Johnson" 
                  className="bg-surface focus-visible:ring-primary" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase">Email Address</label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  className="bg-surface focus-visible:ring-primary" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase">Password</label>
                <div className="relative flex items-center">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters" 
                    className="bg-surface focus-visible:ring-primary pr-10" 
                    minLength={8}
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-text-tertiary hover:text-text-primary transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase">Confirm Password</label>
                <div className="relative flex items-center">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password" 
                    className="bg-surface focus-visible:ring-primary pr-10" 
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 text-text-tertiary hover:text-text-primary transition-colors focus:outline-none"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && <p className="text-xs text-error mt-1">{error}</p>}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2">
              <Button type="submit" disabled={isLoading} className="w-full h-11 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold shadow-md">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Create Account
              </Button>

              <p className="text-xs text-center text-text-secondary">
                Already have an account?{" "}
                <button 
                  type="button" 
                  onClick={() => navigate("/login")}
                  className="text-primary font-bold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
