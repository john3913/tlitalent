"use client";
import { useEffect, useRef } from "react";

/* Pipeline nodes — damped sine wave spine */
const NODES = [
  { rx: 0.520, ry: 0.50, n: "01", label: "Recommend" },
  { rx: 0.612, ry: 0.26, n: "02", label: "Apply"     },
  { rx: 0.700, ry: 0.74, n: "03", label: "Review"    },
  { rx: 0.786, ry: 0.36, n: "04", label: "Match"     },
  { rx: 0.872, ry: 0.63, n: "05", label: "Sign"      },
  { rx: 0.960, ry: 0.48, n: "06", label: "Start"     },
];

const EDGES: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,5]];

/* Catmull-Rom → cubic bezier CPs */
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

/* Background constellation particle */
interface Star { x:number; y:number; vx:number; vy:number; r:number; a:number; }

/* Pipeline spark */
interface Spark { ei:number; t:number; speed:number; r:number; }

const SPARK_PER_EDGE = 7;
const STAR_COUNT = 280;
const CONN_DIST = 110;

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
    let stars: Star[] = [];

    const sparks: Spark[] = EDGES.flatMap((_, ei) =>
      Array.from({ length: SPARK_PER_EDGE }, () => ({
        ei,
        t: Math.random(),
        speed: 0.00065 + Math.random() * 0.00085,
        r: 2.0 + Math.random() * 1.8,
      }))
    );

    /* Spatial grid for O(n) constellation connections */
    function buildGrid(cell: number) {
      const cols = Math.ceil(W / cell);
      const rows = Math.ceil(H / cell);
      const grid: number[][] = Array.from({ length: cols * rows }, () => []);
      stars.forEach((s, i) => {
        const col = Math.floor(s.x / cell);
        const row = Math.floor(s.y / cell);
        if (col >= 0 && col < cols && row >= 0 && row < rows)
          grid[row * cols + col].push(i);
      });
      return { grid, cols, rows };
    }

    function resize() {
      W = el.offsetWidth; H = el.offsetHeight;
      el.width  = W * devicePixelRatio;
      el.height = H * devicePixelRatio;
      c.scale(devicePixelRatio, devicePixelRatio);
      nodes = NODES.map(n => ({ x: n.rx * W, y: n.ry * H, pingAge: 0 }));
      cps = catmullRomCPs(nodes);
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.12,
        r: 0.6 + Math.random() * 0.8,
        a: 0.18 + Math.random() * 0.38,
      }));
    }
    resize();

    let raf = 0;

    function draw() {
      /* Fade trail — maroon-tinted dark wash */
      c.fillStyle = "rgba(6,9,30,0.13)";
      c.fillRect(0, 0, W, H);

      /* ── Move stars ─────────────────────────────────────────── */
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;
      }

      /* ── Constellation connections ──────────────────────────── */
      const { grid, cols } = buildGrid(CONN_DIST);
      const rows = Math.ceil(H / CONN_DIST);
      for (let si = 0; si < stars.length; si++) {
        const s = stars[si];
        const col = Math.floor(s.x / CONN_DIST);
        const row = Math.floor(s.y / CONN_DIST);
        for (let dc = -1; dc <= 1; dc++) {
          for (let dr = -1; dr <= 1; dr++) {
            const nc = col + dc, nr = row + dr;
            if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;
            const cell = grid[nr * cols + nc];
            for (const ti of cell) {
              if (ti <= si) continue;
              const t = stars[ti];
              const dx = s.x - t.x, dy = s.y - t.y;
              const d = Math.sqrt(dx*dx + dy*dy);
              if (d < CONN_DIST) {
                const a = (1 - d / CONN_DIST) * 0.072;
                c.strokeStyle = `rgba(200,200,240,${a.toFixed(3)})`;
                c.lineWidth = 0.5;
                c.beginPath(); c.moveTo(s.x, s.y); c.lineTo(t.x, t.y); c.stroke();
              }
            }
          }
        }
      }

      /* ── Star dots ──────────────────────────────────────────── */
      for (const s of stars) {
        c.fillStyle = `rgba(210,215,255,${s.a.toFixed(2)})`;
        c.beginPath(); c.arc(s.x, s.y, s.r, 0, Math.PI*2); c.fill();
      }

      /* ── Soft maroon haze along spine ───────────────────────── */
      if (nodes.length > 1) {
        const hazeGrad = c.createLinearGradient(nodes[0].x, nodes[0].y, nodes[nodes.length-1].x, nodes[nodes.length-1].y);
        hazeGrad.addColorStop(0, "rgba(168,0,36,0)");
        hazeGrad.addColorStop(0.35, "rgba(168,0,36,0.06)");
        hazeGrad.addColorStop(0.65, "rgba(168,0,36,0.06)");
        hazeGrad.addColorStop(1, "rgba(168,0,36,0)");
        c.strokeStyle = hazeGrad;
        c.lineWidth = 18;
        c.lineCap = "round";
        c.beginPath();
        c.moveTo(nodes[0].x, nodes[0].y);
        EDGES.forEach(([fi, ti]) => {
          const cp = cps[fi];
          c.bezierCurveTo(cp.cp1x, cp.cp1y, cp.cp2x, cp.cp2y, nodes[ti].x, nodes[ti].y);
        });
        c.stroke();
      }

      /* ── Pipeline spine — dim backbone ──────────────────────── */
      c.strokeStyle = "rgba(168,0,36,0.18)";
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
        g.addColorStop(0, "rgba(220,0,48,0.55)");
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

        /* Wide bloom halo */
        const bloom = c.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.r * 7);
        bloom.addColorStop(0, "rgba(235,55,80,0.42)");
        bloom.addColorStop(1, "rgba(235,55,80,0)");
        c.fillStyle = bloom;
        c.beginPath(); c.arc(pos.x, pos.y, p.r * 7, 0, Math.PI*2); c.fill();

        /* Mid glow */
        const mid = c.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.r * 3);
        mid.addColorStop(0, "rgba(255,140,165,0.78)");
        mid.addColorStop(1, "rgba(255,140,165,0)");
        c.fillStyle = mid;
        c.beginPath(); c.arc(pos.x, pos.y, p.r * 3, 0, Math.PI*2); c.fill();

        /* Bright core */
        c.fillStyle = "rgba(255,230,238,0.97)";
        c.beginPath(); c.arc(pos.x, pos.y, p.r * 0.55, 0, Math.PI*2); c.fill();

        p.t += p.speed;
        if (p.t >= 1) { p.t = 0; nodes[ti].pingAge = 1; }
      }

      /* ── Nodes ──────────────────────────────────────────────── */
      const now = performance.now() * 0.001;
      nodes.forEach((n, i) => {
        const phase = now * 1.4 + i * 1.1;
        const pulse = 0.5 + 0.5 * Math.sin(phase);

        /* Ping ring */
        if (n.pingAge > 0) {
          const pr = 18 + (1 - n.pingAge) * 22;
          c.strokeStyle = `rgba(230,50,80,${(n.pingAge * 0.7).toFixed(3)})`;
          c.lineWidth = 1.1;
          c.beginPath(); c.arc(n.x, n.y, pr, 0, Math.PI*2); c.stroke();
          n.pingAge = Math.max(0, n.pingAge - 0.018);
        }

        /* Outermost slow-pulse ring */
        const or = 32 + pulse * 4;
        c.strokeStyle = `rgba(168,0,36,${(0.07 + pulse * 0.10).toFixed(3)})`;
        c.lineWidth = 0.8;
        c.beginPath(); c.arc(n.x, n.y, or, 0, Math.PI*2); c.stroke();

        /* Second ring — counter-phase */
        const pulse2 = 0.5 + 0.5 * Math.sin(phase + Math.PI);
        c.strokeStyle = `rgba(168,0,36,${(0.12 + pulse2 * 0.12).toFixed(3)})`;
        c.lineWidth = 0.7;
        c.beginPath(); c.arc(n.x, n.y, 22 + pulse2 * 2, 0, Math.PI*2); c.stroke();

        /* Inner ring */
        c.strokeStyle = "rgba(210,0,48,0.52)";
        c.lineWidth = 1;
        c.beginPath(); c.arc(n.x, n.y, 15, 0, Math.PI*2); c.stroke();

        /* Node body */
        const bg = c.createRadialGradient(n.x-3, n.y-3, 0, n.x, n.y, 15);
        bg.addColorStop(0, "rgba(220,0,46,0.38)");
        bg.addColorStop(1, "rgba(60,0,12,0.18)");
        c.fillStyle = bg; c.beginPath(); c.arc(n.x, n.y, 15, 0, Math.PI*2); c.fill();

        /* Inner specular */
        const hl = c.createRadialGradient(n.x-4, n.y-5, 0, n.x, n.y, 15);
        hl.addColorStop(0, "rgba(255,255,255,0.1)");
        hl.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = hl; c.beginPath(); c.arc(n.x, n.y, 15, 0, Math.PI*2); c.fill();

        /* Step number */
        c.fillStyle = "rgba(255,195,210,0.9)";
        c.font = "600 7.5px ui-monospace, monospace";
        c.textAlign = "center"; c.textBaseline = "middle";
        c.fillText(NODES[i].n, n.x, n.y);

        /* Label */
        const above = n.y < H * 0.5;
        c.fillStyle = "rgba(160,160,200,0.52)";
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
