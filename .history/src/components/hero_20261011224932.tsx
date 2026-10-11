import { ArrowDown, Download } from "lucide-react"

import TechText from "@/components/tech-text/TechText"
import { useResolvedTheme } from "@/hooks/use-resolved-theme"

/**
 * Hero — the primary content of the right column. A TechText wordmark, a large
 * display heading, and two actions (My Works / Download CV), matching the
 * reference layout.
 */
export function Hero() {
  const resolvedTheme = useResolvedTheme()
  // Deep purple ink in light mode, soft lavender in dark mode.
  const techColor = resolvedTheme === "dark" ? "#b79cff" : "#4b2fb0"

  return (
    <section
      id="hero"
      className="mf-body relative flex min-h-[70vh] flex-col justify-center py-10"
    >
      {/* Interactive TechText wordmark (left-anchored; container sized near the
          text width so the component's internal centering reads as left-aligned) */}
      <div style={{ position: "relative", width: "min(100%, 720px)", height: 180, marginLeft: "-0.08em" }}>
        <TechText
          text="Lim Houykea"
          fontWeight={600}
          fontSize={120}
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={15}
          color={techColor}
          accentColor={techColor}
        />
      </div>

      {/* Big display heading */}
      <h2
        className="font-semibold tracking-tight text-[#1b123b] dark:text-[#e5d4fa]"
        style={{
          fontSize: "clamp(2.6rem, 6vw, 5rem)",
          lineHeight: 1.04,
          letterSpacing: "-0.02em",
        }}
      >
        Let&apos;s understand more
        <br />
        about me.
      </h2>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap items-center gap-5">
        <a
          href="#portfolio"
          className={[
            "inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium",
            "bg-white text-black shadow-[0_16px_40px_-20px_rgba(80,60,160,0.6)] transition-transform",
            "hover:-translate-y-0.5",
            "dark:bg-white/10 dark:text-white",
          ].join(" ")}
        >
          My Works
          <span className="grid grid-cols-2 gap-0.5" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-[1px] bg-current" />
            <span className="h-1.5 w-1.5 rounded-[1px] bg-current" />
            <span className="h-1.5 w-1.5 rounded-[1px] bg-current" />
            <span className="h-1.5 w-1.5 rounded-[1px] bg-current" />
          </span>
        </a>

        <a
          href="#"
          className="inline-flex items-center gap-2 font-medium text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
        >
          Download CV
          <Download className="h-4 w-4" aria-hidden />
        </a>
      </div>

      {/* Scroll hint */}
      <a
        href="#biography"
        aria-label="Scroll for more"
        className="mt-12 inline-flex w-fit items-center gap-2 text-xs tracking-[0.25em] text-black/40 uppercase dark:text-white/40"
      >
        Scroll for more
        <ArrowDown className="animate-scroll-bob h-4 w-4" aria-hidden />
      </a>
    </section>
  )
}

export default Hero
