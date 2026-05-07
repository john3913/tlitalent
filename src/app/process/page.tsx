"use client";
const W = { maxWidth: 1360, margin: "0 auto", padding: "0 4rem" };

const steps = [
  {
    n: "01", who: "Your TLI Fellow",
    title: "TLI Fellow Recommendation",
    body: "Your TLI Fellow identifies you as a strong candidate for the BMDC program and initiates your introduction into the matching pipeline. The program currently prioritizes MDI students and is expanding to ST and MOT.",
    detail: "Talk to your TLI Fellow about your research interests, technical skills, and availability before they submit your name. They'll advocate for you with BMDC staff.",
    tags: ["Research Interests", "Technical Skills", "Availability"],
  },
  {
    n: "02", who: "You",
    title: "Submit Your Interest Form & Materials",
    body: "Complete the TLI Talent interest form with your resume and a response to: \"What five things will you bring to the BMDC?\" This pitch is the primary signal BMDC project leads use to evaluate fit.",
    detail: "Be concrete: name specific tools you've used, techniques you've mastered, clinical environments you've worked in. Vague answers reduce your chance of a match.",
    tags: ["Interest Form", "Resume", "Five Things Pitch"],
  },
  {
    n: "03", who: "BMDC Staff",
    title: "Candidate Review & Matching",
    body: "BMDC staff review all submitted candidates and match students to open project teams based on skills, interests, and project needs. Bakken drives the matching decision; TLI supports and facilitates.",
    detail: "You may be contacted for a brief informal conversation with BMDC staff or a specific project lead before a match is confirmed. This is a two-way evaluation.",
    tags: ["Skills Review", "Project Matching", "BMDC Decision"],
  },
  {
    n: "04", who: "You + BMDC Project Lead",
    title: "Meet the Project Team",
    body: "If there's a strong match, you'll meet with BMDC staff and the specific project lead to discuss expectations, logistics, start date, training needs, and weekly commitment.",
    detail: "Your TLI Fellow can join this conversation or be looped in afterward. Use this meeting to ask about deliverables, lab access, and how your work will be used.",
    tags: ["Onboarding", "Expectations", "Logistics"],
  },
  {
    n: "05", who: "You",
    title: "Sign Your Agreement",
    body: "Depending on your project type you'll sign either the Research Team Participation Agreement (stipend track) or the Volunteer Researcher Agreement and Release (volunteer track). Both assign IP to the University of Minnesota Regents.",
    detail: "International students must provide visa documentation at signing. Students with a pending H-1B application at UMN cannot participate as volunteers.",
    tags: ["IP Assignment", "Visa Docs", "Agreement Signing"],
  },
  {
    n: "06", who: "You + TLI Finance",
    title: "Confirm Stipend & Start Working",
    body: "You agree to the scholarship amount for the project. TLI Finance processes the stipend as a scholarship applied to your UMN student financial account during the first week of your appointment.",
    detail: "Funds are applied to outstanding balances first; remaining credit is refunded via direct deposit or check. EFS string: 1000-11074-20563-1000012972 (Gage Funds). Funds do not go to your MyU card.",
    tags: ["Scholarship Payment", "EFS Processing", "Direct Deposit"],
  },
];

export default function Process() {
  return (
    <div style={{ background: "var(--bg)" }}>

      {/* ── Page hero ──────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "6rem 0 4rem" }}>
        <div style={W}>
          <p className="label" style={{ marginBottom: "1.25rem" }}>Student Checklist</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "end" }}>
            <h1 style={{
              fontSize: "clamp(2.6rem, 4vw, 3.8rem)",
              fontWeight: 600, letterSpacing: "-0.04em",
              lineHeight: 1.07, color: "#ffffff", margin: 0,
            }}>
              From interest<br />to first day.
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#a8a8b2", lineHeight: 1.75, margin: 0 }}>
              A complete walkthrough of the TLI–BMDC internship pipeline —
              from your first conversation with a TLI Fellow through your first
              day on a BMDC project team.
            </p>
          </div>
        </div>
      </section>

      {/* ── Quick nav strip ────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "#0f0f12" }}>
        <div style={{ ...W, display: "flex", gap: "0", overflowX: "auto" }}>
          {steps.map((s) => (
            <a key={s.n} href={`#step-${s.n}`} style={{
              padding: "1rem 1.25rem", fontSize: "0.72rem",
              fontFamily: "ui-monospace,monospace", letterSpacing: "0.06em",
              color: "#505058", textDecoration: "none",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              transition: "color 0.15s", whiteSpace: "nowrap",
              flexShrink: 0,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#a8a8b2")}
              onMouseLeave={e => (e.currentTarget.style.color = "#505058")}
            >
              {s.n} &nbsp;{s.title}
            </a>
          ))}
        </div>
      </section>

      {/* ── Steps ──────────────────────────────────────────── */}
      {steps.map((s, i) => (
        <section
          key={s.n}
          id={`step-${s.n}`}
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "5rem 0",
            background: i % 2 === 1 ? "#0f0f12" : "var(--bg)",
          }}
        >
          <div style={W}>
            {/* Top row: step label + who */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "2.5rem",
              paddingBottom: "1.25rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <span style={{
                  fontFamily: "ui-monospace,monospace",
                  fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  background: "linear-gradient(135deg,#c0002e,#800018)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Step {s.n}
                </span>
                <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)", display: "inline-block" }}/>
                <span style={{
                  fontFamily: "ui-monospace,monospace",
                  fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#505058",
                }}>
                  {s.who}
                </span>
              </div>
              {/* Tags */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                {s.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "#404048", border: "1px solid rgba(255,255,255,0.05)",
                    padding: "2px 8px", borderRadius: "3px",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Main content grid */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "5rem", alignItems: "start" }}>
              {/* Left: title + step number watermark */}
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", top: "-1rem", left: "-0.25rem",
                  fontSize: "8rem", fontWeight: 700,
                  fontFamily: "ui-monospace,monospace",
                  color: "rgba(168,0,36,0.06)", lineHeight: 1,
                  letterSpacing: "-0.05em",
                  pointerEvents: "none", userSelect: "none",
                }}>
                  {s.n}
                </div>
                <h2 style={{
                  fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                  fontWeight: 600, letterSpacing: "-0.03em",
                  color: "#ffffff", lineHeight: 1.18,
                  position: "relative", margin: 0,
                }}>
                  {s.title}
                </h2>
              </div>

              {/* Right: body + detail */}
              <div>
                <p style={{ fontSize: "1rem", color: "#a8a8b2", lineHeight: 1.8, marginBottom: "1.75rem" }}>
                  {s.body}
                </p>
                <div style={{
                  borderLeft: "2px solid rgba(168,0,36,0.5)",
                  paddingLeft: "1.25rem",
                  background: "rgba(168,0,36,0.04)",
                  borderRadius: "0 6px 6px 0",
                  padding: "1rem 1.25rem",
                }}>
                  <p style={{ fontSize: "0.87rem", color: "#8a8a94", lineHeight: 1.75, margin: 0 }}>
                    {s.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Work hour limits ───────────────────────────────── */}
      <section style={{ padding: "5rem 0 6rem" }}>
        <div style={W}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "1px", background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden",
          }}>
            {[
              {
                label: "Stipend Track", sub: "Scholarship to student account",
                text: "Processed as a UMN scholarship — no hourly cap but BMDC expects 5–14 hrs/week depending on your project.",
              },
              {
                label: "Hourly Pay Track", sub: "Direct payment from BMDC",
                text: "Approved only if you work fewer than 14 hours per week. Standard grad student employment limitation applies.",
              },
            ].map((b) => (
              <div key={b.label} style={{ background: "var(--bg-2)", padding: "2.5rem 2.5rem" }}>
                <p className="label" style={{ marginBottom: "0.4rem" }}>{b.label}</p>
                <p style={{ fontSize: "0.8rem", color: "#c0002e", marginBottom: "1rem", fontFamily: "ui-monospace,monospace", letterSpacing: "0.04em" }}>
                  {b.sub}
                </p>
                <p style={{ fontSize: "0.9rem", color: "#a8a8b2", lineHeight: 1.7, margin: 0 }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
