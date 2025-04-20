"use client"

import { useState } from "react"
import { Award, X } from "lucide-react"

export function AchievementNotification() {
  const [isVisible, setIsVisible] = useState(false)

  // Simple function to dismiss the notification
  const dismissNotification = () => {
    setIsVisible(false)
  }

  // If not visible, don't render anything
  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-primary text-primary-foreground rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-primary-foreground/10">
          <div className="flex items-center">
            <Award className="h-6 w-6 mr-2" />
            <h3 className="font-bold">Achievement Unlocked!</h3>
          </div>
          <button onClick={dismissNotification} className="text-primary-foreground/80 hover:text-primary-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-lg">Example Achievement</h4>
          <p className="text-primary-foreground/80 text-sm">This is a placeholder achievement description.</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">Basic</span>
            <span className="font-bold">+10 points</span>
          </div>
        </div>
      </div>
    </div>
  )
}
