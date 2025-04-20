import { Card } from "@/components/ui/card"
import { ChatInterface } from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <div className="space-y-6 h-[calc(100vh-10rem)]">
      <div>
        <h1 className="text-3xl font-bold">Support Chat</h1>
        <p className="text-muted-foreground">Get assistance from our chatbot or connect with support</p>
      </div>

      <Card className="flex-1 h-[calc(100%-5rem)]">
        <ChatInterface />
      </Card>
    </div>
  )
}
