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
  const [user, setUser] = useState<User | null>(() => {
    const cached = localStorage.getItem("oursky_user")
    return cached ? JSON.parse(cached) : null
  })
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token")
  })
  
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  const [isConnected, setIsConnected] = useState<boolean>(() => {
    return localStorage.getItem("oursky_is_connected") === "true"
  })
  
  const [relationship, setRelationship] = useState<any>(() => {
    const cached = localStorage.getItem("oursky_relationship")
    return cached ? JSON.parse(cached) : null
  })

  const refreshStatus = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setIsAuthenticated(false)
      setUser(null)
      setIsConnected(false)
      setRelationship(null)
      setIsLoading(false)
      localStorage.removeItem("oursky_user")
      localStorage.removeItem("oursky_is_connected")
      localStorage.removeItem("oursky_relationship")
      return
    }

    try {
      const res = await api.getRelationshipStatus()
      if (res) {
        const connectedStatus = !!(res.isConnected && res.relationship)
        setIsConnected(connectedStatus)
        setRelationship(res.relationship || null)
        
        localStorage.setItem("oursky_is_connected", connectedStatus ? "true" : "false")
        if (res.relationship) {
          localStorage.setItem("oursky_relationship", JSON.stringify(res.relationship))
        } else {
          localStorage.removeItem("oursky_relationship")
        }

        if (res.relationship?.user) {
          setUser(res.relationship.user)
          localStorage.setItem("oursky_user", JSON.stringify(res.relationship.user))
        }
      }
      setIsAuthenticated(true)
    } catch (err) {
      console.warn("[AuthContext] Session verification failed. Clearing invalid token.")
      api.clearToken()
      setIsAuthenticated(false)
      setUser(null)
      setIsConnected(false)
      setRelationship(null)
      localStorage.removeItem("oursky_user")
      localStorage.removeItem("oursky_is_connected")
      localStorage.removeItem("oursky_relationship")
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
    localStorage.setItem("oursky_user", JSON.stringify(userData))
    refreshStatus()
  }

  const logout = () => {
    api.clearToken()
    setUser(null)
    setIsAuthenticated(false)
    setIsConnected(false)
    setRelationship(null)
    localStorage.removeItem("oursky_user")
    localStorage.removeItem("oursky_is_connected")
    localStorage.removeItem("oursky_relationship")
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
