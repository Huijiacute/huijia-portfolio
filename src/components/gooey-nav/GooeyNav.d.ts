// Type declarations for the GooeyNav React Bits component (GooeyNav.jsx).
import type { CSSProperties, JSX, ReactNode } from "react"

export interface GooeyNavItem {
  label?: string
  href?: string
  icon?: ReactNode
}

export interface GooeyNavProps {
  items?: GooeyNavItem[]
  initialActiveIndex?: number
  activeIndex?: number
  onChange?: (index: number, item: GooeyNavItem) => void
  theme?: "dark" | "light"
  color?: string
  activeTextColor?: string
  colors?: string[]
  size?: "sm" | "md" | "lg"
  frame?: boolean
  animationTime?: number
  particleCount?: number
  timeVariance?: number
  spread?: number
  gooeyness?: number
  wobble?: number
  hoverEffect?: boolean
  className?: string
  style?: CSSProperties
}

declare const GooeyNav: (props: GooeyNavProps) => JSX.Element
export default GooeyNav
