import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MentorList } from "@/components/mentor-list"
import { MentorshipSessions } from "@/components/mentorship-sessions"
import { MentorshipRequestForm } from "@/components/mentorship-request-form"

export default function MentorshipPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mentorship Program</h1>
        <p className="text-muted-foreground">Connect with mentors or become one to help others succeed</p>
      </div>

      <Tabs defaultValue="find-mentor">
        <TabsList>
          <TabsTrigger value="find-mentor">Find a Mentor</TabsTrigger>
          <TabsTrigger value="sessions">My Sessions</TabsTrigger>
          <TabsTrigger value="request">Request Mentorship</TabsTrigger>
        </TabsList>
        <TabsContent value="find-mentor" className="mt-6">
          <MentorList />
        </TabsContent>
        <TabsContent value="sessions" className="mt-6">
          <MentorshipSessions />
        </TabsContent>
        <TabsContent value="request" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Request a Mentorship Session</CardTitle>
              <CardDescription>Submit a request for mentorship in your area of interest</CardDescription>
            </CardHeader>
            <CardContent>
              <MentorshipRequestForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
