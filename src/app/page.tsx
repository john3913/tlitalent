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

/* Light palette */
const L = {
  bg:          "#f7f5f8",
  white:       "#ffffff",
  border:      "rgba(0,0,0,0.07)",
  borderSubtle:"rgba(0,0,0,0.045)",
  text:        "#111118",
  textSub:     "#5c5c6c",
  textMuted:   "#9898a6",
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
      <section style={{ position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <HeroCanvas />
        {/* Fade down into the light sections */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 240,
          pointerEvents: "none", zIndex: 10,
          background: "linear-gradient(to top, #f7f5f8 0%, transparent 100%)",
        }}/>

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

      {/* ═══ STEPS (light) ═══════════════════════════════════════ */}
      <section style={{ background: L.bg, padding: "7rem 0 6rem" }}>
        <div style={W}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem" }}>
            <div>
              <p style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.64rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: L.textMuted, marginBottom: "0.7rem",
              }}>
                How it works
              </p>
              <h2 style={{
                fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 600,
                letterSpacing: "-0.038em", color: L.text, margin: 0,
              }}>
                From interest to first day.
              </h2>
            </div>
            <Link href="/process" className="btn-light" style={{ fontSize: "13px", padding: "8px 18px" }}>
              Full guide →
            </Link>
          </div>

          {/* Steps table — white card */}
          <div style={{
            background: L.white, borderRadius: 14,
            border: `1px solid ${L.border}`,
            boxShadow: "0 2px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}>
            {steps.map((s, i) => (
              <Link key={s.n} href="/process" style={{
                display: "flex", alignItems: "center", gap: "2.5rem",
                padding: "1.5rem 2.25rem",
                borderBottom: i < steps.length - 1 ? `1px solid ${L.borderSubtle}` : "none",
                textDecoration: "none", background: "transparent",
                transition: "background 0.14s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(168,0,36,0.028)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{
                  ...mG,
                  fontFamily: "ui-monospace,monospace",
                  fontSize: "0.68rem", letterSpacing: "0.07em",
                  flexShrink: 0, width: "2rem",
                }}>
                  {s.n}
                </span>
                <span style={{
                  flex: 1, fontSize: "0.97rem", color: L.text,
                  fontWeight: 500, letterSpacing: "-0.01em",
                }}>
                  {s.title}
                </span>
                <span style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                  letterSpacing: "0.1em", textTransform: "uppercase", color: L.textMuted,
                }}>
                  {s.who}
                </span>
                <span style={{ color: "#c0c0cc", fontSize: "0.82rem" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS (white) ═══════════════════════════════════════ */}
      <section style={{
        background: L.white,
        borderTop: `1px solid ${L.border}`,
        borderBottom: `1px solid ${L.border}`,
      }}>
        <div style={{ ...W, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { n: "4",       label: "Research Programs",  sub: "IFP · MedWorX · Anatomy U · CLIP" },
            { n: "$1,500+", label: "Semester Stipend",   sub: "Applied to student account"        },
            { n: "<14 hrs", label: "Weekly Commitment",  sub: "5–14 hrs depending on project"     },
            { n: "3",       label: "Eligible Programs",  sub: "MDI · ST · MOT priority"           },
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
              <div style={{ fontSize: "0.72rem", color: "#b8b8c4" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VISA NOTICE (light) ═════════════════════════════════ */}
      <section style={{ background: L.bg, padding: "6rem 0 8rem" }}>
        <div style={W}>
          <div style={{
            borderRadius: 14,
            background: "linear-gradient(160deg, #fffafa 0%, #fff7f7 100%)",
            border: "1px solid rgba(168,0,36,0.13)",
            boxShadow: "0 2px 20px rgba(168,0,36,0.06), 0 1px 4px rgba(0,0,0,0.04)",
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
