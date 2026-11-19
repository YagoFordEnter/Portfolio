import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Resume } from "@/components/resume"
import { Footer } from "@/components/footer"
import { AccessHomeAnalyzer } from "@/components/access-home-analyzer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
      <Resume />
      <Footer />
      <AccessHomeAnalyzer />
    </main>
  )
}
