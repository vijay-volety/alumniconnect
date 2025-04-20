import { compare } from "bcryptjs"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null
      
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        })
      
        if (!user) {
          console.log("❌ User not found")
          return null
        }
      
        console.log("👤 User fetched from DB:", JSON.stringify(user, null, 2))
        console.log("👉 password from DB:", user.password)
        console.log("👉 typeof password:", typeof user.password)
      
        const isPasswordCorrect = await compare(credentials.password, user.password)
      
        if (!isPasswordCorrect) {
          console.log("❌ Incorrect password")
          return null
        }
      
        console.log("✅ Authorized user:", user)
      
        // ✅ Fix the type here
        return {
          id: String(user.id),
          email: user.email,
          name: user.name
          // Optionally include: userType, graduationYear, etc.
        }
      },
    }),
  ],
  // other NextAuth config here
}
