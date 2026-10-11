import { Biography } from "@/components/biography"
import { Hero } from "@/components/hero"
import { LiquidBackground } from "@/components/liquid-ether/LiquidBackground"
import { Portfolio } from "@/components/portfolio"
import { Possibilities } from "@/components/possibilities"
import { ProfileCard } from "@/components/profile-card"
import { SelectedWorks } from "@/components/selected-works"
import { TopNav } from "@/components/top-nav"

export function App() {
  return (
    <div className="cine-root cine-grain cine-vignette">
      {/* Liquid fluid field fixed behind all content. */}
      <LiquidBackground />

      {/* Fixed profile card pinned to the left of the screen (stays on scroll). */}
      <div
        data-liquid-layer
        className="pointer-events-none fixed inset-y-0 left-0 z-20 hidden w-[480px] items-start p-6 lg:flex"
      >
        <div className="pointer-events-auto max-h-[calc(100vh-3rem)] w-full overflow-y-auto">
          <ProfileCard />
        </div>
      </div>

      {/* Main content, offset to the right of the fixed card on large screens. */}
      <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:pr-10 lg:pl-[456px]">
        {/* The profile card also appears inline on small screens (card hidden above). */}
        <div className="mb-6 lg:hidden">
          <ProfileCard />
        </div>

        <div className="flex flex-col gap-48">
          <TopNav />
          <main>
            <Hero />
            <Biography />
            <Portfolio />
            <SelectedWorks />
            <Possibilities />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
