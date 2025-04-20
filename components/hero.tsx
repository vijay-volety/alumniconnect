import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Users, Award } from "lucide-react"

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient opacity-10" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6">
            <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Join our growing community</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Connect, Mentor, Grow Together
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-800 dark:text-purple-200">
            Join our alumni network to connect with fellow graduates, mentor students, and participate in exclusive
            events that foster growth and opportunity.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full"
              >
                Join Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-purple-300 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:bg-purple-900/20 rounded-full"
              >
                Already a Member
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-500 mr-2" />
              <span className="font-medium text-purple-800 dark:text-purple-200">5,000+ Members</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-purple-300 dark:bg-purple-700"></div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-purple-500 mr-2" />
              <span className="font-medium text-purple-800 dark:text-purple-200">Trusted by 200+ Universities</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
