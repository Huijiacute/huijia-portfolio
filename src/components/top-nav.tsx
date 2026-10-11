import SplitFlapText from "@/components/SplitFlapText"

export function TopNav() {
  return (
    <header
      className="mf-body fixed inset-x-0 top-0 flex items-center px-5 py-4 sm:px-8 sm:py-5"
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
    </header>
  )
}

export default TopNav
