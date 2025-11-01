import { useQuery } from "@tanstack/react-query"
import { db } from "@/config/firebase"
import { collection, query, limit, getDocs } from "firebase/firestore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Sparkles, TrendingUp } from "lucide-react"

const RightSidebar = () => {
  const { data: suggestedUsers } = useQuery({
    queryKey: ["suggested-users"],
    queryFn: async () => {
      const usersRef = collection(db, "users")
      const q = query(usersRef, limit(5))
      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => doc.data())
    },
  })

  const { data: trendingTags } = useQuery({
    queryKey: ["trending-tags"],
    queryFn: async () => {
      const galleriesRef = collection(db, "galleries")
      const snapshot = await getDocs(galleriesRef)

      const tagCounts: Record<string, number> = {}
      snapshot.docs.forEach((doc) => {
        const gallery = doc.data()
        if (gallery.tags) {
          gallery.tags.forEach((tag: string) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1
          })
        }
      })

      return Object.entries(tagCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([tag, count]) => ({ tag, count }))
    },
  })

  return (
    <aside className="fixed right-0 top-0 h-screen w-80 border-l border-border bg-card p-6 overflow-y-auto no-scrollbar z-40">
      {/* Suggested Creators */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-primary" />
            Suggested Creators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedUsers?.map((user: any) => (
            <div key={user.uid} className="flex items-center justify-between">
              <Link to={`/profile/${user.uid}`} className="flex items-center gap-3 flex-1">
                <Avatar>
                  <AvatarImage src={user.photoURL || undefined} />
                  <AvatarFallback>{user.displayName?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{user.displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.bio}</p>
                </div>
              </Link>
              <Button size="sm" variant="outline">
                Follow
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trending Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Trending Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {trendingTags?.map(({ tag, count }) => (
            <Link key={tag} to={`/explore?tag=${encodeURIComponent(tag)}`}>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                <Badge variant="secondary" className="text-sm">
                  #{tag}
                </Badge>
                <span className="text-xs text-muted-foreground">{count} galleries</span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </aside>
  )
}

export default RightSidebar
