"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
})

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setAuthError(null)

    try {
      // First, test the database connection
      const dbTest = await fetch("/api/test-db")
      const dbTestResult = await dbTest.json()

      if (!dbTestResult.success) {
        console.error("Database connection test failed:", dbTestResult.error)
        setAuthError("Database connection error. Please try again later.")
        toast({
          title: "Database Error",
          description: "Could not connect to the database. Please try again later.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Proceed with sign in
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        console.error("Login error:", result.error)
        setAuthError("Invalid email or password")
        toast({
          title: "Login failed",
          description: "Please check your email and password.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      toast({
        title: "Login successful!",
        description: "Welcome back to the Alumni Association Platform!",
      })

      // Simple redirect to dashboard - we'll let the middleware handle the specific route
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setAuthError("An unexpected error occurred")
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {authError && <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{authError}</div>}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="your.email@example.com"
            {...form.register("email")}
            className="bg-white/10 border-purple-300 focus-visible:ring-purple-500"
          />
          {form.formState.errors.email && (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            className="bg-white/10 border-purple-300 focus-visible:ring-purple-500"
          />
          {form.formState.errors.password && (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={form.watch("rememberMe")}
            onCheckedChange={(checked) => form.setValue("rememberMe", checked as boolean)}
            className="border-purple-300 data-[state=checked]:bg-purple-600"
          />
          <Label htmlFor="rememberMe">Remember me</Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging In...
            </>
          ) : (
            "Log In"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:text-primary/80 font-medium">
          Sign up
        </Link>
      </div>
    </div>
  )
}
