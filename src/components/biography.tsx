const PHOTO_SRC = "/jia-VN.jpg"

/** Minimal inline brand marks so Tech Skills render crisply without extra deps. */
function ReactMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23 23 20.46" className={className} aria-hidden>
      <circle r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

function NextMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 32" className={className} aria-hidden fill="currentColor">
      <text
        x="0"
        y="24"
        fontFamily="var(--font-ui), system-ui, sans-serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="-1"
      >
        NEXT
      </text>
      <text x="104" y="27" fontSize="9" fontWeight="700">
        js
      </text>
    </svg>
  )
}

function TailwindMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 33" className={className} aria-hidden>
      <path
        fill="#38bdf8"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
      />
    </svg>
  )
}

export function Biography() {
  return (
    <section id="biography" className="cine-section relative">
      <div className="mx-auto w-[105%] max-w-[1470px] -translate-x-[2.5%]">
        {/* Content grid (card wrapper removed) */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left: eyebrow + WHO AM I + bio + CTA + tech skills */}
          <div>
            <div className="cine-ui text-xs tracking-[0.3em] text-white/70 uppercase">
              02 — About Me
            </div>

            <h2 className="cine-display mt-6 text-[clamp(2.75rem,6vw,5.5rem)] text-white">
              Who Am I
            </h2>

            <p className="cine-ui mt-6 max-w-[52ch] text-base leading-relaxed text-white/90">
              I am Lim Houykea, a fourth-year ICT student at the American
              University of Phnom Penh (AUPP). I am a full-stack developer and
              technology builder who enjoys creating practical web
              applications, data-driven solutions, and AI-powered tools. My
              technical interests include web development, data science,
              artificial intelligence, natural language processing, IoT, and
              entrepreneurship.
            </p>

            <a
              href="#possibilities"
              className="cine-ui mt-7 inline-flex items-center rounded-full border border-white/40 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              View Detailed
            </a>

            <div className="mt-9">
              <p className="cine-ui text-sm font-semibold tracking-wide text-white">
                Tech Skills:
              </p>
              <div className="mt-4 flex items-center gap-7 text-white">
                <ReactMark className="h-9 w-9" />
                <NextMark className="h-7 w-auto" />
                <TailwindMark className="h-7 w-auto" />
              </div>
            </div>
          </div>

          {/* Right: real photo */}
          <div className="relative flex items-center justify-center">
            <div className="relative overflow-hidden rounded-[20px] shadow-[0_30px_90px_-30px_rgba(0,0,0,0.6)]">
              <img
                src={PHOTO_SRC}
                alt="Lim Houykea"
                draggable={false}
                className="aspect-[4/5] w-full max-w-[460px] select-none object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Biography
