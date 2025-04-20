import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Suspense } from "react"

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="h-screen flex">
        <DashboardSidebar userType="student" />
        <SidebarInset>
          <DashboardHeader userType="student" />
          <div className="p-4 md:p-6 overflow-auto">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
