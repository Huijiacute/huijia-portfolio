import { InteractiveAvatar } from "@/components/interactive-avatar"

const TOOLS = [
  { label: "Ps", color: "#31a8ff", bg: "#001e36", top: "18%", left: "6%", delay: "0s" },
  { label: "Ae", color: "#9999ff", bg: "#00005b", top: "48%", left: "0%", delay: "0.6s" },
  { label: "Ai", color: "#ff9a00", bg: "#330000", top: "72%", left: "12%", delay: "1.1s" },
  { label: "Fig", color: "#a259ff", bg: "#1e1e1e", top: "30%", left: "22%", delay: "0.3s" },
  { label: "Bl", color: "#ea7600", bg: "#1a1a1a", top: "62%", left: "28%", delay: "0.9s" },
]

export function Possibilities() {
  return (
    <section
      id="possibilities"
      className="cine-section relative overflow-hidden"
    >
      <div className="cine-eyebrow absolute top-24 left-10">
        05 — Contact
      </div>

      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="cine-display text-center text-[clamp(2.5rem,8vw,7rem)]">
          Beyond The Ordinary.
        </h2>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          {/* Left: tagline + floating tools */}
          <div className="relative min-h-[320px]">
            {TOOLS.map((t) => (
              <div
                key={t.label}
                className="animate-icon-drift absolute flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold shadow-xl"
                style={{
                  top: t.top,
                  left: t.left,
                  color: t.color,
                  background: t.bg,
                  animationDelay: t.delay,
                }}
              >
                {t.label}
              </div>
            ))}
            <div className="absolute bottom-0 left-0">
              <p className="cine-display text-3xl text-[var(--cine-cream)]">
                Let Ideas Take Off.
              </p>
              <p className="cine-ui mt-2 max-w-xs text-sm text-[var(--cine-muted)]">
                Let imagination break its edges — the impossible becomes your
                next piece.
              </p>
            </div>
          </div>

          {/* Right: reactive avatar */}
          <div className="relative flex items-center justify-center">
            <InteractiveAvatar className="max-w-[460px]" />
            <a
              href="#hero"
              className="cine-ui absolute right-0 bottom-6 inline-flex items-center gap-2 rounded-full border border-[var(--cine-line)] px-4 py-2 text-xs tracking-widest uppercase transition-colors hover:bg-white/5"
            >
              Take it from the top ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Possibilities
