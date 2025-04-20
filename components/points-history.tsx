import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Award, Gift, Calendar, MessageSquare, Users } from "lucide-react"

export function PointsHistory() {
  const history = [
    {
      id: 1,
      date: "2023-03-15",
      action: "Attended Workshop",
      points: 20,
      category: "Event",
      icon: Calendar,
    },
    {
      id: 2,
      date: "2023-03-10",
      action: "Completed Profile",
      points: 10,
      category: "Profile",
      icon: Users,
    },
    {
      id: 3,
      date: "2023-03-01",
      action: "First Login Bonus",
      points: 100,
      category: "Signup",
      icon: Gift,
    },
    {
      id: 4,
      date: "2023-02-20",
      action: "Forum Participation",
      points: 5,
      category: "Community",
      icon: MessageSquare,
    },
    {
      id: 5,
      date: "2023-02-15",
      action: "Mentorship Session",
      points: 30,
      category: "Mentorship",
      icon: Award,
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Event":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
      case "Profile":
        return "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
      case "Signup":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100 hover:text-purple-800"
      case "Community":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800"
      case "Mentorship":
        return "bg-rose-100 text-rose-800 hover:bg-rose-100 hover:text-rose-800"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800"
    }
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item) => {
            const Icon = item.icon
            return (
              <TableRow key={item.id}>
                <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="mr-2 bg-secondary rounded-full p-1">
                      <Icon className="h-4 w-4" />
                    </div>
                    {item.action}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getCategoryColor(item.category)}>
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">+{item.points}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
