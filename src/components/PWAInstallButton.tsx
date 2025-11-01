"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePWAInstall } from "@/hooks/usePWAInstall"

export const PWAInstallButton = () => {
  const { showInstallPrompt, installApp, isInstalled } = usePWAInstall()

  if (isInstalled || !showInstallPrompt) {
    return null
  }

  return (
    <Button
      onClick={installApp}
      variant="outline"
      size="sm"
      className="border-primary/50 hover:bg-primary/10 hover:text-primary gap-2 bg-transparent"
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">Install App</span>
    </Button>
  )
}
