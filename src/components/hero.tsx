import { InteractiveAvatar } from "@/components/interactive-avatar"

export function Hero() {
  return (
    <section
      id="hero"
      className="cine-section relative overflow-hidden"
    >
      {/* Corner metadata */}
      <div className="cine-eyebrow absolute top-24 left-10">
        Hui Jia / Design &amp; a little curiosity
      </div>
      <div className="cine-eyebrow absolute top-24 right-10 text-right normal-case">
        <span className="tracking-[0.3em] uppercase">
          Independent Designer
        </span>
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 md:grid-cols-2">
        {/* Left: headline */}
        <div className="relative z-10">
          <h1 className="cine-display text-[clamp(3.5rem,9vw,8rem)]">
            Design
            <br />
            With
            <br />
            Feeling.
          </h1>
          <p className="cine-ui mt-6 max-w-sm text-sm leading-relaxed text-[var(--cine-muted)]">
            Hi, I'm Hui Jia. I turn uncontainable curiosity into designs you
            remember at a glance.
          </p>
          <a
            href="#biography"
            className="cine-ui mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--cine-line)] px-5 py-2 text-xs tracking-widest uppercase transition-colors hover:bg-white/5"
          >
            Meet me first, then the work
            <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Right: reactive avatar */}
        <div className="relative flex items-center justify-center">
          <InteractiveAvatar
            showGaze
            className="max-w-[560px]"
          />
          <div className="cine-ui absolute right-0 bottom-20 hidden text-right text-xs text-[var(--cine-muted)] md:block">
            <p className="text-base tracking-widest text-[var(--cine-cream)]">
              HELLO, YOU.
            </p>
            <p className="mt-1">Move your mouse — she follows you</p>
          </div>
        </div>
      </div>

      {/* Scroll to explore */}
      <a
        href="#biography"
        className="cine-ui absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-[11px] tracking-[0.3em] text-[var(--cine-muted)] uppercase"
      >
        <span>Scroll to explore</span>
        <div className="animate-scroll-bob mt-2 text-lg">↓</div>
      </a>
    </section>
  )
}

export default Hero
