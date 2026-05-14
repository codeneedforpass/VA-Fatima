import {useCallback, useEffect, useRef} from 'react';

type Particle = {x: number; y: number; vx: number; vy: number};

const COUNT = 52;
const LINK_DIST = 118;
const MOUSE_PULL = 0.018;

/**
 * Lightweight canvas “constellation” behind the hero + stack strip (reference: connected web depth).
 */
export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({x: 0.5, y: 0.5, active: false});
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pts = particlesRef.current;
    if (pts.length !== COUNT) {
      particlesRef.current = Array.from({length: COUNT}, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    } else {
      for (const p of pts) {
        p.x = Math.min(p.x, w);
        p.y = Math.min(p.y, h);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        mouseRef.current.active = false;
        return;
      }
      mouseRef.current = {
        x: (e.clientX - r.left) / Math.max(r.width, 1),
        y: (e.clientY - r.top) / Math.max(r.height, 1),
        active: true,
      };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('blur', onLeave);

    const tick = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w < 24 || h < 24) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const pts = particlesRef.current;
      if (!pts.length) {
        resize();
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        if (mouse.active) {
          const mx = mouse.x * w;
          const my = mouse.y * h;
          p.vx += (mx - p.x) * MOUSE_PULL * 0.02;
          p.vy += (my - p.y) * MOUSE_PULL * 0.02;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST && d > 0) {
            const alpha = (1 - d / LINK_DIST) * 0.22;
            ctx.strokeStyle = `rgba(86, 96, 95, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = 'rgba(47, 103, 98, 0.35)';
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('blur', onLeave);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.55]"
    />
  );
}
