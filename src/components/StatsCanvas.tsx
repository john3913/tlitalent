"use client";
import { useEffect, useRef } from "react";

interface Node { x: number; y: number }
interface Edge { a: number; b: number; len: number }
interface Particle { ei: number; t: number; speed: number; dir: 1 | -1 }

const N = 28;

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
      const cutoff = W * 0.22;
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        let conns = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < cutoff && conns < 3) { edges.push({ a: i, b: j, len: d }); conns++; }
        }
      }
      particles = edges
        .filter(() => Math.random() < 0.55)
        .map((_, i) => ({
          ei: i, t: Math.random(),
          speed: 0.00018 + Math.random() * 0.00038,
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
      c.clearRect(0, 0, W, H);

      /* edges */
      c.lineWidth = 0.5;
      c.strokeStyle = "rgba(168,0,36,0.07)";
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
      }

      /* nodes */
      for (const n of nodes) {
        c.fillStyle = "rgba(168,0,36,0.13)";
        c.beginPath(); c.arc(n.x, n.y, 1.4, 0, Math.PI * 2); c.fill();
      }

      /* particles */
      for (const p of particles) {
        const e = edges[p.ei];
        const a = nodes[e.a], b = nodes[e.b];
        const px = a.x + (b.x - a.x) * p.t, py = a.y + (b.y - a.y) * p.t;

        const glow = c.createRadialGradient(px, py, 0, px, py, 5);
        glow.addColorStop(0, "rgba(168,0,36,0.12)");
        glow.addColorStop(1, "rgba(168,0,36,0)");
        c.fillStyle = glow; c.beginPath(); c.arc(px, py, 5, 0, Math.PI * 2); c.fill();

        c.fillStyle = "rgba(168,0,36,0.52)";
        c.beginPath(); c.arc(px, py, 1.1, 0, Math.PI * 2); c.fill();

        p.t += p.speed * p.dir;
        if (p.t > 1) { p.t = 1; p.dir = -1; }
        if (p.t < 0) { p.t = 0; p.dir = 1; }
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize); ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={ref}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, display: "block" }} />
  );
}
