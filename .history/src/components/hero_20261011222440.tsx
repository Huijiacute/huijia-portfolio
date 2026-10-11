import { ArrowDown, Download, Sparkles } from "lucide-react"

/**
 * Hero — the primary content of the right column. A small "Let's meet!" chip,
 * a large display heading, and two actions (My Works / Download CV), matching
 * the reference layout.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="mf-body relative flex min-h-[70vh] flex-col justify-center py-10"
    >
      {/* "Let's meet!" chip */}
      <span
        className={[
          "mb-8 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium",
          "bg-white/80 text-black/70 shadow-sm backdrop-blur",
          "dark:bg-white/10 dark:text-white/80",
        ].join(" ")}
      >
        <Sparkles className="h-4 w-4 text-[#7C3AED] dark:text-[#A855F7]" aria-hidden />
        Let&apos;s meet!
      </span>

      {/* Big display heading */}

        <br />
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
