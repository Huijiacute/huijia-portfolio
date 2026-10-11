import { Globe, Link as LinkIcon, Mail, MessageSquare, Sparkles } from "lucide-react"

const PHOTO_SRC = "/jiaa.png"

const SOCIALS = [
  { label: "Website", href: "#", Icon: Globe },
  { label: "Email", href: "mailto:limhouykea@gmail.com", Icon: Mail },
  { label: "Links", href: "#", Icon: LinkIcon },
  { label: "Message", href: "#", Icon: MessageSquare },
  { label: "More", href: "#", Icon: Sparkles },
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
      <h1 className="text- font-semibold tracking-tight">Lim Houykea</h1>

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
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className={[
              "inline-flex h-10 w-10 items-center justify-center rounded-full",
              "border border-black/10 text-black/70 transition-colors",
              "hover:border-[#7C3AED] hover:text-[#7C3AED]",
              "dark:border-white/15 dark:text-white/70 dark:hover:border-[#A855F7] dark:hover:text-[#A855F7]",
            ].join(" ")}
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden />
          </a>
        ))}
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
