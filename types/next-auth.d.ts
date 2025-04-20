declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      userType: string
      image?: string
    }
  }

  interface User {
    id: string
    name: string
    email: string
    userType: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    userType: string
  }
}
