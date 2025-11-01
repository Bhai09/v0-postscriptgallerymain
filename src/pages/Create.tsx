"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFirebaseAuthStore } from "@/store/firebaseAuthStore"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, X, ArrowLeft, Upload } from "lucide-react"

const Create = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useFirebaseAuthStore()

  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [currentUrl, setCurrentUrl] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")

  const addMediaUrl = () => {
    if (currentUrl.trim()) {
      setMediaUrls([...mediaUrls, currentUrl.trim()])
      setCurrentUrl("")
    }
  }

  const removeMediaUrl = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim().toLowerCase()])
      setCurrentTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({ title: "Error", description: "Please enter a title", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      // In production, this would save to Firestore via addMediaItem function
      toast({ title: "Success", description: "Media created successfully!" })
      navigate("/")
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="hidden sm:flex">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Create</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Card className="border-border/50 glass">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-2xl sm:text-3xl">Share Your Creation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm sm:text-base">
                  Title *
                </Label>
                <Input
                  id="title"
                  placeholder="Give your creation a title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="h-10 sm:h-12 text-sm sm:text-base"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm sm:text-base">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your creation..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="text-sm sm:text-base resize-none"
                />
              </div>

              {/* Media URLs */}
              <div className="space-y-3">
                <Label htmlFor="media" className="text-sm sm:text-base">
                  Media URLs
                </Label>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <Input
                    id="media"
                    placeholder="Enter image or video URL"
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMediaUrl())}
                    className="h-10 sm:h-12 text-sm sm:text-base"
                  />
                  <Button
                    type="button"
                    onClick={addMediaUrl}
                    variant="outline"
                    className="h-10 sm:h-12 w-full sm:w-auto bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                {mediaUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {mediaUrls.map((url, index) => (
                      <Badge key={index} variant="secondary" className="gap-1 text-xs sm:text-sm py-1">
                        {url.substring(0, 20)}...
                        <button type="button" onClick={() => removeMediaUrl(index)} className="hover:opacity-75">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label htmlFor="tags" className="text-sm sm:text-base">
                  Tags
                </Label>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <Input
                    id="tags"
                    placeholder="Add a tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="h-10 sm:h-12 text-sm sm:text-base"
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    variant="outline"
                    className="h-10 sm:h-12 w-full sm:w-auto bg-transparent"
                  >
                    Add
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1 text-xs sm:text-sm py-1">
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:opacity-75">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 flex-col sm:flex-row pt-6">
                <Button
                  type="submit"
                  className="btn-space text-primary-foreground h-10 sm:h-12 text-sm sm:text-base flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="h-10 sm:h-12 text-sm sm:text-base"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Create
