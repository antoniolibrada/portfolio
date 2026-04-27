import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConstellationField, DEFAULT_SEED } from './constellation';

// Private-state accessor helpers — TypeScript `private` is compile-time only
type FieldInternals = {
  nodes: NodeState[];
  mouse: { x: number; y: number; active: boolean };
  t0: number;
};

interface NodeState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  phase: number;
  r: number;
}

function internals(field: ConstellationField): FieldInternals {
  return field as unknown as FieldInternals;
}

function makeCtxMock() {
  const gradient = { addColorStop: vi.fn() };
  return {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    setTransform: vi.fn(),
    createRadialGradient: vi.fn().mockReturnValue(gradient),
    strokeStyle: '' as string,
    fillStyle: '' as string,
    lineWidth: 0,
  };
}

describe('ConstellationField', () => {
  let canvas: HTMLCanvasElement;
  let ctx: ReturnType<typeof makeCtxMock>;
  let field: ConstellationField;
  let capturedLoop: FrameRequestCallback;
  let roCallback: ResizeObserverCallback;
  let roMock: { observe: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    ctx = makeCtxMock();
    canvas = document.createElement('canvas');

    vi.spyOn(canvas, 'getContext').mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
    vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
      width: 800, height: 600, left: 0, top: 0,
      right: 800, bottom: 600, x: 0, y: 0,
      toJSON: () => '',
    } as DOMRect);

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      capturedLoop = cb;
      return 42;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockReturnValue(undefined);

    roMock = { observe: vi.fn(), disconnect: vi.fn() };
    // ResizeObserver must be a real constructor (not an arrow fn) so `new` works
    vi.stubGlobal('ResizeObserver', vi.fn(function MockRO(
      this: Record<string, unknown>,
      cb: ResizeObserverCallback,
    ) {
      roCallback = cb;
      this.observe = roMock.observe;
      this.disconnect = roMock.disconnect;
    }));
    vi.stubGlobal('devicePixelRatio', 1);
    // Default: no reduced-motion preference
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      matches: false, media: '', onchange: null,
      addListener: vi.fn(), removeListener: vi.fn(),
      addEventListener: vi.fn(), removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    field = new ConstellationField();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  // ─── mount ────────────────────────────────────────────────────────────────

  describe('mount', () => {
    it('acquires the 2d context from the canvas', () => {
      field.mount(canvas);
      expect(canvas.getContext).toHaveBeenCalledWith('2d');
    });

    it('starts the animation loop via requestAnimationFrame', () => {
      field.mount(canvas);
      expect(window.requestAnimationFrame).toHaveBeenCalledOnce();
    });

    it('attaches mousemove and mouseleave listeners to the canvas', () => {
      const spy = vi.spyOn(canvas, 'addEventListener');
      field.mount(canvas);
      expect(spy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(spy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
    });

    it('creates a ResizeObserver and observes the canvas', () => {
      field.mount(canvas);
      expect(ResizeObserver).toHaveBeenCalledOnce();
      expect(roMock.observe).toHaveBeenCalledWith(canvas);
    });

    it('initialises exactly 36 nodes', () => {
      field.mount(canvas);
      expect(internals(field).nodes).toHaveLength(36);
    });

    it('sets canvas pixel dimensions from getBoundingClientRect (DPR = 1)', () => {
      field.mount(canvas);
      expect(canvas.width).toBe(800);
      expect(canvas.height).toBe(600);
    });

    it('caps DPR at 2 and applies the correct transform', () => {
      vi.stubGlobal('devicePixelRatio', 3);
      field.mount(canvas);
      // capped at 2
      expect(ctx.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0);
    });
  });

  // ─── destroy ──────────────────────────────────────────────────────────────

  describe('destroy', () => {
    it('cancels the active animation frame', () => {
      field.mount(canvas);
      field.destroy();
      expect(window.cancelAnimationFrame).toHaveBeenCalledWith(42);
    });

    it('disconnects the ResizeObserver', () => {
      field.mount(canvas);
      field.destroy();
      expect(roMock.disconnect).toHaveBeenCalledOnce();
    });

    it('removes the mousemove and mouseleave listeners', () => {
      const spy = vi.spyOn(canvas, 'removeEventListener');
      field.mount(canvas);
      field.destroy();
      expect(spy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(spy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
    });

    it('does not throw when called before mount', () => {
      expect(() => field.destroy()).not.toThrow();
    });

    it('is safe to call a second time', () => {
      field.mount(canvas);
      field.destroy();
      expect(() => field.destroy()).not.toThrow();
    });
  });

  // ─── ResizeObserver ───────────────────────────────────────────────────────

  describe('ResizeObserver', () => {
    it('updates canvas pixel dimensions when the observer fires', () => {
      field.mount(canvas);

      vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
        width: 1200, height: 900, left: 0, top: 0,
        right: 1200, bottom: 900, x: 0, y: 0,
        toJSON: () => '',
      } as DOMRect);

      roCallback([], roMock as unknown as ResizeObserver);

      expect(canvas.width).toBe(1200);
      expect(canvas.height).toBe(900);
    });

    it('re-applies the DPR transform after resize', () => {
      vi.stubGlobal('devicePixelRatio', 2);
      field.mount(canvas);
      ctx.setTransform.mockClear();

      roCallback([], roMock as unknown as ResizeObserver);

      expect(ctx.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0);
    });
  });

  // ─── animation loop ───────────────────────────────────────────────────────

  describe('animation loop', () => {
    it('clears the canvas and draws nodes on each frame', () => {
      field.mount(canvas);
      internals(field).t0 = 1000;
      capturedLoop(1016);
      expect(ctx.clearRect).toHaveBeenCalled();
      expect(ctx.arc).toHaveBeenCalled();
    });

    it('schedules the next frame after rendering', () => {
      field.mount(canvas);
      const callsBefore = vi.mocked(window.requestAnimationFrame).mock.calls.length;
      internals(field).t0 = 1000;
      capturedLoop(1016);
      expect(vi.mocked(window.requestAnimationFrame).mock.calls.length).toBeGreaterThan(callsBefore);
    });

    it('draws exactly 72 arcs per frame (glow + dot for each of 36 nodes)', () => {
      field.mount(canvas);
      internals(field).t0 = 1000;
      capturedLoop(1016);
      expect(ctx.arc).toHaveBeenCalledTimes(72);
    });
  });

  // ─── dot interactions ─────────────────────────────────────────────────────

  describe('dot interactions', () => {
    it('attracts nodes within 0.18 proximity toward the cursor', () => {
      field.mount(canvas);

      // Pin node 0 at center with no drift
      const { nodes } = internals(field);
      nodes[0] = { ...nodes[0], x: 0.5, y: 0.5, vx: 0, vy: 0 };

      // Mouse at (450, 390) → normalised (0.5625, 0.65) → dist ≈ 0.163 < 0.18
      canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: 450, clientY: 390 }));

      const beforeX = nodes[0].x;
      const beforeY = nodes[0].y;

      internals(field).t0 = 1000;
      capturedLoop(1016); // dt = 16

      expect(nodes[0].x).toBeGreaterThan(beforeX);
      expect(nodes[0].y).toBeGreaterThan(beforeY);
    });

    it('leaves nodes outside the 0.18 proximity radius unaffected by the cursor', () => {
      field.mount(canvas);

      const { nodes } = internals(field);
      nodes[0] = { ...nodes[0], x: 0.5, y: 0.5, vx: 0, vy: 0 };

      // Mouse at (720, 540) → normalised (0.9, 0.9) → dist ≈ 0.566 > 0.18
      canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: 720, clientY: 540 }));

      internals(field).t0 = 1000;
      capturedLoop(1016);

      // Zero velocity + no attraction → position unchanged
      expect(nodes[0].x).toBe(0.5);
      expect(nodes[0].y).toBe(0.5);
    });

    it('stops attracting nodes after mouseleave', () => {
      field.mount(canvas);

      const { nodes } = internals(field);
      nodes[0] = { ...nodes[0], x: 0.5, y: 0.5, vx: 0, vy: 0 };

      canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: 450, clientY: 390 }));
      canvas.dispatchEvent(new MouseEvent('mouseleave'));

      internals(field).t0 = 1000;
      capturedLoop(1016);

      expect(nodes[0].x).toBe(0.5);
      expect(nodes[0].y).toBe(0.5);
    });

    it('records cursor position relative to the canvas bounds', () => {
      field.mount(canvas);

      // Canvas rect: left=100, top=50, width=800, height=600
      vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
        width: 800, height: 600, left: 100, top: 50,
        right: 900, bottom: 650, x: 100, y: 50,
        toJSON: () => '',
      } as DOMRect);

      // clientX=500, clientY=350 → (500-100)/800=0.5, (350-50)/600=0.5 → exact center
      canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: 500, clientY: 350 }));

      const { mouse } = internals(field);
      expect(mouse.x).toBeCloseTo(0.5);
      expect(mouse.y).toBeCloseTo(0.5);
      expect(mouse.active).toBe(true);
    });

    it('wraps nodes that drift past the right edge back to 0', () => {
      field.mount(canvas);

      const { nodes } = internals(field);
      // Place node just past the right edge velocity-wise: after dt=16 it crosses 1
      nodes[0] = { ...nodes[0], x: 0.999, y: 0.5, vx: 0.001, vy: 0 };

      internals(field).t0 = 1000;
      capturedLoop(1016); // x = 0.999 + 0.001*16 = 1.015 → wraps to 0

      expect(nodes[0].x).toBe(0);
    });

    it('wraps nodes that drift past the left edge back to 1', () => {
      field.mount(canvas);

      const { nodes } = internals(field);
      nodes[0] = { ...nodes[0], x: 0.001, y: 0.5, vx: -0.001, vy: 0 };

      internals(field).t0 = 1000;
      capturedLoop(1016); // x = 0.001 - 0.001*16 = -0.015 → wraps to 1

      expect(nodes[0].x).toBe(1);
    });
  });

  // ─── static mode ──────────────────────────────────────────────────────────

  describe('static mode', () => {
    it('does not start requestAnimationFrame', () => {
      field.mount(canvas, { static: true });
      expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    });

    it('renders 72 arcs immediately on mount (no loop needed)', () => {
      field.mount(canvas, { static: true });
      expect(ctx.arc).toHaveBeenCalledTimes(72);
    });

    it('does not attach mouse event listeners', () => {
      const spy = vi.spyOn(canvas, 'addEventListener');
      field.mount(canvas, { static: true });
      expect(spy).not.toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(spy).not.toHaveBeenCalledWith('mouseleave', expect.any(Function));
    });

    it('re-renders when the ResizeObserver fires', () => {
      field.mount(canvas, { static: true });
      const arcsBefore = ctx.arc.mock.calls.length; // 72 from initial render

      vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
        width: 1200, height: 900, left: 0, top: 0,
        right: 1200, bottom: 900, x: 0, y: 0,
        toJSON: () => '',
      } as DOMRect);
      roCallback([], roMock as unknown as ResizeObserver);

      expect(ctx.arc.mock.calls.length).toBe(arcsBefore + 72);
    });

    it('produces identical node positions on repeated mounts with the same seed', () => {
      field.mount(canvas, { static: true });
      const snap1 = internals(field).nodes.map(n => ({ x: n.x, y: n.y }));

      field.destroy();
      field = new ConstellationField();
      field.mount(canvas, { static: true });
      const snap2 = internals(field).nodes.map(n => ({ x: n.x, y: n.y }));

      expect(snap1).toEqual(snap2);
    });

    it('produces different positions with a different seed', () => {
      field.mount(canvas, { static: true, seed: DEFAULT_SEED });
      const snap1 = internals(field).nodes.map(n => ({ x: n.x, y: n.y }));

      field.destroy();
      field = new ConstellationField();
      field.mount(canvas, { static: true, seed: DEFAULT_SEED + 1 });
      const snap2 = internals(field).nodes.map(n => ({ x: n.x, y: n.y }));

      expect(snap1).not.toEqual(snap2);
    });

    it('destroy works correctly in static mode', () => {
      field.mount(canvas, { static: true });
      expect(() => field.destroy()).not.toThrow();
      expect(roMock.disconnect).toHaveBeenCalledOnce();
    });
  });

  // ─── reduced-motion ───────────────────────────────────────────────────────

  describe('reduced-motion', () => {
    function stubReducedMotion() {
      vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(), removeListener: vi.fn(),
        addEventListener: vi.fn(), removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })));
    }

    it('auto-activates static mode when prefers-reduced-motion: reduce is set', () => {
      stubReducedMotion();
      field.mount(canvas);
      expect(window.requestAnimationFrame).not.toHaveBeenCalled();
      expect(ctx.arc).toHaveBeenCalledTimes(72);
    });

    it('does not attach mouse listeners when prefers-reduced-motion is active', () => {
      stubReducedMotion();
      const spy = vi.spyOn(canvas, 'addEventListener');
      field.mount(canvas);
      expect(spy).not.toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(spy).not.toHaveBeenCalledWith('mouseleave', expect.any(Function));
    });

    it('uses DEFAULT_SEED and matches explicit static: true layout', () => {
      stubReducedMotion();
      field.mount(canvas);
      const reducedPos = internals(field).nodes.map(n => ({ x: n.x, y: n.y }));

      field.destroy();
      field = new ConstellationField();
      field.mount(canvas, { static: true }); // same default seed, no reduced-motion
      const explicitPos = internals(field).nodes.map(n => ({ x: n.x, y: n.y }));

      expect(reducedPos).toEqual(explicitPos);
    });
  });
});
