"use client";

/* ── Data ──────────────────────────────────────────────────── */
const CX = 432, CY = 202;

const progs = [
  {
    id: "ifp",  name: "IFP",       full: "Innovation Fellows",
    cx: 122, cy: 108,
    hours: "8–10 hrs", tech: 68, clin: 72, res: 78,
    d1: "3.8s", d2: "5.3s", delay1: "0s", delay2: "2.1s",
  },
  {
    id: "mwx",  name: "MedWorX",   full: "Contract Engineering",
    cx: 742, cy: 108,
    hours: "10–14 hrs", tech: 92, clin: 80, res: 55,
    d1: "4.5s", d2: "3.6s", delay1: "0.9s", delay2: "0s",
  },
  {
    id: "anu",  name: "Anatomy U", full: "Anatomical Modeling",
    cx: 122, cy: 296,
    hours: "5–8 hrs", tech: 80, clin: 58, res: 65,
    d1: "5.1s", d2: "4.0s", delay1: "1.6s", delay2: "3.2s",
  },
  {
    id: "clip", name: "CLIP",      full: "Clinician Led",
    cx: 742, cy: 296,
    hours: "5–10 hrs", tech: 52, clin: 95, res: 82,
    d1: "4.2s", d2: "5.8s", delay1: "2.5s", delay2: "1.1s",
  },
];

const metrics = [
  { key: "tech", label: "Technical" },
  { key: "clin", label: "Clinical"  },
  { key: "res",  label: "Research"  },
] as const;

/* ── Bar component (max-width trick for CSS animation) ──────── */
function Bar({ pct, delay }: { pct: number; delay: string }) {
  return (
    <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          maxWidth: "0%",
          borderRadius: "9999px",
          background: "linear-gradient(to right, #c0003a, #e85070)",
          animation: `bar-reveal 1.1s ${delay} cubic-bezier(0.16,1,0.3,1) forwards`,
        }}
      />
    </div>
  );
}

/* ── Metric card ─────────────────────────────────────────────── */
function MetricCard({ p, i }: { p: typeof progs[number]; i: number }) {
  const base = 0.15 + i * 0.12;
  return (
    <div
      className="rounded-xl border p-5"
      style={{
        background: "linear-gradient(160deg, #1c1c1f 0%, #161618 100%)",
        border: "1px solid #2a2a2e",
        animation: `fade-up 0.8s ${base}s cubic-bezier(0.16,1,0.3,1) both`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <span
            className="text-[0.72rem] font-mono font-semibold tracking-widest"
            style={{
              background: "linear-gradient(135deg,#e05070,#c0003a)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}
          >
            {p.name}
          </span>
          <p className="text-[0.8rem] text-[#98989f] leading-tight mt-0.5">{p.full}</p>
        </div>
        <span className="text-[0.72rem] font-mono text-[#6e6e73] bg-[#222226] px-2 py-0.5 rounded">
          {p.hours}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {metrics.map(({ key, label }) => (
          <div key={key}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[0.68rem] uppercase tracking-widest font-mono text-[#6e6e73]">{label}</span>
              <span className="text-[0.72rem] font-mono text-[#98989f]">{p[key]}%</span>
            </div>
            <Bar pct={p[key]} delay={`${base + 0.3}s`} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function ProgramMap() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0e0e10, #111115, #0e0e10)" }}
    >
      {/* Subtle top + bottom rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(192,0,58,0.3), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(192,0,58,0.3), transparent)" }} />

      <div className="max-w-[1360px] mx-auto px-8 lg:px-16 py-24">

        {/* Header */}
        <div className="mb-14 max-w-xl">
          <p className="label mb-3">Program Intelligence</p>
          <h2
            className="text-[2.4rem] font-semibold tracking-[-0.03em] leading-tight"
            style={{
              background: "linear-gradient(135deg, #f5f5f7 0%, #888890 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}
          >
            Four pathways into<br />the Bakken lab.
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-start">

          {/* ── SVG Orbital Map ─── */}
          <div className="relative">
            <svg
              viewBox="0 0 864 404"
              className="w-full"
              style={{ overflow: "visible" }}
            >
              <defs>
                {/* Glow filter */}
                <filter id="pm-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="pm-glow-sm" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>

                {/* Hub radial gradient */}
                <radialGradient id="hub-fill" cx="50%" cy="40%">
                  <stop offset="0%" stopColor="#d0003a" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#7a0018" stopOpacity="0.6"/>
                </radialGradient>

                {/* Node fill */}
                <radialGradient id="node-fill" cx="50%" cy="40%">
                  <stop offset="0%" stopColor="#252528"/>
                  <stop offset="100%" stopColor="#18181b"/>
                </radialGradient>

                {/* Per-line gradient (user space) */}
                {progs.map(p => (
                  <linearGradient key={p.id} id={`lg-${p.id}`}
                    x1={p.cx} y1={p.cy} x2={CX} y2={CY}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#c0003a" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#e04060" stopOpacity="0.55"/>
                  </linearGradient>
                ))}
              </defs>

              <style>{`
                @keyframes hub-ring { 0%,100%{r:58;opacity:.18} 50%{r:72;opacity:0} }
                @keyframes hub-ring2 { 0%,100%{r:74;opacity:.10} 50%{r:90;opacity:0} }
                @keyframes node-ring { 0%,100%{r:50;opacity:.12} 50%{r:62;opacity:0} }
                @keyframes dash-flow { to { stroke-dashoffset: -140; } }
                .hub-ring1 { animation: hub-ring 2.8s ease-in-out infinite; }
                .hub-ring2 { animation: hub-ring2 2.8s 0.9s ease-in-out infinite; }
                .node-ring { animation: node-ring 3.4s ease-in-out infinite; }
                .flow-dash { animation: dash-flow 3.0s linear infinite; }
              `}</style>

              {/* Faint background grid */}
              {Array.from({ length: 13 }, (_, i) => (
                <line key={`vg${i}`} x1={i * 72} y1={0} x2={i * 72} y2={404}
                  stroke="rgba(255,255,255,0.025)" strokeWidth="0.5"/>
              ))}
              {Array.from({ length: 7 }, (_, i) => (
                <line key={`hg${i}`} x1={0} y1={i * 67} x2={864} y2={i * 67}
                  stroke="rgba(255,255,255,0.025)" strokeWidth="0.5"/>
              ))}

              {/* Connection lines — solid underlay */}
              {progs.map(p => (
                <line key={`base-${p.id}`}
                  x1={p.cx} y1={p.cy} x2={CX} y2={CY}
                  stroke={`url(#lg-${p.id})`}
                  strokeWidth="1"
                />
              ))}

              {/* Flowing dashed overlay */}
              {progs.map(p => (
                <line key={`dash-${p.id}`}
                  className="flow-dash"
                  x1={p.cx} y1={p.cy} x2={CX} y2={CY}
                  stroke="#e04060"
                  strokeWidth="0.7"
                  strokeOpacity="0.4"
                  strokeDasharray="4 12"
                  style={{ animationDuration: p.d1 }}
                />
              ))}

              {/* Traveling sparks — node → hub */}
              {progs.map(p => (
                <circle key={`sp1-${p.id}`} r="2.8" fill="#ff6080" filter="url(#pm-glow-sm)">
                  <animateMotion dur={p.d1} begin={p.delay1} repeatCount="indefinite"
                    path={`M ${p.cx} ${p.cy} L ${CX} ${CY}`}/>
                </circle>
              ))}
              {/* Traveling sparks — hub → node */}
              {progs.map(p => (
                <circle key={`sp2-${p.id}`} r="2" fill="#ffa0b0" filter="url(#pm-glow-sm)">
                  <animateMotion dur={p.d2} begin={p.delay2} repeatCount="indefinite"
                    path={`M ${CX} ${CY} L ${p.cx} ${p.cy}`}/>
                </circle>
              ))}

              {/* Hub pulse rings */}
              <circle className="hub-ring1" cx={CX} cy={CY} r="58" fill="none"
                stroke="#c0003a" strokeWidth="1"/>
              <circle className="hub-ring2" cx={CX} cy={CY} r="74" fill="none"
                stroke="#c0003a" strokeWidth="0.6"/>

              {/* Hub */}
              <circle cx={CX} cy={CY} r="48" fill="url(#hub-fill)" filter="url(#pm-glow)"/>
              <text x={CX} y={CY - 5} textAnchor="middle" fill="white"
                fontSize="11" fontWeight="700" letterSpacing="2" fontFamily="ui-monospace,monospace">
                BMDC
              </text>
              <text x={CX} y={CY + 12} textAnchor="middle" fill="rgba(255,255,255,0.45)"
                fontSize="8.5" fontFamily="ui-monospace,monospace" letterSpacing="1">
                HUB
              </text>

              {/* Program nodes */}
              {progs.map(p => (
                <g key={`node-${p.id}`}>
                  {/* Node pulse ring */}
                  <circle className="node-ring" cx={p.cx} cy={p.cy} r="50"
                    fill="none" stroke="#c0003a" strokeWidth="0.7"/>

                  {/* Node circle */}
                  <circle cx={p.cx} cy={p.cy} r="42" fill="url(#node-fill)"
                    stroke="rgba(192,0,58,0.35)" strokeWidth="1"/>

                  {/* Name */}
                  <text x={p.cx} y={p.cy - 5} textAnchor="middle" fill="white"
                    fontSize="11" fontWeight="700" fontFamily="ui-monospace,monospace" letterSpacing="1">
                    {p.name}
                  </text>

                  {/* Hours badge */}
                  <text x={p.cx} y={p.cy + 11} textAnchor="middle"
                    fill="rgba(255,255,255,0.38)" fontSize="8.5"
                    fontFamily="ui-monospace,monospace">
                    {p.hours}
                  </text>
                </g>
              ))}

              {/* Floating skill labels near each node */}
              {[
                { x: 122, y: 58,  text: "Design Thinking" },
                { x: 742, y: 58,  text: "Fabrication + CAD" },
                { x: 122, y: 355, text: "Medical Modeling" },
                { x: 742, y: 355, text: "Clinical Research" },
              ].map(({ x, y, text }) => (
                <text key={text} x={x} y={y} textAnchor="middle"
                  fill="rgba(255,255,255,0.2)" fontSize="8"
                  fontFamily="ui-monospace,monospace" letterSpacing="1.2">
                  {text.toUpperCase()}
                </text>
              ))}
            </svg>
          </div>

          {/* ── Metric Cards ─── */}
          <div className="flex flex-col gap-3">
            {progs.map((p, i) => <MetricCard key={p.id} p={p} i={i} />)}
          </div>
        </div>

        {/* Bottom stat row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-12"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { n: "4", label: "Research Programs" },
            { n: "$1,500+", label: "Semester Stipend" },
            { n: "<14 hrs", label: "Weekly Commitment" },
            { n: "3", label: "Grad Programs Eligible" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-[1.9rem] font-semibold tracking-tight mb-1"
                style={{
                  background: "linear-gradient(to bottom, #ffffff 0%, #7a7a82 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}
              >
                {s.n}
              </div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
