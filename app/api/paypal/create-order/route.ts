import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { paypal } from "@/lib/paypal"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { amount, donationType, fundType, message } = body

    const order = await paypal.createOrder({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toString(),
          },
          description: `${donationType} donation for ${fundType} fund`,
          custom_id: `${fundType}_${donationType}_${session.user.email}`,
        },
      ],
      application_context: {
        brand_name: "Alumni Association",
        shipping_preference: "NO_SHIPPING",
      },
    })

    return NextResponse.json({ id: order.id })
  } catch (error) {
    console.error("PayPal order creation error:", error)
    return NextResponse.json(
      { error: "Failed to create PayPal order" },
      { status: 500 }
    )
  }
}
