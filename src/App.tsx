import { Biography } from "@/components/biography"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { Possibilities } from "@/components/possibilities"
import { SelectedWorks } from "@/components/selected-works"
import { TopNav } from "@/components/top-nav"

export function App() {
  return (
    <div className="cine-root cine-grain cine-vignette">
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
