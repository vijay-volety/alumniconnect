import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    try {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      })

      // If the user is not authenticated, redirect to the login page
      if (!token) {
        const url = new URL("/login", request.url)
        return NextResponse.redirect(url)
      }

      // Simple routing based on user type
      if (pathname === "/dashboard") {
        const userType = (token.userType as string) || "student"
        return NextResponse.redirect(new URL(`/dashboard/${userType}`, request.url))
      }
    } catch (error) {
      console.error("Middleware error:", error)
      // If there's an error, redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
}
