import GooeyNav from "@/components/gooey-nav/GooeyNav"
import SplitFlapText from "@/components/SplitFlapText"
import { ThemeToggle } from "@/components/theme-toggle"

/** Nav items mapped to on-page section anchors. */
const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#portfolio" },
  { label: "About", href: "#biography" },
  { label: "Contact", href: "#possibilities" },
]

export function TopNav() {
  return (
    <header
      className="mf-body fixed inset-x-0 top-0 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5"
      style={{ zIndex: 10 }}
    >
      {/* Logo (left) */}
      <a href="#hero" className="flex items-center gap-3">
        <SplitFlapText
          words={["HOUYKEA", "HUI JIA", "CRYSTAL"]}
          flipDuration={0.12}
          stagger={0.05}
          cycleDelay={2400}
          charset="alphanumeric"
          flipsPerChar={8}
          tileColor="#111827"
          textColor="#dbc2f3"
          tileRadius={8}
          gap={6}
          fontSize={40}
          loop
          padTo={7}
        />
      </a>

      {/* Right cluster: gooey navigation + theme toggle */}
      <div className="flex items-center gap-3 sm:gap-4">
        <GooeyNav
          items={NAV_ITEMS}
          initialActiveIndex={0}
          theme="light"
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
        <ThemeToggle />
      </div>
    </header>
  )
}

export default TopNav
