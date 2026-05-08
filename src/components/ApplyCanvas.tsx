"use client";
import { useEffect, useRef } from "react";

interface BgNode{x:number;y:number}
interface BgEdge{a:number;b:number;len:number}
interface BgParticle{ei:number;t:number;speed:number;dir:1|-1}

const N_NODES = 72;

/* Aurora band config */
const AURORA = [
  { baseY:0.28, amp:0.09, freq:0.00028, rgb:"168,0,36",   peak:0.060 },
  { baseY:0.58, amp:0.07, freq:0.00021, rgb:"110,0,70",   peak:0.045 },
  { baseY:0.72, amp:0.05, freq:0.00034, rgb:"210,40,80",  peak:0.038 },
  { baseY:0.12, amp:0.06, freq:0.00019, rgb:"80,20,120",  peak:0.030 },
];

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
      bgParticles=bgEdges
        .filter(()=>Math.random()<0.60)
        .map((_,i)=>({ei:i,t:Math.random(),
          speed:0.00023+Math.random()*0.00042,
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

    function drawAurora(t:number){
      for(const band of AURORA){
        const cy=(band.baseY+Math.sin(t*band.freq)*band.amp)*H;
        const halfH=H*0.22;
        const g=c.createLinearGradient(0,cy-halfH,0,cy+halfH);
        g.addColorStop(0,  `rgba(${band.rgb},0)`);
        g.addColorStop(0.5,`rgba(${band.rgb},${band.peak})`);
        g.addColorStop(1,  `rgba(${band.rgb},0)`);
        c.fillStyle=g;
        c.fillRect(0,cy-halfH,W,halfH*2);
      }
    }

    function draw(){
      const t=performance.now();

      c.fillStyle="rgba(8,10,26,0.13)";
      c.fillRect(0,0,W,H);

      /* ── Aurora bands ──────────────────────────────────────────── */
      drawAurora(t);

      /* ── Background edges ──────────────────────────────────────── */
      c.lineWidth=0.6;
      c.strokeStyle="rgba(90,120,175,0.09)";
      for(const e of bgEdges){
        const a=bgNodes[e.a],b=bgNodes[e.b];
        c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();
      }

      /* ── Background nodes ──────────────────────────────────────── */
      for(const n of bgNodes){
        c.fillStyle="rgba(140,170,215,0.26)";
        c.beginPath();c.arc(n.x,n.y,1.2,0,Math.PI*2);c.fill();
      }

      /* ── Background particles ──────────────────────────────────── */
      for(const p of bgParticles){
        const e=bgEdges[p.ei];
        const a=bgNodes[e.a],b=bgNodes[e.b];
        const px=a.x+(b.x-a.x)*p.t,py=a.y+(b.y-a.y)*p.t;

        const glow=c.createRadialGradient(px,py,0,px,py,4);
        glow.addColorStop(0,"rgba(160,195,240,0.18)");
        glow.addColorStop(1,"rgba(160,195,240,0)");
        c.fillStyle=glow;c.beginPath();c.arc(px,py,4,0,Math.PI*2);c.fill();
        c.fillStyle="rgba(210,228,252,0.62)";
        c.beginPath();c.arc(px,py,1.0,0,Math.PI*2);c.fill();

        p.t+=p.speed*p.dir;
        if(p.t>1){p.t=1;p.dir=-1;}
        if(p.t<0){p.t=0;p.dir=1;}
      }

      /* ── Grid ──────────────────────────────────────────────────── */
      c.lineWidth=0.4;
      c.strokeStyle="rgba(255,255,255,0.022)";
      for(let x=48;x<W;x+=48){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke();}
      for(let y=48;y<H;y+=48){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}

      /* ── Left fade ─────────────────────────────────────────────── */
      const lf=c.createLinearGradient(0,0,W*0.48,0);
      lf.addColorStop(0,"rgba(8,10,26,0.96)");lf.addColorStop(1,"rgba(8,10,26,0)");
      c.fillStyle=lf;c.fillRect(0,0,W,H);

      /* ── Vignette ──────────────────────────────────────────────── */
      const ev=c.createRadialGradient(W*0.5,H*0.5,W*0.05,W*0.5,H*0.5,Math.max(W,H)*0.72);
      ev.addColorStop(0,"rgba(8,10,26,0)");ev.addColorStop(1,"rgba(8,10,26,0.55)");
      c.fillStyle=ev;c.fillRect(0,0,W,H);

      raf=requestAnimationFrame(draw);
    }

    c.fillStyle="#08091a";c.fillRect(0,0,W,H);
    raf=requestAnimationFrame(draw);
    const ro=new ResizeObserver(resize);ro.observe(el);
    return()=>{cancelAnimationFrame(raf);ro.disconnect();};
  },[]);

  return(
    <canvas ref={ref}
      style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,display:"block"}}/>
  );
}
