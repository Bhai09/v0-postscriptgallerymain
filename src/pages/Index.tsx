"use client"

import { useNavigate } from "react-router-dom"
import { useFirebaseAuthStore } from "@/store/firebaseAuthStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Rocket, Sparkles, Download, LogOut } from "lucide-react"

const Index = () => {
  const navigate = useNavigate()
  const { user, logout } = useFirebaseAuthStore()

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/auth")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl w-full text-center space-y-8">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-aurora flex items-center justify-center glow-cyan">
                <Zap className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text text-balance">
                Welcome to PostScript
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
                A cosmic gallery experience for your memories and creations. Share, explore, and connect across the
                universe.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-12">
              {[
                { icon: Rocket, title: "Instant Upload", desc: "Share media instantly" },
                { icon: Sparkles, title: "Beautiful Galleries", desc: "Organize your content" },
                { icon: Zap, title: "Fast Performance", desc: "Lightning-quick loading" },
              ].map((feature, i) => (
                <Card key={i} className="border-border/50 glass hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardContent className="pt-6 space-y-3">
                    <feature.icon className="w-8 h-8 text-primary mx-auto" />
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => navigate("/auth")}
                className="btn-space text-primary-foreground px-8 py-6 text-lg h-auto"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg h-auto bg-transparent"
              >
                <Download className="mr-2 h-5 w-5" />
                Install App
              </Button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 justify-center pt-8">
              <Badge variant="secondary">Free to use</Badge>
              <Badge variant="secondary">No credit card needed</Badge>
              <Badge variant="secondary">Open source</Badge>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
            <p>PostScript Gallery © 2025 - Cosmic experiences for digital creators</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-aurora flex items-center justify-center glow-cyan">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold gradient-text">PostScript</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" onClick={() => navigate("/explore")} className="text-sm sm:text-base">
              Explore
            </Button>
            <Button variant="ghost" onClick={() => navigate("/create")} className="text-sm sm:text-base">
              Create
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(`/profile/${user.displayName}`)}
              className="text-sm sm:text-base"
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-destructive hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text">Welcome, {user.displayName}!</h2>
            <p className="text-muted-foreground">Ready to share your cosmic creations?</p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {[
              {
                title: "Create Post",
                desc: "Share your latest creation",
                action: () => navigate("/create"),
                icon: Sparkles,
              },
              {
                title: "Explore Gallery",
                desc: "Discover amazing content",
                action: () => navigate("/explore"),
                icon: Rocket,
              },
              {
                title: "View Profile",
                desc: "Manage your gallery",
                action: () => navigate(`/profile/${user.displayName}`),
                icon: Zap,
              },
            ].map((card, i) => (
              <Card
                key={i}
                onClick={card.action}
                className="cursor-pointer border-border/50 glass hover:border-primary/50 transition-all hover:shadow-lg hover:scale-105 group"
              >
                <CardContent className="pt-6 space-y-3 text-center">
                  <card.icon className="w-8 h-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Index
