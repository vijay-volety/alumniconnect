import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users, Video, ExternalLink, Check } from "lucide-react"

interface EventsListProps {
  type: "upcoming" | "registered" | "past"
}

export function EventsList({ type }: EventsListProps) {
  // Example events - in a real app these would come from an API
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Alumni Gala",
      date: "2023-04-15",
      time: "7:00 PM - 10:00 PM",
      location: "Grand Hotel Ballroom",
      description: "Join us for an evening of networking, fine dining, and celebrating alumni achievements.",
      attendees: 120,
      category: "Networking",
      image: "/placeholder.svg?height=200&width=400",
      isVirtual: false,
    },
    {
      id: 2,
      title: "Tech Industry Panel Discussion",
      date: "2023-04-22",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual",
      description: "Hear from leading alumni in the tech industry about current trends and career opportunities.",
      attendees: 85,
      category: "Career",
      image: "/placeholder.svg?height=200&width=400",
      isVirtual: true,
    },
    {
      id: 3,
      title: "Spring Campus Tour",
      date: "2023-04-29",
      time: "10:00 AM - 12:00 PM",
      location: "Main Campus",
      description: "Take a tour of the campus and see the latest developments and improvements.",
      attendees: 45,
      category: "Campus",
      image: "/placeholder.svg?height=200&width=400",
      isVirtual: false,
    },
  ]

  const registeredEvents = [
    {
      id: 4,
      title: "Resume Workshop",
      date: "2023-04-10",
      time: "1:00 PM - 3:00 PM",
      location: "Career Center",
      description: "Learn how to craft an effective resume and make a great impression on potential employers.",
      attendees: 30,
      category: "Career",
      image: "/placeholder.svg?height=200&width=400",
      isVirtual: false,
    },
    {
      id: 5,
      title: "Alumni Mentorship Kickoff",
      date: "2023-04-18",
      time: "6:00 PM - 8:00 PM",
      location: "Student Union Building",
      description: "The official kickoff for this year's mentorship program. Meet your mentors and fellow mentees.",
      attendees: 50,
      category: "Mentorship",
      image: "/placeholder.svg?height=200&width=400",
      isVirtual: false,
    },
  ]

  const pastEvents = [
    {
      id: 6,
      title: "Winter Career Fair",
      date: "2023-02-15",
      time: "10:00 AM - 4:00 PM",
      location: "Campus Convention Center",
      description: "Connect with employers from various industries looking to hire alumni and students.",
      attendees: 200,
      category: "Career",
      image: "/placeholder.svg?height=200&width=400",
      isVirtual: false,
    },
    {
      id: 7,
      title: "Alumni Speaker Series: Leadership",
      date: "2023-03-05",
      time: "5:00 PM - 6:30 PM",
      location: "Virtual",
      description: "Learn from successful alumni about leadership principles and career growth.",
      attendees: 120,
      category: "Professional Development",
      image: "/placeholder.svg?height=200&width=400",
      isVirtual: true,
    },
    {
      id: 8,
      title: "Homecoming Weekend",
      date: "2022-10-22",
      time: "All Day",
      location: "Various Campus Locations",
      description: "A weekend of activities, sports events, and reunion gatherings for alumni of all years.",
      attendees: 500,
      category: "Social",
      image: "/placeholder.svg?height=200&width=400",
      isVirtual: false,
    },
  ]

  let eventsToShow = upcomingEvents
  if (type === "registered") {
    eventsToShow = registeredEvents
  } else if (type === "past") {
    eventsToShow = pastEvents
  }

  return (
    <div className="space-y-6">
      {eventsToShow.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No events to display</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventsToShow.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="object-cover w-full h-full" />
                <div className="absolute top-4 right-4">
                  <Badge className={event.isVirtual ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                    {event.isVirtual ? <Video className="mr-1 h-3 w-3" /> : <MapPin className="mr-1 h-3 w-3" />}
                    {event.isVirtual ? "Virtual" : "In-person"}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                    {event.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {type === "upcoming" && <Button className="w-full">Register</Button>}
                {type === "registered" && (
                  <div className="flex w-full gap-2">
                    <Button className="flex-1" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                    <Button className="flex-1">
                      {event.isVirtual ? (
                        <>
                          <Video className="mr-2 h-4 w-4" />
                          Join Event
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Confirm Attendance
                        </>
                      )}
                    </Button>
                  </div>
                )}
                {type === "past" && (
                  <div className="flex w-full gap-2">
                    <Button className="flex-1" variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Recordings
                    </Button>
                    <Button className="flex-1" variant="outline">
                      See Photos
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
