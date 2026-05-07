"use client";
import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";

const steps = [
  {
    n: "01", title: "TLI Fellow Recommendation", who: "Your Fellow",
    body: "Your TLI Fellow identifies you as a strong candidate and initiates your introduction into the BMDC matching pipeline. Priority is given to MDI, ST, and MOT students.",
  },
  {
    n: "02", title: "Submit Your Materials", who: "You",
    body: "Complete the interest form with your resume and a pitch answering 'What five things will you bring to the BMDC?' This is BMDC's primary signal for evaluating fit.",
  },
  {
    n: "03", title: "Candidate Review & Matching", who: "BMDC Staff",
    body: "BMDC staff review all submitted candidates and match students to open project teams based on skills, interests, and project needs. Bakken drives the decision.",
  },
  {
    n: "04", title: "Meet the Project Team", who: "You + BMDC",
    body: "If there's a strong match, you'll meet the project lead to discuss expectations, logistics, start date, training needs, and your weekly commitment.",
  },
  {
    n: "05", title: "Sign Your Agreement", who: "You",
    body: "Sign the Research Team Participation Agreement (stipend track) or Volunteer Researcher Agreement. Both assign intellectual property to the University of Minnesota.",
  },
  {
    n: "06", title: "Confirm Stipend & Start", who: "You + TLI",
    body: "Agree to the scholarship amount. TLI Finance applies your stipend to your UMN student financial account in the first week of your appointment.",
  },
];

const W = { maxWidth: 1360, margin: "0 auto", padding: "0 4rem" };

/* Light palette */
const L = {
  bg:          "#f2f2f5",
  white:       "#ffffff",
  border:      "rgba(0,0,0,0.09)",
  borderSubtle:"rgba(0,0,0,0.055)",
  text:        "#0d0d12",
  textSub:     "#52526a",
  textMuted:   "#8888a0",
  maroon:      "#a80024",
};

/* Maroon gradient text reused across light sections */
const mG: React.CSSProperties = {
  background: "linear-gradient(135deg, #c0002e 0%, #780018 100%)",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
};

export default function Home() {
  return (
    <div>

      {/* ═══ HERO (dark) ═════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", alignItems: "center", background: "#0c0c11" }}>
        <HeroCanvas />

        <div style={{ ...W, position: "relative", zIndex: 20, width: "100%", padding: "8rem 4rem" }}>
          <div style={{ maxWidth: 800 }}>
            <p className="label fade-up" style={{ marginBottom: "1.75rem", color: "#50505e" }}>
              TLI &times; BMDC &nbsp;&bull;&nbsp; University of Minnesota
            </p>

            <h1 className="fade-up-2" style={{
              fontSize: "clamp(3rem, 5.2vw, 5rem)",
              fontWeight: 600, lineHeight: 1.06,
              letterSpacing: "-0.04em", color: "#ffffff",
              marginBottom: "1.5rem",
            }}>
              Research and Industry<br />
              Internships for international<br />
              <span style={{
                background: "linear-gradient(130deg, #e8003a 0%, #8a001c 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>grad students.</span>
            </h1>

            <p className="fade-up-3" style={{
              fontSize: "1.05rem", color: "#9292a4",
              lineHeight: 1.78, maxWidth: 540, marginBottom: "2.5rem",
            }}>
              The Technological Leadership Institute places UMN graduate students
              inside Bakken Medical Devices Center research teams — with stipends,
              mentorship, and real clinical problems to solve.
            </p>

            <div className="fade-up-4" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/apply" className="btn-primary" style={{ padding: "12px 32px", fontSize: "15px" }}>
                Apply Now
              </Link>
              <Link href="/opportunities" className="btn-outline" style={{ padding: "12px 32px", fontSize: "15px" }}>
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STEPS — dark Palantir pipeline ══════════════════════ */}
      <section style={{
        background: "#0b0b10",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={W}>

          {/* Header row */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center", gap: "2rem",
            padding: "4.5rem 0 3.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div>
              <p style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.63rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#404050", marginBottom: "0.6rem",
              }}>
                How it works
              </p>
              <h2 style={{
                fontSize: "clamp(1.9rem, 3vw, 2.5rem)", fontWeight: 600,
                letterSpacing: "-0.038em", color: "#ffffff", margin: 0,
              }}>
                From interest to first day.
              </h2>
            </div>

            {/* Node pipeline visualization */}
            <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {steps.map((s, i) => (
                <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%",
                    border: "1px solid rgba(192,0,46,0.35)",
                    background: "rgba(192,0,46,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, position: "relative",
                  }}>
                    {/* Subtle pulse ring */}
                    <div style={{
                      position: "absolute", inset: -5,
                      borderRadius: "50%", border: "1px solid rgba(192,0,46,0.1)",
                    }}/>
                    <span style={{
                      ...mG,
                      fontFamily: "ui-monospace,monospace",
                      fontSize: "0.6rem", letterSpacing: "0.04em",
                    }}>
                      {s.n}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{
                      width: 32, height: 1, flexShrink: 0,
                      background: "linear-gradient(to right, rgba(192,0,46,0.35), rgba(192,0,46,0.12))",
                    }}/>
                  )}
                </div>
              ))}
            </div>

            <div style={{ textAlign: "right" }}>
              <Link href="/process" className="btn-outline" style={{ fontSize: "13px", padding: "8px 18px" }}>
                Full guide →
              </Link>
            </div>
          </div>

          {/* 2 × 3 step grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{
                padding: "3rem 3.5rem",
                borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.055)" : "none",
                borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.055)" : "none",
                position: "relative", overflow: "hidden",
                transition: "background 0.18s",
                cursor: "default",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(192,0,46,0.025)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {/* Watermark step number */}
                <div style={{
                  position: "absolute", top: "-0.5rem", right: "1.25rem",
                  fontSize: "7.5rem", fontWeight: 800,
                  fontFamily: "ui-monospace,monospace",
                  color: "rgba(168,0,36,0.065)", lineHeight: 1,
                  pointerEvents: "none", userSelect: "none",
                  letterSpacing: "-0.05em",
                }}>
                  {s.n}
                </div>

                {/* Step + Who row */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "0.6rem",
                  marginBottom: "1.4rem",
                  padding: "4px 10px 4px 0",
                }}>
                  <span style={{
                    ...mG,
                    fontFamily: "ui-monospace,monospace",
                    fontSize: "0.62rem", letterSpacing: "0.1em",
                    fontWeight: 600,
                  }}>
                    STEP {s.n}
                  </span>
                  <span style={{ width: 1, height: 10, background: "rgba(255,255,255,0.1)", display: "inline-block" }}/>
                  <span style={{
                    fontFamily: "ui-monospace,monospace", fontSize: "0.58rem",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#383848",
                  }}>
                    {s.who}
                  </span>
                </div>

                <h3 style={{
                  fontSize: "1.05rem", fontWeight: 600,
                  color: "#e0e0ec", letterSpacing: "-0.02em",
                  lineHeight: 1.3, marginBottom: "0.85rem",
                }}>
                  {s.title}
                </h3>

                <p style={{
                  fontSize: "0.82rem", color: "#4a4a5c",
                  lineHeight: 1.78, margin: 0,
                }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ STATS ═══════════════════════════════════════════════ */}
      <section style={{
        background: L.white,
        borderTop: `1px solid ${L.border}`,
        borderBottom: `1px solid ${L.border}`,
      }}>
        <div style={{ ...W, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { n: "4",        label: "Research Programs",     sub: "IFP · MedWorX · Anatomy U · CLIP" },
            { n: "~$1,000",  label: "Est. Semester Stipend", sub: "Scholarship to student account"    },
            { n: "<14 hrs",  label: "Weekly Commitment",     sub: "5–14 hrs depending on project"     },
            { n: "3",        label: "Eligible Programs",     sub: "MDI · ST · MOT priority"           },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: "2.25rem 2rem",
              borderRight: i < 3 ? `1px solid ${L.border}` : "none",
            }}>
              <div style={{ ...mG, fontSize: "2rem", fontWeight: 600, letterSpacing: "-0.04em", marginBottom: "5px" }}>
                {s.n}
              </div>
              <div style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.63rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: L.textMuted, marginBottom: "3px",
              }}>
                {s.label}
              </div>
              <div style={{ fontSize: "0.72rem", color: L.textMuted }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VISA NOTICE ═════════════════════════════════════════ */}
      <section style={{ background: L.bg, padding: "6rem 0 8rem", borderTop: `1px solid ${L.border}` }}>
        <div style={W}>
          <div style={{
            borderRadius: 14,
            background: L.white,
            border: "1px solid rgba(168,0,36,0.15)",
            borderLeft: "3px solid rgba(168,0,36,0.5)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "5rem", alignItems: "center",
            padding: "3.5rem 4rem",
          }}>
            <div>
              <p style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.63rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: L.maroon, marginBottom: "0.75rem",
              }}>
                Important
              </p>
              <h3 style={{
                fontSize: "clamp(1.4rem, 2.5vw, 1.7rem)", fontWeight: 600,
                color: L.text, letterSpacing: "-0.025em", lineHeight: 1.2,
                marginBottom: "1.1rem",
              }}>
                International Student<br />Visa Notice
              </h3>
              <p style={{ fontSize: "0.875rem", color: L.textSub, lineHeight: 1.85, marginBottom: "1.4rem" }}>
                Students on certain temporary visas may only volunteer where others do not receive
                compensation for the same services.{" "}
                <strong style={{ color: L.text, fontWeight: 500 }}>
                  Students with a pending H-1B application at UMN cannot serve as volunteers.
                </strong>{" "}
                J-1 professors, research scholars, and short-term scholars are permitted.
              </p>
              <Link href="/resources#visa" style={{
                fontSize: "0.83rem", color: L.maroon,
                textDecoration: "underline", textUnderlineOffset: "4px",
                fontWeight: 500,
              }}>
                Full visa eligibility guide →
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "F-1 Student Visa",         status: "Eligible",                 ok: true  },
                { label: "J-1 Research Scholar",     status: "Eligible",                 ok: true  },
                { label: "J-1 Professor",            status: "Eligible",                 ok: true  },
                { label: "J-1 Short-Term Scholar",   status: "Eligible",                 ok: true  },
                { label: "Pending H-1B at UMN",      status: "Not eligible as volunteer", ok: false },
              ].map(r => (
                <div key={r.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "0.8rem 1.1rem",
                  background: L.white,
                  borderRadius: 8,
                  border: `1px solid ${r.ok ? L.borderSubtle : "rgba(168,0,36,0.15)"}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}>
                  <span style={{ fontSize: "0.84rem", color: L.textSub }}>{r.label}</span>
                  <span style={{
                    fontFamily: "ui-monospace,monospace", fontSize: "0.6rem",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    fontWeight: 600,
                    color: r.ok ? "#2e7d3e" : L.maroon,
                  }}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
