import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"

/**
 * ThemeToggle
 *
 * A small, accessible button that flips the site between light and dark.
 * It builds on the project's existing `ThemeProvider` (a Vite-friendly
 * equivalent of next-themes): the provider persists the choice to
 * localStorage, applies the `.light` / `.dark` class to <html>, and resolves
 * the "system" preference. This component only renders the control + icon.
 *
 * Icon convention (per request): show the MOON while in light mode (click to
 * go dark) and the SUN while in dark mode (click to go light).
 *
 * Accessibility:
 *  - real <button> → keyboard focusable and Enter/Space activatable for free;
 *  - descriptive aria-label that reflects the action;
 *  - aria-pressed communicates the on/off (dark) state to screen readers;
 *  - a visible focus ring via Tailwind focus-visible styles.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  // Resolve what is actually on screen right now. When the stored theme is
  // "system" we read the OS preference so the icon + toggle target are correct.
  const getResolved = React.useCallback((): "light" | "dark" => {
    if (theme === "light" || theme === "dark") return theme
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }
    return "dark"
  }, [theme])

  // Track the resolved theme in state so the icon updates when "system" flips.
  const [resolved, setResolved] = React.useState<"light" | "dark">(getResolved)

  React.useEffect(() => {
    setResolved(getResolved())
    if (theme !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => setResolved(getResolved())
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [theme, getResolved])

  const isDark = resolved === "dark"

  const toggle = () => setTheme(isDark ? "light" : "dark")

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border border-white/15 bg-white/10 text-white backdrop-blur",
        "transition-colors duration-200 hover:bg-white/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
        // Light-mode styling via Tailwind's class-based dark strategy:
        // these are the LIGHT defaults; `.dark` variants restore the dark look.
        "dark:border-white/15 dark:bg-white/10 dark:text-white",
        className,
      ].join(" ")}
    >
      {/* Moon in light mode, Sun in dark mode. */}
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default ThemeToggle
