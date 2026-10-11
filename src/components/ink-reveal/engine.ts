/**
 * InkRevealEngine — a framework-agnostic Three.js renderer for the
 * cursor-driven "ink reveal" hero effect.
 *
 * Responsibilities:
 *   - own the WebGLRenderer, two ping-pong render targets (the trail mask),
 *     and two full-screen scenes (trail pass + composite pass);
 *   - expose simple imperative methods (setPointer, nextMaterial, resize,
 *     start, dispose) that the React wrapper drives;
 *   - run the render loop: heal + stamp the mask, then composite to screen.
 *
 * The heavy lifting (ink look, blending) is in ./shaders.ts.
 */
import * as THREE from "three"

import { COMPOSITE_FRAG, TRAIL_FRAG, VERT } from "./shaders"

export type InkRevealOptions = {
  canvas: HTMLCanvasElement
  baseUrl: string
  revealUrls: string[]
  /** Seconds for a fully-painted mask to heal back to the avatar. */
  healSeconds?: number
  /**
   * When true, the canvas renders with a transparent background and the
   * composite shader respects image alpha, so a layer behind (e.g. the
   * AeroShards WebGPU background) shows through the avatar's transparent
   * pixels. When false, the dark olive background is drawn opaque.
   */
  transparent?: boolean
}

/** Linear interpolation. */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export class InkRevealEngine {
  private renderer: THREE.WebGLRenderer
  private clock = new THREE.Clock()

  // Full-screen triangle geometry shared by both passes.
  private quad: THREE.BufferGeometry

  // Trail (mask) pass.
  private trailScene = new THREE.Scene()
  private trailCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private trailMat: THREE.ShaderMaterial
  private rtA: THREE.WebGLRenderTarget
  private rtB: THREE.WebGLRenderTarget

  // Composite (screen) pass.
  private compScene = new THREE.Scene()
  private compMat: THREE.ShaderMaterial

  // Pointer state (UV space, 0..1). Lerped target vs. current for inertia.
  private pointerTarget = new THREE.Vector2(0.5, 0.5)
  private pointer = new THREE.Vector2(0.5, 0.5)
  private prevPointer = new THREE.Vector2(0.5, 0.5)
  private pointerActive = false
  private lastPointerMoveTime = 0

  // Material cycling.
  private textures: THREE.Texture[] = []
  private current = 0
  private next = 0
  private fade = 0 // 0..1 crossfade progress
  private cycling = false
  private armedForCycle = true // only switch after a full heal

  private imageSize = new THREE.Vector2(1, 1)
  private healSeconds: number
  private transparent: boolean
  private raf = 0
  private disposed = false
  private dpr: number

  constructor(opts: InkRevealOptions) {
    this.healSeconds = opts.healSeconds ?? 2.5
    this.transparent = opts.transparent ?? false
    this.dpr = Math.min(window.devicePixelRatio || 1, 2) // cap DPR at 2

    this.renderer = new THREE.WebGLRenderer({
      canvas: opts.canvas,
      antialias: true,
      alpha: this.transparent,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    })
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setClearColor(0x2a2e26, this.transparent ? 0 : 1)

    // --- full-screen triangle (cheaper than a quad, no seam) ---
    this.quad = new THREE.BufferGeometry()
    this.quad.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
        3,
      ),
    )
    this.quad.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2),
    )

    // --- ping-pong render targets for the trail mask ---
    const rtOpts: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
    }
    this.rtA = new THREE.WebGLRenderTarget(1, 1, rtOpts)
    this.rtB = new THREE.WebGLRenderTarget(1, 1, rtOpts)

    // --- trail material ---
    this.trailMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: TRAIL_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uPrev: { value: this.rtA.texture },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uPrevPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uBrushRadius: { value: 0.06 },
        uBrushStrength: { value: 0 },
        uDecay: { value: 0.985 },
        uAspect: { value: 1 },
        uTime: { value: 0 },
        uSplatter: { value: 0 },
      },
    })
    this.trailScene.add(new THREE.Mesh(this.quad, this.trailMat))

    // --- composite material ---
    this.compMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: COMPOSITE_FRAG,
      depthTest: false,
      depthWrite: false,
      transparent: this.transparent,
      // Premultiplied alpha matches the renderer config above, so the
      // AeroShards background composites cleanly behind transparent pixels.
      blending: this.transparent
        ? THREE.CustomBlending
        : THREE.NormalBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      uniforms: {
        uBase: { value: null },
        uReveal: { value: null },
        uRevealNext: { value: null },
        uMask: { value: this.rtB.texture },
        uFade: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uImageSize: { value: this.imageSize },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 },
        uFloat: { value: 1 },
        uTransparent: { value: this.transparent ? 1 : 0 },
      },
    })
    this.compScene.add(new THREE.Mesh(this.quad, this.compMat))

    void this.loadTextures(opts.baseUrl, opts.revealUrls)
  }

  /** Load the base + reveal images and wire them into the composite material. */
  private async loadTextures(baseUrl: string, revealUrls: string[]) {
    const loader = new THREE.TextureLoader()
    const load = (url: string) =>
      new Promise<THREE.Texture>((resolve, reject) => {
        loader.load(
          url,
          (t) => {
            t.colorSpace = THREE.SRGBColorSpace
            t.minFilter = THREE.LinearFilter
            t.magFilter = THREE.LinearFilter
            resolve(t)
          },
          undefined,
          reject,
        )
      })

    const base = await load(baseUrl)
    if (this.disposed) return
    const img = base.image as HTMLImageElement
    this.imageSize.set(img.width, img.height)
    this.compMat.uniforms.uBase.value = base

    // Reveal images may not all exist yet; load what we can, fall back to base.
    const reveals = await Promise.all(
      revealUrls.map((u) => load(u).catch(() => base)),
    )
    if (this.disposed) return
    this.textures = reveals.length ? reveals : [base]
    this.current = 0
    this.next = 0
    this.compMat.uniforms.uReveal.value = this.textures[0]
    this.compMat.uniforms.uRevealNext.value = this.textures[0]
  }

  /** Update pointer target (UV coords, origin top-left -> flipped to GL). */
  setPointer(uvX: number, uvY: number, active: boolean) {
    this.pointerTarget.set(uvX, 1 - uvY) // flip Y for GL texture space
    if (active) {
      this.pointerActive = true
      this.lastPointerMoveTime = this.clock.getElapsedTime()
    }
  }

  setPointerActive(active: boolean) {
    this.pointerActive = active
  }

  /** Resize renderer + targets to a given CSS pixel size. */
  resize(width: number, height: number) {
    this.renderer.setSize(width, height, false)
    const w = Math.max(1, Math.floor(width * this.dpr))
    const h = Math.max(1, Math.floor(height * this.dpr))
    // Mask runs at half-res for speed; it's blurred anyway.
    const mw = Math.max(1, Math.floor(w / 2))
    const mh = Math.max(1, Math.floor(h / 2))
    this.rtA.setSize(mw, mh)
    this.rtB.setSize(mw, mh)
    this.compMat.uniforms.uResolution.value.set(w, h)
    this.trailMat.uniforms.uAspect.value = width / height
  }

  start() {
    this.clock.start()
    const loop = () => {
      if (this.disposed) return
      this.frame()
      this.raf = requestAnimationFrame(loop)
    }
    this.raf = requestAnimationFrame(loop)
  }

  private frame() {
    const t = this.clock.getElapsedTime()
    const dt = Math.min(this.clock.getDelta(), 0.05)

    // --- pointer inertia: lerp current toward target (thick-liquid drag) ---
    this.prevPointer.copy(this.pointer)
    this.pointer.lerp(this.pointerTarget, 0.18)

    // Velocity -> brush radius + splatter. Idle for >120ms stops painting.
    const vel = this.pointer.distanceTo(this.prevPointer)
    const idle = t - this.lastPointerMoveTime > 0.12
    const painting = this.pointerActive && !idle

    const radius = THREE.MathUtils.clamp(0.045 + vel * 2.2, 0.045, 0.14)
    const targetStrength = painting ? 1 : 0
    const curStrength = this.trailMat.uniforms.uBrushStrength.value as number
    this.trailMat.uniforms.uBrushStrength.value = lerp(
      curStrength,
      targetStrength,
      0.4,
    )
    this.trailMat.uniforms.uBrushRadius.value = radius
    this.trailMat.uniforms.uSplatter.value = THREE.MathUtils.clamp(
      vel * 10,
      0,
      1,
    )

    // Per-frame decay derived from heal time (frame-rate independent-ish).
    // value *= decay each frame; after healSeconds it should be ~0.
    const decay = Math.pow(0.01, dt / this.healSeconds)
    this.trailMat.uniforms.uDecay.value = decay
    this.trailMat.uniforms.uTime.value = t
    ;(this.trailMat.uniforms.uPointer.value as THREE.Vector2).copy(this.pointer)
    ;(this.trailMat.uniforms.uPrevPointer.value as THREE.Vector2).copy(
      this.prevPointer,
    )

    // --- material cycling ---
    // Start a new stroke after full heal -> arm the next material switch.
    this.updateCycle(painting, dt)

    // --- TRAIL PASS: read rtA, write rtB ---
    this.trailMat.uniforms.uPrev.value = this.rtA.texture
    this.renderer.setRenderTarget(this.rtB)
    this.renderer.render(this.trailScene, this.trailCamera)
    this.renderer.setRenderTarget(null)
    // swap
    const tmp = this.rtA
    this.rtA = this.rtB
    this.rtB = tmp

    // --- COMPOSITE PASS: read the freshly written mask (now rtA) ---
    this.compMat.uniforms.uMask.value = this.rtA.texture
    this.compMat.uniforms.uTime.value = t
    this.compMat.uniforms.uFade.value = this.fade
    ;(this.compMat.uniforms.uPointer.value as THREE.Vector2).copy(this.pointer)
    this.renderer.render(this.compScene, this.trailCamera)
  }

  /**
   * Material cycling logic:
   *  - we track whether the mask has fully healed (armedForCycle);
   *  - when the user starts a fresh stroke while armed, we pick the next
   *    texture as uRevealNext and crossfade uFade 0 -> 1, then commit.
   */
  private updateCycle(painting: boolean, dt: number) {
    if (this.textures.length <= 1) return

    if (painting && this.armedForCycle && !this.cycling) {
      // Begin a cycle: next texture becomes the fade target.
      this.next = (this.current + 1) % this.textures.length
      this.compMat.uniforms.uRevealNext.value = this.textures[this.next]
      this.cycling = true
      this.armedForCycle = false
      this.fade = 0
    }

    if (this.cycling) {
      this.fade = Math.min(1, this.fade + dt / 0.4) // ~0.4s crossfade
      if (this.fade >= 1) {
        // Commit: next becomes current, reset fade.
        this.current = this.next
        this.compMat.uniforms.uReveal.value = this.textures[this.current]
        this.compMat.uniforms.uRevealNext.value = this.textures[this.current]
        this.fade = 0
        this.cycling = false
      }
    }

    // Re-arm only once the mask has effectively fully healed (idle long enough).
    const brush = this.trailMat.uniforms.uBrushStrength.value as number
    if (!painting && brush < 0.02) {
      // crude "healed" proxy: not painting + brush released.
      // Use a timer so we don't re-arm mid-fade.
      this.healTimer += dt
      if (this.healTimer > this.healSeconds * 0.6) this.armedForCycle = true
    } else {
      this.healTimer = 0
    }
  }
  private healTimer = 0

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.rtA.dispose()
    this.rtB.dispose()
    this.quad.dispose()
    this.trailMat.dispose()
    this.compMat.dispose()
    this.textures.forEach((t) => t.dispose())
    const base = this.compMat.uniforms.uBase.value as THREE.Texture | null
    base?.dispose()
    this.renderer.dispose()
  }
}

/** Feature-detect WebGL so we can fall back to a plain <img>. */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas")
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    )
  } catch {
    return false
  }
}
