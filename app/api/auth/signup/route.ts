import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  // Define headers properly
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  } as const

  try {
    console.log("API: Received signup request")
    
    const body = await req.json()
    console.log("API: Received body:", body)
    const { email, password, firstName, lastName, userType, graduationYear } = body

    // Log the received data (for debugging)
    console.log('Received signup data:', { email, firstName, lastName, userType, graduationYear })

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers }
      )
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400, headers }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        userType,
        graduationYear: graduationYear || null,
      },
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      }
    }, { headers })

  } catch (error: unknown) {
    console.error("API Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json(
      { 
        error: "Error creating user",
        details: errorMessage
      },
      { status: 500, headers }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(req: Request) {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
