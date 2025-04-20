import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  Star,
  Gift,
  Heart,
  Calendar,
  MessageSquare,
  Users,
  Clock,
  Briefcase,
  BookOpen,
  Zap,
  Medal,
} from "lucide-react"

export function AvailableBadges() {
  const badges = [
    {
      id: 1,
      name: "First Login",
      description: "Complete your first login to the platform",
      icon: Gift,
      progress: 100, // percentage
      completed: true,
      category: "Basics",
    },
    {
      id: 2,
      name: "Profile Completer",
      description: "Fill out your entire profile with details",
      icon: Users,
      progress: 80,
      completed: false,
      category: "Basics",
    },
    {
      id: 3,
      name: "Networker",
      description: "Connect with 5 other members",
      icon: Star,
      progress: 100,
      completed: true,
      category: "Community",
    },
    {
      id: 4,
      name: "Event Enthusiast",
      description: "Attend 3 alumni events",
      icon: Calendar,
      progress: 67,
      completed: false,
      category: "Events",
    },
    {
      id: 5,
      name: "Mentor Master",
      description: "Complete 5 mentorship sessions",
      icon: Award,
      progress: 40,
      completed: false,
      category: "Mentorship",
    },
    {
      id: 6,
      name: "Donor",
      description: "Make your first donation",
      icon: Heart,
      progress: 100,
      completed: true,
      category: "Contributions",
    },
    {
      id: 7,
      name: "Discussion Starter",
      description: "Create 3 forum discussions",
      icon: MessageSquare,
      progress: 0,
      completed: false,
      category: "Community",
    },
    {
      id: 8,
      name: "Early Bird",
      description: "Log in 5 days in a row",
      icon: Clock,
      progress: 60,
      completed: false,
      category: "Engagement",
    },
    {
      id: 9,
      name: "Job Creator",
      description: "Post a job opportunity",
      icon: Briefcase,
      progress: 0,
      completed: false,
      category: "Career",
    },
    {
      id: 10,
      name: "Knowledge Seeker",
      description: "Access 10 resource materials",
      icon: BookOpen,
      progress: 50,
      completed: false,
      category: "Learning",
    },
    {
      id: 11,
      name: "Power User",
      description: "Use the platform for 30 consecutive days",
      icon: Zap,
      progress: 33,
      completed: false,
      category: "Engagement",
    },
    {
      id: 12,
      name: "Gold Contributor",
      description: "Donate a total of $500 or more",
      icon: Medal,
      progress: 50,
      completed: false,
      category: "Contributions",
    },
  ]

  const categories = [
    "Basics",
    "Community",
    "Events",
    "Mentorship",
    "Contributions",
    "Engagement",
    "Career",
    "Learning",
  ]

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const categoryBadges = badges.filter((badge) => badge.category === category)

        return (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-4">{category} Badges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categoryBadges.map((badge) => {
                const Icon = badge.icon

                return (
                  <Card key={badge.id} className={`transition-colors ${badge.completed ? "border-primary/20" : ""}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div
                          className={`p-2 rounded-full ${badge.completed ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        {badge.completed && (
                          <div className="bg-green-100 text-green-800 text-xs font-medium rounded-full px-2 py-0.5">
                            Unlocked
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-base mt-2">{badge.name}</CardTitle>
                      <CardDescription className="text-xs">{badge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{badge.progress}%</span>
                        </div>
                        <Progress value={badge.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
