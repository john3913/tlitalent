"use client";
import { useEffect, useRef } from "react";

const NODES = [
  { rx: 0.520, ry: 0.50, n: "01", label: "Recommend" },
  { rx: 0.612, ry: 0.26, n: "02", label: "Apply"     },
  { rx: 0.700, ry: 0.74, n: "03", label: "Review"    },
  { rx: 0.786, ry: 0.36, n: "04", label: "Match"     },
  { rx: 0.872, ry: 0.63, n: "05", label: "Sign"      },
  { rx: 0.960, ry: 0.48, n: "06", label: "Start"     },
];

const EDGES: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,5]];

type CP = { cp1x:number; cp1y:number; cp2x:number; cp2y:number };

function catmullRomCPs(pts: {x:number;y:number}[], tension = 0.42): CP[] {
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

function evalBez(a:{x:number;y:number}, cp:CP, b:{x:number;y:number}, t:number) {
  const m = 1 - t;
  return {
    x: m*m*m*a.x + 3*m*m*t*cp.cp1x + 3*m*t*t*cp.cp2x + t*t*t*b.x,
    y: m*m*m*a.y + 3*m*m*t*cp.cp1y + 3*m*t*t*cp.cp2y + t*t*t*b.y,
  };
}

interface Spark { ei:number; t:number; speed:number; r:number; }

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

    const sparks: Spark[] = EDGES.flatMap((_, ei) =>
      Array.from({ length: 6 }, () => ({
        ei,
        t: Math.random(),
        speed: 0.00068 + Math.random() * 0.00088,
        r: 2.0 + Math.random() * 1.8,
      }))
    );

    function resize() {
      W = el.offsetWidth; H = el.offsetHeight;
      el.width  = W * devicePixelRatio;
      el.height = H * devicePixelRatio;
      c.scale(devicePixelRatio, devicePixelRatio);
      nodes = NODES.map(n => ({ x: n.rx * W, y: n.ry * H, pingAge: 0 }));
      cps = catmullRomCPs(nodes);
    }
    resize();

    let raf = 0;
    const t0 = performance.now();

    function draw() {
      const t = (performance.now() - t0) * 0.001;
      c.clearRect(0, 0, W, H);

      /* ── Polar coordinate system — centered on pipeline midpoint ── */
      const pcx = W * 0.735, pcy = H * 0.5;

      /* Concentric rings */
      const ringRadii = [0.11, 0.20, 0.31, 0.43, 0.56, 0.70].map(f => f * H);
      ringRadii.forEach((r, i) => {
        const alpha = i < 2 ? 0.055 : i < 4 ? 0.040 : 0.026;
        c.strokeStyle = `rgba(180,190,255,${alpha})`;
        c.lineWidth = 0.6;
        c.beginPath(); c.arc(pcx, pcy, r, 0, Math.PI * 2); c.stroke();
      });

      /* Radial spokes — 16 total */
      for (let k = 0; k < 16; k++) {
        const angle = (k / 16) * Math.PI * 2;
        const alpha = k % 4 === 0 ? 0.048 : 0.022;
        c.strokeStyle = `rgba(180,190,255,${alpha})`;
        c.lineWidth = 0.5;
        c.beginPath();
        c.moveTo(pcx, pcy);
        c.lineTo(pcx + Math.cos(angle) * ringRadii[5], pcy + Math.sin(angle) * ringRadii[5]);
        c.stroke();
      }

      /* Small tick marks at ring-spoke intersections on major spokes */
      for (let k = 0; k < 4; k++) {
        const angle = (k / 4) * Math.PI * 2;
        ringRadii.slice(0, 4).forEach(r => {
          const tx = pcx + Math.cos(angle) * r;
          const ty = pcy + Math.sin(angle) * r;
          c.fillStyle = "rgba(180,190,255,0.22)";
          c.beginPath(); c.arc(tx, ty, 1.2, 0, Math.PI * 2); c.fill();
        });
      }

      /* ── Lissajous figures — clearly visible mathematical curves ── */
      /* x = A·sin(a·θ + δ),  y = B·sin(b·θ),  δ drifts with time  */
      const figures = [
        /* Primary — 3:2, large, prominent */
        { cx: pcx, cy: pcy, rx: H * 0.165, ry: H * 0.395, a: 3, b: 2, rate: 0.13, alpha: 0.18, width: 0.85 },
        /* Secondary — 5:4, medium */
        { cx: pcx, cy: pcy, rx: H * 0.105, ry: H * 0.250, a: 5, b: 4, rate: 0.08, alpha: 0.11, width: 0.70 },
        /* Tertiary — 2:3, offset slightly */
        { cx: W * 0.87, cy: pcy, rx: H * 0.075, ry: H * 0.175, a: 2, b: 3, rate: 0.20, alpha: 0.13, width: 0.65 },
      ];

      const STEPS = 900;
      for (const fig of figures) {
        const phase = t * fig.rate;
        c.strokeStyle = `rgba(200,210,255,${fig.alpha})`;
        c.lineWidth = fig.width;
        c.beginPath();
        for (let i = 0; i <= STEPS; i++) {
          const θ = (i / STEPS) * Math.PI * 2;
          const px = fig.cx + fig.rx * Math.sin(fig.a * θ + phase);
          const py = fig.cy + fig.ry * Math.sin(fig.b * θ);
          i === 0 ? c.moveTo(px, py) : c.lineTo(px, py);
        }
        c.closePath();
        c.stroke();
      }

      /* ── Equilibrium reference axis — dashed ────────────────── */
      c.strokeStyle = "rgba(168,0,36,0.22)";
      c.lineWidth = 0.75;
      c.setLineDash([4, 10]);
      c.beginPath();
      c.moveTo(W * 0.46, H * 0.5);
      c.lineTo(W * 0.985, H * 0.5);
      c.stroke();
      c.setLineDash([]);

      /* ── Pipeline spine — soft haze ─────────────────────────── */
      {
        const haze = c.createLinearGradient(nodes[0].x, 0, nodes[nodes.length-1].x, 0);
        haze.addColorStop(0,   "rgba(168,0,36,0)");
        haze.addColorStop(0.3, "rgba(168,0,36,0.07)");
        haze.addColorStop(0.7, "rgba(168,0,36,0.07)");
        haze.addColorStop(1,   "rgba(168,0,36,0)");
        c.strokeStyle = haze;
        c.lineWidth = 16;
        c.lineCap = "round";
        c.beginPath();
        c.moveTo(nodes[0].x, nodes[0].y);
        EDGES.forEach(([fi, ti]) => {
          const cp = cps[fi];
          c.bezierCurveTo(cp.cp1x, cp.cp1y, cp.cp2x, cp.cp2y, nodes[ti].x, nodes[ti].y);
        });
        c.stroke();
      }

      /* ── Pipeline spine — crisp line ────────────────────────── */
      c.strokeStyle = "rgba(168,0,36,0.24)";
      c.lineWidth = 1;
      c.lineCap = "butt";
      c.beginPath();
      c.moveTo(nodes[0].x, nodes[0].y);
      EDGES.forEach(([fi, ti]) => {
        const cp = cps[fi];
        c.bezierCurveTo(cp.cp1x, cp.cp1y, cp.cp2x, cp.cp2y, nodes[ti].x, nodes[ti].y);
      });
      c.stroke();

      /* ── Edge directional glow ───────────────────────────────── */
      EDGES.forEach(([fi, ti]) => {
        const a = nodes[fi], b = nodes[ti], cp = cps[fi];
        const g = c.createLinearGradient(a.x, a.y, b.x, b.y);
        g.addColorStop(0, "rgba(220,0,48,0.62)");
        g.addColorStop(1, "rgba(220,0,48,0.05)");
        c.strokeStyle = g;
        c.lineWidth = 1.2;
        c.beginPath();
        c.moveTo(a.x, a.y);
        c.bezierCurveTo(cp.cp1x, cp.cp1y, cp.cp2x, cp.cp2y, b.x, b.y);
        c.stroke();
      });

      /* ── Sparks ─────────────────────────────────────────────── */
      for (const p of sparks) {
        const [fi, ti] = EDGES[p.ei];
        const pos = evalBez(nodes[fi], cps[fi], nodes[ti], p.t);

        const bloom = c.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.r * 7);
        bloom.addColorStop(0, "rgba(235,55,80,0.44)");
        bloom.addColorStop(1, "rgba(235,55,80,0)");
        c.fillStyle = bloom;
        c.beginPath(); c.arc(pos.x, pos.y, p.r * 7, 0, Math.PI * 2); c.fill();

        const mid = c.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.r * 3);
        mid.addColorStop(0, "rgba(255,140,165,0.80)");
        mid.addColorStop(1, "rgba(255,140,165,0)");
        c.fillStyle = mid;
        c.beginPath(); c.arc(pos.x, pos.y, p.r * 3, 0, Math.PI * 2); c.fill();

        c.fillStyle = "rgba(255,230,238,0.97)";
        c.beginPath(); c.arc(pos.x, pos.y, p.r * 0.55, 0, Math.PI * 2); c.fill();

        p.t += p.speed;
        if (p.t >= 1) { p.t = 0; nodes[ti].pingAge = 1; }
      }

      /* ── Nodes ──────────────────────────────────────────────── */
      nodes.forEach((n, i) => {
        const φ  = t * 1.4 + i * 1.1;
        const p1 = 0.5 + 0.5 * Math.sin(φ);
        const p2 = 0.5 + 0.5 * Math.sin(φ + Math.PI);

        if (n.pingAge > 0) {
          const pr = 18 + (1 - n.pingAge) * 22;
          c.strokeStyle = `rgba(230,50,80,${(n.pingAge * 0.70).toFixed(3)})`;
          c.lineWidth = 1.1;
          c.beginPath(); c.arc(n.x, n.y, pr, 0, Math.PI * 2); c.stroke();
          n.pingAge = Math.max(0, n.pingAge - 0.018);
        }

        c.strokeStyle = `rgba(168,0,36,${(0.07 + p1 * 0.10).toFixed(3)})`;
        c.lineWidth = 0.8;
        c.beginPath(); c.arc(n.x, n.y, 32 + p1 * 4, 0, Math.PI * 2); c.stroke();

        c.strokeStyle = `rgba(168,0,36,${(0.12 + p2 * 0.12).toFixed(3)})`;
        c.lineWidth = 0.7;
        c.beginPath(); c.arc(n.x, n.y, 22 + p2 * 2, 0, Math.PI * 2); c.stroke();

        c.strokeStyle = "rgba(210,0,48,0.54)";
        c.lineWidth = 1;
        c.beginPath(); c.arc(n.x, n.y, 15, 0, Math.PI * 2); c.stroke();

        const bg = c.createRadialGradient(n.x-3, n.y-3, 0, n.x, n.y, 15);
        bg.addColorStop(0, "rgba(220,0,46,0.38)");
        bg.addColorStop(1, "rgba(60,0,12,0.18)");
        c.fillStyle = bg; c.beginPath(); c.arc(n.x, n.y, 15, 0, Math.PI * 2); c.fill();

        const hl = c.createRadialGradient(n.x-4, n.y-5, 0, n.x, n.y, 15);
        hl.addColorStop(0, "rgba(255,255,255,0.10)");
        hl.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = hl; c.beginPath(); c.arc(n.x, n.y, 15, 0, Math.PI * 2); c.fill();

        c.fillStyle = "rgba(255,195,210,0.90)";
        c.font = "600 7.5px ui-monospace, monospace";
        c.textAlign = "center"; c.textBaseline = "middle";
        c.fillText(NODES[i].n, n.x, n.y);

        const above = n.y < H * 0.5;
        c.fillStyle = "rgba(155,155,195,0.52)";
        c.font = "7.5px ui-monospace, monospace";
        c.fillText(NODES[i].label.toUpperCase(), n.x, n.y + (above ? -28 : 28));
      });

      /* ── Left text-readability fade ─────────────────────────── */
      const lf = c.createLinearGradient(0, 0, W * 0.52, 0);
      lf.addColorStop(0, "rgba(6,9,30,0.96)");
      lf.addColorStop(1, "rgba(6,9,30,0)");
      c.fillStyle = lf; c.fillRect(0, 0, W, H);

      /* ── Edge vignette ──────────────────────────────────────── */
      const ev = c.createRadialGradient(W*0.5, H*0.5, W*0.08, W*0.5, H*0.5, Math.max(W,H)*0.75);
      ev.addColorStop(0, "rgba(6,9,30,0)");
      ev.addColorStop(1, "rgba(6,9,30,0.62)");
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
