"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, X, ChevronDown, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

interface DashboardHeaderProps {
  userType: "student" | "alumni"
}

export function DashboardHeader({ userType }: DashboardHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <div className="border-b border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4">
        <SidebarTrigger className="mr-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300" />

        {isSearchOpen ? (
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-purple-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-white/50 dark:bg-white/10 pl-8 md:w-[300px] border-purple-300 focus-visible:ring-purple-500"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-9 w-9 rounded-full text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 gap-1 md:ml-0 border-purple-300 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:bg-purple-900/20"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="hidden md:inline-flex">Search</span>
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative border-purple-300 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:bg-purple-900/20"
              >
                <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-[0.6rem] bg-gradient-to-r from-purple-600 to-indigo-600">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="font-medium">Notifications</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Mark all as read
                </Button>
              </div>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-2 p-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 rounded-lg p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                    <Avatar className="h-9 w-9 border-2 border-purple-200 dark:border-purple-800">
                      <AvatarImage src={`/placeholder.svg?height=36&width=36`} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                        U{i}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {i === 1 ? "New mentorship request" : i === 2 ? "Event reminder" : "New message"}
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-center text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/20"
                  size="sm"
                >
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/chat")}
            className="relative border-purple-300 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:bg-purple-900/20"
          >
            <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-[0.6rem] bg-gradient-to-r from-purple-600 to-indigo-600">
              2
            </Badge>
            <span className="sr-only">Messages</span>
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="pl-1 pr-1.5 md:pl-2 md:pr-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <Avatar className="h-6 w-6 md:h-8 md:w-8 border-2 border-purple-200 dark:border-purple-800">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 hidden md:flex items-center">
                  <span className="mr-1 font-medium">{session?.user?.name || "User"}</span>
                  <ChevronDown className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <div className="flex flex-col space-y-0.5">
                  <span className="text-sm font-medium">{session?.user?.name || "User"}</span>
                  <span className="text-xs text-muted-foreground">{session?.user?.email}</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/profile")}
                className="cursor-pointer text-purple-700 dark:text-purple-300 focus:bg-purple-50 dark:focus:bg-purple-900/20"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/settings")}
                className="cursor-pointer text-purple-700 dark:text-purple-300 focus:bg-purple-50 dark:focus:bg-purple-900/20"
              >
                Settings
              </DropdownMenuItem>
              {userType === "student" && (
                <DropdownMenuItem className="cursor-pointer text-purple-700 dark:text-purple-300 focus:bg-purple-50 dark:focus:bg-purple-900/20">
                  Switch to Alumni
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
