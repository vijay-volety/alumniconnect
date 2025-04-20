import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { donations, users } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const session = await getSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const paypalUrl = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com"

    const response = await fetch(`${paypalUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
      },
    })

    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 })
    }

    // Save donation to database
    if (data.status === "COMPLETED") {
      const amount = Number.parseFloat(data.purchase_units[0].amount.value) * 100 // Store in cents

      await db.insert(donations).values({
        userId: Number.parseInt(session.user.id),
        amount: amount,
        paymentId: orderId,
        donationType: "oneTime", // This would come from the form in a real app
        fundType: "general", // This would come from the form in a real app
        status: "completed",
      })

      // Award points to the user
      await db
        .update(users)
        .set({
          points: (u) => `${u.points} + 50`,
        })
        .where(eq(users.id, Number.parseInt(session.user.id)))
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error capturing PayPal order:", error)
    return NextResponse.json({ error: "Failed to capture order" }, { status: 500 })
  }
}
