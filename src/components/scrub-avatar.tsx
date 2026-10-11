import { useEffect, useRef } from "react"

const AVATAR_SRC = "/jiaa.png"

const SENSITIVITY = 0.8
// How far (in viewport-width fraction) the image can pan either side of center.
const MAX_PAN = 0.12

/**
 * Full-screen fixed background that shows the girl avatar and "scrubs" her
 * horizontally based on mouse movement — the same gesture that drove the
 * old background video, but applied as a parallax pan since a PNG has no
 * frames to seek through.
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
      const scale = 1.18 // slight overscan so panning never shows edges
      img.style.transform = `translateX(${translatePx}px) scale(${scale})`

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
      className="pointer-events-none fixed inset-0 h-full w-full select-none object-cover"
      style={{
        zIndex: 0,
        objectPosition: "70% center",
        willChange: "transform",
        transform: "scale(1.18)",
      }}
    />
  )
}

export default ScrubAvatar
