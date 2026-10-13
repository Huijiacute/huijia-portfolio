import type { ComponentType, SVGProps } from "react"
import { Link as LinkIcon, Mail, MessageSquare } from "lucide-react"

const PHOTO_SRC = "/jiaa.png"
const PORTFOLIO_URL = "https://huijia-portfolio.vercel.app/"

/** LinkedIn brand glyph (lucide-react in this project has no brand icons). */
function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0z" />
    </svg>
  )
}

/** GitHub brand glyph. */
function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.57 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.33-1.74-1.33-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.3-5.47-5.79 0-1.28.47-2.33 1.23-3.15-.12-.3-.53-1.5.12-3.13 0 0 1-.32 3.3 1.2a11.6 11.6 0 0 1 6 0c2.3-1.52 3.3-1.2 3.3-1.2.65 1.63.24 2.83.12 3.13.77.82 1.23 1.87 1.23 3.15 0 4.5-2.8 5.48-5.48 5.77.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.3 0 .32.21.69.82.57A12.01 12.01 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  )
}

type Social = {
  label: string
  href?: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  action?: "copy"
}

const SOCIALS: Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com/Houykea", Icon: GithubIcon },
  { label: "Email", href: "mailto:limhouykea@gmail.com", Icon: Mail },
  { label: "Chat", href: "#", Icon: MessageSquare },
  { label: "Copy portfolio link", Icon: LinkIcon, action: "copy" },
]

/**
 * ProfileCard — the sticky left sidebar. It holds the avatar photo, name,
 * specialization, location, a row of social links and a primary CTA. It is
 * theme-aware (light paper / dark panel) and designed to stay in view while
 * the main content scrolls (sticky positioning is applied by the layout).
 */
export function ProfileCard() {
  return (
    <aside
      className={[
        "flex w-full flex-col gap-6 rounded-[28px] p-6 sm:p-7",
        // Solid, clearly separated card: white paper in light, dark panel in dark.
        "bg-white text-black shadow-[0_30px_80px_-30px_rgba(80,60,160,0.5)]",
        "dark:bg-[#15121f] dark:text-white dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)]",
        "border border-black/10 dark:border-white/10",
      ].join(" ")}
    >
      {/* Name */}
      <h1 className="text-2x1 font-semibold tracking-tight">Lim Houykea</h1>

      {/* Photo frame */}
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-black/5 dark:border-white/10 dark:bg-white/5">
        <img
          src={PHOTO_SRC}
          alt="Lim Houykea"
          draggable={false}
          className="aspect-[4/5] w-full select-none object-cover object-top"
        />
      </div>

      {/* Specialization */}
      <div>
        <p className="text-[11px] font-medium tracking-[0.18em] text-black/45 uppercase dark:text-white/50">
          Specialization:
        </p>
        <p className="mt-1 font-medium">FullStack and AI Engineer</p>
      </div>

      {/* Based in */}
      <div>
        <p className="text-[11px] font-medium tracking-[0.18em] text-black/45 uppercase dark:text-white/50">
          Based in:
        </p>
        <p className="mt-1 font-medium">Phnom Penh, Cambodia</p>
      </div>

      {/* Social links */}
      <div className="flex flex-wrap gap-2.5">
        {SOCIALS.map(({ label, href, Icon, action }) => {
          const sharedClassName = [
            "group relative inline-flex h-10 w-10 items-center justify-center rounded-full",
            "border border-black/10 text-black/70 transition-colors",
            "hover:border-[#7C3AED] hover:text-[#7C3AED]",
            "dark:border-white/15 dark:text-white/70 dark:hover:border-[#A855F7] dark:hover:text-[#A855F7]",
          ].join(" ")

          const tooltip = (
            <span
              role="tooltip"
              className={[
                "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1",
                "text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100",
                "bg-black text-white dark:bg-white dark:text-black",
              ].join(" ")}
            >
              {label}
            </span>
          )

          const inner = (
            <>
              <Icon className="h-[18px] w-[18px]" aria-hidden />
              {tooltip}
            </>
          )

          if (action === "copy") {
            return (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => {
                  void navigator.clipboard?.writeText(PORTFOLIO_URL)
                }}
                className={sharedClassName}
              >
                {inner}
              </button>
            )
          }

          return (
            <a key={label} href={href} aria-label={label} className={sharedClassName}>
              {inner}
            </a>
          )
        })}
      </div>

      {/* Primary CTA */}
      <a
        href="#possibilities"
        className={[
          "mt-1 inline-flex items-center justify-center rounded-full px-6 py-3.5",
          "bg-gradient-to-r from-[#7C3AED] to-[#9F67FF] font-medium text-white",
          "shadow-[0_14px_30px_-12px_rgba(124,58,237,0.7)] transition-transform",
          "hover:-translate-y-0.5",
        ].join(" ")}
      >
        Let&apos;s Work Together!
      </a>
    </aside>
  )
}

export default ProfileCard
