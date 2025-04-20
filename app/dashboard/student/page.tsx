"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Users, TrendingUp, Clock, Sparkles } from "lucide-react"
import { UpcomingEvents } from "@/components/upcoming-events"
import { AvailableMentors } from "@/components/available-mentors"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface UserData {
  id: number
  name: string
  email: string
  userType: string
  points: number
}

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated") {
      // For now, just use session data instead of fetching from API
      setUserData({
        id: Number.parseInt(session.user.id || "0"),
        name: session.user.name || "Student",
        email: session.user.email || "",
        userType: session.user.userType || "student",
        points: 120, // Default value
      })
      setLoading(false)
    }
  }, [status, router, session])

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-purple-600 border-purple-200 animate-spin"></div>
          <p className="mt-4 text-purple-600 dark:text-purple-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Student Dashboard
          </h1>
          <p className="text-purple-600 dark:text-purple-400">Welcome back {userData?.name}, your journey continues</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full">
          Schedule a Mentorship Call
        </Button>
      </div>

      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-purple-200 dark:border-purple-800 overflow-hidden card-hover">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Gamification Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">{userData?.points || 0}</div>
              <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">+20 this week</Badge>
            </div>
            <Progress className="h-2 mt-4" value={40} />
            <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">40% to next level</div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-800 overflow-hidden card-hover">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Mentorship Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">3</div>
              <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">1 upcoming</Badge>
            </div>
            <div className="flex items-center mt-4 text-sm text-purple-600 dark:text-purple-400">
              <Clock className="mr-1 h-4 w-4" />
              Next: Monday, 2pm
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-800 overflow-hidden card-hover">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Available Mentors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">18</div>
              <Badge className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">5 new</Badge>
            </div>
            <div className="flex items-center mt-4 text-sm text-purple-600 dark:text-purple-400">
              <Users className="mr-1 h-4 w-4" />
              From various industries
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-800 overflow-hidden card-hover">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Skill Badges Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">7</div>
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex items-center mt-4 text-sm text-purple-600 dark:text-purple-400">
              <TrendingUp className="mr-1 h-4 w-4" />2 more to next level
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative">
          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
          <UpcomingEvents />
        </div>
        <div className="relative">
          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
            <Users className="h-3 w-3 text-white" />
          </div>
          <AvailableMentors />
        </div>
      </div>
    </div>
  )
}
