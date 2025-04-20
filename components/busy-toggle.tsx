"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function BusyToggle() {
  const [isBusy, setIsBusy] = useState(false)
  const { toast } = useToast()

  const handleToggle = (checked: boolean) => {
    setIsBusy(checked)

    toast({
      title: checked ? "Busy status activated" : "Busy status deactivated",
      description: checked
        ? "Students will see that you're currently unavailable for mentoring."
        : "You are now shown as available for mentorship requests.",
    })
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch id="busy-mode" checked={isBusy} onCheckedChange={handleToggle} />
      <Label htmlFor="busy-mode" className="flex items-center text-sm">
        <Clock className={`mr-1 h-4 w-4 ${isBusy ? "text-destructive" : ""}`} />
        {isBusy ? "I'm Busy" : "Available"}
      </Label>
    </div>
  )
}
