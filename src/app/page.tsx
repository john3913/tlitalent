"use client";
import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";

const steps = [
  { n: "01", title: "TLI Fellow recommends you",        who: "Your Fellow"   },
  { n: "02", title: "Submit interest form & resume",    who: "You"           },
  { n: "03", title: "BMDC reviews & matches",           who: "BMDC Staff"    },
  { n: "04", title: "Meet the project team",            who: "You + BMDC"    },
  { n: "05", title: "Sign your agreement",              who: "You"           },
  { n: "06", title: "Start your project",               who: "You + BMDC"    },
];

const W = { maxWidth: 1360, margin: "0 auto", padding: "0 4rem" };

export default function Home() {
  return (
    <div>

      {/* ═══ HERO ════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <HeroCanvas />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 200, pointerEvents: "none", zIndex: 10,
          background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
        }}/>

        <div style={{ ...W, position: "relative", zIndex: 20, width: "100%", padding: "8rem 4rem" }}>
          <div style={{ maxWidth: 760 }}>
            <p className="label fade-up" style={{ marginBottom: "1.75rem", color: "#505060" }}>
              TLI &times; BMDC &nbsp;&bull;&nbsp; University of Minnesota
            </p>

            <h1 className="fade-up-2" style={{
              fontSize: "clamp(3rem, 5.2vw, 5rem)",
              fontWeight: 600, lineHeight: 1.06,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              marginBottom: "1.5rem",
            }}>
              Research internships<br />
              for international<br />
              <span style={{
                background: "linear-gradient(130deg, #e8003a 0%, #8a001c 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>grad students.</span>
            </h1>

            <p className="fade-up-3" style={{
              fontSize: "1.05rem", color: "#9a9aac",
              lineHeight: 1.75, maxWidth: 540, marginBottom: "2.5rem",
            }}>
              The Technological Leadership Institute places UMN graduate students
              inside Bakken Medical Devices Center research teams — with stipends,
              mentorship, and real clinical problems to solve.
            </p>

            <div className="fade-up-4" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/apply" className="btn-primary" style={{ padding: "12px 30px", fontSize: "15px" }}>
                Apply Now
              </Link>
              <Link href="/opportunities" className="btn-outline" style={{ padding: "12px 30px", fontSize: "15px" }}>
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═════════════════════════════════════════ */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "#0f0f14",
      }}>
        <div style={{ ...W, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { n: "4",      label: "Research Programs",    sub: "IFP · MedWorX · Anatomy U · CLIP" },
            { n: "$1,500+", label: "Semester Stipend",    sub: "Applied to student account" },
            { n: "<14 hrs", label: "Weekly Commitment",   sub: "5–14 hrs depending on project" },
            { n: "3",      label: "Eligible Programs",    sub: "MDI · ST · MOT priority" },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: "2.25rem 2rem",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}>
              <div style={{
                fontSize: "1.9rem", fontWeight: 600, letterSpacing: "-0.04em",
                background: "linear-gradient(to bottom, #ffffff 0%, #6a6a7a 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                marginBottom: "4px",
              }}>
                {s.n}
              </div>
              <div className="label" style={{ marginBottom: "3px" }}>{s.label}</div>
              <div style={{ fontSize: "0.72rem", color: "#404050" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ STEPS ═══════════════════════════════════════════════ */}
      <section style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "7rem 0",
        background: "linear-gradient(to bottom, var(--bg), #0f0f14)",
      }}>
        <div style={W}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem" }}>
            <div>
              <p className="label" style={{ marginBottom: "0.75rem" }}>How it works</p>
              <h2 style={{
                fontSize: "2.4rem", fontWeight: 600,
                letterSpacing: "-0.038em", color: "#ffffff", margin: 0,
              }}>
                From interest to first day.
              </h2>
            </div>
            <Link href="/process" className="btn-outline" style={{ fontSize: "12px", padding: "7px 18px" }}>
              Full guide →
            </Link>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {steps.map((s, i) => (
              <Link key={s.n} href="/process" style={{
                display: "flex", alignItems: "center", gap: "2.5rem",
                padding: "1.6rem 0.75rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.018)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.68rem",
                  letterSpacing: "0.07em",
                  background: "linear-gradient(135deg, #c0002e, #800018)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  flexShrink: 0, width: "2rem",
                }}>
                  {s.n}
                </span>
                <span style={{ flex: 1, fontSize: "0.97rem", color: "#c0c0cc", fontWeight: 400, letterSpacing: "-0.01em" }}>
                  {s.title}
                </span>
                <span style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                  letterSpacing: "0.1em", textTransform: "uppercase", color: "#404050",
                }}>
                  {s.who}
                </span>
                <span style={{ color: "#2c2c3a", fontSize: "0.8rem" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISA NOTICE ═════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0 7rem" }}>
        <div style={W}>
          <div style={{
            borderRadius: 12, padding: "3.5rem 4rem",
            background: "linear-gradient(160deg, #1a1416 0%, #130e10 100%)",
            border: "1px solid rgba(168,0,36,0.14)",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center",
          }}>
            <div>
              <p className="label" style={{ marginBottom: "0.75rem", color: "#a80024" }}>Important</p>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.025em", marginBottom: "1rem" }}>
                International Student<br />Visa Notice
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#9a9aac", lineHeight: 1.8, margin: 0 }}>
                Students on certain temporary visas may only volunteer where others do not receive
                compensation for the same services.{" "}
                <span style={{ color: "#d8d8e0", fontWeight: 500 }}>
                  Students with a pending H-1B application at UMN cannot serve as volunteers.
                </span>{" "}
                J-1 professors, research scholars, and short-term scholars are permitted.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "F-1 Student", status: "Eligible", ok: true },
                { label: "J-1 Research Scholar", status: "Eligible", ok: true },
                { label: "J-1 Professor", status: "Eligible", ok: true },
                { label: "Pending H-1B at UMN", status: "Not eligible as volunteer", ok: false },
              ].map(r => (
                <div key={r.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "0.75rem 1rem",
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: 6,
                  border: `1px solid ${r.ok ? "rgba(255,255,255,0.05)" : "rgba(168,0,36,0.18)"}`,
                }}>
                  <span style={{ fontSize: "0.82rem", color: "#a0a0ae" }}>{r.label}</span>
                  <span style={{
                    fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: r.ok ? "#5a8a5a" : "#c0002e",
                  }}>
                    {r.status}
                  </span>
                </div>
              ))}
              <Link href="/resources#visa" style={{
                fontSize: "0.8rem", color: "#c0002e",
                textDecoration: "underline", textUnderlineOffset: "4px",
                marginTop: "0.25rem",
              }}>
                Full visa eligibility guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
