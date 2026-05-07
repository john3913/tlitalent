"use client";
import { useEffect, useRef } from "react";

/* Pipeline nodes — positioned in the right portion so text lives on the left */
const NODES = [
  { rx: 0.53, ry: 0.76, n: "01", label: "Recommend" },
  { rx: 0.64, ry: 0.22, n: "02", label: "Apply"     },
  { rx: 0.73, ry: 0.72, n: "03", label: "Review"    },
  { rx: 0.82, ry: 0.20, n: "04", label: "Match"     },
  { rx: 0.89, ry: 0.68, n: "05", label: "Sign"      },
  { rx: 0.95, ry: 0.16, n: "06", label: "Start"     },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
];

interface Particle {
  ei: number;
  t: number;
  speed: number;
  r: number;
}

export default function ApplyCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;
    const el = canvas;

    let W = 0, H = 0;
    let nodes: { x: number; y: number; pingAge: number }[] = [];

    const particles: Particle[] = EDGES.flatMap((_, ei) =>
      Array.from({ length: 3 }, () => ({
        ei,
        t: Math.random(),
        speed: 0.00095 + Math.random() * 0.0011,
        r: 2.4 + Math.random() * 1.8,
      }))
    );

    function resize() {
      W = el.offsetWidth;
      H = el.offsetHeight;
      el.width  = W * devicePixelRatio;
      el.height = H * devicePixelRatio;
      c.scale(devicePixelRatio, devicePixelRatio);
      nodes = NODES.map(n => ({ x: n.rx * W, y: n.ry * H, pingAge: 0 }));
    }
    resize();

    let raf = 0;

    function draw(ms: number) {
      const t = ms * 0.001;
      c.clearRect(0, 0, W, H);

      /* ── Background grid ─────────────────────────────────── */
      c.strokeStyle = "rgba(255,255,255,0.016)";
      c.lineWidth = 0.5;
      const gs = 56;
      for (let x = 0; x < W; x += gs) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
      for (let y = 0; y < H; y += gs) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }

      /* ── Ambient scan bands (slow data-stream feel) ───────── */
      for (let i = 0; i < 2; i++) {
        const sy = ((t * 0.038 + i * 0.5) % 1) * H;
        const sg = c.createLinearGradient(0, sy - 55, 0, sy + 55);
        sg.addColorStop(0,   "rgba(168,0,36,0)");
        sg.addColorStop(0.5, "rgba(168,0,36,0.026)");
        sg.addColorStop(1,   "rgba(168,0,36,0)");
        c.fillStyle = sg;
        c.fillRect(0, sy - 55, W, 110);
      }

      /* ── Edges ────────────────────────────────────────────── */
      c.setLineDash([5, 7]);
      c.lineWidth = 1;
      EDGES.forEach(([fi, ti]) => {
        const a = nodes[fi], b = nodes[ti];
        const g = c.createLinearGradient(a.x, a.y, b.x, b.y);
        g.addColorStop(0, "rgba(192,0,46,0.6)");
        g.addColorStop(1, "rgba(192,0,46,0.1)");
        c.strokeStyle = g;
        c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
      });
      c.setLineDash([]);

      /* ── Particles ────────────────────────────────────────── */
      for (const p of particles) {
        const [fi, ti] = EDGES[p.ei];
        const a = nodes[fi], b = nodes[ti];
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;

        /* Outer bloom */
        const bloom = c.createRadialGradient(px, py, 0, px, py, p.r * 5.5);
        bloom.addColorStop(0, "rgba(230,55,88,0.52)");
        bloom.addColorStop(1, "rgba(230,55,88,0)");
        c.fillStyle = bloom;
        c.beginPath(); c.arc(px, py, p.r * 5.5, 0, Math.PI * 2); c.fill();

        /* Inner glow ring */
        const inner = c.createRadialGradient(px, py, 0, px, py, p.r * 2.4);
        inner.addColorStop(0, "rgba(255,160,180,0.8)");
        inner.addColorStop(1, "rgba(255,160,180,0)");
        c.fillStyle = inner;
        c.beginPath(); c.arc(px, py, p.r * 2.4, 0, Math.PI * 2); c.fill();

        /* Bright core */
        c.fillStyle = "rgba(255,220,228,0.95)";
        c.beginPath(); c.arc(px, py, p.r * 0.6, 0, Math.PI * 2); c.fill();

        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          nodes[ti].pingAge = 1;
        }
      }

      /* ── Nodes ────────────────────────────────────────────── */
      nodes.forEach((n, i) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.75 + i * 1.05);

        /* Ping ring on particle arrival */
        if (n.pingAge > 0) {
          const pr = 19 + (1 - n.pingAge) * 24;
          c.strokeStyle = `rgba(220,55,80,${(n.pingAge * 0.7).toFixed(3)})`;
          c.lineWidth = 1.3;
          c.beginPath(); c.arc(n.x, n.y, pr, 0, Math.PI * 2); c.stroke();
          n.pingAge = Math.max(0, n.pingAge - 0.021);
        }

        /* Outer pulse ring */
        const outerAlpha = (0.13 + pulse * 0.13).toFixed(3);
        c.strokeStyle = `rgba(168,0,36,${outerAlpha})`;
        c.lineWidth = 1;
        c.beginPath(); c.arc(n.x, n.y, 26 + pulse * 3.5, 0, Math.PI * 2); c.stroke();

        /* Mid ring */
        c.strokeStyle = "rgba(200,0,46,0.52)";
        c.lineWidth = 1;
        c.beginPath(); c.arc(n.x, n.y, 16, 0, Math.PI * 2); c.stroke();

        /* Body fill */
        const bg = c.createRadialGradient(n.x - 3, n.y - 3, 0, n.x, n.y, 14);
        bg.addColorStop(0, "rgba(215,0,44,0.38)");
        bg.addColorStop(1, "rgba(80,0,16,0.18)");
        c.fillStyle = bg;
        c.beginPath(); c.arc(n.x, n.y, 14, 0, Math.PI * 2); c.fill();

        /* Inner highlight */
        const hl = c.createRadialGradient(n.x - 4, n.y - 4, 0, n.x, n.y, 14);
        hl.addColorStop(0, "rgba(255,255,255,0.09)");
        hl.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = hl;
        c.beginPath(); c.arc(n.x, n.y, 14, 0, Math.PI * 2); c.fill();

        /* Step number */
        c.fillStyle = "rgba(255,195,205,0.9)";
        c.font = "600 7.5px ui-monospace, monospace";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(NODES[i].n, n.x, n.y);

        /* Label below */
        c.fillStyle = "rgba(145,145,180,0.62)";
        c.font = "8px ui-monospace, monospace";
        c.fillText(NODES[i].label.toUpperCase(), n.x, n.y + 27);
      });

      /* ── Left fade — text area readability ────────────────── */
      const lf = c.createLinearGradient(0, 0, W * 0.5, 0);
      lf.addColorStop(0, "rgba(6,9,30,0.92)");
      lf.addColorStop(1, "rgba(6,9,30,0)");
      c.fillStyle = lf;
      c.fillRect(0, 0, W, H);

      /* ── Edge vignette ────────────────────────────────────── */
      const ev = c.createRadialGradient(W * 0.5, H * 0.5, W * 0.08, W * 0.5, H * 0.5, Math.max(W, H) * 0.72);
      ev.addColorStop(0, "rgba(6,9,30,0)");
      ev.addColorStop(1, "rgba(6,9,30,0.58)");
      c.fillStyle = ev;
      c.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, display: "block" }}
    />
  );
}
