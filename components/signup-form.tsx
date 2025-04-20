"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { Loader2 } from "lucide-react"

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
    userType: z.enum(["student", "alumni"]),
    graduationYear: z.string().optional(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

export function SignupForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [signupError, setSignupError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "student",
      graduationYear: "",
      acceptTerms: false,
    },
  })

  const userType = form.watch("userType")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setSignupError(null)

    try {
      // Log the values being sent
      console.log("Sending signup data:", values)

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      // Log the raw response
      console.log("Response status:", response.status)
      
      const data = await response.json()
      console.log("Response data:", data)

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account")
      }

      toast({
        title: "Account created!",
        description: "Welcome to the Alumni Association Platform!",
      })

      // Log in the user
      const signInResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (signInResult?.error) {
        throw new Error("Failed to sign in after registration")
      }

      // Redirect based on user type
      if (values.userType === "student") {
        router.push("/dashboard/student")
      } else {
        router.push("/dashboard/alumni")
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      setSignupError(error.message || "Something went wrong. Please try again.")
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {signupError && (
          <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
            <p className="font-medium">Error: {signupError}</p>
            {signupError.includes("database") && (
              <p className="mt-1 text-xs">
                The database might not be properly set up. Please make sure you've run the migrations.
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Your first name"
              {...form.register("firstName")}
              className="bg-white/10 border-purple-300 focus-visible:ring-purple-500"
            />
            {form.formState.errors.firstName && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Your last name"
              {...form.register("lastName")}
              className="bg-white/10 border-purple-300 focus-visible:ring-purple-500"
            />
            {form.formState.errors.lastName && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.lastName.message}</p>
            )}
          </div>
        </div>

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...form.register("confirmPassword")}
              className="bg-white/10 border-purple-300 focus-visible:ring-purple-500"
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="userType">I am a</Label>
          <Select
            onValueChange={(value) => form.setValue("userType", value as "student" | "alumni")}
            defaultValue={form.getValues("userType")}
          >
            <SelectTrigger className="bg-white/10 border-purple-300 focus-visible:ring-purple-500">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="alumni">Alumni</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.userType && (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.userType.message}</p>
          )}
        </div>

        {userType === "alumni" && (
          <div className="space-y-2">
            <Label htmlFor="graduationYear">Graduation Year</Label>
            <Select
              onValueChange={(value) => form.setValue("graduationYear", value)}
              defaultValue={form.getValues("graduationYear")}
            >
              <SelectTrigger className="bg-white/10 border-purple-300 focus-visible:ring-purple-500">
                <SelectValue placeholder="Select graduation year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.graduationYear && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.graduationYear.message}</p>
            )}
          </div>
        )}

        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-purple-300 p-4 bg-white/5">
          <Checkbox
            id="acceptTerms"
            checked={form.watch("acceptTerms")}
            onCheckedChange={(checked) => form.setValue("acceptTerms", checked as boolean)}
            className="border-purple-300 data-[state=checked]:bg-purple-600"
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="acceptTerms">Accept terms and conditions</Label>
            <p className="text-sm text-muted-foreground">
              I agree to the{" "}
              <Link href="/terms" className="text-primary underline hover:text-primary/80">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary underline hover:text-primary/80">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        {form.formState.errors.acceptTerms && (
          <p className="text-sm font-medium text-destructive">{form.formState.errors.acceptTerms.message}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
          Log in
        </Link>
      </div>
    </div>
  )
}
