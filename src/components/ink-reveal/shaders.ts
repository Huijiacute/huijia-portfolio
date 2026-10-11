/**
 * GLSL shader sources for the ink-reveal effect.
 *
 * The pipeline uses two fragment programs that share one full-screen triangle:
 *
 *   1. TRAIL pass  -> renders into a ping-pong framebuffer (the "mask").
 *                     Each frame it (a) fades the previous frame slightly
 *                     (healing) and (b) stamps a soft brush where the cursor
 *                     currently is. The red channel stores reveal strength
 *                     in [0,1]. We ping-pong because a shader cannot read and
 *                     write the same texture in one pass.
 *
 *   2. COMPOSITE pass -> reads the mask + the BASE image + the current/next
 *                        REVEAL image and blends them to the screen. All the
 *                        "liquid ink" look (noise displacement, metaball
 *                        smoothing, torn borders, splatter, drips, specular
 *                        shimmer, idle float) lives here.
 *
 * Both shaders are plain WebGL1-compatible GLSL (Three.js injects the
 * precision/attribute boilerplate for the vertex program automatically).
 */

/** Shared pass-through vertex shader (full-screen quad). */
export const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

/* ------------------------------------------------------------------ */
/* Shared GLSL noise helpers (value + simplex-ish fbm).                */
/* ------------------------------------------------------------------ */
const NOISE = /* glsl */ `
  // Cheap hash -> pseudo-random in [0,1).
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  // Smooth value noise.
  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i + vec2(0.0, 0.0));
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // Fractal brownian motion (layered noise) for organic ink borders.
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * valueNoise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }
`

/* ------------------------------------------------------------------ */
/* TRAIL pass fragment shader.                                         */
/* ------------------------------------------------------------------ */
export const TRAIL_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uPrev;      // previous mask frame (ping-pong source)
  uniform vec2  uPointer;       // current brush position in UV space
  uniform vec2  uPrevPointer;   // previous brush position (for segment stamp)
  uniform float uBrushRadius;   // brush radius in UV units (scales w/ velocity)
  uniform float uBrushStrength; // how hard this frame paints (0 when idle)
  uniform float uDecay;         // per-frame heal factor (~0.985 -> ~2.5s heal)
  uniform float uAspect;        // width / height, to keep the brush circular
  uniform float uTime;
  uniform float uSplatter;      // 0..1 amount of splatter dots to emit

  ${NOISE}

  // Distance from point p to the segment a-b (all in aspect-corrected space).
  float segDist(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
    return length(pa - ba * h);
  }

  void main() {
    // Heal: last frame's value, nudged toward zero every frame.
    float prev = texture2D(uPrev, vUv).r * uDecay;

    // Work in aspect-corrected space so the brush is a true circle.
    vec2 uvA  = vec2(vUv.x * uAspect, vUv.y);
    vec2 pA   = vec2(uPointer.x * uAspect, uPointer.y);
    vec2 ppA  = vec2(uPrevPointer.x * uAspect, uPrevPointer.y);

    // Distance to the swept segment so fast moves still paint a solid line.
    float d = segDist(uvA, ppA, pA);

    // Wobble the radius with noise -> torn, non-circular ink edge.
    float edge = fbm(uvA * 14.0 + uTime * 0.4) - 0.5;
    float r = uBrushRadius * (1.0 + edge * 0.55);

    // Soft falloff stamp.
    float stamp = smoothstep(r, r * 0.25, d) * uBrushStrength;

    // Splatter: a few random dots flung around the cursor as it moves fast.
    float splat = 0.0;
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      vec2 jitter = vec2(
        hash(vec2(fi, floor(uTime * 18.0))) - 0.5,
        hash(vec2(fi + 7.0, floor(uTime * 18.0))) - 0.5
      );
      vec2 sp = pA + jitter * uBrushRadius * 4.0;
      float sd = length(uvA - sp);
      float sr = uBrushRadius * (0.15 + 0.2 * hash(vec2(fi, 3.0)));
      splat += smoothstep(sr, 0.0, sd);
    }
    splat *= uSplatter * uBrushStrength * 0.6;

    // Accumulate; keep in [0,1].
    float v = max(prev, max(stamp, splat));
    gl_FragColor = vec4(clamp(v, 0.0, 1.0), 0.0, 0.0, 1.0);
  }
`

/* ------------------------------------------------------------------ */
/* COMPOSITE pass fragment shader.                                     */
/* ------------------------------------------------------------------ */
export const COMPOSITE_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uBase;      // top layer (original avatar)
  uniform sampler2D uReveal;    // current balloon layer
  uniform sampler2D uRevealNext;// next balloon layer (for crossfade on cycle)
  uniform sampler2D uMask;      // reveal strength from the trail pass
  uniform float uFade;          // 0..1 crossfade between reveal and revealNext
  uniform vec2  uResolution;    // canvas pixel size
  uniform vec2  uImageSize;     // source image pixel size (for cover fit)
  uniform vec2  uPointer;       // cursor in UV (for specular shimmer)
  uniform float uTime;
  uniform float uFloat;         // idle breathing amount (0..1)
  uniform float uTransparent;   // 1 -> respect image alpha so a layer shows behind

  ${NOISE}

  // object-fit: cover mapping from screen UV -> image UV.
  vec2 coverUv(vec2 uv, vec2 res, vec2 img) {
    float screenAspect = res.x / res.y;
    float imageAspect  = img.x / img.y;
    vec2 scale = vec2(1.0);
    if (screenAspect > imageAspect) {
      scale.y = imageAspect / screenAspect; // letterbox vertically
    } else {
      scale.x = screenAspect / imageAspect; // pillarbox horizontally
    }
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    // --- idle float: breathe the balloon layer 1-2% around center. ---
    float breathe = (sin(uTime * 0.9) * 0.5 + 0.5) * 0.02 * uFloat;
    vec2 revealUvBase = (vUv - 0.5) / (1.0 + breathe) + 0.5;

    vec2 baseUv   = coverUv(vUv, uResolution, uImageSize);
    vec2 revealUv = coverUv(revealUvBase, uResolution, uImageSize);

    // --- read + smooth the mask into a metaball-like blob field. ---
    // Average a small neighbourhood so isolated texels merge into blobs.
    float m = 0.0;
    float texel = 1.5 / uResolution.y;
    for (int x = -2; x <= 2; x++) {
      for (int y = -2; y <= 2; y++) {
        m += texture2D(uMask, vUv + vec2(float(x), float(y)) * texel).r;
      }
    }
    m /= 25.0;

    // Noise-displace the mask edge so the border tears like wet ink.
    float n = fbm(vUv * 9.0 + uTime * 0.25);
    float edge = m + (n - 0.5) * 0.22;

    // Metaball threshold -> crisp-but-organic reveal shape.
    float reveal = smoothstep(0.28, 0.5, edge);

    // Drips: let the mask bleed slightly downward trailing the stroke.
    float dripN = fbm(vec2(vUv.x * 40.0, vUv.y * 8.0 - uTime * 0.5));
    float below = texture2D(uMask, vUv + vec2(0.0, 0.012)).r;
    reveal = max(reveal, smoothstep(0.5, 0.9, below) * dripN * 0.7);
    reveal = clamp(reveal, 0.0, 1.0);

    // --- sample the layers (guard against sampling outside the image). ---
    vec4 baseCol = texture2D(uBase, baseUv);
    vec4 revA    = texture2D(uReveal, revealUv);
    vec4 revB    = texture2D(uRevealNext, revealUv);
    vec4 revCol  = mix(revA, revB, uFade);

    // Where reveal == 1 the balloon shows; where 0 the base avatar shows.
    vec3 color = mix(baseCol.rgb, revCol.rgb, reveal);

    // Dark ink rim right at the reveal border for a liquid outline.
    float rim = smoothstep(0.42, 0.5, edge) * (1.0 - smoothstep(0.5, 0.58, edge));
    color = mix(color, color * 0.65, rim * 0.6);

    // --- specular shimmer that follows the cursor on the balloon. ---
    float dist = distance(vUv, uPointer);
    float shimmer = smoothstep(0.18, 0.0, dist) * reveal;
    color += shimmer * 0.12 * vec3(1.0, 0.98, 0.95);

    // Composite alpha. In opaque mode we always fill the frame. In transparent
    // mode we blend the base + reveal alpha so anything rendered behind this
    // canvas (the AeroShards WebGPU field) shows through the avatar's empty
    // pixels. Output is premultiplied to match the renderer's blend setup.
    float alpha = 1.0;
    if (uTransparent > 0.5) {
      float baseA = baseCol.a;
      float revA2 = revCol.a;
      alpha = mix(baseA, revA2, reveal);
      gl_FragColor = vec4(color * alpha, alpha);
    } else {
      gl_FragColor = vec4(color, 1.0);
    }
  }
`
