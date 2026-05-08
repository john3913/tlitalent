"use client";
import { useEffect, useRef } from "react";

/* ── Pipeline ────────────────────────────────────────────────── */
const PNODES = [
  { rx:0.520, ry:0.50, n:"01", label:"Recommend" },
  { rx:0.612, ry:0.26, n:"02", label:"Apply"     },
  { rx:0.700, ry:0.74, n:"03", label:"Review"    },
  { rx:0.786, ry:0.36, n:"04", label:"Match"     },
  { rx:0.872, ry:0.63, n:"05", label:"Sign"      },
  { rx:0.960, ry:0.48, n:"06", label:"Start"     },
];
const EDGES:[number,number][] = [[0,1],[1,2],[2,3],[3,4],[4,5]];

type CP = { cp1x:number;cp1y:number;cp2x:number;cp2y:number };
function catmullCPs(pts:{x:number;y:number}[],tension=0.42):CP[]{
  return pts.slice(0,-1).map((_,i)=>{
    const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
    return{cp1x:p1.x+(p2.x-p0.x)*tension,cp1y:p1.y+(p2.y-p0.y)*tension,
           cp2x:p2.x-(p3.x-p1.x)*tension,cp2y:p2.y-(p3.y-p1.y)*tension};
  });
}
function bezAt(a:{x:number;y:number},cp:CP,b:{x:number;y:number},t:number){
  const m=1-t;
  return{x:m*m*m*a.x+3*m*m*t*cp.cp1x+3*m*t*t*cp.cp2x+t*t*t*b.x,
         y:m*m*m*a.y+3*m*m*t*cp.cp1y+3*m*t*t*cp.cp2y+t*t*t*b.y};
}

interface PipeParticle{ei:number;t:number;speed:number;r:number}

/* ── Background graph ────────────────────────────────────────── */
interface BgNode{x:number;y:number}
interface BgEdge{a:number;b:number;len:number}
interface BgParticle{ei:number;t:number;speed:number;dir:1|-1}

const N_NODES = 110;

export default function ApplyCanvas(){
  const ref=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const canvas=ref.current; if(!canvas)return;
    const ctx=canvas.getContext("2d"); if(!ctx)return;
    const c=ctx,el=canvas;

    let W=0,H=0;
    let pnodes:{x:number;y:number;pingAge:number}[]=[];
    let cps:CP[]=[];
    let bgNodes:BgNode[]=[];
    let bgEdges:BgEdge[]=[];
    let bgParticles:BgParticle[]=[];

    /* 7 sparks along each pipeline edge */
    const pipeParticles:PipeParticle[]=EDGES.flatMap((_,ei)=>
      Array.from({length:7},()=>({ei,t:Math.random(),
        speed:0.00058+Math.random()*0.00076,r:2.1+Math.random()*1.9})));

    function buildGraph(){
      bgNodes=Array.from({length:N_NODES},()=>({
        x:W*0.32+Math.random()*W*0.68,
        y:H*0.02+Math.random()*H*0.96,
      }));
      const cutoff=H*0.24;
      bgEdges=[];
      for(let i=0;i<bgNodes.length;i++){
        let conns=0;
        for(let j=i+1;j<bgNodes.length;j++){
          const dx=bgNodes[i].x-bgNodes[j].x,dy=bgNodes[i].y-bgNodes[j].y;
          const d=Math.sqrt(dx*dx+dy*dy);
          if(d<cutoff&&conns<4){bgEdges.push({a:i,b:j,len:d});conns++;}
        }
      }
      /* ~60% of edges get a traveling particle */
      bgParticles=bgEdges
        .filter(()=>Math.random()<0.60)
        .map((_,i)=>({ei:i,t:Math.random(),
          speed:0.00018+Math.random()*0.00032,
          dir:(Math.random()<0.5?1:-1) as 1|-1}));
    }

    function resize(){
      W=el.offsetWidth;H=el.offsetHeight;
      el.width=W*devicePixelRatio;el.height=H*devicePixelRatio;
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

      /* Slow fade — trails accumulate, like the hero canvas */
      c.fillStyle="rgba(4,5,14,0.13)";
      c.fillRect(0,0,W,H);

      /* ── Background edges — VISIBLE cold blue ────────────────── */
      c.lineWidth=0.8;
      c.strokeStyle="rgba(90,120,175,0.18)";
      for(const e of bgEdges){
        const a=bgNodes[e.a],b=bgNodes[e.b];
        c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();
      }

      /* ── Background nodes ────────────────────────────────────── */
      for(const n of bgNodes){
        c.fillStyle="rgba(140,170,215,0.48)";
        c.beginPath();c.arc(n.x,n.y,2.0,0,Math.PI*2);c.fill();
      }

      /* ── Background particles — bright cold-white streaks ─────── */
      for(const p of bgParticles){
        const e=bgEdges[p.ei];
        const a=bgNodes[e.a],b=bgNodes[e.b];
        const px=a.x+(b.x-a.x)*p.t,py=a.y+(b.y-a.y)*p.t;

        /* Bloom */
        const glow=c.createRadialGradient(px,py,0,px,py,7);
        glow.addColorStop(0,"rgba(160,195,240,0.36)");
        glow.addColorStop(1,"rgba(160,195,240,0)");
        c.fillStyle=glow;c.beginPath();c.arc(px,py,7,0,Math.PI*2);c.fill();
        /* Core */
        c.fillStyle="rgba(210,228,252,0.90)";
        c.beginPath();c.arc(px,py,1.5,0,Math.PI*2);c.fill();

        p.t+=p.speed*p.dir;
        if(p.t>1){p.t=1;p.dir=-1;}
        if(p.t<0){p.t=0;p.dir=1;}
      }

      /* ── Grid — redrawn each frame so it holds through the fade ─ */
      c.lineWidth=0.4;
      c.strokeStyle="rgba(255,255,255,0.022)";
      for(let x=48;x<W;x+=48){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke();}
      for(let y=48;y<H;y+=48){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}

      /* ── Pipeline spine ──────────────────────────────────────── */
      c.strokeStyle="rgba(168,0,36,0.32)";c.lineWidth=1.1;c.lineCap="butt";
      c.beginPath();c.moveTo(pnodes[0].x,pnodes[0].y);
      EDGES.forEach(([fi,ti])=>{const cp=cps[fi];
        c.bezierCurveTo(cp.cp1x,cp.cp1y,cp.cp2x,cp.cp2y,pnodes[ti].x,pnodes[ti].y);
      });c.stroke();

      /* ── Edge directional glow ───────────────────────────────── */
      EDGES.forEach(([fi,ti])=>{
        const a=pnodes[fi],b=pnodes[ti],cp=cps[fi];
        const g=c.createLinearGradient(a.x,a.y,b.x,b.y);
        g.addColorStop(0,"rgba(228,0,52,0.75)");g.addColorStop(1,"rgba(228,0,52,0.04)");
        c.strokeStyle=g;c.lineWidth=1.35;
        c.beginPath();c.moveTo(a.x,a.y);
        c.bezierCurveTo(cp.cp1x,cp.cp1y,cp.cp2x,cp.cp2y,b.x,b.y);c.stroke();
      });

      /* ── Pipeline sparks ─────────────────────────────────────── */
      for(const p of pipeParticles){
        const [fi,ti]=EDGES[p.ei];
        const pos=bezAt(pnodes[fi],cps[fi],pnodes[ti],p.t);

        const bloom=c.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,p.r*8);
        bloom.addColorStop(0,"rgba(245,55,85,0.48)");bloom.addColorStop(1,"rgba(245,55,85,0)");
        c.fillStyle=bloom;c.beginPath();c.arc(pos.x,pos.y,p.r*8,0,Math.PI*2);c.fill();
        const mid=c.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,p.r*3);
        mid.addColorStop(0,"rgba(255,148,170,0.86)");mid.addColorStop(1,"rgba(255,148,170,0)");
        c.fillStyle=mid;c.beginPath();c.arc(pos.x,pos.y,p.r*3,0,Math.PI*2);c.fill();
        c.fillStyle="rgba(255,234,240,0.98)";
        c.beginPath();c.arc(pos.x,pos.y,p.r*0.50,0,Math.PI*2);c.fill();

        p.t+=p.speed;
        if(p.t>=1){p.t=0;pnodes[ti].pingAge=1;}
      }

      /* ── Pipeline nodes ──────────────────────────────────────── */
      pnodes.forEach((n,i)=>{
        const φ=t*1.4+i*1.1;
        const p1=0.5+0.5*Math.sin(φ),p2=0.5+0.5*Math.sin(φ+Math.PI);
        if(n.pingAge>0){
          c.strokeStyle=`rgba(238,55,82,${(n.pingAge*0.68).toFixed(3)})`;
          c.lineWidth=1.1;
          c.beginPath();c.arc(n.x,n.y,19+(1-n.pingAge)*22,0,Math.PI*2);c.stroke();
          n.pingAge=Math.max(0,n.pingAge-0.018);
        }
        c.strokeStyle=`rgba(168,0,36,${(0.09+p1*0.13).toFixed(3)})`;c.lineWidth=0.8;
        c.beginPath();c.arc(n.x,n.y,33+p1*4,0,Math.PI*2);c.stroke();
        c.strokeStyle=`rgba(200,0,46,${(0.19+p2*0.14).toFixed(3)})`;c.lineWidth=0.8;
        c.beginPath();c.arc(n.x,n.y,22+p2*2,0,Math.PI*2);c.stroke();
        c.strokeStyle="rgba(212,0,50,0.60)";c.lineWidth=1.0;
        c.beginPath();c.arc(n.x,n.y,15,0,Math.PI*2);c.stroke();
        const bg=c.createRadialGradient(n.x-3,n.y-3,0,n.x,n.y,15);
        bg.addColorStop(0,"rgba(225,0,48,0.42)");bg.addColorStop(1,"rgba(65,0,14,0.22)");
        c.fillStyle=bg;c.beginPath();c.arc(n.x,n.y,15,0,Math.PI*2);c.fill();
        const hl=c.createRadialGradient(n.x-4,n.y-5,0,n.x,n.y,15);
        hl.addColorStop(0,"rgba(255,255,255,0.12)");hl.addColorStop(1,"rgba(255,255,255,0)");
        c.fillStyle=hl;c.beginPath();c.arc(n.x,n.y,15,0,Math.PI*2);c.fill();
        c.fillStyle="rgba(255,198,212,0.92)";
        c.font="600 7.5px ui-monospace,monospace";
        c.textAlign="center";c.textBaseline="middle";
        c.fillText(PNODES[i].n,n.x,n.y);
        c.fillStyle="rgba(158,162,208,0.58)";
        c.font="7.5px ui-monospace,monospace";
        c.fillText(PNODES[i].label.toUpperCase(),n.x,n.y+(n.y<H*0.5?-28:28));
      });

      /* ── Left fade ───────────────────────────────────────────── */
      const lf=c.createLinearGradient(0,0,W*0.48,0);
      lf.addColorStop(0,"rgba(4,5,14,0.96)");lf.addColorStop(1,"rgba(4,5,14,0)");
      c.fillStyle=lf;c.fillRect(0,0,W,H);

      /* ── Vignette ────────────────────────────────────────────── */
      const ev=c.createRadialGradient(W*0.5,H*0.5,W*0.05,W*0.5,H*0.5,Math.max(W,H)*0.72);
      ev.addColorStop(0,"rgba(4,5,14,0)");ev.addColorStop(1,"rgba(4,5,14,0.65)");
      c.fillStyle=ev;c.fillRect(0,0,W,H);

      raf=requestAnimationFrame(draw);
    }

    /* Fill once before first frame */
    c.fillStyle="#04050e";c.fillRect(0,0,W,H);
    raf=requestAnimationFrame(draw);
    const ro=new ResizeObserver(resize);ro.observe(el);
    return()=>{cancelAnimationFrame(raf);ro.disconnect();};
  },[]);

  return(
    <canvas ref={ref}
      style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,display:"block"}}/>
  );
}
