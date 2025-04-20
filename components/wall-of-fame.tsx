import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Award, DollarSign, Calendar } from "lucide-react"

export function WallOfFame() {
  const contributors = [
    {
      name: "Jane Smith",
      year: "2015",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Tech Lead at Google",
      contributions: ["$5,000 donation", "3 mentorship programs"],
      badge: "Platinum Donor",
    },
    {
      name: "Sravanthi Akula",
      year: "2010",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Entrepreneur",
      contributions: ["Sponsored 5 events", "10 student mentorships"],
      badge: "Top Mentor",
    },
    {
      name: "Alice Johnson",
      year: "2018",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Data Scientist",
      contributions: ["Scholarship program founder", "Regular guest lecturer"],
      badge: "Academic Contributor",
    },
    {
      name: "Robert Williams",
      year: "2005",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "CTO at StartupX",
      contributions: ["Infrastructure funding", "Career fair organizer"],
      badge: "Event Sponsor",
    },
  ]

  const getBadgeIcon = (badge: string) => {
    if (badge.includes("Donor")) return DollarSign
    if (badge.includes("Mentor")) return GraduationCap
    if (badge.includes("Academic")) return Award
    return Calendar
  }

  const getBadgeColor = (badge: string) => {
    if (badge.includes("Platinum")) return "bg-zinc-300 hover:bg-zinc-300"
    if (badge.includes("Top")) return "bg-amber-300 hover:bg-amber-300"
    if (badge.includes("Academic")) return "bg-blue-300 hover:bg-blue-300"
    return "bg-emerald-300 hover:bg-emerald-300"
  }

  return (
    <div className="py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Wall of Fame</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Recognizing our alumni who have made significant contributions to the university and its students.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {contributors.map((contributor) => {
            const BadgeIcon = getBadgeIcon(contributor.badge)
            const badgeColor = getBadgeColor(contributor.badge)

            return (
              <Card key={contributor.name} className="overflow-hidden">
                <div className="bg-primary/10 p-6 flex flex-col items-center">
                  <Avatar className="h-20 w-20 border-4 border-background">
                    <AvatarImage src={contributor.avatar} alt={contributor.name} />
                    <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-semibold">{contributor.name}</h3>
                  <p className="text-sm text-muted-foreground">Class of {contributor.year}</p>
                  <Badge className={`mt-2 ${badgeColor} text-black`}>
                    <BadgeIcon className="h-3 w-3 mr-1" />
                    {contributor.badge}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm font-medium mb-2">{contributor.role}</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {contributor.contributions.map((contribution, i) => (
                      <li key={i} className="flex items-center">
                        <span className="h-1 w-1 rounded-full bg-primary mr-2" />
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
