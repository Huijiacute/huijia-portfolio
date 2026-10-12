// Type declarations for the Folder React Bits component (Folder.jsx).
import type { CSSProperties, JSX, ReactNode } from "react"

export type FolderItem =
  | string
  | number
  | { title?: string; description?: string }
  | { image: string; title?: string; alt?: string }
  | { content: ReactNode }
  | JSX.Element

export interface FolderProps {
  items?: FolderItem[]
  children?: ReactNode
  mode?: "flap" | "book"
  variant?: "solid" | "glass" | "matte"
  layout?: "spread" | "stack" | "row"
  color?: string
  paperColor?: string
  label?: string
  tabPosition?: "left" | "center" | "right"
  openOn?: "click" | "hover"
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onItemClick?: (item: FolderItem, index: number) => void
  onItemDrop?: (item: FolderItem, index: number, inside: boolean) => void
  draggable?: boolean
  zoomOnClick?: boolean
  peek?: boolean
  intro?: boolean
  size?: number
  frost?: number
  tilt?: number
  speed?: number
  bounce?: number
  closeOnOutsideClick?: boolean
  theme?: "dark" | "light"
  className?: string
  style?: CSSProperties
}

declare const Folder: (props: FolderProps) => JSX.Element
export default Folder
