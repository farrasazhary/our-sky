import { Outlet } from "react-router-dom"
import { BottomNav } from "@/components/BottomNav"
import { InstallPwaPrompt } from "@/components/InstallPwaPrompt"
import { useNotificationListener } from "@/hooks/useNotificationListener"

export function RootLayout() {
  // Activate real-time System Push Notification listener app-wide
  useNotificationListener()

  return (
    <div className="dark min-h-screen w-full bg-background text-text-primary selection:bg-primary/30 flex justify-center items-center">
      <main className="w-full max-w-md min-h-screen bg-background shadow-2xl relative border-x border-border/40 flex flex-col pb-16">
        {/* Scrollable Page Content Container */}
        <div className="flex-1">
          <Outlet />
        </div>
        
        {/* PWA Floating Install Prompt */}
        <InstallPwaPrompt />

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNav />
      </main>
    </div>
  )
}
