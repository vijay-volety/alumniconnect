"use client"

import { useEffect, useState } from "react"
import { DonationForm } from "@/components/donation-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonationHistory } from "@/components/donation-history"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DonatePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    if (status === "authenticated") {
      setLoading(false)
    }
  }, [status, router])

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-purple-600 border-purple-200 animate-spin"></div>
          <p className="mt-4 text-purple-600 dark:text-purple-400">Loading donation page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
          Make a Contribution
        </h1>
        <p className="text-purple-600 dark:text-purple-400">Support the next generation of students and leaders</p>
      </div>

      <Tabs defaultValue="donate">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-purple-100 dark:bg-purple-900/30">
          <TabsTrigger
            value="donate"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
          >
            Donate
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
          >
            Donation History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="donate" className="mt-6">
          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-purple-200">Support the Alumni Association</CardTitle>
              <CardDescription className="text-purple-600 dark:text-purple-400">
                Your contributions help fund scholarships, events, and mentorship programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DonationForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <DonationHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
