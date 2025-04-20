import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { donations } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GET() {
  try {
    const session = await getSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = Number.parseInt(session.user.id)

    const userDonations = await db.query.donations.findMany({
      where: eq(donations.userId, userId),
      orderBy: (donations, { desc }) => [desc(donations.createdAt)],
    })

    // Format donations for the frontend
    const formattedDonations = userDonations.map((donation) => ({
      id: `DON-${donation.id.toString().padStart(3, "0")}`,
      date: donation.createdAt.toISOString(),
      amount: donation.amount,
      type:
        donation.donationType === "oneTime" ? "One-time" : donation.donationType === "monthly" ? "Monthly" : "Yearly",
      fundType: donation.fundType.charAt(0).toUpperCase() + donation.fundType.slice(1),
      status: donation.status.charAt(0).toUpperCase() + donation.status.slice(1),
    }))

    return NextResponse.json(formattedDonations)
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
  }
}
