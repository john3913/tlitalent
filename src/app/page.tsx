"use client";
import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import ProgramMap from "@/components/ProgramMap";

const programs = [
  { id: "ifp",     tag: "IFP",       name: "Innovation Fellows Program",   lead: "Danny Sachs",
    desc: "Embedded with BMDC teams from clinician-identified unmet need all the way through early prototype development." },
  { id: "medworx", tag: "MedWorX",   name: "MedWorX Contract Engineering", lead: "Eric Little",
    desc: "Build real models and prototypes alongside clinicians. Heavy fabrication and CAD focus, real clinical feedback loops." },
  { id: "anatomyu",tag: "Anatomy U", name: "Anatomy U",                    lead: "Ali Kahlert",
    desc: "Develop anatomical models integrated with medical devices to advance surgical training and device design education." },
  { id: "clip",    tag: "CLIP",      name: "Clinician Led Innovation",      lead: "BMDC Staff",
    desc: "Long-arc projects not tied to the school calendar. Work directly with clinician-investigators across multiple semesters." },
];

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
          position: "absolute", bottom: 0, left: 0, right: 0, height: 180, pointerEvents: "none", zIndex: 10,
          background: "linear-gradient(to top, #111114 0%, transparent 100%)",
        }}/>

        <div style={{ ...W, position: "relative", zIndex: 20, width: "100%", padding: "8rem 4rem" }}>
          <div style={{ maxWidth: 760 }}>
            <p className="label fade-up" style={{ marginBottom: "1.75rem", color: "#606068" }}>
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
              fontSize: "1.05rem", color: "#a8a8b2",
              lineHeight: 1.75, maxWidth: 540, marginBottom: "2.5rem",
            }}>
              The Technological Leadership Institute places UMN graduate students
              inside Bakken Medical Devices Center research teams — with stipends,
              mentorship, and real clinical problems to solve.
            </p>

            <div className="fade-up-4" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/apply" className="btn-primary" style={{ padding: "11px 28px", fontSize: "15px" }}>
                Apply Now
              </Link>
              <Link href="/opportunities" className="btn-outline" style={{ padding: "11px 28px", fontSize: "15px" }}>
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROGRAM MAP ═════════════════════════════════════════ */}
      <ProgramMap />

      {/* ═══ PROGRAMS ════════════════════════════════════════════ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "7rem 0" }}>
        <div style={W}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem" }}>
            <p className="label">Available programs</p>
            <Link href="/opportunities" className="btn-outline" style={{ fontSize: "12px", padding: "6px 16px" }}>
              View all →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
            {programs.map((p) => (
              <Link key={p.id} href={`/opportunities#${p.id}`} style={{
                display: "block", padding: "2rem 1.75rem",
                background: "var(--bg-2)",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1e1e24")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-2)")}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <span className="tag-maroon">{p.tag}</span>
                  <span style={{ fontSize: "0.72rem", color: "#505058", fontFamily: "ui-monospace,monospace" }}>{p.lead}</span>
                </div>
                <p style={{ fontSize: "0.92rem", fontWeight: 500, color: "#f0f0f4", marginBottom: "0.6rem", letterSpacing: "-0.01em" }}>
                  {p.name}
                </p>
                <p style={{ fontSize: "0.82rem", color: "#7a7a84", lineHeight: 1.65 }}>{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STEPS ═══════════════════════════════════════════════ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "7rem 0",
        background: "linear-gradient(to bottom, #111114, #0f0f12)" }}>
        <div style={W}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem" }}>
            <div>
              <p className="label" style={{ marginBottom: "0.75rem" }}>How it works</p>
              <h2 style={{
                fontSize: "2.2rem", fontWeight: 600,
                letterSpacing: "-0.035em", color: "#ffffff",
              }}>
                From interest to first day.
              </h2>
            </div>
            <Link href="/process" className="btn-outline" style={{ fontSize: "12px", padding: "6px 16px" }}>
              Full guide →
            </Link>
          </div>

          {/* Step table */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {steps.map((s) => (
              <Link key={s.n} href="/process" style={{
                display: "flex", alignItems: "center", gap: "2.5rem",
                padding: "1.5rem 0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.7rem",
                  letterSpacing: "0.06em",
                  background: "linear-gradient(135deg, #c0002e, #800018)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  flexShrink: 0, width: "2rem",
                }}>
                  {s.n}
                </span>
                <span style={{ flex: 1, fontSize: "0.95rem", color: "#c8c8d0", fontWeight: 400, letterSpacing: "-0.01em" }}>
                  {s.title}
                </span>
                <span style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.64rem",
                  letterSpacing: "0.1em", textTransform: "uppercase", color: "#484850",
                }}>
                  {s.who}
                </span>
                <span style={{ color: "#303038", fontSize: "0.8rem" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISA NOTICE ═════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0" }}>
        <div style={W}>
          <div style={{
            borderRadius: 10, padding: "3rem 3.5rem",
            background: "linear-gradient(160deg, #1a1416 0%, #130e10 100%)",
            border: "1px solid rgba(168,0,36,0.14)",
          }}>
            <div style={{ maxWidth: 680 }}>
              <p className="label" style={{ marginBottom: "0.75rem", color: "#a80024" }}>Important</p>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "0.9rem" }}>
                International Student Visa Notice
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#a8a8b2", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Students on certain temporary visas may only volunteer where others do not receive compensation for the same services.{" "}
                <span style={{ color: "#d8d8e0", fontWeight: 500 }}>Students with a pending H-1B application at UMN cannot serve as volunteers.</span>{" "}
                J-1 professors, research scholars, and short-term scholars are permitted.
              </p>
              <Link href="/resources#visa" style={{
                fontSize: "0.82rem", color: "#c0002e",
                textDecoration: "underline", textUnderlineOffset: "4px",
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
