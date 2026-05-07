"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  px: number; py: number;
  age: number; maxAge: number;
  speed: number;
  maroon: boolean;
  lw: number;
  op: number;
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;
    const el = canvas;

    let W = 0, H = 0;
    const N = 900;
    const CONN = 120;
    let particles: Particle[] = [];

    function resize() {
      W = el.offsetWidth;
      H = el.offsetHeight;
      el.width = W * devicePixelRatio;
      el.height = H * devicePixelRatio;
      c.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();

    function spawn(stagger?: boolean): Particle {
      const maxAge = 120 + Math.random() * 220;
      return {
        x: Math.random() * W, y: Math.random() * H,
        px: 0, py: 0,
        age: stagger ? Math.random() * maxAge : 0,
        maxAge,
        speed: 0.45 + Math.random() * 0.8,
        maroon: Math.random() < 0.2,
        lw: 0.4 + Math.random() * 0.65,
        op: 0.65 + Math.random() * 0.35,
      };
    }

    particles = Array.from({ length: N }, () => spawn(true));

    function fieldAngle(x: number, y: number, t: number): number {
      const s = 1.55 / Math.max(W, H);
      const ts = t * 0.000148;
      const fx = 2.1 + Math.sin(ts * 0.27) * 0.55;
      const fy = 1.75 + Math.cos(ts * 0.21) * 0.45;
      return (
        Math.sin(x * s * fx + ts * 0.52) *
        Math.cos(y * s * fy - ts * 0.36) *
        Math.PI * 2.35 +
        Math.sin((x * 0.6 + y * 0.8) * s * 1.25 + ts * 0.88) * 0.78
      );
    }

    function drawGrid() {
      const step = 80;
      c.lineWidth = 0.3;
      c.strokeStyle = "rgba(255,255,255,0.016)";
      for (let x = step / 2; x < W; x += step) {
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke();
      }
      for (let y = step / 2; y < H; y += step) {
        c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke();
      }
      c.fillStyle = "rgba(255,255,255,0.038)";
      for (let x = step / 2; x < W; x += step) {
        for (let y = step / 2; y < H; y += step) {
          c.beginPath(); c.arc(x, y, 0.65, 0, Math.PI * 2); c.fill();
        }
      }
    }

    /* Spatial-grid constellation — O(n) bucketing avoids O(n²) brute force */
    function drawConnections() {
      const cellSize = CONN;
      const cols = Math.ceil(W / cellSize) + 1;
      const rows = Math.ceil(H / cellSize) + 1;
      const grid: number[][] = Array.from({ length: cols * rows }, () => []);

      particles.forEach((p, i) => {
        const col = Math.max(0, Math.min(cols - 1, Math.floor(p.x / cellSize)));
        const row = Math.max(0, Math.min(rows - 1, Math.floor(p.y / cellSize)));
        grid[row * cols + col].push(i);
      });

      particles.forEach((p, i) => {
        const life = p.age / p.maxAge;
        if (life < 0.04 || life > 0.96) return;
        const pFade = life < 0.1 ? life / 0.1 : life > 0.88 ? (1 - life) / 0.12 : 1;

        const col = Math.max(0, Math.min(cols - 1, Math.floor(p.x / cellSize)));
        const row = Math.max(0, Math.min(rows - 1, Math.floor(p.y / cellSize)));

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const cr = row + dr, cc = col + dc;
            if (cr < 0 || cr >= rows || cc < 0 || cc >= cols) continue;
            for (const j of grid[cr * cols + cc]) {
              if (j <= i) continue;
              const q = particles[j];
              const dist = Math.hypot(p.x - q.x, p.y - q.y);
              if (dist >= CONN) continue;
              const qLife = q.age / q.maxAge;
              const qFade = qLife < 0.1 ? qLife / 0.1 : qLife > 0.88 ? (1 - qLife) / 0.12 : 1;
              const alpha = (1 - dist / CONN) * 0.06 * pFade * qFade;
              c.lineWidth = 0.32;
              c.strokeStyle = (p.maroon || q.maroon)
                ? `rgba(200,0,50,${(alpha * 1.6).toFixed(3)})`
                : `rgba(175,188,215,${alpha.toFixed(3)})`;
              c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(q.x, q.y); c.stroke();
            }
          }
        }
      });
    }

    let raf: number;

    function draw(t: number) {
      /* Slow fade — longer, more elegant trails */
      c.fillStyle = "rgba(12,12,17,0.11)";
      c.fillRect(0, 0, W, H);

      drawGrid();
      drawConnections();

      particles.forEach((p) => {
        p.px = p.x; p.py = p.y;
        const a = fieldAngle(p.x, p.y, t);
        p.x += Math.cos(a) * p.speed;
        p.y += Math.sin(a) * p.speed;
        p.age++;

        const life = p.age / p.maxAge;
        const base =
          life < 0.08 ? (life / 0.08) * 0.26 * p.op
          : life > 0.85 ? ((1 - life) / 0.15) * 0.26 * p.op
          : 0.26 * p.op;

        if (p.maroon) {
          /* Bloom glow layer */
          c.lineWidth = p.lw * 3;
          c.strokeStyle = `rgba(192,0,50,${(base * 0.22).toFixed(3)})`;
          c.beginPath(); c.moveTo(p.px, p.py); c.lineTo(p.x, p.y); c.stroke();
          /* Core */
          c.lineWidth = p.lw;
          c.strokeStyle = `rgba(225,30,70,${(base * 1.7).toFixed(3)})`;
        } else {
          c.lineWidth = p.lw;
          c.strokeStyle = `rgba(195,208,232,${(base * 0.85).toFixed(3)})`;
        }
        c.beginPath(); c.moveTo(p.px, p.py); c.lineTo(p.x, p.y); c.stroke();

        if (p.age >= p.maxAge || p.x < -5 || p.x > W + 5 || p.y < -5 || p.y > H + 5) {
          Object.assign(p, spawn(false));
        }
      });

      /* Edge vignette */
      const vig = c.createRadialGradient(W * 0.5, H * 0.44, 0, W * 0.5, H * 0.44, Math.max(W, H) * 0.74);
      vig.addColorStop(0, "rgba(12,12,17,0)");
      vig.addColorStop(1, "rgba(12,12,17,0.6)");
      c.fillStyle = vig;
      c.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    }

    c.fillStyle = "#0c0c11";
    c.fillRect(0, 0, W, H);
    drawGrid();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}
