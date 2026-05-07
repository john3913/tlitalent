"use client";
import { useEffect, useRef } from "react";

interface Orb {
  x: number; y: number;
  r: number;
  ox: number; oy: number;
  rx: number; ry: number;
  phaseX: number; phaseY: number;
  speedX: number; speedY: number;
  r1: number; g1: number; b1: number;
  r2: number; g2: number; b2: number;
  opacity: number;
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    let W = 0, H = 0;

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W * devicePixelRatio;
      canvas!.height = H * devicePixelRatio;
      c.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();

    /* Three slow orbs: deep maroon, dark crimson, near-black violet */
    const orbs: Orb[] = [
      {
        ox: W * 0.3, oy: H * 0.45,
        rx: W * 0.18, ry: H * 0.18,
        phaseX: 0, phaseY: 1.1,
        speedX: 0.00028, speedY: 0.00021,
        r: W * 0.52,
        x: 0, y: 0,
        r1: 144, g1: 0, b1: 32,
        r2: 90,  g2: 0, b2: 20,
        opacity: 0.55,
      },
      {
        ox: W * 0.72, oy: H * 0.35,
        rx: W * 0.14, ry: H * 0.14,
        phaseX: 2.4, phaseY: 0.6,
        speedX: 0.00022, speedY: 0.00032,
        r: W * 0.44,
        x: 0, y: 0,
        r1: 60,  g1: 10, b1: 80,
        r2: 30,  g2: 0,  b2: 50,
        opacity: 0.35,
      },
      {
        ox: W * 0.55, oy: H * 0.65,
        rx: W * 0.1, ry: H * 0.1,
        phaseX: 4.8, phaseY: 3.2,
        speedX: 0.00018, speedY: 0.00024,
        r: W * 0.36,
        x: 0, y: 0,
        r1: 100, g1: 5, b1: 18,
        r2: 50,  g2: 0, b2: 12,
        opacity: 0.3,
      },
    ];

    let raf: number;
    let t = 0;

    function drawDotGrid() {
      const spacing = 36;
      const dotR = 0.7;
      c.fillStyle = "rgba(255,255,255,0.055)";
      for (let x = spacing / 2; x < W; x += spacing) {
        for (let y = spacing / 2; y < H; y += spacing) {
          c.beginPath();
          c.arc(x, y, dotR, 0, Math.PI * 2);
          c.fill();
        }
      }
    }

    function drawOrb(orb: Orb) {
      const x = orb.ox + Math.sin(orb.phaseX + t * orb.speedX * 1000) * orb.rx;
      const y = orb.oy + Math.cos(orb.phaseY + t * orb.speedY * 1000) * orb.ry;
      orb.x = x; orb.y = y;

      const g = c.createRadialGradient(x, y, 0, x, y, orb.r);
      g.addColorStop(0,   `rgba(${orb.r1},${orb.g1},${orb.b1},${orb.opacity})`);
      g.addColorStop(0.4, `rgba(${orb.r1},${orb.g1},${orb.b1},${orb.opacity * 0.5})`);
      g.addColorStop(1,   `rgba(${orb.r2},${orb.g2},${orb.b2},0)`);
      c.beginPath();
      c.arc(x, y, orb.r, 0, Math.PI * 2);
      c.fillStyle = g;
      c.fill();
    }

    /* Thin horizontal scan line that drifts very slowly */
    function drawScanline() {
      const y = H * 0.5 + Math.sin(t * 0.00015) * H * 0.22;
      const grad = c.createLinearGradient(0, y - 1, 0, y + 1);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.03)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = grad;
      c.fillRect(0, y - 80, W, 160);
    }

    function draw(ts: number) {
      t = ts;
      c.clearRect(0, 0, W, H);

      /* Background */
      c.fillStyle = "#0e0e10";
      c.fillRect(0, 0, W, H);

      drawDotGrid();
      orbs.forEach(drawOrb);
      drawScanline();

      /* Top vignette fade */
      const topVig = c.createLinearGradient(0, 0, 0, H * 0.5);
      topVig.addColorStop(0, "rgba(14,14,16,0.7)");
      topVig.addColorStop(1, "rgba(14,14,16,0)");
      c.fillStyle = topVig;
      c.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
      orbs[0].ox = W * 0.3;  orbs[0].oy = H * 0.45; orbs[0].r = W * 0.52;
      orbs[0].rx = W * 0.18; orbs[0].ry = H * 0.18;
      orbs[1].ox = W * 0.72; orbs[1].oy = H * 0.35; orbs[1].r = W * 0.44;
      orbs[1].rx = W * 0.14; orbs[1].ry = H * 0.14;
      orbs[2].ox = W * 0.55; orbs[2].oy = H * 0.65; orbs[2].r = W * 0.36;
      orbs[2].rx = W * 0.1;  orbs[2].ry = H * 0.1;
    });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}
