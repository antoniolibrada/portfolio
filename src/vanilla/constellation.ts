interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  phase: number;
  r: number;
}

/**
 * Standalone canvas constellation animation — no framework dependencies.
 *
 * Usage:
 *   const field = new ConstellationField();
 *   field.mount(canvasElement);
 *   // later…
 *   field.destroy();
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
  private readonly N = 36;

  mount(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.nodes = Array.from({ length: this.N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
      hue: 155 + Math.random() * 70,
      phase: Math.random() * Math.PI * 2,
      r: 2 + Math.random() * 3,
    }));

    this.resize();
    this.ro = new ResizeObserver(this.resize);
    this.ro.observe(canvas);

    canvas.addEventListener('mousemove', this.onMove);
    canvas.addEventListener('mouseleave', this.onLeave);

    this.t0 = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
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

  private loop = (now: number): void => {
    if (!this.ctx) return;
    const dt = Math.min(now - this.t0, 60);
    this.t0 = now;

    const { ctx, w, h, nodes, mouse, N } = this;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'oklch(0.985 0.008 180)';
    ctx.fillRect(0, 0, w, h);

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

    this.rafId = requestAnimationFrame(this.loop);
  };
}
