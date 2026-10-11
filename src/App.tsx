import { Biography } from "@/components/biography"
import { Hero } from "@/components/hero"
import { AeroBackground } from "@/components/ink-reveal/AeroBackground"
import { Portfolio } from "@/components/portfolio"
import { Possibilities } from "@/components/possibilities"
import { SelectedWorks } from "@/components/selected-works"
import { TopNav } from "@/components/top-nav"

export function App() {
  return (
    <div className="cine-root cine-grain cine-vignette">
      {/* Shard field fixed behind all content. */}
      <AeroBackground />
      <TopNav />
      <main>
        <Hero />
        <Biography />
        <Portfolio />
        <SelectedWorks />
        <Possibilities />
      </main>
    </div>
  )
}

export default App
