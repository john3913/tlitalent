"use client";
import { useEffect, useRef } from "react";

interface Node { x: number; y: number }
interface Edge { a: number; b: number }
interface Particle { ei: number; t: number; speed: number; dir: 1 | -1 }

const N = 36;
const BG = "rgba(7,16,31,0.14)";

export default function StatsCanvas() {
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
      const cutoff = W * 0.20;
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        let conns = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < cutoff && conns < 3) {
            edges.push({ a: i, b: j }); conns++;
          }
        }
      }
      particles = edges
        .filter(() => Math.random() < 0.60)
        .map((_, i) => ({
          ei: i, t: Math.random(),
          speed: 0.00020 + Math.random() * 0.00035,
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

    function draw() {
      /* fade trail — dark navy base */
      c.fillStyle = BG;
      c.fillRect(0, 0, W, H);

      /* fine grid — technical instrument texture */
      c.lineWidth = 0.35;
      c.strokeStyle = "rgba(120,160,220,0.055)";
      for (let x = 40; x < W; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
      for (let y = 40; y < H; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }

      /* edges */
      c.lineWidth = 0.55;
      c.strokeStyle = "rgba(100,140,200,0.10)";
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
      }

      /* nodes */
      for (const n of nodes) {
        c.fillStyle = "rgba(140,175,225,0.28)";
        c.beginPath(); c.arc(n.x, n.y, 1.3, 0, Math.PI * 2); c.fill();
      }

      /* particles */
      for (const p of particles) {
        const e = edges[p.ei];
        const a = nodes[e.a], b = nodes[e.b];
        const px = a.x + (b.x - a.x) * p.t, py = a.y + (b.y - a.y) * p.t;

        const glow = c.createRadialGradient(px, py, 0, px, py, 4.5);
        glow.addColorStop(0, "rgba(160,200,248,0.20)");
        glow.addColorStop(1, "rgba(160,200,248,0)");
        c.fillStyle = glow; c.beginPath(); c.arc(px, py, 4.5, 0, Math.PI * 2); c.fill();

        c.fillStyle = "rgba(215,232,255,0.68)";
        c.beginPath(); c.arc(px, py, 1.0, 0, Math.PI * 2); c.fill();

        p.t += p.speed * p.dir;
        if (p.t > 1) { p.t = 1; p.dir = -1; }
        if (p.t < 0) { p.t = 0; p.dir = 1; }
      }

      raf = requestAnimationFrame(draw);
    }

    c.fillStyle = "#07101f"; c.fillRect(0, 0, W, H);
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize); ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={ref}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, display: "block" }} />
  );
}
