import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GET() {
  try {
    const session = await getSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = Number.parseInt(session.user.id)

    if (isNaN(userId)) {
      return NextResponse.json({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        userType: session.user.userType || "student",
      })
    }

    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: {
          id: true,
          name: true,
          email: true,
          userType: true,
          graduationYear: true,
          company: true,
          position: true,
          location: true,
          bio: true,
          avatar: true,
          points: true,
        },
      })

      if (!user) {
        // Fall back to session data if user not found in DB
        return NextResponse.json({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          userType: session.user.userType || "student",
        })
      }

      return NextResponse.json(user)
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Fall back to session data if DB query fails
      return NextResponse.json({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        userType: session.user.userType || "student",
      })
    }
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}
