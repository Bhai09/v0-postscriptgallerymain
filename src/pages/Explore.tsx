"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useFirebaseAuthStore } from "@/store/firebaseAuthStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Explore = () => {
  const navigate = useNavigate()
  const { user } = useFirebaseAuthStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recent")

  // Mock data for demonstration - replace with Firestore queries in production
  const { data: media, isLoading } = useQuery({
    queryKey: ["explore-media", searchQuery, selectedTags, sortBy],
    queryFn: async () => {
      // This would connect to Firestore/MongoDB in production
      // For now, returning mock data structure
      return []
    },
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const mockTags = ["space", "cosmic", "aurora", "nebula", "photography", "art", "digital", "nature"]

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="hidden sm:flex">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Explore</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by title, tags, or creator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 sm:h-12"
              />
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 sm:h-12 sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>

              {selectedTags.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => setSelectedTags([])} className="h-10 sm:h-12">
                  Clear Tags
                </Button>
              )}
            </div>

            {/* Tag Selection */}
            <div className="flex flex-wrap gap-2">
              {mockTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors text-xs sm:text-sm py-1 px-2 sm:px-3"
                  onClick={() => toggleTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Active Filters Display */}
            {selectedTags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm text-muted-foreground">Filtering by:</span>
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 text-xs sm:text-sm">
                    #{tag}
                    <button onClick={() => toggleTag(tag)} className="hover:opacity-75">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-border/50 glass animate-pulse">
                  <CardContent className="p-4 sm:p-6 space-y-3">
                    <div className="aspect-square bg-muted rounded-lg"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))
            ) : media && media.length > 0 ? (
              media.map((item: any) => (
                <Card
                  key={item.id}
                  className="cursor-pointer border-border/50 glass hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden"
                >
                  <CardContent className="p-4 sm:p-6 space-y-3">
                    <div className="aspect-square bg-gradient-aurora rounded-lg flex items-center justify-center text-muted-foreground">
                      [Media Preview]
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground pt-1">
                        <span>{item.views} views</span>
                        <span>•</span>
                        <span>{item.likes} likes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-base sm:text-lg">No content found</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Explore
