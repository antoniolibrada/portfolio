interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  phase: number;
  r: number;
}

export interface ConstellationOptions {
  /**
   * Force static (no-motion) mode: nodes use a seeded PRNG for deterministic
   * positions, the canvas is rendered once, and no animation loop is started.
   * Also activated automatically when `prefers-reduced-motion: reduce` is set.
   */
  static?: boolean;
  /**
   * Seed for the PRNG used in static mode. Defaults to DEFAULT_SEED.
   * Pass a different value to produce a distinct but still reproducible layout.
   */
  seed?: number;
}

/** Default seed used for the static-mode PRNG. */
export const DEFAULT_SEED = 0x5eed;

/** Mulberry32 — fast, seedable 32-bit PRNG returning values in [0, 1). */
function seededRand(seed: number): () => number {
  let s = seed;
  return (): number => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Standalone canvas constellation animation — no framework dependencies.
 *
 * Usage:
 *   const field = new ConstellationField();
 *   field.mount(canvasElement);
 *   // later…
 *   field.destroy();
 *
 * Static / reduced-motion mode:
 *   field.mount(canvas, { static: true });          // explicit
 *   field.mount(canvas, { static: true, seed: 42 }); // custom seed
 *   // or set prefers-reduced-motion: reduce in the OS / browser
 */
export class ConstellationField {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private nodes: Node[] = [];
  private mouse = { x: 0.5, y: 0.5, active: false };
  private rafId = 0;
  private t0 = 0;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private ro: ResizeObserver | null = null;
  private isStatic = false;
  private readonly N = 36;

  mount(canvas: HTMLCanvasElement, options?: ConstellationOptions): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isStatic = (options?.static ?? false) || reducedMotion;

    const rand = this.isStatic
      ? seededRand(options?.seed ?? DEFAULT_SEED)
      : (): number => Math.random();

    this.nodes = Array.from({ length: this.N }, () => ({
      x: rand(),
      y: rand(),
      vx: (rand() - 0.5) * 0.00012,
      vy: (rand() - 0.5) * 0.00012,
      hue: 155 + rand() * 70,
      phase: rand() * Math.PI * 2,
      r: 2 + rand() * 3,
    }));

    // resize() calls render() when isStatic — so no separate render() call needed
    this.resize();
    this.ro = new ResizeObserver(this.resize);
    this.ro.observe(canvas);

    if (!this.isStatic) {
      canvas.addEventListener('mousemove', this.onMove);
      canvas.addEventListener('mouseleave', this.onLeave);
      this.t0 = performance.now();
      this.rafId = requestAnimationFrame(this.loop);
    }
  }

  destroy(): void {
    cancelAnimationFrame(this.rafId);
    this.ro?.disconnect();
    this.canvas?.removeEventListener('mousemove', this.onMove);
    this.canvas?.removeEventListener('mouseleave', this.onLeave);
    this.canvas = null;
    this.ctx = null;
  }

  private resize = (): void => {
    if (!this.canvas || !this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    this.w = rect.width;
    this.h = rect.height;
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (this.isStatic) this.render();
  };

  private onMove = (e: MouseEvent): void => {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.mouse = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      active: true,
    };
  };

  private onLeave = (): void => {
    this.mouse.active = false;
  };

  private render(): void {
    if (!this.ctx) return;
    const { ctx, w, h, nodes, N } = this;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'oklch(0.985 0.008 180)';
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h;
        const d = Math.hypot(dx, dy);
        if (d < 180) {
          const alpha = (1 - d / 180) * 0.35;
          ctx.strokeStyle = `oklch(0.65 0.1 ${(a.hue + b.hue) / 2} / ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      const px = n.x * w, py = n.y * h;
      const pulse = 0.5 + 0.5 * Math.sin(n.phase);
      const g = ctx.createRadialGradient(px, py, 0, px, py, 26);
      g.addColorStop(0, `oklch(0.7 0.14 ${n.hue} / ${0.45 + pulse * 0.35})`);
      g.addColorStop(1, `oklch(0.9 0.04 ${n.hue} / 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `oklch(0.5 0.12 ${n.hue})`;
      ctx.beginPath();
      ctx.arc(px, py, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private loop = (now: number): void => {
    if (!this.ctx) return;
    const dt = Math.min(now - this.t0, 60);
    this.t0 = now;

    const { nodes, mouse } = this;

    for (const n of nodes) {
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      if (n.x < 0) n.x = 1;
      if (n.x > 1) n.x = 0;
      if (n.y < 0) n.y = 1;
      if (n.y > 1) n.y = 0;
      n.phase += 0.0015 * dt;
      if (mouse.active) {
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 0.18) {
          n.x += dx * 0.0008 * dt;
          n.y += dy * 0.0008 * dt;
        }
      }
    }

    this.render();
    this.rafId = requestAnimationFrame(this.loop);
  };
}
