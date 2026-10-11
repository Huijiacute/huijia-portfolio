import { useCallback, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/** Emotions cycled through on each click. */
const EMOTIONS = [
  { label: "happy", emojis: ["💛", "✨", "😊"] },
  { label: "love", emojis: ["💖", "💕", "😍"] },
  { label: "excited", emojis: ["🎉", "⭐", "🤩"] },
  { label: "coding", emojis: ["💻", "{ }", "🐛"] },
  { label: "sweet", emojis: ["🧁", "🍩", "🍪"] },
] as const

type Emotion = (typeof EMOTIONS)[number]

type Reaction = {
  id: number
  emoji: string
  left: number
  dx: number
  delay: number
}

type InteractiveAvatarProps = {
  src?: string
  className?: string
  /** Show the "LOOKING ___" gaze state label (hero only). */
  showGaze?: boolean
  /** Show the floating "feeling ___ · tap me" badge. */
  showBadge?: boolean
  /** Max tilt strength multiplier. */
  intensity?: number
}

export function InteractiveAvatar({
  src = "/jiaa.png",
  className,
  showGaze = false,
  showBadge = true,
  intensity = 1,
}: InteractiveAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [wiggle, setWiggle] = useState(false)
  const [bounce, setBounce] = useState(false)
  const [emotion, setEmotion] = useState<Emotion>(EMOTIONS[0])
  const [reactions, setReactions] = useState<Reaction[]>([])

  const reactionId = useRef(0)
  const emotionIndex = useRef(0)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: px, y: py })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    setWiggle(true)
    window.setTimeout(() => setWiggle(false), 500)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
  }, [])

  const handleClick = useCallback(() => {
    emotionIndex.current = (emotionIndex.current + 1) % EMOTIONS.length
    const next = EMOTIONS[emotionIndex.current]
    setEmotion(next)

    setBounce(true)
    window.setTimeout(() => setBounce(false), 800)

    const burst: Reaction[] = Array.from({ length: 10 }).map(() => {
      reactionId.current += 1
      const pool = next.emojis
      return {
        id: reactionId.current,
        emoji: pool[Math.floor(Math.random() * pool.length)],
        left: 20 + Math.random() * 60,
        dx: (Math.random() - 0.5) * 120,
        delay: Math.random() * 0.25,
      }
    })
    setReactions((prev) => [...prev, ...burst])

    const ids = new Set(burst.map((b) => b.id))
    window.setTimeout(() => {
      setReactions((prev) => prev.filter((r) => !ids.has(r.id)))
    }, 1600)
  }, [])

  const rotateY = tilt.x * 16 * intensity
  const rotateX = -tilt.y * 12 * intensity
  const shiftX = tilt.x * 14 * intensity
  const shiftY = tilt.y * 10 * intensity

  // Gaze direction label (reference-style LOOKING ___)
  const gaze =
    Math.abs(tilt.x) < 0.12 && Math.abs(tilt.y) < 0.12
      ? "LOOKING AT YOU"
      : Math.abs(tilt.x) >= Math.abs(tilt.y)
        ? tilt.x > 0
          ? "LOOKING RIGHT"
          : "LOOKING LEFT"
        : tilt.y > 0
          ? "LOOKING DOWN"
          : "LOOKING UP"

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex aspect-square w-full items-center justify-center",
        "select-none [perspective:1000px]",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Interactive avatar — move your mouse and click to change emotion"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {/* Soft glow behind the avatar */}
      <div
        className="animate-glow-pulse absolute inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(217,179,130,0.35),transparent_70%)] blur-3xl"
        aria-hidden
      />

      <div
        className={cn(
          "relative h-full w-full",
          bounce ? "animate-avatar-bounce" : "animate-avatar-float",
        )}
      >
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-200 ease-out [transform-style:preserve-3d]",
            wiggle && "animate-avatar-wiggle",
          )}
          style={{
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translate(${shiftX}px, ${shiftY}px) scale(${
              isHovering ? 1.03 : 1
            })`,
          }}
        >
          <img
            src={src}
            alt="Hui Jia avatar"
            draggable={false}
            className="h-full w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Floating reaction emojis */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {reactions.map((r) => (
          <span
            key={r.id}
            className="animate-reaction-pop absolute bottom-24 text-3xl"
            style={{
              left: `${r.left}%`,
              ["--dx" as string]: `${r.dx}px`,
              animationDelay: `${r.delay}s`,
            }}
          >
            {r.emoji}
          </span>
        ))}
      </div>

      {/* Gaze state label (reference hero style) */}
      {showGaze && (
        <div className="cine-ui pointer-events-none absolute right-0 bottom-6 text-right text-[11px] tracking-[0.3em] text-[var(--cine-muted)] uppercase">
          {gaze}
        </div>
      )}

      {/* Emotion badge */}
      {showBadge && (
        <div className="cine-ui pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-[var(--cine-line)] bg-black/30 px-4 py-1 text-xs tracking-wide text-[var(--cine-cream)] uppercase backdrop-blur">
          feeling&nbsp;
          <span className="text-[var(--cine-accent)]">{emotion.label}</span>
          &nbsp;· tap me
        </div>
      )}
    </div>
  )
}

export default InteractiveAvatar
