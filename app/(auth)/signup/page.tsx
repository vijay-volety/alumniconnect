import { SignupForm } from "@/components/signup-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Join the Alumni Network</h1>
          <p className="text-center text-muted-foreground mb-8">
            Create an account to connect with students and alumni
          </p>
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
