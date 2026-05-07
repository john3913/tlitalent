"use client";
import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number; vx: number; vy: number;
  r: number; pulse: number; pulseSpeed: number;
}

interface Spark {
  from: number; to: number; t: number; speed: number; active: boolean;
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const NODE_COUNT = 28;
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: 2 + Math.random() * 2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    }));

    const sparks: Spark[] = Array.from({ length: 12 }, () => ({
      from: Math.floor(Math.random() * NODE_COUNT),
      to: Math.floor(Math.random() * NODE_COUNT),
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      active: Math.random() > 0.4,
    }));

    let raf: number;
    let frame = 0;

    function getEdges() {
      const edges: [number, number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) edges.push([i, j, d]);
        }
      }
      return edges;
    }

    function draw() {
      context.clearRect(0, 0, W, H);
      frame++;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += n.pulseSpeed;
      });

      const edges = getEdges();
      edges.forEach(([i, j, d]) => {
        const alpha = (1 - d / 160) * 0.18;
        context.beginPath();
        context.strokeStyle = `rgba(122,0,25,${alpha})`;
        context.lineWidth = 0.8;
        context.moveTo(nodes[i].x, nodes[i].y);
        context.lineTo(nodes[j].x, nodes[j].y);
        context.stroke();
      });

      nodes.forEach((n) => {
        const glow = Math.sin(n.pulse) * 0.5 + 0.5;
        const gradient = context.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
        gradient.addColorStop(0, `rgba(180,0,30,${0.6 + glow * 0.4})`);
        gradient.addColorStop(1, "rgba(180,0,30,0)");
        context.beginPath();
        context.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();
        context.beginPath();
        context.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(255,100,120,${0.7 + glow * 0.3})`;
        context.fill();
      });

      sparks.forEach((sp) => {
        if (!sp.active) return;
        sp.t += sp.speed;
        if (sp.t >= 1) {
          sp.t = 0;
          sp.from = sp.to;
          sp.to = Math.floor(Math.random() * NODE_COUNT);
          sp.active = Math.random() > 0.3;
          return;
        }
        const a = nodes[sp.from];
        const b = nodes[sp.to];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > 200) return;
        const x = a.x + dx * sp.t;
        const y = a.y + dy * sp.t;
        const g = context.createRadialGradient(x, y, 0, x, y, 6);
        g.addColorStop(0, "rgba(255,200,51,0.9)");
        g.addColorStop(0.5, "rgba(255,100,80,0.5)");
        g.addColorStop(1, "rgba(255,60,60,0)");
        context.beginPath();
        context.arc(x, y, 6, 0, Math.PI * 2);
        context.fillStyle = g;
        context.fill();
        context.beginPath();
        context.arc(x, y, 2, 0, Math.PI * 2);
        context.fillStyle = "rgba(255,220,80,1)";
        context.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();

    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full opacity-70"
    />
  );
}
