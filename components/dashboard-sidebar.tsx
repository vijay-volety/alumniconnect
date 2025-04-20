"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Home,
  Calendar,
  Users,
  Gift,
  MessageSquare,
  Settings,
  User,
  LogOut,
  Award,
  DollarSign,
  Briefcase,
  BookOpen,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

interface DashboardSidebarProps {
  userType: "student" | "alumni"
}

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  // Update the href paths to match our new structure
  const commonMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: `/dashboard/${userType === "student" ? "student" : "alumni"}`,
    },
    {
      title: "Events",
      icon: Calendar,
      href: "/dashboard/events",
    },
    {
      title: "Mentorship",
      icon: Users,
      href: "/dashboard/mentorship",
    },
    {
      title: "Gamification",
      icon: Gift,
      href: "/dashboard/gamification",
    },
    {
      title: "Chat Support",
      icon: MessageSquare,
      href: "/dashboard/chat",
    },
  ]

  const alumniMenuItems = [
    {
      title: "Donate",
      icon: DollarSign,
      href: "/dashboard/alumni/donate",
    },
    {
      title: "Job Board",
      icon: Briefcase,
      href: "/dashboard/jobs",
    },
  ]

  const studentMenuItems = [
    {
      title: "Resources",
      icon: BookOpen,
      href: "/dashboard/resources",
    },
    {
      title: "Achievements",
      icon: Award,
      href: "/dashboard/achievements",
    },
  ]

  // Determine which menu items to show based on user type
  const menuItems = [...commonMenuItems, ...(userType === "alumni" ? alumniMenuItems : studentMenuItems)]

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-purple-200 dark:border-purple-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-800">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                {session?.user?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></div>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium leading-none text-purple-800 dark:text-purple-200">Alumni Connect</p>
            <p className="text-xs text-purple-600 dark:text-purple-400 truncate">
              {userType === "student" ? "Student Portal" : "Alumni Portal"}
            </p>
          </div>
          <SidebarTrigger className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-600 dark:text-purple-400">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className={
                      pathname === item.href
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                        : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    }
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={pathname === item.href ? "text-white" : "text-purple-600 dark:text-purple-400"}
                      />
                      <span>{item.title}</span>
                      {item.title === "Gamification" && (
                        <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile" className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
              <Link href="/profile">
                <User className="text-purple-600 dark:text-purple-400" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
              <Link href="/settings">
                <Settings className="text-purple-600 dark:text-purple-400" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
              onClick={handleSignOut}
            >
              <button>
                <LogOut className="text-red-600 dark:text-red-400" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
