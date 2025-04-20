import { LoginForm } from "@/components/login-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
          <p className="text-center text-muted-foreground mb-8">Log in to your account to continue your journey</p>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
