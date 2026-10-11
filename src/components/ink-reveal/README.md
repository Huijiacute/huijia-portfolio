# Ink-Reveal Hero

A full-screen, cursor-driven "ink reveal" hero. The original avatar is the
top layer; dragging the cursor paints a liquid-ink mask that erases it to
reveal a glossy balloon version underneath. The mask heals over ~2.5s, and
each fresh stroke cycles to the next balloon material. A WebGPU `AeroShards`
field renders behind everything.

## View it

```
npm run dev
```

Then open **http://localhost:5173/?hero=ink** (or append `#ink-hero`).
The rest of the portfolio renders normally at `/`.

## Required image assets (place in `/public`)

| File | Description | Required |
|------|-------------|----------|
| `avatar.png` | BASE layer — the 3D stylized girl (cream cap, brown hair, face stickers, olive background). | Yes |
| `balloon-1.png` | REVEAL layer — glossy inflated balloon, holographic foil material. | Optional* |
| `balloon-2.png` | REVEAL layer — gold material. | Optional* |
| `balloon-3.png` | REVEAL layer — lime plastic material. | Optional* |
| `balloon-4.png` | REVEAL layer — pastel pink/blue material. | Optional* |

\* The engine falls back to `avatar.png` for any reveal image that fails to
load, so the page still runs with only `avatar.png` present (you just won't
see a different material underneath).

### Asset rules

- **Identical dimensions & alignment.** All five images must share the same
  resolution and framing so the base and reveal layers register perfectly.
- **Transparent background (PNG alpha).** `TRANSPARENT_OVER_SHARDS` in
  `InkRevealHero.tsx` is `true`, which lets the AeroShards WebGPU field show
  through the avatar's empty pixels. If your PNGs instead bake in the olive
  background, set that flag to `false` to render the avatar opaque.

### Generating the balloon images

Use an image model (Midjourney, DALL·E, Gemini image, etc.) with a prompt
like the one that drove this build — same character, pose, framing, camera
angle, and olive-green gradient background, transformed into a glossy
inflated balloon sculpture, with each of the four files using a different
material (holographic foil, gold, lime plastic, pastel pink/blue).

## Requirements

- **WebGL** for the ink-reveal effect. If unavailable, the page falls back to
  a plain `avatar.png` (`object-fit: cover`).
- **WebGPU** for the `AeroShards` background. If unavailable, `onError` fires
  and the background falls back to the flat `#090018` deep-purple color
  (`SHARDS_BG` in `InkRevealHero.tsx`).

## Files

- `shaders.ts` — GLSL for the trail (mask) pass and the composite pass.
  The composite shader contains the liquid-ink look: fbm noise edge
  displacement, metaball smoothing, torn borders, splatter, drips, a dark
  ink rim, specular shimmer, and idle float.
- `engine.ts` — `InkRevealEngine`, a vanilla Three.js renderer. Owns the
  ping-pong framebuffers, both render passes, pointer inertia, velocity-based
  brush, heal decay, and material cycling. Exposes `setPointer`,
  `setPointerActive`, `resize`, `start`, `dispose`, plus `isWebGLAvailable`.
- `InkRevealHero.tsx` — React wrapper: mounts the engine, handles pointer +
  touch, draws the custom cursor, the BOOK A CALL pill, the AeroShards
  background layer, and the WebGL fallback image.
- `AeroShards.jsx` / `AeroShards.css` — React Bits WebGPU background
  component (depends on `vgpu`).
