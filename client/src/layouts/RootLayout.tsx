import { Outlet } from "react-router-dom"
import { BottomNav } from "@/components/BottomNav"
import { InstallPwaPrompt } from "@/components/InstallPwaPrompt"
import { useNotificationListener } from "@/hooks/useNotificationListener"

export function RootLayout() {
  // Activate real-time System Push Notification listener app-wide
  useNotificationListener()

  return (
    <div className="dark min-h-[100dvh] bg-background text-text-primary selection:bg-primary/30 flex justify-center items-center">
      <main className="w-full max-w-md h-[100dvh] bg-background shadow-2xl overflow-hidden relative border-x border-border/40 flex flex-col">
        {/* Scrollable Page Content Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
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
