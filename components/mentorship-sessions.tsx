import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video, MapPin, FileText, MessageSquare, Star, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MentorshipSessions() {
  const upcomingSessions = [
    {
      id: 1,
      mentor: {
        name: "Sarah Johnson",
        role: "Product Manager",
        company: "Tech Co",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Tomorrow",
      time: "3:30 PM - 4:30 PM",
      topic: "Career Guidance in Product Management",
      method: "Virtual",
      notes: "Bring your resume and a list of questions about PM careers",
    },
    {
      id: 2,
      mentor: {
        name: "Michael Chen",
        role: "Software Engineer",
        company: "BigTech Inc.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 10, 2023",
      time: "2:00 PM - 3:00 PM",
      topic: "Technical Interview Preparation",
      method: "In-person",
      notes: "We'll cover common algorithms and system design questions",
    },
  ]

  const pastSessions = [
    {
      id: 3,
      mentor: {
        name: "Priya Patel",
        role: "Marketing Director",
        company: "StartupX",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "March 15, 2023",
      time: "1:00 PM - 2:00 PM",
      topic: "Digital Marketing Strategies",
      method: "Virtual",
      notes: "Discussed content marketing and SEO best practices",
      feedback: 4.5,
    },
    {
      id: 4,
      mentor: {
        name: "James Wilson",
        role: "Investment Banker",
        company: "Global Finance",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "February 28, 2023",
      time: "4:00 PM - 5:00 PM",
      topic: "Finance Career Pathways",
      method: "In-person",
      notes: "Reviewed my resume and discussed career options in finance",
      feedback: 5,
    },
    {
      id: 5,
      mentor: {
        name: "Sarah Johnson",
        role: "Product Manager",
        company: "Tech Co",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "January 20, 2023",
      time: "2:30 PM - 3:30 PM",
      topic: "Introduction to Product Management",
      method: "Virtual",
      notes: "Overview of the PM role and recommended resources",
      feedback: 4,
    },
  ]

  return (
    <Tabs defaultValue="upcoming">
      <TabsList className="mb-6">
        <TabsTrigger value="upcoming">Upcoming ({upcomingSessions.length})</TabsTrigger>
        <TabsTrigger value="past">Past ({pastSessions.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming">
        {upcomingSessions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No upcoming mentorship sessions</p>
            <Button className="mt-4">Find a Mentor</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {upcomingSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
                        <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{session.topic}</CardTitle>
                        <CardDescription>
                          with {session.mentor.name} • {session.mentor.role} at {session.mentor.company}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={session.method === "Virtual" ? "outline" : "secondary"}
                      className={
                        session.method === "Virtual"
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                          : ""
                      }
                    >
                      {session.method === "Virtual" ? (
                        <Video className="mr-1 h-3 w-3" />
                      ) : (
                        <MapPin className="mr-1 h-3 w-3" />
                      )}
                      {session.method}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{session.time}</span>
                      </div>
                      {session.method === "In-person" && (
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Campus Center, Room 302</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start text-sm">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{session.notes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {session.method === "Virtual" ? (
                      <Button className="flex-1 sm:flex-none">
                        <Video className="mr-2 h-4 w-4" />
                        Join Meeting
                      </Button>
                    ) : (
                      <Button className="flex-1 sm:flex-none">
                        <MapPin className="mr-2 h-4 w-4" />
                        Get Directions
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <Calendar className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reschedule Session</DropdownMenuItem>
                        <DropdownMenuItem>Add Notes</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Cancel Session</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="past">
        {pastSessions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No past mentorship sessions</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pastSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
                        <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{session.topic}</CardTitle>
                        <CardDescription>
                          with {session.mentor.name} • {session.mentor.role} at {session.mentor.company}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(session.feedback)
                              ? "text-yellow-400 fill-yellow-400"
                              : i < session.feedback
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        {session.method === "Virtual" ? (
                          <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                        ) : (
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{session.method} Session</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start text-sm">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{session.notes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Follow-up
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
