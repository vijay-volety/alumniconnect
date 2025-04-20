import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { WallOfFame } from "@/components/wall-of-fame"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <WallOfFame />
      </main>
      <Footer />
    </div>
  )
}
