import { useRef, useState } from "react"

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
  gradient: string
}

const WORKS: Work[] = [
  {
    title: "In-Car Experience",
    category: "In-Car HMI",
    meta: "HMI · MEDIA · VISUAL SYSTEM",
    gradient: "from-slate-700 to-slate-900",
  },
  {
    title: "Brand Banner System",
    category: "Operations Banner",
    meta: "LAYOUT · MOTION · CAMPAIGN",
    gradient: "from-amber-700 to-stone-900",
  },
  {
    title: "Full Brand Identity",
    category: "Branding",
    meta: "LOGO · GUIDELINES · TONE",
    gradient: "from-emerald-700 to-emerald-950",
  },
  {
    title: "JiaYouYa IP Character",
    category: "IP Character",
    meta: "IP · EXPRESSION · STORY",
    gradient: "from-lime-600 to-green-900",
  },
  {
    title: "Illustration Series",
    category: "Illustration",
    meta: "STYLE · COLOR · NARRATIVE",
    gradient: "from-rose-700 to-rose-950",
  },
  {
    title: "Product Render Pack",
    category: "Product Render",
    meta: "3D · LIGHTING · MATERIAL",
    gradient: "from-cyan-700 to-slate-900",
  },
]

export function SelectedWorks() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeChip, setActiveChip] = useState(0)

  // Drag-to-scroll
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0 })

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current
    if (!el) return
    drag.current = {
      down: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    }
    el.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current
    if (!el || !drag.current.down) return
    el.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX)
  }
  const onPointerUp = () => {
    drag.current.down = false
  }

  return (
    <section id="works" className="cine-section relative overflow-hidden">
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

        {/* Draggable gallery */}
        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="mt-10 flex cursor-grab gap-6 overflow-x-auto pb-6 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {WORKS.map((w) => (
            <article
              key={w.title}
              className="group relative aspect-[16/10] w-[75vw] shrink-0 overflow-hidden rounded-xl border border-[var(--cine-line)] sm:w-[520px]"
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
                  w.gradient,
                )}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <p className="cine-display text-3xl text-white">{w.title}</p>
                <p className="cine-ui mt-1 text-sm text-white/80">
                  {w.category}
                </p>
                <p className="cine-ui mt-3 text-[11px] tracking-[0.3em] text-white/60 uppercase">
                  {w.meta}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="cine-ui mt-2 text-center text-[11px] tracking-[0.3em] text-[var(--cine-muted)] uppercase">
          ← drag to browse →
        </p>
      </div>
    </section>
  )
}

export default SelectedWorks
