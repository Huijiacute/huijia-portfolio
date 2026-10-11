import { useEffect } from "react"

import LiquidEther from "@/components/liquid-ether/LiquidEther"
import { useResolvedTheme } from "@/hooks/use-resolved-theme"

/**
 * LiquidBackground mounts the React Bits LiquidEther (three.js) fluid field as
 * a fixed, full-viewport layer behind all page content. It is theme-aware:
 *
 *  - Light mode: a clean white surface with the fluid rendered as colored ink
 *    (lightMode = true, backgroundColor = white).
 *  - Dark mode: a deep purple surface with the fluid glowing on top
 *    (lightMode = false so the simulation blends additively over the dark page).
 *
 * It injects one scoped <style> rule so the portfolio's opaque root gradient
 * lets the fluid show through, and lifts page content above the fixed layer.
 */
const BG_DARK = "#090018"
const BG_LIGHT = "#ffffff"

// Purple-leaning palette that matches the site's accent in both themes.
const COLORS = ["#5227FF", "#A855F7", "#FF9FFC"]

export function LiquidBackground() {
  const resolvedTheme = useResolvedTheme()
  const isDark = resolvedTheme === "dark"
  const pageBg = isDark ? BG_DARK : BG_LIGHT

  // Make the opaque .cine-root gradient translucent so the fixed fluid layer
  // behind it is visible. Added as a scoped <style> tag (no component edits).
  useEffect(() => {
    const style = document.createElement("style")
    style.setAttribute("data-liquid-bg", "")
    style.textContent = `
      .cine-root { background: transparent !important; }
      body { background: ${pageBg}; }
      /* Lift page content above the fixed fluid layer (z-index: 0). */
      .cine-root > *:not([data-liquid-layer]) { position: relative; z-index: 1; }
    `
    document.head.appendChild(style)
    return () => {
      style.remove()
    }
  }, [pageBg])

  return (
    <div
      aria-hidden
      data-liquid-layer
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: pageBg,
      }}
    >
      <LiquidEther
        // A fresh instance per theme so the WebGL palette/background rebuilds.
        key={resolvedTheme}
        colors={COLORS}
        backgroundColor={pageBg}
        lightMode={!isDark}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}

export default LiquidBackground
