import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Calendar, Check, Clock } from "lucide-react"

export function AvailableMentors() {
  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager at Tech Co",
      expertise: ["Product Management", "UX Design"],
      availability: "Available",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer at BigTech",
      expertise: ["Web Development", "Machine Learning"],
      availability: "Busy until April 10",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Marketing Director at StartupX",
      expertise: ["Digital Marketing", "Brand Strategy"],
      availability: "Available",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Mentors</CardTitle>
        <CardDescription>Connect with industry professionals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex flex-col space-y-3 rounded-lg border p-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={mentor.image} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{mentor.name}</h3>
                    <Badge
                      variant={mentor.availability === "Available" ? "outline" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {mentor.availability === "Available" ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {mentor.availability}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Briefcase className="mr-1 h-3 w-3" />
                    {mentor.role}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button size="sm" disabled={mentor.availability !== "Available"}>
                <Calendar className="mr-1 h-4 w-4" />
                Schedule Session
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Mentors
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
