"use client";
import { useEffect, useRef } from "react";

/*
 * Nodes sit on a damped sine wave — the wave structure is the mathematical spine.
 * Amplitudes: ±0.22, ±0.22, ±0.12, ±0.11, ±0.03 → clearly decreasing envelope.
 */
const NODES = [
  { rx: 0.520, ry: 0.50, n: "01", label: "Recommend" }, // equilibrium
  { rx: 0.612, ry: 0.26, n: "02", label: "Apply"     }, // +0.24 swing up
  { rx: 0.700, ry: 0.74, n: "03", label: "Review"    }, // −0.24 swing down
  { rx: 0.786, ry: 0.36, n: "04", label: "Match"     }, // +0.14 (damped)
  { rx: 0.872, ry: 0.63, n: "05", label: "Sign"      }, // −0.13 (damped)
  { rx: 0.960, ry: 0.48, n: "06", label: "Start"     }, // ≈ 0   (settled)
];

const EDGES: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,5]];

/* Background sine waves — wave superposition / harmonic interference */
const WAVES = [
  { y0: 0.14, A: 0.055, k: 0.0160, ω: 0.170, φ: 0.0,  a: 0.026 },
  { y0: 0.31, A: 0.038, k: 0.0215, ω: 0.130, φ: 1.35, a: 0.018 },
  { y0: 0.50, A: 0.072, k: 0.0132, ω: 0.105, φ: 0.72, a: 0.030 },
  { y0: 0.68, A: 0.040, k: 0.0198, ω: 0.148, φ: 2.25, a: 0.019 },
  { y0: 0.86, A: 0.045, k: 0.0252, ω: 0.198, φ: 3.50, a: 0.021 },
];

interface Particle { ei: number; t: number; speed: number; r: number; }

/* Catmull-Rom → cubic bezier control points for a smooth spline through pts */
function catmullRomCPs(pts: {x:number;y:number}[], tension = 0.42) {
  return pts.slice(0, -1).map((_, i) => {
    const p0 = pts[Math.max(0, i-1)];
    const p1 = pts[i];
    const p2 = pts[i+1];
    const p3 = pts[Math.min(pts.length-1, i+2)];
    return {
      cp1x: p1.x + (p2.x - p0.x) * tension,
      cp1y: p1.y + (p2.y - p0.y) * tension,
      cp2x: p2.x - (p3.x - p1.x) * tension,
      cp2y: p2.y - (p3.y - p1.y) * tension,
    };
  });
}

type CP = { cp1x:number; cp1y:number; cp2x:number; cp2y:number };

/* Evaluate a cubic bezier at parameter t using de Casteljau */
function evalBez(
  a: {x:number;y:number}, cp: CP, b: {x:number;y:number}, t: number
) {
  const m = 1 - t;
  return {
    x: m*m*m*a.x + 3*m*m*t*cp.cp1x + 3*m*t*t*cp.cp2x + t*t*t*b.x,
    y: m*m*m*a.y + 3*m*m*t*cp.cp1y + 3*m*t*t*cp.cp2y + t*t*t*b.y,
  };
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
    let nodes: { x:number; y:number; pingAge:number }[] = [];
    let cps: CP[] = [];

    const particles: Particle[] = EDGES.flatMap((_, ei) =>
      Array.from({ length: 3 }, () => ({
        ei, t: Math.random(),
        speed: 0.00082 + Math.random() * 0.00095,
        r: 2.2 + Math.random() * 1.9,
      }))
    );

    function resize() {
      W = el.offsetWidth; H = el.offsetHeight;
      el.width = W * devicePixelRatio; el.height = H * devicePixelRatio;
      c.scale(devicePixelRatio, devicePixelRatio);
      nodes = NODES.map(n => ({ x: n.rx * W, y: n.ry * H, pingAge: 0 }));
      cps = catmullRomCPs(nodes);
    }
    resize();

    let raf = 0;

    function draw(ms: number) {
      const t = ms * 0.001;
      c.clearRect(0, 0, W, H);

      /* ── Fine Cartesian grid ─────────────────────────────── */
      c.strokeStyle = "rgba(255,255,255,0.012)";
      c.lineWidth = 0.5;
      for (let x = 0; x < W; x += 56) { c.beginPath(); c.moveTo(x,0); c.lineTo(x,H); c.stroke(); }
      for (let y = 0; y < H; y += 56) { c.beginPath(); c.moveTo(0,y); c.lineTo(W,y); c.stroke(); }

      /* ── Equilibrium axis (y = 0.5H) — dashed reference line ─ */
      c.strokeStyle = "rgba(168,0,36,0.18)";
      c.lineWidth = 0.75;
      c.setLineDash([4, 10]);
      c.beginPath(); c.moveTo(W*0.46, H*0.5); c.lineTo(W*0.98, H*0.5); c.stroke();
      c.setLineDash([]);

      /* ── Background sine waves (wave superposition) ─────── */
      for (const w of WAVES) {
        c.beginPath();
        c.strokeStyle = `rgba(255,255,255,${w.a})`;
        c.lineWidth = 0.6;
        for (let xi = 0; xi <= W; xi += 3) {
          const y = w.y0 * H + w.A * H * Math.sin(w.k * xi + w.ω * t + w.φ);
          xi === 0 ? c.moveTo(xi, y) : c.lineTo(xi, y);
        }
        c.stroke();
      }

      /* ── Mathematical spine — Catmull-Rom through all nodes ─ */
      c.strokeStyle = "rgba(168,0,36,0.25)";
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(nodes[0].x, nodes[0].y);
      EDGES.forEach(([fi, ti]) => {
        const cp = cps[fi];
        c.bezierCurveTo(cp.cp1x, cp.cp1y, cp.cp2x, cp.cp2y, nodes[ti].x, nodes[ti].y);
      });
      c.stroke();

      /* ── Bezier edge highlights (directional gradient) ──── */
      EDGES.forEach(([fi, ti]) => {
        const a = nodes[fi], b = nodes[ti], cp = cps[fi];
        const g = c.createLinearGradient(a.x, a.y, b.x, b.y);
        g.addColorStop(0, "rgba(200,0,46,0.6)");
        g.addColorStop(1, "rgba(200,0,46,0.08)");
        c.strokeStyle = g;
        c.lineWidth = 1.15;
        c.beginPath();
        c.moveTo(a.x, a.y);
        c.bezierCurveTo(cp.cp1x, cp.cp1y, cp.cp2x, cp.cp2y, b.x, b.y);
        c.stroke();
      });

      /* ── Particles along bezier curves ──────────────────── */
      for (const p of particles) {
        const [fi, ti] = EDGES[p.ei];
        const pos = evalBez(nodes[fi], cps[fi], nodes[ti], p.t);

        /* Outer bloom */
        const bloom = c.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.r * 5.8);
        bloom.addColorStop(0, "rgba(235,55,88,0.48)");
        bloom.addColorStop(1, "rgba(235,55,88,0)");
        c.fillStyle = bloom;
        c.beginPath(); c.arc(pos.x, pos.y, p.r * 5.8, 0, Math.PI*2); c.fill();

        /* Mid glow */
        const mid = c.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.r * 2.6);
        mid.addColorStop(0, "rgba(255,160,180,0.72)");
        mid.addColorStop(1, "rgba(255,160,180,0)");
        c.fillStyle = mid;
        c.beginPath(); c.arc(pos.x, pos.y, p.r * 2.6, 0, Math.PI*2); c.fill();

        /* Bright core */
        c.fillStyle = "rgba(255,228,233,0.96)";
        c.beginPath(); c.arc(pos.x, pos.y, p.r * 0.58, 0, Math.PI*2); c.fill();

        p.t += p.speed;
        if (p.t >= 1) { p.t = 0; nodes[ti].pingAge = 1; }
      }

      /* ── Nodes ───────────────────────────────────────────── */
      nodes.forEach((n, i) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.55 + i * 1.08);

        /* Ping ring on particle arrival */
        if (n.pingAge > 0) {
          const pr = 21 + (1 - n.pingAge) * 20;
          c.strokeStyle = `rgba(225,55,80,${(n.pingAge * 0.62).toFixed(3)})`;
          c.lineWidth = 1.2;
          c.beginPath(); c.arc(n.x, n.y, pr, 0, Math.PI*2); c.stroke();
          n.pingAge = Math.max(0, n.pingAge - 0.019);
        }

        /* Outer pulse ring */
        c.strokeStyle = `rgba(168,0,36,${(0.11 + pulse * 0.13).toFixed(3)})`;
        c.lineWidth = 1;
        c.beginPath(); c.arc(n.x, n.y, 27 + pulse * 3.5, 0, Math.PI*2); c.stroke();

        /* Second ring */
        c.strokeStyle = "rgba(205,0,48,0.48)";
        c.lineWidth = 1;
        c.beginPath(); c.arc(n.x, n.y, 16, 0, Math.PI*2); c.stroke();

        /* Body fill */
        const bg = c.createRadialGradient(n.x-3, n.y-3, 0, n.x, n.y, 14);
        bg.addColorStop(0, "rgba(218,0,46,0.35)");
        bg.addColorStop(1, "rgba(75,0,15,0.15)");
        c.fillStyle = bg; c.beginPath(); c.arc(n.x, n.y, 14, 0, Math.PI*2); c.fill();

        /* Inner highlight */
        const hl = c.createRadialGradient(n.x-4, n.y-4, 0, n.x, n.y, 14);
        hl.addColorStop(0, "rgba(255,255,255,0.08)");
        hl.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = hl; c.beginPath(); c.arc(n.x, n.y, 14, 0, Math.PI*2); c.fill();

        /* Step number */
        c.fillStyle = "rgba(255,195,205,0.88)";
        c.font = "600 7.5px ui-monospace, monospace";
        c.textAlign = "center"; c.textBaseline = "middle";
        c.fillText(NODES[i].n, n.x, n.y);

        /* Label — outer side of the equilibrium axis */
        const aboveAxis = n.y < H * 0.5;
        c.fillStyle = "rgba(148,148,185,0.58)";
        c.font = "7.5px ui-monospace, monospace";
        c.fillText(
          NODES[i].label.toUpperCase(),
          n.x,
          n.y + (aboveAxis ? -26 : 26)
        );
      });

      /* ── Left fade (text readability) ────────────────────── */
      const lf = c.createLinearGradient(0, 0, W * 0.5, 0);
      lf.addColorStop(0, "rgba(6,16,30,0.94)");
      lf.addColorStop(1, "rgba(6,16,30,0)");
      c.fillStyle = lf; c.fillRect(0, 0, W, H);

      /* ── Edge vignette ───────────────────────────────────── */
      const ev = c.createRadialGradient(W*0.5, H*0.5, W*0.06, W*0.5, H*0.5, Math.max(W,H)*0.72);
      ev.addColorStop(0, "rgba(6,16,30,0)");
      ev.addColorStop(1, "rgba(6,16,30,0.56)");
      c.fillStyle = ev; c.fillRect(0, 0, W, H);

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
