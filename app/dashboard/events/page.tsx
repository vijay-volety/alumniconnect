import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsList } from "@/components/events-list"

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="text-muted-foreground">Discover upcoming events and networking opportunities</p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="registered">Registered Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <EventsList type="upcoming" />
        </TabsContent>
        <TabsContent value="registered" className="mt-6">
          <EventsList type="registered" />
        </TabsContent>
        <TabsContent value="past" className="mt-6">
          <EventsList type="past" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
