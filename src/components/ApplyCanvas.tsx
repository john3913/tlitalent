"use client";
import { useEffect, useRef } from "react";

/* ── Pipeline definition ─────────────────────────────────────── */
const PNODES = [
  { rx:0.520, ry:0.50, n:"01", label:"Recommend" },
  { rx:0.612, ry:0.26, n:"02", label:"Apply"     },
  { rx:0.700, ry:0.74, n:"03", label:"Review"    },
  { rx:0.786, ry:0.36, n:"04", label:"Match"     },
  { rx:0.872, ry:0.63, n:"05", label:"Sign"      },
  { rx:0.960, ry:0.48, n:"06", label:"Start"     },
];
const EDGES:[number,number][] = [[0,1],[1,2],[2,3],[3,4],[4,5]];

type CP = { cp1x:number; cp1y:number; cp2x:number; cp2y:number };
function catmullCPs(pts:{x:number;y:number}[], tension=0.42): CP[] {
  return pts.slice(0,-1).map((_,i)=>{
    const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
    return {
      cp1x:p1.x+(p2.x-p0.x)*tension, cp1y:p1.y+(p2.y-p0.y)*tension,
      cp2x:p2.x-(p3.x-p1.x)*tension, cp2y:p2.y-(p3.y-p1.y)*tension,
    };
  });
}
function bezAt(a:{x:number;y:number},cp:CP,b:{x:number;y:number},t:number){
  const m=1-t;
  return {x:m*m*m*a.x+3*m*m*t*cp.cp1x+3*m*t*t*cp.cp2x+t*t*t*b.x,
          y:m*m*m*a.y+3*m*m*t*cp.cp1y+3*m*t*t*cp.cp2y+t*t*t*b.y};
}

/* ── Background graph types ──────────────────────────────────── */
interface BgNode { x:number; y:number }
interface BgEdge { a:number; b:number }
interface BgParticle { edge:number; t:number; speed:number }
interface PipelineParticle { ei:number; t:number; speed:number; r:number }

const BG_NODE_COUNT = 88;
const BG_CONNECT_DIST_RATIO = 0.26; /* fraction of H */

export default function ApplyCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d"); if(!ctx) return;
    const c=ctx, el=canvas;

    let W=0, H=0;
    let pnodes:{x:number;y:number;pingAge:number}[]=[];
    let cps:CP[]=[];
    let bgNodes:BgNode[]=[];
    let bgEdges:BgEdge[]=[];
    let bgParticles:BgParticle[]=[];

    /* 7 pipeline sparks per edge */
    const pipeParticles:PipelineParticle[] = EDGES.flatMap((_,ei)=>
      Array.from({length:7},()=>({ei, t:Math.random(),
        speed:0.00060+Math.random()*0.00080, r:2.0+Math.random()*1.8})));

    function buildGraph(){
      /* Scatter nodes across canvas; slightly denser in right 55% */
      bgNodes = Array.from({length:BG_NODE_COUNT},()=>({
        x: Math.random()<0.62 ? W*0.40+Math.random()*W*0.60 : Math.random()*W*0.45,
        y: Math.random()*H,
      }));
      const D = H*BG_CONNECT_DIST_RATIO;
      bgEdges=[];
      for(let i=0;i<bgNodes.length;i++){
        for(let j=i+1;j<bgNodes.length;j++){
          const dx=bgNodes[i].x-bgNodes[j].x, dy=bgNodes[i].y-bgNodes[j].y;
          if(Math.sqrt(dx*dx+dy*dy)<D) bgEdges.push({a:i,b:j});
        }
      }
      /* 1 particle per ~2 edges, random phase */
      bgParticles = bgEdges
        .filter(()=>Math.random()<0.52)
        .map((_,idx)=>({edge:idx, t:Math.random(), speed:0.00028+Math.random()*0.00044}));
    }

    function resize(){
      W=el.offsetWidth; H=el.offsetHeight;
      el.width=W*devicePixelRatio; el.height=H*devicePixelRatio;
      c.scale(devicePixelRatio,devicePixelRatio);
      pnodes=PNODES.map(n=>({x:n.rx*W,y:n.ry*H,pingAge:0}));
      cps=catmullCPs(pnodes);
      buildGraph();
    }
    resize();

    let raf=0;
    const t0=performance.now();

    function draw(){
      const t=(performance.now()-t0)*0.001;
      c.clearRect(0,0,W,H);

      /* ── Fine grid ───────────────────────────────────────────── */
      c.lineWidth=0.4;
      c.strokeStyle="rgba(255,255,255,0.015)";
      for(let x=40;x<W;x+=40){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke();}
      for(let y=40;y<H;y+=40){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}

      /* ── Background edges ────────────────────────────────────── */
      c.lineWidth=0.55;
      c.strokeStyle="rgba(150,165,200,0.032)";
      for(const e of bgEdges){
        const a=bgNodes[e.a],b=bgNodes[e.b];
        c.beginPath(); c.moveTo(a.x,a.y); c.lineTo(b.x,b.y); c.stroke();
      }

      /* ── Background nodes ────────────────────────────────────── */
      c.fillStyle="rgba(185,200,225,0.20)";
      for(const n of bgNodes){
        c.beginPath(); c.arc(n.x,n.y,1.4,0,Math.PI*2); c.fill();
      }

      /* ── Background particles ────────────────────────────────── */
      for(const p of bgParticles){
        const e=bgEdges[p.edge];
        const a=bgNodes[e.a], b=bgNodes[e.b];
        const px=a.x+(b.x-a.x)*p.t, py=a.y+(b.y-a.y)*p.t;

        /* Subtle glow */
        const g=c.createRadialGradient(px,py,0,px,py,5);
        g.addColorStop(0,"rgba(200,215,240,0.32)"); g.addColorStop(1,"rgba(200,215,240,0)");
        c.fillStyle=g; c.beginPath(); c.arc(px,py,5,0,Math.PI*2); c.fill();
        /* Core dot */
        c.fillStyle="rgba(215,228,248,0.75)";
        c.beginPath(); c.arc(px,py,1.1,0,Math.PI*2); c.fill();

        p.t+=p.speed;
        if(p.t>1) p.t=0;
      }

      /* ── Pipeline spine — maroon backbone ───────────────────── */
      c.strokeStyle="rgba(168,0,36,0.30)"; c.lineWidth=1.0; c.lineCap="butt";
      c.beginPath(); c.moveTo(pnodes[0].x,pnodes[0].y);
      EDGES.forEach(([fi,ti])=>{const cp=cps[fi];
        c.bezierCurveTo(cp.cp1x,cp.cp1y,cp.cp2x,cp.cp2y,pnodes[ti].x,pnodes[ti].y);
      }); c.stroke();

      /* ── Edge directional glow ───────────────────────────────── */
      EDGES.forEach(([fi,ti])=>{
        const a=pnodes[fi],b=pnodes[ti],cp=cps[fi];
        const g=c.createLinearGradient(a.x,a.y,b.x,b.y);
        g.addColorStop(0,"rgba(225,0,50,0.72)"); g.addColorStop(1,"rgba(225,0,50,0.04)");
        c.strokeStyle=g; c.lineWidth=1.3; c.lineCap="butt";
        c.beginPath(); c.moveTo(a.x,a.y);
        c.bezierCurveTo(cp.cp1x,cp.cp1y,cp.cp2x,cp.cp2y,b.x,b.y); c.stroke();
      });

      /* ── Pipeline sparks ─────────────────────────────────────── */
      for(const p of pipeParticles){
        const [fi,ti]=EDGES[p.ei];
        const pos=bezAt(pnodes[fi],cps[fi],pnodes[ti],p.t);

        const bloom=c.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,p.r*7.5);
        bloom.addColorStop(0,"rgba(240,55,85,0.46)"); bloom.addColorStop(1,"rgba(240,55,85,0)");
        c.fillStyle=bloom; c.beginPath(); c.arc(pos.x,pos.y,p.r*7.5,0,Math.PI*2); c.fill();

        const mid=c.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,p.r*3);
        mid.addColorStop(0,"rgba(255,145,168,0.84)"); mid.addColorStop(1,"rgba(255,145,168,0)");
        c.fillStyle=mid; c.beginPath(); c.arc(pos.x,pos.y,p.r*3,0,Math.PI*2); c.fill();

        c.fillStyle="rgba(255,232,238,0.98)";
        c.beginPath(); c.arc(pos.x,pos.y,p.r*0.52,0,Math.PI*2); c.fill();

        p.t+=p.speed;
        if(p.t>=1){p.t=0; pnodes[ti].pingAge=1;}
      }

      /* ── Pipeline nodes ──────────────────────────────────────── */
      pnodes.forEach((n,i)=>{
        const φ=t*1.4+i*1.1;
        const p1=0.5+0.5*Math.sin(φ), p2=0.5+0.5*Math.sin(φ+Math.PI);

        if(n.pingAge>0){
          c.strokeStyle=`rgba(235,55,82,${(n.pingAge*0.68).toFixed(3)})`;
          c.lineWidth=1.1;
          c.beginPath(); c.arc(n.x,n.y,19+(1-n.pingAge)*22,0,Math.PI*2); c.stroke();
          n.pingAge=Math.max(0,n.pingAge-0.018);
        }
        c.strokeStyle=`rgba(168,0,36,${(0.08+p1*0.12).toFixed(3)})`;
        c.lineWidth=0.8;
        c.beginPath(); c.arc(n.x,n.y,33+p1*4,0,Math.PI*2); c.stroke();

        c.strokeStyle=`rgba(200,0,46,${(0.18+p2*0.14).toFixed(3)})`;
        c.lineWidth=0.8;
        c.beginPath(); c.arc(n.x,n.y,22+p2*2,0,Math.PI*2); c.stroke();

        c.strokeStyle="rgba(212,0,50,0.58)"; c.lineWidth=1.0;
        c.beginPath(); c.arc(n.x,n.y,15,0,Math.PI*2); c.stroke();

        const bg=c.createRadialGradient(n.x-3,n.y-3,0,n.x,n.y,15);
        bg.addColorStop(0,"rgba(225,0,48,0.40)"); bg.addColorStop(1,"rgba(65,0,14,0.20)");
        c.fillStyle=bg; c.beginPath(); c.arc(n.x,n.y,15,0,Math.PI*2); c.fill();

        const hl=c.createRadialGradient(n.x-4,n.y-5,0,n.x,n.y,15);
        hl.addColorStop(0,"rgba(255,255,255,0.11)"); hl.addColorStop(1,"rgba(255,255,255,0)");
        c.fillStyle=hl; c.beginPath(); c.arc(n.x,n.y,15,0,Math.PI*2); c.fill();

        c.fillStyle="rgba(255,198,212,0.92)";
        c.font="600 7.5px ui-monospace,monospace";
        c.textAlign="center"; c.textBaseline="middle";
        c.fillText(PNODES[i].n,n.x,n.y);

        c.fillStyle="rgba(158,162,208,0.56)";
        c.font="7.5px ui-monospace,monospace";
        c.fillText(PNODES[i].label.toUpperCase(),n.x,n.y+(n.y<H*0.5?-28:28));
      });

      /* ── Left text fade ──────────────────────────────────────── */
      const lf=c.createLinearGradient(0,0,W*0.50,0);
      lf.addColorStop(0,"rgba(5,6,16,0.97)"); lf.addColorStop(1,"rgba(5,6,16,0)");
      c.fillStyle=lf; c.fillRect(0,0,W,H);

      /* ── Edge vignette ───────────────────────────────────────── */
      const ev=c.createRadialGradient(W*0.5,H*0.5,W*0.05,W*0.5,H*0.5,Math.max(W,H)*0.72);
      ev.addColorStop(0,"rgba(5,6,16,0)"); ev.addColorStop(1,"rgba(5,6,16,0.65)");
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
