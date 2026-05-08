"use client";
import { useEffect, useRef } from "react";

interface PipeParticle{ei:number;t:number;speed:number;r:number}

/* ── Background graph ────────────────────────────────────────── */
interface BgNode{x:number;y:number}
interface BgEdge{a:number;b:number;len:number}
interface BgParticle{ei:number;t:number;speed:number;dir:1|-1}

const N_NODES = 112;

export default function ApplyCanvas(){
  const ref=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const canvas=ref.current; if(!canvas)return;
    const ctx=canvas.getContext("2d"); if(!ctx)return;
    const c=ctx,el=canvas;

    let W=0,H=0;
    let bgNodes:BgNode[]=[];
    let bgEdges:BgEdge[]=[];
    let bgParticles:BgParticle[]=[];

    /* pipeline particles unused — nodes/spine removed per user request */
    const pipeParticles:PipeParticle[]=[];

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
      buildGraph();
    }
    resize();

    let raf=0;
    const t0=performance.now();

    function draw(){
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
