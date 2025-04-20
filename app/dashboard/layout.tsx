import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Suspense } from "react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth" // make sure this path matches your project

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const userType = session?.user?.userType ?? "student" // fallback if undefined

  return (
    <SidebarProvider>
      <div className="h-screen flex">
        <DashboardSidebar userType={userType} />
        <SidebarInset>
          <DashboardHeader userType={userType} />
          <div className="p-4 md:p-6 overflow-auto">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   // In a real app, you would determine the user type from authentication
//   // For now, we'll default to "student" for shared pages
//   const userType = "student"

//   return (
//     <SidebarProvider>
//       <div className="h-screen flex">
//         <DashboardSidebar userType={userType} />
//         <SidebarInset>
//           <DashboardHeader userType={userType} />
//           <div className="p-4 md:p-6 overflow-auto">
//             <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
//           </div>
//         </SidebarInset>
//       </div>
//     </SidebarProvider>
//   )
// }
