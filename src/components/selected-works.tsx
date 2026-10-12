import { forwardRef, useState } from "react"

import FlexCarousel from "@/components/flex-carousel/FlexCarousel"
import { cn } from "@/lib/utils"

const CHIPS = [
  "01 In-Car",
  "02 Banner",
  "03 Branding",
  "04 IP Character",
  "05 Illustration",
  "06 E-commerce",
  "07 Product Render",
]

type Work = {
  title: string
  category: string
  meta: string
  /** [from, to] gradient stop colors used to render the card artwork. */
  colors: [string, string]
}

const WORKS: Work[] = [
  {
    title: "In-Car Experience",
    category: "In-Car HMI",
    meta: "HMI · MEDIA · VISUAL SYSTEM",
    colors: ["#334155", "#0f172a"], // slate-700 → slate-900
  },
  {
    title: "Brand Banner System",
    category: "Operations Banner",
    meta: "LAYOUT · MOTION · CAMPAIGN",
    colors: ["#b45309", "#1c1917"], // amber-700 → stone-900
  },
  {
    title: "Full Brand Identity",
    category: "Branding",
    meta: "LOGO · GUIDELINES · TONE",
    colors: ["#047857", "#022c22"], // emerald-700 → emerald-950
  },
  {
    title: "JiaYouYa IP Character",
    category: "IP Character",
    meta: "IP · EXPRESSION · STORY",
    colors: ["#65a30d", "#14532d"], // lime-600 → green-900
  },
  {
    title: "Illustration Series",
    category: "Illustration",
    meta: "STYLE · COLOR · NARRATIVE",
    colors: ["#be123c", "#4c0519"], // rose-700 → rose-950
  },
  {
    title: "Product Render Pack",
    category: "Product Render",
    meta: "3D · LIGHTING · MATERIAL",
    colors: ["#0e7490", "#0f172a"], // cyan-700 → slate-900
  },
]

/**
 * FlexCarousel renders images from a `src`. The works are gradient artwork
 * rather than photos, so each card is drawn as an inline SVG gradient and
 * passed as a data URI. This keeps the colored look with no external assets.
 */
function gradientSrc(from: string, to: string, title: string, category: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#g)"/>
  <rect width="800" height="500" fill="rgba(0,0,0,0.2)"/>
  <text x="48" y="400" fill="#ffffff" font-family="system-ui, sans-serif" font-size="46" font-weight="600">${esc(title)}</text>
  <text x="48" y="440" fill="rgba(255,255,255,0.8)" font-family="system-ui, sans-serif" font-size="22">${esc(category)}</text>
</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const CAROUSEL_ITEMS = WORKS.map((w) => ({
  src: gradientSrc(w.colors[0], w.colors[1], w.title, w.category),
  alt: `${w.title} — ${w.category}`,
  title: w.title,
  subtitle: w.category,
}))

export const SelectedWorks = forwardRef<HTMLElement>(function SelectedWorks(
  _props,
  ref,
) {
  const [activeChip, setActiveChip] = useState(0)

  return (
    <section
      id="works"
      ref={ref}
      className="cine-section relative overflow-hidden"
    >
      <div className="cine-eyebrow absolute top-24 left-10">
        04 — Selected Works
      </div>
      <div className="cine-eyebrow absolute top-24 right-10 text-right">
        7 Categories · 20 Works
        <br />
        Scroll or drag
      </div>

      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="cine-display text-center text-[clamp(2.5rem,7vw,6rem)]">
          Selected Works.
        </h2>

        {/* Filter chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CHIPS.map((c, i) => (
            <button
              key={c}
              onClick={() => setActiveChip(i)}
              className={cn(
                "cine-ui rounded-full border px-4 py-1.5 text-xs tracking-wide transition-colors",
                activeChip === i
                  ? "border-[var(--cine-accent)] bg-[var(--cine-accent)] text-black"
                  : "border-[var(--cine-line)] text-[var(--cine-muted)] hover:text-[var(--cine-cream)]",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* FlexCarousel gallery (React Bits) */}
        <div className="relative mt-10 h-[560px] w-full">
          <FlexCarousel
            items={CAROUSEL_ITEMS}
            preset="liquid"
            intro="rise"
            cardHeight={0.55}
            gap={16}
            radius={12}
            fit="landscape"
            squeeze={0.2}
            focusOnClick
            captions
          />
        </div>
        <p className="cine-ui mt-2 text-center text-[11px] tracking-[0.3em] text-[var(--cine-muted)] uppercase">
          ← drag to browse →
        </p>
      </div>
    </section>
  )
})

export default SelectedWorks
