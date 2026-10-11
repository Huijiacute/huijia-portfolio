import { useEffect, useState } from "react"

import AeroShards from "./AeroShards"

/**
 * AeroBackground mounts the AeroShards WebGPU shard field as a fixed,
 * full-viewport layer behind all page content. It is additive: it does not
 * modify any existing component. It injects one scoped style rule so the
 * portfolio's opaque root gradient lets the shards show through, and falls
 * back to a flat color if WebGPU is unavailable.
 */
const SHARDS_BG = "#090018"

export function AeroBackground() {
  const [shardsOk, setShardsOk] = useState(true)

  // Make the opaque .cine-root gradient translucent so the fixed shard layer
  // behind it is visible. Added as a scoped <style> tag (no component edits).
  useEffect(() => {
    const style = document.createElement("style")
    style.setAttribute("data-aero-bg", "")
    style.textContent = `
      .cine-root { background: transparent !important; }
      body { background: ${SHARDS_BG}; }
      /* Lift page content above the fixed shard layer (z-index: 0). */
      .cine-root > *:not([data-aero-layer]) { position: relative; z-index: 1; }
    `
    document.head.appendChild(style)
    return () => {
      style.remove()
    }
  }, [])

  return (
    <div
      aria-hidden
      data-aero-layer
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: shardsOk ? "transparent" : SHARDS_BG,
      }}
    >
      <AeroShards
        backgroundColor={SHARDS_BG}
        shardColor="#896ABD"
        accentColor="#A855F7"
        placement="center"
        flow="stream"
        material="pearl"
        detail="fine"
        effect="none"
        scale={1.15}
        spread={1}
        depth={0.35}
        speed={0.5}
        spin={0.75}
        interaction="attract"
        density={1.5}
        shardSize={1.1}
        stretch={0.9}
        turbulence={1}
        glow={0.9}
        edgeSoftness={2}
        bloom={0.85}
        grain={0.01}
        chromaticAberration={0.0075}
        transitionDuration={0.95}
        interactionRadius={1}
        interactionStrength={0.35}
        rippleIntensity={0.9}
        holdToGather
        paused={false}
        onError={() => setShardsOk(false)}
      />
    </div>
  )
}

export default AeroBackground
