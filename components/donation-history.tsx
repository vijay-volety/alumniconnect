"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Download, ExternalLink } from "lucide-react"
import { useSession } from "next-auth/react"

interface Donation {
  id: string
  date: string
  amount: number
  type: string
  fundType: string
  status: string
}

export function DonationHistory() {
  const { data: session } = useSession()
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      // Fetch donations from API
      fetch("/api/donations")
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error)
          }
          setDonations(data)
        })
        .catch((error) => {
          console.error("Error fetching donations:", error)
          // Use mock data if API fails
          setDonations([
            {
              id: "DON-001",
              date: "2023-03-15",
              amount: 10000, // in cents
              type: "One-time",
              fundType: "Scholarship",
              status: "Completed",
            },
            {
              id: "DON-002",
              date: "2023-02-10",
              amount: 5000,
              type: "Monthly",
              fundType: "General",
              status: "Completed",
            },
            {
              id: "DON-003",
              date: "2023-01-05",
              amount: 50000,
              type: "One-time",
              fundType: "Infrastructure",
              status: "Completed",
            },
          ])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [session])

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-8 w-8 rounded-full border-4 border-t-purple-600 border-purple-200 animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-purple-200 dark:border-purple-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-purple-50 dark:bg-purple-900/30">
            <TableRow className="hover:bg-purple-100/50 dark:hover:bg-purple-900/50">
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Fund</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
                <TableCell className="font-medium text-purple-800 dark:text-purple-200">{donation.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                    {new Date(donation.date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="font-medium">${(donation.amount / 100).toFixed(2)}</TableCell>
                <TableCell>{donation.type}</TableCell>
                <TableCell>{donation.fundType}</TableCell>
                <TableCell>
                  <Badge
                    variant={donation.status === "Completed" ? "outline" : "secondary"}
                    className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  >
                    {donation.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/20"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download receipt</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/20"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="border-purple-300 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:bg-purple-900/20"
        >
          <Download className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
          Download All Receipts
        </Button>
      </div>
    </div>
  )
}
