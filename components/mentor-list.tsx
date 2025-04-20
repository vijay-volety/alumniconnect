import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Clock, Check, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MentorList() {
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Senior Product Manager at Tech Co",
      company: "Tech Co",
      graduationYear: "2010",
      expertise: ["Product Management", "UX Design", "Leadership"],
      availability: "Available",
      bio: "Over 12 years of experience in product management for consumer tech products. Previously worked at Apple and Google.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Principal Software Engineer",
      company: "BigTech Inc.",
      graduationYear: "2012",
      expertise: ["Web Development", "Machine Learning", "System Architecture"],
      availability: "Busy until April 10",
      bio: "Full-stack developer with expertise in scalable applications. Currently leading a team of 15 engineers.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Marketing Director",
      company: "StartupX",
      graduationYear: "2015",
      expertise: ["Digital Marketing", "Brand Strategy", "Growth Hacking"],
      availability: "Available",
      bio: "Helped scale multiple startups through effective marketing strategies. Passionate about mentoring young marketers.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Investment Banker",
      company: "Global Finance",
      graduationYear: "2008",
      expertise: ["Finance", "Investment Analysis", "FinTech"],
      availability: "Available",
      bio: "15 years in investment banking with focus on tech startups. Angel investor and advisor to multiple companies.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-6">
        <div className="md:col-span-2">
          <Input placeholder="Search mentors by name, expertise, or company" />
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available Now</SelectItem>
              <SelectItem value="all">All Mentors</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map((mentor) => (
          <Card key={mentor.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Briefcase className="mr-1 h-3 w-3" />
                      {mentor.role}
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant={mentor.availability === "Available" ? "outline" : "secondary"}
                  className={
                    mentor.availability === "Available"
                      ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                      : ""
                  }
                >
                  {mentor.availability === "Available" ? (
                    <Check className="mr-1 h-3 w-3" />
                  ) : (
                    <Clock className="mr-1 h-3 w-3" />
                  )}
                  {mentor.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Company</div>
                  <div className="text-sm text-muted-foreground">{mentor.company}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Class of</div>
                  <div className="text-sm text-muted-foreground">{mentor.graduationYear}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">About</div>
                  <div className="text-sm text-muted-foreground">{mentor.bio}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Areas of Expertise</div>
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={mentor.availability !== "Available"}>
                <Calendar className="mr-2 h-4 w-4" />
                Request Mentorship
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
