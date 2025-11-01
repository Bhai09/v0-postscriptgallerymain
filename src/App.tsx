"use client"

import type React from "react"

import { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useFirebaseAuthStore } from "./store/firebaseAuthStore"
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import Explore from "./pages/Explore"
import Create from "./pages/Create"
import Messages from "./pages/Messages"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { user, loading } = useFirebaseAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-accent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return user ? element : <Navigate to="/auth" replace />
}

const AppContent = () => {
  const { initialize } = useFirebaseAuthStore()

  useEffect(() => {
    const unsubscribe = initialize()
    return () => unsubscribe?.()
  }, [initialize])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/explore" element={<ProtectedRoute element={<Explore />} />} />
        <Route path="/create" element={<ProtectedRoute element={<Create />} />} />
        <Route path="/messages" element={<ProtectedRoute element={<Messages />} />} />
        <Route path="/profile/:username" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
