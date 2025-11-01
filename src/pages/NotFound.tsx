"use client"

import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Home } from "lucide-react"

const NotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.error("[v0] 404 Error: User attempted to access non-existent route:", location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-cosmic px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-border/50 glass">
        <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-aurora flex items-center justify-center glow-cyan">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text">404</h1>
            <p className="text-lg sm:text-xl text-foreground">Page Not Found</p>
            <p className="text-sm sm:text-base text-muted-foreground">
              The cosmic page you're looking for has drifted into another galaxy.
            </p>
          </div>

          <div className="pt-4">
            <Button onClick={() => navigate("/")} className="btn-space text-primary-foreground w-full">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFound
