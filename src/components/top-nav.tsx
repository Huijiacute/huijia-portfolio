const LINKS = [
  { id: "hero", label: "Intro", num: "01" },
  { id: "biography", label: "Biography", num: "02" },
  { id: "portfolio", label: "Portfolio", num: "03" },
  { id: "works", label: "Selected Works", num: "04" },
  { id: "possibilities", label: "Possibilities", num: "05" },
]

export function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="cine-ui mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 text-[var(--cine-cream)]">
        {/* Logo */}
        <a href="#hero" className="text-xl font-semibold tracking-tight">
          HuiJia<span className="text-[var(--cine-accent)]">.</span>
        </a>

        {/* Center links */}
        <ul className="hidden items-center gap-8 text-xs tracking-widest uppercase md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="text-[var(--cine-muted)] transition-colors hover:text-[var(--cine-cream)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right tagline */}
        <div className="hidden text-right leading-tight sm:block">
          <p className="text-[11px] tracking-[0.3em] uppercase">
            Independent Designer
          </p>
          <p className="text-[10px] tracking-wide text-[var(--cine-muted)]">
            A curious mind. A world of ideas.
          </p>
        </div>
      </nav>
    </header>
  )
}

export default TopNav
