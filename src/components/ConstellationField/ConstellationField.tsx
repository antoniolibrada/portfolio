import { useRef, useEffect } from 'react';
import './ConstellationField.scss';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  phase: number;
  r: number;
}

export function ConstellationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const N = 36;

    const nodes: Node[] = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
      hue: 155 + Math.random() * 70,
      phase: Math.random() * Math.PI * 2,
      r: 2 + Math.random() * 3,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    let rafId: number;
    let t0 = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(now - t0, 60);
      t0 = now;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'oklch(0.985 0.008 180)';
      ctx.fillRect(0, 0, w, h);

      const m = mouseRef.current;
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0) n.x = 1;
        if (n.x > 1) n.x = 0;
        if (n.y < 0) n.y = 1;
        if (n.y > 1) n.y = 0;
        n.phase += 0.0015 * dt;
        if (m.active) {
          const dx = m.x - n.x, dy = m.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 0.18) {
            n.x += dx * 0.0008 * dt;
            n.y += dy * 0.0008 * dt;
          }
        }
      }

      // edges
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

      // nodes with glow
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

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation-field__canvas" />;
}
