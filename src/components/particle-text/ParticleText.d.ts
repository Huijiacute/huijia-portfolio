// Type declarations for the ParticleText React Bits component (ParticleText.jsx).
import type { CSSProperties, JSX } from "react"

export interface ParticleTextProps {
  text?: string
  particleSize?: number
  density?: number
  color?: string
  highlightColor?: string
  scatter?: number
  gatherDuration?: number
  stagger?: number
  pointerRepel?: number
  repelRadius?: number
  idleDrift?: number
  trigger?: "mount" | "hover" | "click"
  fontSize?: string | number
  fontWeight?: number
  fontFamily?: string
  glow?: boolean
  align?: "left" | "center" | "right"
  className?: string
  style?: CSSProperties
}

declare const ParticleText: (props: ParticleTextProps) => JSX.Element
export default ParticleText
