"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Users, TrendingUp, DollarSign, Clock, Sparkles } from "lucide-react"
import { UpcomingMentorings } from "@/components/upcoming-mentorings"
import { MentorshipRequests } from "@/components/mentorship-requests"
import { BusyToggle } from "@/components/busy-toggle"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface UserData {
  id: number
  name: string
  email: string
  userType: string
  points: number
}

export default function AlumniDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    if (status === "authenticated") {
      // Fetch user data
      fetch("/api/user")
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error)
          }
          setUserData(data)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [status, router])

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
            Alumni Dashboard
          </h1>
          <p className="text-purple-600 dark:text-purple-400">
            Give back to your community and help shape the future, {userData?.name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <BusyToggle />
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full">
            Mentor a Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-purple-200 dark:border-purple-800 overflow-hidden card-hover">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Students Mentored
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">24</div>
              <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">Impact Score: High</Badge>
            </div>
            <div className="flex items-center mt-4 text-sm text-purple-600 dark:text-purple-400">
              <Users className="mr-1 h-4 w-4" />4 ongoing relationships
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-800 overflow-hidden card-hover">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Contribution Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">Silver</div>
              <Trophy className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center mt-4 text-sm text-purple-600 dark:text-purple-400">
              <TrendingUp className="mr-1 h-4 w-4" />
              25% to Gold status
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-800 overflow-hidden card-hover">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">3</div>
              <Badge className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">Next: Today</Badge>
            </div>
            <div className="flex items-center mt-4 text-sm text-purple-600 dark:text-purple-400">
              <Calendar className="mr-1 h-4 w-4" />2 this week, 1 next week
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-800 overflow-hidden card-hover">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">$1,250</div>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center mt-4 text-sm text-purple-600 dark:text-purple-400">
              <Clock className="mr-1 h-4 w-4" />
              Last contribution: 2 weeks ago
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative">
          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
          <UpcomingMentorings />
        </div>
        <div className="relative">
          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
            <Users className="h-3 w-3 text-white" />
          </div>
          <MentorshipRequests />
        </div>
      </div>
    </div>
  )
}
