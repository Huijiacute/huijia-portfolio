// Type declarations for the AeroShards React Bits component (AeroShards.jsx).
// A relative `declare module "./AeroShards"` is not valid, so we declare the
// resolved `.jsx` path via a wildcard-free module specifier that matches how
// the bundler resolves the import.
import type { JSX } from "react"

export interface AeroShardsProps {
  backgroundColor?: string
  shardColor?: string
  accentColor?: string
  placement?: "right" | "left" | "center" | "full"
  flow?: "stream" | "vortex" | "ribbon"
  material?: "pearl" | "chrome" | "satin"
  detail?: "bold" | "balanced" | "fine"
  effect?: "none" | "dither" | "ascii"
  scale?: number
  spread?: number
  depth?: number
  speed?: number
  spin?: number
  interaction?: "none" | "repel" | "attract"
  density?: number
  shardSize?: number
  stretch?: number
  turbulence?: number
  glow?: number
  edgeSoftness?: number
  bloom?: number
  grain?: number
  chromaticAberration?: number
  transitionDuration?: number
  interactionRadius?: number
  interactionStrength?: number
  rippleIntensity?: number
  holdToGather?: boolean
  paused?: boolean
  className?: string
  onError?: (error: Error) => void
}

declare const AeroShards: (props: AeroShardsProps) => JSX.Element
export default AeroShards
