import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { api } from "@/services/api"

interface User {
  id: string
  email: string
  fullName: string
  profilePicture?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isConnected: boolean
  relationship: any
  login: (token: string, user: User) => void
  logout: () => void
  refreshStatus: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [relationship, setRelationship] = useState<any>(null)

  const refreshStatus = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setIsAuthenticated(false)
      setUser(null)
      setIsLoading(false)
      return
    }

    try {
      const res = await api.getRelationshipStatus()
      if (res) {
        setIsConnected(res.isConnected || false)
        setRelationship(res.relationship || null)
        if (res.relationship?.user) {
          setUser(res.relationship.user)
        }
      }
      setIsAuthenticated(true)
    } catch (err) {
      console.warn("[AuthContext] Session verification failed. Clearing invalid token.")
      api.clearToken()
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshStatus()
  }, [])

  const login = (token: string, userData: User) => {
    api.setToken(token)
    setUser(userData)
    setIsAuthenticated(true)
    refreshStatus()
  }

  const logout = () => {
    api.clearToken()
    setUser(null)
    setIsAuthenticated(false)
    setIsConnected(false)
    setRelationship(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isConnected,
        relationship,
        login,
        logout,
        refreshStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
