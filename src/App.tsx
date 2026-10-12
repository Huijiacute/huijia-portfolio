import { useEffect, useRef, useState } from "react"

import { Biography } from "@/components/biography"
import { Hero } from "@/components/hero"
import { LiquidBackground } from "@/components/liquid-ether/LiquidBackground"
import { Portfolio } from "@/components/portfolio"
import { Possibilities } from "@/components/possibilities"
import { ProfileCard } from "@/components/profile-card"
import { SelectedWorks } from "@/components/selected-works"
import { TopNav } from "@/components/top-nav"

export function App() {
  // The fixed profile card stays pinned ("stuck") while scrolling the first
  // sections, then transitions out (slides left + fades) once the Contact
  // section (#possibilities) comes into view, and stays gone to the end.
  const contactRef = useRef<HTMLElement>(null)
  const [cardGone, setCardGone] = useState(false)

  useEffect(() => {
    const node = contactRef.current
    if (!node || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => setCardGone(entry.isIntersecting),
      // Trigger as the top of the Contact section enters the lower viewport.
      { threshold: 0, rootMargin: "0px 0px -40% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="cine-root cine-grain cine-vignette ">
      {/* Liquid fluid field fixed behind all content. */}
      <LiquidBackground />

      {/* Fixed profile card pinned to the left of the screen (stays on scroll).
          It slides out to the left and fades once the Contact section is
          reached, then stays gone for the remainder of the page. */}
      <div
        data-liquid-layer
        className={[
          "pointer-events-none fixed inset-y-0 left-0 z-20 hidden w-[480px] items-start p-6 lg:flex ml-8",
          "transition-all duration-700 ease-in-out",
          cardGone
            ? "-translate-x-[120%] opacity-0"
            : "translate-x-0 opacity-100",
        ].join(" ")}
        aria-hidden={cardGone}
      >
        <div
          className={[
            "max-h-[calc(100vh-3rem)] w-full overflow-y-auto",
            cardGone ? "pointer-events-none" : "pointer-events-auto",
          ].join(" ")}
        >
          <ProfileCard />
        </div>
      </div>

      {/* Main content, offset to the right of the fixed card on large screens. */}
      <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:pr-10 lg:pl-[456px]" >
        {/* The profile card also appears inline on small screens (card hidden above). */}
        <div className="mb-6 lg:hidden">
          <ProfileCard />
        </div>

        <div className="flex flex-col gap-54 ml-24 mr-2">
          <div className="sticky top-0 z-30 py-3 backdrop-blur-sm">
            <TopNav />
          </div>
          <main>
            <Hero />
            <Biography />
            <Portfolio />
            <SelectedWorks />
          </main>
        </div>
      </div>

      {/* Contact section — rendered full-screen outside the offset container so
          it spans the entire viewport width. */}
      <Possibilities ref={contactRef} />
    </div>
  )
}

export default App
