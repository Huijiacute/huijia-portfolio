import { useEffect, useRef } from "react"

const AVATAR_SRC = "/jiaa.png"

const SENSITIVITY = 0.8
// How far (in viewport-width fraction) she can pan either side of center.
const MAX_PAN = 0.12

/**
 * The girl avatar as the hero background. She fills the hero frame
 * (absolute inset-0, object-cover) and "scrubs" horizontally based on
 * mouse movement — the same delta-accumulation gesture that drove the
 * original background video — eased for smooth motion. Scoped to the hero
 * section, not fixed across the whole page.
 */
export function ScrubAvatar() {
  const imgRef = useRef<HTMLImageElement>(null)

  const prevX = useRef<number | null>(null)
  // Normalized pan position, 0 = centered, clamped to +/- MAX_PAN.
  const pos = useRef(0)
  const target = useRef(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const apply = () => {
      // Ease current position toward the target for smooth motion.
      pos.current += (target.current - pos.current) * 0.12
      const translatePx = -pos.current * window.innerWidth
      // Slightly minimized so the full avatar (including the hat) is visible.
      img.style.transform = `translateX(${translatePx}px) scale(0.92)`

      if (Math.abs(target.current - pos.current) > 0.0005) {
        raf.current = requestAnimationFrame(apply)
      } else {
        raf.current = null
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX
      if (prevX.current === null) {
        prevX.current = currentX
        return
      }

      const delta = currentX - prevX.current
      prevX.current = currentX

      const offset = (delta / window.innerWidth) * SENSITIVITY
      let next = target.current + offset
      next = Math.max(-MAX_PAN, Math.min(MAX_PAN, next))
      target.current = next

      if (raf.current === null) {
        raf.current = requestAnimationFrame(apply)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <img
      ref={imgRef}
      src={AVATAR_SRC}
      alt="Hui Jia avatar"
      draggable={false}
      className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-bottom"
      style={{
        zIndex: 0,
        objectPosition: "70% bottom",
        willChange: "transform",
        transform: "scale(0.92)",
      }}
    />
  )
}

export default ScrubAvatar
