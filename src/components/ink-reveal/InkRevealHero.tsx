import { useEffect, useRef, useState } from "react"

import AeroShards from "./AeroShards"
import { InkRevealEngine, isWebGLAvailable } from "./engine"

/* ------------------------------------------------------------------ */
/* Asset configuration.                                                */
/* ------------------------------------------------------------------ */

/** Base (top) layer: the original 3D avatar on the olive background. */
const BASE_IMAGE = "/avatar.png"

/**
 * Reveal (under) layers: the same avatar as a glossy inflated balloon in
 * four materials. Dropping fewer files in /public is fine — the engine
 * falls back to the base image for any that fail to load.
 */
const REVEAL_IMAGES = [
  "/balloon-1.png",
  "/balloon-2.png",
  "/balloon-3.png",
  "/balloon-4.png",
]

/**
 * Background color passed to the AeroShards WebGPU field. Lighting and bloom
 * in AeroShards adapt to this. #090018 is a deep purple-black that makes the
 * pearl shards and purple accents pop; it also doubles as the fallback color
 * for the shards layer when WebGPU is unavailable.
 */
const SHARDS_BG = "#090018"

/**
 * Render the ink-reveal canvas transparent so the AeroShards WebGPU field
 * shows through the avatar's transparent pixels. Requires the PNGs to have
 * transparent backgrounds. Set to false to keep the baked olive background.
 */
const TRANSPARENT_OVER_SHARDS = true

export function InkRevealHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<InkRevealEngine | null>(null)

  // null = still detecting; true/false once known.
  const [webglOk, setWebglOk] = useState<boolean | null>(null)
  // Whether the AeroShards WebGPU background initialized (false -> flat bg).
  const [shardsOk, setShardsOk] = useState(true)

  // Custom cursor position (CSS pixels within the container).
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const available = isWebGLAvailable()
    setWebglOk(available)
    if (!available) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const engine = new InkRevealEngine({
      canvas,
      baseUrl: BASE_IMAGE,
      revealUrls: REVEAL_IMAGES,
      healSeconds: 2.5,
      transparent: TRANSPARENT_OVER_SHARDS,
    })
    engineRef.current = engine

    // --- sizing ---
    const resize = () => {
      const rect = container.getBoundingClientRect()
      engine.resize(rect.width, rect.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    engine.start()

    // --- pointer -> brush (mouse + touch via Pointer Events) ---
    const toUv = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      return {
        x: (clientX - rect.left) / rect.width,
        y: (clientY - rect.top) / rect.height,
      }
    }

    const moveCursor = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      const el = cursorRef.current
      if (el) {
        el.style.transform = `translate(${clientX - rect.left}px, ${
          clientY - rect.top
        }px)`
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const { x, y } = toUv(e.clientX, e.clientY)
      engine.setPointer(x, y, true)
      moveCursor(e.clientX, e.clientY)
    }
    const onPointerDown = (e: PointerEvent) => {
      const { x, y } = toUv(e.clientX, e.clientY)
      engine.setPointer(x, y, true)
      engine.setPointerActive(true)
    }
    const onPointerLeave = () => engine.setPointerActive(false)

    // Touch: prevent scroll while painting on the hero.
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length) e.preventDefault()
    }

    container.addEventListener("pointermove", onPointerMove, { passive: true })
    container.addEventListener("pointerdown", onPointerDown, { passive: true })
    container.addEventListener("pointerleave", onPointerLeave, {
      passive: true,
    })
    container.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      ro.disconnect()
      container.removeEventListener("pointermove", onPointerMove)
      container.removeEventListener("pointerdown", onPointerDown)
      container.removeEventListener("pointerleave", onPointerLeave)
      container.removeEventListener("touchmove", onTouchMove)
      engine.dispose()
      engineRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="ink-hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: SHARDS_BG,
        cursor: webglOk ? "none" : "auto",
      }}
    >
      {/* --- AeroShards WebGPU background (behind the avatar) --- */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          // If WebGPU failed, this stays the flat shards background color.
          background: shardsOk ? "transparent" : SHARDS_BG,
        }}
      >
        <AeroShards
          backgroundColor={SHARDS_BG}
          shardColor="#896ABD"
          accentColor="#A855F7"
          placement="center"
          flow="stream"
          material="pearl"
          detail="fine"
          effect="none"
          scale={1.15}
          spread={1}
          depth={0.35}
          speed={0.5}
          spin={0.75}
          interaction="attract"
          density={1.5}
          shardSize={1.1}
          stretch={0.9}
          turbulence={1}
          glow={0.9}
          edgeSoftness={2}
          bloom={0.85}
          grain={0.01}
          chromaticAberration={0.0075}
          transitionDuration={0.95}
          interactionRadius={1}
          interactionStrength={0.35}
          rippleIntensity={0.9}
          holdToGather
          paused={false}
          onError={() => setShardsOk(false)}
        />
      </div>

      {/* --- Ink-reveal canvas (avatar + balloon layers) --- */}
      {webglOk !== false ? (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      ) : (
        // --- WebGL fallback: plain avatar image, object-fit: cover ---
        <img
          src={BASE_IMAGE}
          alt="Avatar"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* --- BOOK A CALL pill (top-left) --- */}
      <a
        href="#book"
        className="ink-hero__pill"
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 3,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 18px",
          borderRadius: 999,
          background: "#000",
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.04em",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        BOOK A CALL <span aria-hidden>→</span>
      </a>

      {/* --- Custom cursor (small arrow with soft outline) --- */}
      {webglOk && (
        <div
          ref={cursorRef}
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 4,
            width: 0,
            height: 0,
            pointerEvents: "none",
            willChange: "transform",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            style={{
              transform: "translate(-2px, -2px)",
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.45))",
            }}
          >
            <path
              d="M3 2 L3 16 L7 12 L10 19 L13 18 L10 11 L16 11 Z"
              fill="#fff"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default InkRevealHero
