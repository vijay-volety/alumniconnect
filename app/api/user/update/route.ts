import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function PUT(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await req.json()
    const updatedUser = await db.user.update({
      where: { email: session.user.email },
      data: {
        firstName: data.name.split(' ')[0],
        lastName: data.name.split(' ')[1] || '',
        phone: data.phone,
        location: data.location,
        company: data.company,
        position: data.position,
        bio: data.bio,
        graduationYear: data.graduationYear,
        skills: data.skills,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}