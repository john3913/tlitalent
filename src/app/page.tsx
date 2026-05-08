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

      {/* ═══ STEPS — light ══════════════════════════════════════════ */}
      <section style={{
        position: "relative", overflow: "hidden",
        background: "#f4f5fa",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}>
        {/* 2px maroon accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(to right, transparent 4%, rgba(168,0,36,0.75) 22%, rgba(220,80,110,0.88) 50%, rgba(168,0,36,0.75) 78%, transparent 96%)",
        }}/>
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(0,0,0,0.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}/>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "65%",
          background: "radial-gradient(ellipse 110% 140% at 50% -20%, rgba(168,0,36,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>

        <div style={{ ...W, position: "relative" }}>

          {/* Section header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            gap: "3rem", padding: "5.5rem 0 4rem",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}>
            <div>
              <p style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.63rem",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: L.textMuted, marginBottom: "0.85rem",
              }}>
                How it works
              </p>
              <h2 style={{
                fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 600,
                letterSpacing: "-0.04em", color: L.text,
                lineHeight: 1.1, margin: 0,
              }}>
                From interest<br />to first day.
              </h2>
            </div>

            {/* Pipeline node visualization */}
            <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {steps.map((s, i) => (
                <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56 }}>
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      border: "1px solid rgba(168,0,36,0.18)",
                    }}/>
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(192,0,46,0.1) 0%, rgba(100,0,24,0.06) 100%)",
                      border: "1px solid rgba(192,0,46,0.38)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 0 14px rgba(192,0,46,0.12)",
                    }}>
                      <span style={{
                        ...mG, fontFamily: "ui-monospace,monospace",
                        fontSize: "0.58rem", letterSpacing: "0.04em",
                      }}>
                        {s.n}
                      </span>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{
                      width: 28, height: 1, flexShrink: 0,
                      background: "linear-gradient(to right, rgba(168,0,36,0.35), rgba(168,0,36,0.08))",
                    }}/>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", flexShrink: 0 }}>
              <Link href="/process" className="btn-light" style={{ fontSize: "13px", padding: "9px 22px" }}>
                Full process guide →
              </Link>
            </div>
          </div>

          {/* 2 × 3 step grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {steps.map((s, i) => (
              <Link key={s.n} href="/process" style={{
                display: "block", textDecoration: "none",
                padding: "3.5rem",
                borderRight: i % 2 === 0 ? "1px solid rgba(0,0,0,0.07)" : "none",
                borderBottom: i < 4 ? "1px solid rgba(0,0,0,0.07)" : "none",
                position: "relative", overflow: "hidden",
                background: "rgba(255,255,255,0.6)",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.92)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.6)")}
              >
                {/* Ghost watermark */}
                <div style={{
                  position: "absolute", top: "-1rem", right: "1rem",
                  fontSize: "8rem", fontWeight: 800,
                  fontFamily: "ui-monospace,monospace",
                  color: "rgba(168,0,36,0.06)", lineHeight: 1,
                  pointerEvents: "none", userSelect: "none",
                  letterSpacing: "-0.06em",
                }}>
                  {s.n}
                </div>

                {/* Header row: step label + WHO pill */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.6rem",
                }}>
                  <span style={{
                    ...mG, fontFamily: "ui-monospace,monospace",
                    fontSize: "0.62rem", letterSpacing: "0.12em", fontWeight: 700,
                  }}>
                    STEP {s.n}
                  </span>
                  <span style={{
                    fontFamily: "ui-monospace,monospace",
                    fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase",
                    color: L.textMuted,
                    background: "rgba(0,0,0,0.045)",
                    border: "1px solid rgba(0,0,0,0.09)",
                    padding: "3px 12px", borderRadius: "20px",
                  }}>
                    {s.who}
                  </span>
                </div>

                <h3 style={{
                  fontSize: "1.1rem", fontWeight: 600,
                  color: L.text, letterSpacing: "-0.022em",
                  lineHeight: 1.32, marginBottom: "0.9rem",
                }}>
                  {s.title}
                </h3>

                <p style={{
                  fontSize: "0.84rem", color: L.textSub,
                  lineHeight: 1.82, margin: 0,
                }}>
                  {s.body}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ STATS — pure dark for maximum editorial contrast ════ */}
      <section style={{
        background: "#060608",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ ...W, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { n: "4",        label: "Research Programs",     sub: "IFP · MedWorX · Anatomy U · CLIP" },
            { n: "~$1,000",  label: "Est. Semester Stipend", sub: "Scholarship to student account"    },
            { n: "<14 hrs",  label: "Weekly Commitment",     sub: "5–14 hrs depending on project"     },
            { n: "3",        label: "Eligible Programs",     sub: "MDI · ST · MOT priority"           },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: "2.75rem 2rem",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: 0, left: "2rem",
                width: "44px", height: "2px",
                background: "linear-gradient(to right, rgba(168,0,36,0.75), transparent)",
              }}/>
              <div style={{ ...mG, fontSize: "2.6rem", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: "8px" }}>
                {s.n}
              </div>
              <div style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                letterSpacing: "0.11em", textTransform: "uppercase",
                color: "#505062", marginBottom: "4px",
              }}>
                {s.label}
              </div>
              <div style={{ fontSize: "0.71rem", color: "#38383e" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VISA NOTICE — pure white, hard contrast break from dark ═ */}
      <section style={{ background: "#ffffff", padding: "8rem 0 10rem" }}>
        <div style={W}>
          {/* Section label */}
          <div style={{
            display: "flex", alignItems: "center", gap: "1rem",
            marginBottom: "3.5rem",
          }}>
            <div style={{ width: 28, height: "1px", background: L.maroon }}/>
            <p style={{
              fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: L.maroon, margin: 0,
            }}>
              Visa Eligibility
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "6rem", alignItems: "start",
          }}>
            {/* Left — editorial text */}
            <div>
              <h3 style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 600,
                color: L.text, letterSpacing: "-0.03em", lineHeight: 1.15,
                marginBottom: "1.4rem",
              }}>
                International student<br />visa notice.
              </h3>
              <p style={{ fontSize: "0.9rem", color: L.textSub, lineHeight: 1.88, marginBottom: "1.8rem" }}>
                Students on certain temporary visas may only volunteer where others do not receive
                compensation for the same services.{" "}
                <strong style={{ color: L.text, fontWeight: 500 }}>
                  Students with a pending H-1B application at UMN cannot serve as volunteers.
                </strong>{" "}
                J-1 professors, research scholars, and short-term scholars are permitted to participate.
              </p>
              <Link href="/resources#visa" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: "0.84rem", color: L.maroon,
                textDecoration: "underline", textUnderlineOffset: "4px",
                fontWeight: 500,
              }}>
                Full visa eligibility guide →
              </Link>
            </div>

            {/* Right — data table */}
            <div style={{
              border: `1px solid ${L.border}`,
              borderRadius: 12, overflow: "hidden",
              boxShadow: "0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
            }}>
              {/* Table header */}
              <div style={{
                display: "flex", justifyContent: "space-between",
                padding: "12px 20px",
                background: "#f8f8fa",
                borderBottom: `1px solid ${L.border}`,
              }}>
                <span style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.59rem",
                  letterSpacing: "0.11em", textTransform: "uppercase", color: L.textMuted,
                }}>Visa Type</span>
                <span style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.59rem",
                  letterSpacing: "0.11em", textTransform: "uppercase", color: L.textMuted,
                }}>Status</span>
              </div>
              {[
                { label: "F-1 Student Visa",         status: "Eligible",      ok: true  },
                { label: "J-1 Research Scholar",     status: "Eligible",      ok: true  },
                { label: "J-1 Professor",            status: "Eligible",      ok: true  },
                { label: "J-1 Short-Term Scholar",   status: "Eligible",      ok: true  },
                { label: "Pending H-1B at UMN",      status: "Not eligible",  ok: false },
              ].map((r, i) => (
                <div key={r.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "0.9rem 1.25rem",
                  borderBottom: i < 4 ? `1px solid ${L.borderSubtle}` : "none",
                  background: r.ok ? "transparent" : "rgba(168,0,36,0.025)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: r.ok ? "#2e7d3e" : L.maroon, flexShrink: 0,
                    }}/>
                    <span style={{ fontSize: "0.85rem", color: L.textSub }}>{r.label}</span>
                  </div>
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
