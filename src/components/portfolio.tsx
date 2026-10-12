import { useState } from "react"

import Folder from "@/components/folder/Folder"

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

      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="cine-display text-[clamp(3rem,8vw,7rem)]">
          My Work Projects
        </h2>
        <p className="cine-ui mt-4 max-w-md text-sm text-[var(--cine-muted)]">
          Browse my work below. Like what you see? Let's build something together!
        </p>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
          {/* Interactive folder (React Bits) */}
          <div className="flex min-h-[320px] items-center justify-center">
            <Folder
              color="#6366F1"
              label="Portfolio"
              size={1.4}
              items={CATEGORIES.map((c) => ({
                title: c.title,
                description: c.desc,
              }))}
              onItemClick={(_item, index) => setActive(index)}
            />
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
