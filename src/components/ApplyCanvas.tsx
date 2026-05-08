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
function catmullRomCPs(pts:{x:number;y:number}[], tension=0.42): CP[] {
  return pts.slice(0,-1).map((_,i)=>{
    const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
    return {
      cp1x:p1.x+(p2.x-p0.x)*tension, cp1y:p1.y+(p2.y-p0.y)*tension,
      cp2x:p2.x-(p3.x-p1.x)*tension, cp2y:p2.y-(p3.y-p1.y)*tension,
    };
  });
}
function evalBez(a:{x:number;y:number},cp:CP,b:{x:number;y:number},t:number){
  const m=1-t;
  return {x:m*m*m*a.x+3*m*m*t*cp.cp1x+3*m*t*t*cp.cp2x+t*t*t*b.x,
          y:m*m*m*a.y+3*m*m*t*cp.cp1y+3*m*t*t*cp.cp2y+t*t*t*b.y};
}

interface Spark { ei:number; t:number; speed:number; r:number }

/* Four slowly-drifting glow orbs that form the aurora background */
const ORBS = [
  { bx:0.780, by:0.32, ax:0.055, ay:0.110, fx:0.110, fy:0.085, pr:0.88, radius:0.52,
    r:185, g:0,   b:38,  a:0.28 },
  { bx:0.670, by:0.68, ax:0.048, ay:0.090, fx:0.140, fy:0.105, pr:1.40, radius:0.42,
    r:50,  g:20,  b:160, a:0.22 },
  { bx:0.910, by:0.50, ax:0.040, ay:0.130, fx:0.075, fy:0.125, pr:2.10, radius:0.36,
    r:220, g:10,  b:55,  a:0.18 },
  { bx:0.720, by:0.50, ax:0.030, ay:0.060, fx:0.190, fy:0.155, pr:0.55, radius:0.30,
    r:100, g:0,   b:200, a:0.14 },
];

export default function ApplyCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d"); if(!ctx) return;
    const c=ctx, el=canvas;

    let W=0, H=0;
    let nodes:{x:number;y:number;pingAge:number}[]=[];
    let cps:CP[]=[];

    const sparks:Spark[] = EDGES.flatMap((_,ei)=>
      Array.from({length:8},()=>({ei, t:Math.random(),
        speed:0.00055+Math.random()*0.00075, r:2.2+Math.random()*2.0})));

    function resize(){
      W=el.offsetWidth; H=el.offsetHeight;
      el.width=W*devicePixelRatio; el.height=H*devicePixelRatio;
      c.scale(devicePixelRatio,devicePixelRatio);
      nodes=NODES.map(n=>({x:n.rx*W,y:n.ry*H,pingAge:0}));
      cps=catmullRomCPs(nodes);
    }
    resize();

    let raf=0;
    const t0=performance.now();

    function draw(){
      const t=(performance.now()-t0)*0.001;
      c.clearRect(0,0,W,H);

      /* ── Aurora orbs ─────────────────────────────────────────── */
      for(const orb of ORBS){
        const cx=(orb.bx + orb.ax*Math.sin(t*orb.fx+orb.pr))*W;
        const cy=(orb.by + orb.ay*Math.cos(t*orb.fy+orb.pr*1.3))*H;
        const r=orb.radius*H;
        const g=c.createRadialGradient(cx,cy,0,cx,cy,r);
        g.addColorStop(0,   `rgba(${orb.r},${orb.g},${orb.b},${orb.a})`);
        g.addColorStop(0.45,`rgba(${orb.r},${orb.g},${orb.b},${(orb.a*0.4).toFixed(3)})`);
        g.addColorStop(1,   `rgba(${orb.r},${orb.g},${orb.b},0)`);
        c.fillStyle=g;
        c.beginPath(); c.arc(cx,cy,r,0,Math.PI*2); c.fill();
      }

      /* ── Subtle hairline grid — gives it structure ───────────── */
      c.lineWidth=0.5;
      c.strokeStyle="rgba(255,255,255,0.028)";
      for(let x=48;x<W;x+=48){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke();}
      for(let y=48;y<H;y+=48){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}

      /* ── Pipeline spine — bright, crisp ─────────────────────── */
      c.strokeStyle="rgba(168,0,36,0.38)"; c.lineWidth=1.2; c.lineCap="butt";
      c.beginPath(); c.moveTo(nodes[0].x,nodes[0].y);
      EDGES.forEach(([fi,ti])=>{const cp=cps[fi];
        c.bezierCurveTo(cp.cp1x,cp.cp1y,cp.cp2x,cp.cp2y,nodes[ti].x,nodes[ti].y);
      }); c.stroke();

      /* ── Edge directional glow ───────────────────────────────── */
      EDGES.forEach(([fi,ti])=>{
        const a=nodes[fi],b=nodes[ti],cp=cps[fi];
        const g=c.createLinearGradient(a.x,a.y,b.x,b.y);
        g.addColorStop(0,"rgba(230,0,52,0.80)"); g.addColorStop(1,"rgba(230,0,52,0.04)");
        c.strokeStyle=g; c.lineWidth=1.4;
        c.beginPath(); c.moveTo(a.x,a.y);
        c.bezierCurveTo(cp.cp1x,cp.cp1y,cp.cp2x,cp.cp2y,b.x,b.y); c.stroke();
      });

      /* ── Sparks ─────────────────────────────────────────────── */
      for(const p of sparks){
        const [fi,ti]=EDGES[p.ei];
        const pos=evalBez(nodes[fi],cps[fi],nodes[ti],p.t);

        const bloom=c.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,p.r*8);
        bloom.addColorStop(0,"rgba(255,60,90,0.48)"); bloom.addColorStop(1,"rgba(255,60,90,0)");
        c.fillStyle=bloom; c.beginPath(); c.arc(pos.x,pos.y,p.r*8,0,Math.PI*2); c.fill();

        const mid=c.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,p.r*3.2);
        mid.addColorStop(0,"rgba(255,155,175,0.85)"); mid.addColorStop(1,"rgba(255,155,175,0)");
        c.fillStyle=mid; c.beginPath(); c.arc(pos.x,pos.y,p.r*3.2,0,Math.PI*2); c.fill();

        c.fillStyle="rgba(255,235,240,0.98)";
        c.beginPath(); c.arc(pos.x,pos.y,p.r*0.50,0,Math.PI*2); c.fill();

        p.t+=p.speed;
        if(p.t>=1){p.t=0; nodes[ti].pingAge=1;}
      }

      /* ── Nodes ─────────────────────────────────────────────────── */
      nodes.forEach((n,i)=>{
        const φ=t*1.4+i*1.1;
        const p1=0.5+0.5*Math.sin(φ), p2=0.5+0.5*Math.sin(φ+Math.PI);

        if(n.pingAge>0){
          c.strokeStyle=`rgba(240,55,85,${(n.pingAge*0.72).toFixed(3)})`;
          c.lineWidth=1.2;
          c.beginPath(); c.arc(n.x,n.y,20+(1-n.pingAge)*24,0,Math.PI*2); c.stroke();
          n.pingAge=Math.max(0,n.pingAge-0.018);
        }

        /* Outer pulse */
        c.strokeStyle=`rgba(168,0,36,${(0.10+p1*0.14).toFixed(3)})`;
        c.lineWidth=0.9;
        c.beginPath(); c.arc(n.x,n.y,33+p1*4,0,Math.PI*2); c.stroke();

        /* Mid ring */
        c.strokeStyle=`rgba(200,0,46,${(0.18+p2*0.15).toFixed(3)})`;
        c.lineWidth=0.8;
        c.beginPath(); c.arc(n.x,n.y,22+p2*2,0,Math.PI*2); c.stroke();

        /* Inner ring */
        c.strokeStyle="rgba(215,0,50,0.60)"; c.lineWidth=1.1;
        c.beginPath(); c.arc(n.x,n.y,15,0,Math.PI*2); c.stroke();

        /* Body */
        const bg=c.createRadialGradient(n.x-3,n.y-3,0,n.x,n.y,15);
        bg.addColorStop(0,"rgba(230,0,50,0.42)"); bg.addColorStop(1,"rgba(70,0,15,0.22)");
        c.fillStyle=bg; c.beginPath(); c.arc(n.x,n.y,15,0,Math.PI*2); c.fill();

        /* Specular */
        const hl=c.createRadialGradient(n.x-4,n.y-5,0,n.x,n.y,15);
        hl.addColorStop(0,"rgba(255,255,255,0.12)"); hl.addColorStop(1,"rgba(255,255,255,0)");
        c.fillStyle=hl; c.beginPath(); c.arc(n.x,n.y,15,0,Math.PI*2); c.fill();

        c.fillStyle="rgba(255,200,215,0.92)";
        c.font="600 7.5px ui-monospace,monospace";
        c.textAlign="center"; c.textBaseline="middle";
        c.fillText(NODES[i].n,n.x,n.y);

        c.fillStyle="rgba(165,165,210,0.58)";
        c.font="7.5px ui-monospace,monospace";
        c.fillText(NODES[i].label.toUpperCase(),n.x,n.y+(n.y<H*0.5?-28:28));
      });

      /* ── Left text fade ──────────────────────────────────────── */
      const lf=c.createLinearGradient(0,0,W*0.50,0);
      lf.addColorStop(0,"rgba(6,9,30,0.97)"); lf.addColorStop(1,"rgba(6,9,30,0)");
      c.fillStyle=lf; c.fillRect(0,0,W,H);

      /* ── Edge vignette ───────────────────────────────────────── */
      const ev=c.createRadialGradient(W*0.5,H*0.5,W*0.05,W*0.5,H*0.5,Math.max(W,H)*0.72);
      ev.addColorStop(0,"rgba(6,9,30,0)"); ev.addColorStop(1,"rgba(6,9,30,0.68)");
      c.fillStyle=ev; c.fillRect(0,0,W,H);

      raf=requestAnimationFrame(draw);
    }

    raf=requestAnimationFrame(draw);
    const ro=new ResizeObserver(resize); ro.observe(el);
    return ()=>{cancelAnimationFrame(raf); ro.disconnect();};
  },[]);

  return (
    <canvas ref={ref}
      style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,display:"block"}}/>
  );
}
