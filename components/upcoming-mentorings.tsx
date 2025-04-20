import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video, MapPin } from "lucide-react"

export function UpcomingMentorings() {
  const sessions = [
    {
      id: 1,
      student: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Tomorrow",
      time: "3:30 PM - 4:30 PM",
      topic: "Career Guidance in Software Development",
      method: "Virtual",
    },
    {
      id: 2,
      student: {
        name: "Maya Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "March 25, 2023",
      time: "1:00 PM - 2:00 PM",
      topic: "Resume Review & Interview Preparation",
      method: "In-person",
    },
    {
      id: 3,
      student: {
        name: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 2, 2023",
      time: "11:00 AM - 12:00 PM",
      topic: "Networking in the Tech Industry",
      method: "Virtual",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Mentoring Sessions</CardTitle>
        <CardDescription>Your scheduled mentoring sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {sessions.map((session) => (
            <div key={session.id} className="flex flex-col space-y-3 rounded-lg border p-3">
              <div className="flex justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={session.student.avatar} />
                    <AvatarFallback>{session.student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Session with {session.student.name}</h3>
                    <p className="text-sm text-muted-foreground">{session.topic}</p>
                  </div>
                </div>
                <Badge variant={session.method === "Virtual" ? "outline" : "secondary"}>
                  {session.method === "Virtual" ? (
                    <Video className="mr-1 h-3 w-3" />
                  ) : (
                    <MapPin className="mr-1 h-3 w-3" />
                  )}
                  {session.method}
                </Badge>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{session.time}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {session.method === "Virtual" ? (
                  <Button size="sm" className="flex-1">
                    <Video className="mr-2 h-4 w-4" />
                    Join Meeting
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1">
                    <MapPin className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  Reschedule
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Sessions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
