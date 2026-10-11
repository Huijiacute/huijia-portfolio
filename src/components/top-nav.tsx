import { MessageSquare } from "lucide-react"

import GooeyNav from "@/components/gooey-nav/GooeyNav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useResolvedTheme } from "@/hooks/use-resolved-theme"

/** Nav items mapped to on-page section anchors. */
const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#biography" },
  { label: "Work", href: "#portfolio" },
  { label: "Contact", href: "#possibilities" },
]

/**
 * TopNav — the top row of the main content column. Nav pills sit on the left,
 * with the theme toggle and a primary "Let's Talk" button on the right, matching
 * the reference layout.
 */
export function TopNav() {
  const resolvedTheme = useResolvedTheme()

  return (
    <header className="mf-body flex items-center justify-between gap-4">
      {/* Nav pills (left) */}
      <GooeyNav
        items={NAV_ITEMS}
        initialActiveIndex={0}
        theme={resolvedTheme}
        color="#7C3AED"
        size="md"
        frame
        particleCount={15}
        spread={56}
        animationTime={600}
        timeVariance={300}
        gooeyness={0.5}
        wobble={0.45}
        hoverEffect
      />

      {/* Right cluster: theme toggle + Let's Talk */}
      <div className="flex items-center gap-3 sm:gap-4">
        <ThemeToggle />
        <a
          href="#possibilities"
          className={[
            "inline-flex items-center gap-2 rounded-full px-5 py-2.5",
            "bg-gradient-to-r from-[#7C3AED] to-[#9F67FF] font-medium text-white",
            "shadow-[0_14px_30px_-12px_rgba(124,58,237,0.7)] transition-transform",
            "hover:-translate-y-0.5",
          ].join(" ")}
        >
          Let&apos;s Talk
          <MessageSquare className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </header>
  )
}

export default TopNav
