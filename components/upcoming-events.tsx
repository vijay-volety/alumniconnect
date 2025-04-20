import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Career Fair 2023",
      date: "March 15, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Main Campus, Hall A",
      attendees: 120,
      type: "In-person",
    },
    {
      id: 2,
      title: "Tech Industry Panel",
      date: "March 22, 2023",
      time: "2:00 PM - 3:30 PM",
      location: "Virtual",
      attendees: 85,
      type: "Online",
    },
    {
      id: 3,
      title: "Alumni Networking Mixer",
      date: "April 5, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Downtown Conference Center",
      attendees: 45,
      type: "In-person",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Connect and grow at our upcoming events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col space-y-3 rounded-lg border p-3">
              <div className="flex justify-between">
                <h3 className="font-semibold">{event.title}</h3>
                <Badge variant={event.type === "Online" ? "outline" : "default"}>{event.type}</Badge>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
              <Button size="sm">Register</Button>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Events
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
