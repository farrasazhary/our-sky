import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { AuthGuard } from "./components/AuthGuard"
import { RootLayout } from "./layouts/RootLayout"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Onboarding } from "./pages/Onboarding"
import { Dashboard } from "./pages/Dashboard"
import { Features } from "./pages/Features"
import { Memory } from "./pages/Memory"
import { Relationship } from "./pages/Relationship"
import { Question } from "./pages/Question"
import { RandomDate } from "./pages/RandomDate"
import { Constellation } from "./pages/Constellation"
import { ImportantDays } from "./pages/ImportantDays"
import { Countdown } from "./pages/Countdown"
import { TimeCapsule } from "./pages/TimeCapsule"
import { DreamBoard } from "./pages/DreamBoard"
import { OpenWhen } from "./pages/OpenWhen"
import { Settings } from "./pages/Settings"
import { Notifications } from "./pages/Notifications"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* Guest Only Routes */}
            <Route path="login" element={<AuthGuard requireAuth={false}><Login /></AuthGuard>} />
            <Route path="register" element={<AuthGuard requireAuth={false}><Register /></AuthGuard>} />

            {/* Protected Routes (Wajib Login) */}
            <Route path="onboarding" element={<AuthGuard><Onboarding /></AuthGuard>} />
            <Route path="dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="features" element={<AuthGuard><Features /></AuthGuard>} />
            <Route path="memory" element={<AuthGuard><Memory /></AuthGuard>} />
            <Route path="profile" element={<AuthGuard><Relationship /></AuthGuard>} />
            <Route path="question" element={<AuthGuard><Question /></AuthGuard>} />
            <Route path="random-date" element={<AuthGuard><RandomDate /></AuthGuard>} />
            <Route path="constellation" element={<AuthGuard><Constellation /></AuthGuard>} />
            <Route path="important-days" element={<AuthGuard><ImportantDays /></AuthGuard>} />
            <Route path="countdowns" element={<AuthGuard><Countdown /></AuthGuard>} />
            <Route path="time-capsule" element={<AuthGuard><TimeCapsule /></AuthGuard>} />
            <Route path="dream-board" element={<AuthGuard><DreamBoard /></AuthGuard>} />
            <Route path="open-when" element={<AuthGuard><OpenWhen /></AuthGuard>} />
            <Route path="settings" element={<AuthGuard><Settings /></AuthGuard>} />
            <Route path="notifications" element={<AuthGuard><Notifications /></AuthGuard>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
