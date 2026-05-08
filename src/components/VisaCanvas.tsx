"use client";
import { useEffect, useRef } from "react";

interface Node { x: number; y: number }
interface Edge { a: number; b: number }
interface Particle { ei: number; t: number; speed: number; dir: 1 | -1 }

const N = 58;

/* Slow aurora bands — emerald/teal palette */
const AURORA = [
  { baseY: 0.30, amp: 0.10, freq: 0.00022, rgb: "16,185,129",  peak: 0.048 },
  { baseY: 0.62, amp: 0.07, freq: 0.00017, rgb: "5,150,105",   peak: 0.036 },
  { baseY: 0.15, amp: 0.06, freq: 0.00031, rgb: "20,184,166",  peak: 0.030 },
  { baseY: 0.80, amp: 0.05, freq: 0.00025, rgb: "6,182,212",   peak: 0.024 },
];

export default function VisaCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const c = ctx, el = canvas;

    let W = 0, H = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let particles: Particle[] = [];

    function build() {
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
      }));
      const cutoff = H * 0.26;
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        let conns = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < cutoff && conns < 4) {
            edges.push({ a: i, b: j }); conns++;
          }
        }
      }
      particles = edges
        .filter(() => Math.random() < 0.58)
        .map((_, i) => ({
          ei: i, t: Math.random(),
          speed: 0.00020 + Math.random() * 0.00040,
          dir: (Math.random() < 0.5 ? 1 : -1) as 1 | -1,
        }));
    }

    function resize() {
      W = el.offsetWidth; H = el.offsetHeight;
      el.width = W * devicePixelRatio; el.height = H * devicePixelRatio;
      c.scale(devicePixelRatio, devicePixelRatio);
      build();
    }
    resize();

    let raf = 0;

    function drawAurora(t: number) {
      for (const band of AURORA) {
        const cy = (band.baseY + Math.sin(t * band.freq) * band.amp) * H;
        const half = H * 0.22;
        const g = c.createLinearGradient(0, cy - half, 0, cy + half);
        g.addColorStop(0,   `rgba(${band.rgb},0)`);
        g.addColorStop(0.5, `rgba(${band.rgb},${band.peak})`);
        g.addColorStop(1,   `rgba(${band.rgb},0)`);
        c.fillStyle = g; c.fillRect(0, cy - half, W, half * 2);
      }
    }

    function draw() {
      const t = performance.now();

      c.fillStyle = "rgba(4,12,20,0.13)";
      c.fillRect(0, 0, W, H);

      drawAurora(t);

      /* edges */
      c.lineWidth = 0.55;
      c.strokeStyle = "rgba(16,185,129,0.10)";
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
      }

      /* nodes */
      for (const n of nodes) {
        c.fillStyle = "rgba(52,211,153,0.28)";
        c.beginPath(); c.arc(n.x, n.y, 1.2, 0, Math.PI * 2); c.fill();
      }

      /* particles */
      for (const p of particles) {
        const e = edges[p.ei];
        const a = nodes[e.a], b = nodes[e.b];
        const px = a.x + (b.x - a.x) * p.t, py = a.y + (b.y - a.y) * p.t;

        const glow = c.createRadialGradient(px, py, 0, px, py, 4);
        glow.addColorStop(0, "rgba(52,211,153,0.22)");
        glow.addColorStop(1, "rgba(52,211,153,0)");
        c.fillStyle = glow; c.beginPath(); c.arc(px, py, 4, 0, Math.PI * 2); c.fill();

        c.fillStyle = "rgba(167,243,208,0.70)";
        c.beginPath(); c.arc(px, py, 1.0, 0, Math.PI * 2); c.fill();

        p.t += p.speed * p.dir;
        if (p.t > 1) { p.t = 1; p.dir = -1; }
        if (p.t < 0) { p.t = 0; p.dir = 1; }
      }

      /* fine grid */
      c.lineWidth = 0.35;
      c.strokeStyle = "rgba(255,255,255,0.018)";
      for (let x = 48; x < W; x += 48) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
      for (let y = 48; y < H; y += 48) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }

      /* vignette */
      const ev = c.createRadialGradient(W * 0.5, H * 0.5, W * 0.05, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
      ev.addColorStop(0, "rgba(4,12,20,0)"); ev.addColorStop(1, "rgba(4,12,20,0.55)");
      c.fillStyle = ev; c.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    }

    c.fillStyle = "#040c14"; c.fillRect(0, 0, W, H);
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize); ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={ref}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, display: "block" }} />
  );
}
