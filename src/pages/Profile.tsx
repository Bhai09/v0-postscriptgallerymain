"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useFirebaseAuthStore } from "@/store/firebaseAuthStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Edit2, ArrowLeft, Users, ImageIcon } from "lucide-react"

const Profile = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useFirebaseAuthStore()

  const isOwnProfile = user?.displayName === username

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/auth")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Mock gallery data - replace with Firestore queries in production
  const mockGalleries = [
    {
      id: 1,
      title: "Cosmic Landscape",
      mediaCount: 12,
      views: 2340,
      thumbnail: "gradient-aurora",
    },
    {
      id: 2,
      title: "Aurora Dreams",
      mediaCount: 8,
      views: 5600,
      thumbnail: "gradient-purple",
    },
  ]

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="hidden sm:flex">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Profile</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <Card className="border-border/50 glass overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                {/* Avatar */}
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 glow-cyan">
                  <AvatarImage src={user?.photoURL || undefined} />
                  <AvatarFallback className="text-2xl sm:text-4xl bg-gradient-aurora text-primary-foreground">
                    {user?.displayName?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                {/* Profile Info */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                      <h1 className="text-2xl sm:text-3xl font-bold gradient-text">{user?.displayName || "User"}</h1>
                      <p className="text-sm sm:text-base text-muted-foreground">{user?.email}</p>
                      {user?.bio && <p className="text-sm sm:text-base text-foreground pt-2">{user.bio}</p>}
                    </div>

                    {isOwnProfile && (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={handleLogout} className="flex-1 sm:flex-none">
                          <LogOut className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Logout</span>
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div className="text-center sm:text-left">
                      <div className="font-bold text-lg sm:text-xl gradient-text">{mockGalleries.length}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Galleries</div>
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="font-bold text-lg sm:text-xl gradient-text">450</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="font-bold text-lg sm:text-xl gradient-text">1.2K</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Total Views</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Galleries Section */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text">Galleries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {mockGalleries.map((gallery) => (
                <Card
                  key={gallery.id}
                  className="border-border/50 glass hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg overflow-hidden"
                >
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    <div
                      className={`aspect-video bg-gradient-aurora rounded-lg flex items-center justify-center glow-cyan`}
                    >
                      <ImageIcon className="w-8 h-8 text-primary-foreground opacity-50" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{gallery.title}</h3>
                      <div className="flex gap-3 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          {gallery.mediaCount} items
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {gallery.views.toLocaleString()} views
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
