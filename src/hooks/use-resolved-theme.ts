import { useEffect, useState } from "react"

import { useTheme } from "@/components/theme-provider"

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"

function systemPrefersDark(): boolean {
  if (typeof window === "undefined") {
    return true
  }
  return window.matchMedia(COLOR_SCHEME_QUERY).matches
}

/**
 * Resolves the on-screen theme to "light" | "dark", following the OS
 * preference when the stored theme is "system" (and reacting to OS changes).
 *
 * The ThemeProvider already toggles the `.light` / `.dark` class on <html>,
 * which drives all CSS/Tailwind theming. This hook is for the few cases that
 * need the resolved value in JS — e.g. props passed to canvas/WebGPU
 * components that cannot read CSS variables.
 */
export function useResolvedTheme(): "light" | "dark" {
  const { theme } = useTheme()
  const [resolved, setResolved] = useState<"light" | "dark">(() =>
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemPrefersDark() ? "dark" : "light"
  )

  useEffect(() => {
    if (theme === "light" || theme === "dark") {
      setResolved(theme)
      return undefined
    }

    // theme === "system": follow OS preference and react to changes.
    setResolved(systemPrefersDark() ? "dark" : "light")
    const mq = window.matchMedia(COLOR_SCHEME_QUERY)
    const onChange = () => setResolved(mq.matches ? "dark" : "light")
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [theme])

  return resolved
}
