import { useState } from "react"

const NAV_LINKS = ["Labs", "Studio", "Openings", "Shop"]

export function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Fixed navbar */}
      <header
        className="mf-body fixed inset-x-0 top-0 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5"
        style={{ zIndex: 10 }}
      >
        {/* Logo (left) */}
        <a href="#hero" className="flex items-center gap-3">
          <span
            className="mf-heading text-[21px] tracking-tight text-white sm:text-[26px]"
          >
            Mainframe(R)
          </span>
          <span
            className="select-none text-[25px] text-white sm:text-[30px]"
            style={{ letterSpacing: "-0.02em" }}
            aria-hidden
          >
            ✳︎
          </span>
        </a>

        {/* Desktop nav links (center) */}
        <nav className="hidden items-center text-[23px] text-white md:flex">
          {NAV_LINKS.map((label, i) => (
            <span key={label}>
              <a
                href="#"
                className="transition-opacity hover:opacity-60"
              >
                {label}
              </a>
              {i < NAV_LINKS.length - 1 && <span>, </span>}
            </span>
          ))}
        </nav>

        {/* Desktop CTA (right) */}
        <a
          href="#"
          className="hidden text-[23px] text-white underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span
            className="h-[2px] w-6 bg-white transition-transform duration-300"
            style={
              open
                ? { transform: "translateY(7px) rotate(45deg)" }
                : undefined
            }
          />
          <span
            className="h-[2px] w-6 bg-white transition-opacity duration-300"
            style={open ? { opacity: 0 } : undefined}
          />
          <span
            className="h-[2px] w-6 bg-white transition-transform duration-300"
            style={
              open
                ? { transform: "translateY(-7px) rotate(-45deg)" }
                : undefined
            }
          />
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        className="mf-body fixed inset-0 flex flex-col justify-center gap-8 bg-black/90 px-8 backdrop-blur-md transition-opacity duration-300 md:hidden"
        style={{
          zIndex: 9,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href="#"
            onClick={() => setOpen(false)}
            className="text-[32px] font-medium text-white transition-opacity hover:opacity-60"
          >
            {label}
          </a>
        ))}
        <a
          href="#"
          onClick={() => setOpen(false)}
          className="text-[32px] font-medium text-white underline underline-offset-2 transition-opacity hover:opacity-60"
        >
          Get in touch
        </a>
      </div>
    </>
  )
}

export default TopNav
