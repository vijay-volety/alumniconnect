"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "An error occurred during authentication."

  if (error === "CredentialsSignin") {
    errorMessage = "Invalid email or password. Please try again."
  } else if (error === "AccessDenied") {
    errorMessage = "You do not have permission to access this resource."
  } else if (error === "Configuration") {
    errorMessage = "There is a problem with the server configuration."
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-purple-200 bg-white p-6 shadow-md dark:border-purple-800 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Authentication Error</h1>
          <p className="text-purple-600 dark:text-purple-400">{errorMessage}</p>
        </div>

        <div className="flex flex-col space-y-3">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Link href="/login">Try Again</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-purple-300 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:bg-purple-900/20"
          >
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
