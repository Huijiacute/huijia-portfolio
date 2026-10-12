import { AtSign, Globe, MessageCircle, Send } from "lucide-react"

/** Footer navigation — mapped to the site's on-page section anchors. */
const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#portfolio" },
  { label: "Solutions", href: "#works" },
  { label: "Contact us", href: "#possibilities" },
]

const SOCIALS = [
  { label: "WhatsApp", href: "#", Icon: MessageCircle },
  { label: "Telegram", href: "#", Icon: Send },
  { label: "Website", href: "#", Icon: Globe },
  { label: "Social", href: "#", Icon: AtSign },
]

/**
 * Footer — a full-screen dark panel with navigation on the left, contact
 * details and social links on the right, and a large "Houykea" wordmark
 * bleeding up from the bottom. The wordmark + glow use the site's purple
 * brand gradient.
 */
export function Footer() {
  return (
    <footer className="relative w-full">
      <div className="relative flex h-[50vh] min-h-[420px] w-full flex-col overflow-hidden border-t border-white/10 bg-[#121019]">
        {/* Brand glow bleeding up from the bottom (purple theme) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 120%, rgba(124,58,237,0.55) 0%, rgba(159,103,255,0.28) 35%, rgba(18,16,25,0) 70%)",
          }}
        />

        {/* Giant background wordmark — clearer, only a light blur */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-0.08em] z-0 select-none text-center font-semibold leading-none tracking-tight blur-[1px]"
          style={{
            fontSize: "clamp(5rem, 22vw, 24rem)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 10%, rgba(159,103,255,0.4) 28%, rgba(124,58,237,0.8) 60%, rgba(216,179,130,1) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Houykea
        </span>

        {/* Foreground content */}
        <div className="relative z-10 flex flex-1 flex-col justify-between gap-24 p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            {/* Left: navigation */}
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="cine-ui w-fit text-2xl font-medium text-white/90 transition-colors hover:text-[#A855F7] sm:text-[1.65rem]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: socials + contact details */}
            <div className="flex flex-col items-start gap-6 sm:items-end">
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-[#A855F7] hover:text-[#A855F7]"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </a>
                ))}
              </div>

              <div className="cine-ui flex flex-col gap-1.5 text-left sm:text-right">
                <a
                  href="mailto:limhouykea@gmail.com"
                  className="text-base text-white/90 transition-colors hover:text-[#A855F7]"
                >
                  E-mail: limhouykea@gmail.com
                </a>
                <span className="text-sm text-white/70">(+855) 12 345 678</span>
                <span className="text-sm text-white/55">Phnom Penh, Cambodia</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="cine-ui text-xs tracking-wide text-white/50">
              © {new Date().getFullYear()} Lim Houykea. All rights reserved.
            </span>
            <a
              href="#hero"
              className="cine-ui w-fit text-xs tracking-widest text-white/60 uppercase transition-colors hover:text-white"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
