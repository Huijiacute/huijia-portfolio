import { useState } from "react"

import { cn } from "@/lib/utils"

const CATEGORIES = [
  {
    tab: "3D Design",
    title: "3D Design",
    desc: "High-quality 3D modeling, rendering, characters, animals and scenes with vivid, detailed visuals.",
    meta: "CHARACTER · MODELING · RENDER",
  },
  {
    tab: "UI Design",
    title: "UI Design",
    desc: "User experience with visual polish — app interfaces, B-side data viz and interaction design.",
    meta: "PRODUCT · SYSTEM · FLOW",
  },
  {
    tab: "Illustration IP",
    title: "Illustration IP",
    desc: "Illustration & IP creation with story-driven characters built to grow alongside the work.",
    meta: "IP · EXPRESSION · STORY",
  },
]

export function Portfolio() {
  const [active, setActive] = useState(0)

  return (
    <section id="portfolio" className="cine-section relative overflow-hidden">
      <div className="cine-eyebrow absolute top-24 left-10">
        03 — Work Projects
      </div>
      <div className="cine-eyebrow absolute top-24 right-10 text-right">
        3D Design · UI Design
        <br />
        Illustration &amp; IP
      </div>

      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="cine-display text-[clamp(3rem,8vw,7rem)]">
          My Portfolio.
        </h2>
        <p className="cine-ui mt-4 max-w-md text-sm text-[var(--cine-muted)]">
          Check out all the projects 
        </p>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
          {/* Folder graphic */}
          <div className="relative mx-auto w-full max-w-md">
            {/* Tabs peeking out of the folder */}
            <div className="animate-lid-peek absolute -top-6 left-6 z-0 flex gap-2">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c.tab}
                  onClick={() => setActive(i)}
                  className={cn(
                    "cine-ui rounded-t-md px-3 py-1.5 text-xs font-medium tracking-wide transition-all",
                    active === i
                      ? "-translate-y-1 bg-[var(--cine-accent)] text-black"
                      : "bg-[#c99a5b] text-black/70 hover:-translate-y-0.5",
                  )}
                >
                  {c.tab}
                </button>
              ))}
            </div>

            {/* Folder body */}
            <div className="relative z-10 rounded-2xl rounded-tl-sm bg-gradient-to-b from-[#e6a94e] to-[#d2902f] p-8 shadow-2xl">
              <p className="cine-display text-4xl text-[#5a3c12]">
                Portfolio
                <span className="text-2xl"> — HJ</span>
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="cine-ui text-xs text-[#5a3c12]/70 uppercase">
                  Click a tab to open
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8fae4a] text-lg text-white shadow">
                  →
                </span>
              </div>
            </div>
          </div>

          {/* Active category card */}
          <div className="relative">
            <div className="rounded-2xl border border-[var(--cine-line)] bg-white/40 p-8 backdrop-blur-sm dark:bg-black/25">
              <span className="cine-ui inline-block rounded-md bg-[var(--cine-accent)] px-2.5 py-1 text-xs font-medium text-black">
                {CATEGORIES[active].title}
              </span>
              <p className="cine-ui mt-5 text-lg leading-relaxed text-[var(--cine-cream)]">
                {CATEGORIES[active].desc}
              </p>
              <p className="cine-ui mt-6 text-[11px] tracking-[0.3em] text-[var(--cine-muted)] uppercase">
                {CATEGORIES[active].meta}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
