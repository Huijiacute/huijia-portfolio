import { InteractiveAvatar } from "@/components/interactive-avatar"

const CREDENTIALS = [
  "Super AI blogger",
  "Certified designer",
  "Adobe-certified instructor",
  "Design educator",
]

export function Biography() {
  return (
    <section id="biography" className="cine-section relative overflow-hidden">
      <div className="cine-eyebrow absolute top-24 left-10">
        02 — About Me
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 md:grid-cols-2">
        {/* Left: headline + credentials */}
        <div className="relative z-10">
          <h2 className="cine-display text-[clamp(3rem,7vw,6rem)]">
            Design.
            <br />
            Teach.
            <br />
            Build.
          </h2>
          <p className="cine-ui mt-6 text-lg tracking-wide text-[var(--cine-cream)]">
            Hui Jia · Design that makes sense
          </p>
          <ul className="cine-ui mt-6 space-y-1.5 border-t border-[var(--cine-line)] pt-5 text-sm text-[var(--cine-muted)]">
            {CREDENTIALS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="cine-ui mt-6 text-xs tracking-widest text-[var(--cine-accent)] uppercase">
            ▸ More background &amp; experience
          </p>
        </div>

        {/* Right: giant year watermark + avatar */}
        <div className="relative flex items-center justify-center">
          <span className="cine-display pointer-events-none absolute -z-0 text-[clamp(8rem,22vw,20rem)] text-black/5 select-none dark:text-white/5">
            2023
          </span>
          <InteractiveAvatar
            showBadge={false}
            intensity={0.7}
            className="max-w-[480px]"
          />
          <div className="cine-ui absolute right-0 bottom-10 text-right text-xs text-[var(--cine-muted)]">
            <p className="text-base tracking-widest text-[var(--cine-cream)]">
              2023 — NOW
            </p>
            <p className="mt-1">Studio founder · 15-person team</p>
            <p className="mt-3 tracking-[0.3em] uppercase">
              Designer · Educator · Creator
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Biography
