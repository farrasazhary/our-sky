import { Link, useLocation } from "react-router-dom"
import { Sparkles, LayoutGrid, BookImage, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const location = useLocation()
  
  const navItems = [
    { name: "Sky", path: "/dashboard", icon: Sparkles },
    { name: "Features", path: "/features", icon: LayoutGrid },
    { name: "Memory", path: "/memory", icon: BookImage },
    { name: "Profile", path: "/profile", icon: User },
  ]

  // Hide nav on login/onboarding
  if (['/login', '/onboarding', '/'].includes(location.pathname)) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-md w-full h-16 bg-surface/95 backdrop-blur-md border-t border-border/50 flex justify-around items-center px-2 z-50 select-none pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        const Icon = item.icon
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex flex-col items-center transition-all w-16 py-1",
              isActive ? "text-primary scale-105 font-medium" : "text-text-tertiary hover:text-text-primary"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-1">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
