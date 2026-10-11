import { useEffect, useState } from "react"

import ParticleText from "@/components/particle-text/ParticleText"
import { ScrubAvatar } from "@/components/scrub-avatar"
import { useTypewriter } from "@/hooks/use-typewriter"

const TYPEWRITER_TEXT =
  "Hello! I'm Lim Houykea. I build practical web applications and data-driven solutions."

const EMAIL = "hello@mainframe.co"

const PILL_LABELS = [
  "Pitch us an idea",
  "Come work here",
  "Send a brief hello",
  "See how we operate",
]

/** Small inline copy icon — two overlapping rectangles. */
function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="1.5" y="1.5" width="6" height="6" rx="1" />
    </svg>
  )
}

export function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT)

  // Pills fade in 400ms after load, independent of the typewriter.
  const [pillsVisible, setPillsVisible] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setPillsVisible(true), 400)
    return () => clearTimeout(id)
  }, [])

  const copyEmail = () => {
    void navigator.clipboard?.writeText(EMAIL)
  }

  const pillBase =
    "inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200"

  return (
    <section
      id="hero"
      className="mf-body relative flex h-screen flex-col justify-start overflow-hidden px-5 pt-24 pb-12 sm:px-8 md:px-10"
    >
      {/* The girl avatar as the full-screen background — pans with the mouse */}
      <ScrubAvatar />

      {/* Hero content */}
      <div className="relative max-w-xl text-left" style={{ zIndex: 10 }}>
        {/* 1. Animated particle name */}
        <div
          className="pointer-events-auto"
          style={{ height: 150, width: "min(72vw, 720px)", marginTop: 96, marginLeft: -16 }}
        >
          <ParticleText
            text="Lim Houykea"
            particleSize={1.44}
            density={4}
            color="#ffffff"
            highlightColor="#A855F7"
            scatter={140}
            gatherDuration={800}
            stagger={390}
            pointerRepel={42}
            repelRadius={90}
            idleDrift={0.8}
            trigger="mount"
            fontSize="clamp(3.2rem, 10.4vw, 7.2rem)"
            fontWeight={800}
            fontFamily="inherit"
            align="left"
            glow
          />
        </div>

        {/* 2. Typewriter text */}
        <p
          className="mb-5 text-white sm:mb-6"
          style={{
            fontSize: "clamp(18px, 4vw, 26px)",
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: "54px",
          }}
        >
          {displayed}
          {!done && <span className="mf-cursor" aria-hidden />}
        </p>

        {/* 3. Action pill buttons */}
        <div
          className={`mf-pills flex flex-wrap gap-y-1 ${
            pillsVisible ? "is-visible" : ""
          }`}
        >
          {PILL_LABELS.map((label) => (
            <button
              key={label}
              type="button"
              className={`${pillBase} border border-black/10 bg-white text-black hover:bg-black hover:text-white`}
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={copyEmail}
            className={`${pillBase} gap-2 border border-white bg-transparent text-white hover:bg-white hover:text-black sm:gap-3`}
          >
            <span>
              Reach us:{" "}
              <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
