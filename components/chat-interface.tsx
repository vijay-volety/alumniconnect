"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Bot, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

// Define message type
interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Define predefined responses for the chatbot
const botResponses: Record<string, string> = {
  hello: "Hello! How can I help you today?",
  hi: "Hi there! How can I assist you?",
  help: "I can help you with information about mentorship, events, achievements, and more. What would you like to know?",
  mentorship:
    "Our mentorship program connects students with alumni mentors. You can request mentorship or browse available mentors in the Mentorship section.",
  events: "Check out the Events section to see upcoming events, register for them, or view your registered events.",
  achievements:
    "Achievements are earned by participating in events, mentorship sessions, and other activities. View your achievements in your profile or the Gamification section.",
  points:
    "You earn points by completing achievements, attending events, and participating in mentorship sessions. These points contribute to your level and ranking.",
  profile:
    "You can customize your profile in the Profile section, including your personal information, achievements display, and privacy settings.",
  busy: "Alumni can toggle their 'I'm Busy' status to indicate when they're unavailable for mentorship requests.",
  donate:
    "Alumni can make donations to support scholarships, events, and mentorship programs through the Donate section.",
  default:
    "I'm not sure I understand. Could you rephrase your question or ask about mentorship, events, achievements, points, or profile settings?",
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Alumni Connect assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Generate bot response based on user input
  const generateBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    // Check for keyword matches
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response
      }
    }

    // Return default response if no keywords match
    return botResponses.default
  }

  // Format timestamp to readable time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    // Save the current input before clearing it
    const currentInput = inputMessage

    // Update state with user message and clear input
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Scroll to bottom after user message
    setTimeout(scrollToBottom, 100)

    // Add bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: generateBotResponse(currentInput),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      // Show toast for help-related queries
      if (currentInput.toLowerCase().includes("help") || currentInput.toLowerCase().includes("stuck")) {
        toast({
          title: "Support Available",
          description: "Our team is here to help. You can also reach out via email at support@alumniconnect.com",
        })
      }

      // Scroll to bottom after bot response
      setTimeout(scrollToBottom, 100)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <Avatar className={`h-8 w-8 ${message.sender === "user" ? "ml-2" : "mr-2"}`}>
                {message.sender === "user" ? (
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                )}
                <AvatarFallback>
                  {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted rounded-tl-none"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
        <form
          className="flex items-center"
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
        >
          <Input
            type="text"
            placeholder="Type your message..."
            className="flex-1 mr-2"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button type="submit" disabled={inputMessage.trim() === ""}>
            Send <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
