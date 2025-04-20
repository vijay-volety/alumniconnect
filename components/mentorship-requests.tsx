import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Calendar, Clock } from "lucide-react"

export function MentorshipRequests() {
  const requests = [
    {
      id: 1,
      student: {
        name: "Emily Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        major: "Computer Science",
        year: "Junior",
      },
      topic: "Career advice for tech industry",
      preferredTimes: ["Weekdays after 4 PM", "Weekend mornings"],
      message:
        "I'm interested in learning more about product management and would appreciate your insights on transitioning into the field.",
    },
    {
      id: 2,
      student: {
        name: "David Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        major: "Business Administration",
        year: "Senior",
      },
      topic: "Startup founder mentorship",
      preferredTimes: ["Monday/Wednesday evenings", "Friday afternoons"],
      message:
        "I'm working on a startup idea and would love your feedback and guidance on turning it into a viable business.",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mentorship Requests</CardTitle>
        <CardDescription>Students seeking your guidance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {requests.map((request) => (
            <div key={request.id} className="flex flex-col space-y-3 rounded-lg border p-3">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={request.student.avatar} />
                  <AvatarFallback>{request.student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-medium">{request.student.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1 sm:mt-0">
                      <Badge variant="outline">{request.student.major}</Badge>
                      <Badge variant="outline">{request.student.year}</Badge>
                    </div>
                  </div>
                  <p className="text-sm font-medium mt-2">{request.topic}</p>
                  <p className="text-sm text-muted-foreground mt-1">{request.message}</p>
                  <div className="mt-2">
                    <p className="text-xs font-medium text-muted-foreground">Preferred Times:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {request.preferredTimes.map((time, i) => (
                        <div key={i} className="text-xs bg-secondary px-2 py-1 rounded-full flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Check className="mr-2 h-4 w-4" />
                  Accept
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline" className="flex-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Decline</span>
                </Button>
              </div>
            </div>
          ))}
          {requests.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">No pending mentorship requests at this time.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
