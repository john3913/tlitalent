"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  px: number; py: number;
  age: number; maxAge: number;
  speed: number;
  maroon: boolean;
  lw: number;
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
    const N = 680;
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
      const maxAge = 90 + Math.random() * 160;
      return {
        x: Math.random() * W, y: Math.random() * H,
        px: 0, py: 0,
        age: stagger ? Math.random() * maxAge : 0,
        maxAge,
        speed: 0.65 + Math.random() * 0.85,
        maroon: Math.random() < 0.17,
        lw: 0.5 + Math.random() * 0.6,
      };
    }

    particles = Array.from({ length: N }, () => spawn(true));

    /* Mathematical vector field:
       angle = sin(fx·x + t) · cos(fy·y − t) · τ + sin((x+y)·k + t)·c
       Parameters drift slowly, creating morphing phase-portrait topology */
    function fieldAngle(x: number, y: number, t: number): number {
      const s = 1.55 / Math.max(W, H);
      const ts = t * 0.000155;
      const fx = 2.1 + Math.sin(ts * 0.27) * 0.55;
      const fy = 1.75 + Math.cos(ts * 0.21) * 0.45;
      return (
        Math.sin(x * s * fx + ts * 0.52) *
        Math.cos(y * s * fy - ts * 0.36) *
        Math.PI * 2.35 +
        Math.sin((x * 0.6 + y * 0.8) * s * 1.25 + ts * 0.88) * 0.78
      );
    }

    /* Faint coordinate grid — signals mathematical space */
    function drawGrid() {
      const step = 70;
      c.lineWidth = 0.4;
      c.strokeStyle = "rgba(255,255,255,0.022)";
      for (let x = step / 2; x < W; x += step) {
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke();
      }
      for (let y = step / 2; y < H; y += step) {
        c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke();
      }
      /* Intersection dots */
      c.fillStyle = "rgba(255,255,255,0.048)";
      for (let x = step / 2; x < W; x += step) {
        for (let y = step / 2; y < H; y += step) {
          c.beginPath(); c.arc(x, y, 0.75, 0, Math.PI * 2); c.fill();
        }
      }
    }

    /* Periodic faint Lissajous ghost — unmistakably mathematical */
    let lissT = 0;
    function drawLissajous() {
      const cx = W * 0.62, cy = H * 0.42;
      const rx = Math.min(W, H) * 0.22;
      const ry = Math.min(W, H) * 0.15;
      const A = 3, B = 2;
      const steps = 400;
      c.save();
      c.globalAlpha = 0.025;
      c.strokeStyle = "#c0003a";
      c.lineWidth = 0.8;
      c.beginPath();
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const x = cx + rx * Math.sin(A * t + lissT * 0.0004);
        const y = cy + ry * Math.sin(B * t);
        i === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
      }
      c.stroke();
      c.restore();
    }

    let raf: number;

    function draw(t: number) {
      lissT = t;

      /* Trail fade — slower = longer trails */
      c.fillStyle = "rgba(14,14,16,0.15)";
      c.fillRect(0, 0, W, H);

      /* Grid persists faintly through the fade each frame */
      drawGrid();

      /* Lissajous ghost */
      drawLissajous();

      /* Particles */
      particles.forEach((p) => {
        p.px = p.x; p.py = p.y;
        const a = fieldAngle(p.x, p.y, t);
        p.x += Math.cos(a) * p.speed;
        p.y += Math.sin(a) * p.speed;
        p.age++;

        const life = p.age / p.maxAge;
        const alpha =
          life < 0.08 ? (life / 0.08) * 0.2
          : life > 0.86 ? ((1 - life) / 0.14) * 0.2
          : 0.2;

        c.lineWidth = p.lw;
        c.strokeStyle = p.maroon
          ? `rgba(192,0,58,${(alpha * 1.3).toFixed(3)})`
          : `rgba(210,212,222,${(alpha * 0.72).toFixed(3)})`;
        c.beginPath();
        c.moveTo(p.px, p.py);
        c.lineTo(p.x, p.y);
        c.stroke();

        if (
          p.age >= p.maxAge ||
          p.x < -5 || p.x > W + 5 ||
          p.y < -5 || p.y > H + 5
        ) {
          Object.assign(p, spawn(false));
        }
      });

      /* Radial edge vignette */
      const vig = c.createRadialGradient(
        W * 0.5, H * 0.42, 0,
        W * 0.5, H * 0.42, Math.max(W, H) * 0.72
      );
      vig.addColorStop(0, "rgba(14,14,16,0)");
      vig.addColorStop(1, "rgba(14,14,16,0.62)");
      c.fillStyle = vig;
      c.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    }

    /* Seed initial frame */
    c.fillStyle = "#0e0e10";
    c.fillRect(0, 0, W, H);
    drawGrid();

    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}
