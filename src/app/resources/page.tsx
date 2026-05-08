"use client";
import VisaCanvas from "@/components/VisaCanvas";

const L = {
  bg:      "#f4f5fa",
  white:   "#ffffff",
  border:  "rgba(0,0,0,0.09)",
  soft:    "rgba(0,0,0,0.055)",
  text:    "#0d0d12",
  sub:     "#52526a",
  muted:   "#8888a0",
  maroon:  "#a80024",
};

const W: React.CSSProperties = { maxWidth: 1360, margin: "0 auto", padding: "0 4rem" };

const mG: React.CSSProperties = {
  background: "linear-gradient(135deg, #c0002e 0%, #780018 100%)",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
};

function PageSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section style={{
      background: L.white,
      border: `1px solid ${L.border}`,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
      ...style,
    }}>
      {children}
    </section>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{
      padding: "22px 32px 18px",
      borderBottom: `1px solid ${L.soft}`,
      background: "linear-gradient(to bottom, #fafafa, #ffffff)",
    }}>
      <p style={{
        fontFamily: "ui-monospace,monospace", fontSize: "0.6rem",
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: L.muted, marginBottom: 6,
      }}>{label}</p>
      <h2 style={{ fontSize: "1.05rem", fontWeight: 600, color: L.text, letterSpacing: "-0.02em", margin: 0 }}>
        {title}
      </h2>
    </div>
  );
}

export default function Resources() {
  return (
    <div style={{ background: L.bg, minHeight: "100vh" }}>

      {/* ── Page header ──────────────────────────────────────────── */}
      <div style={{ ...W, padding: "4rem 4rem 3rem" }}>
        <p style={{
          fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
          letterSpacing: "0.13em", textTransform: "uppercase",
          color: L.muted, marginBottom: "0.75rem",
        }}>
          Forms &amp; Guidance
        </p>
        <h1 style={{
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 600,
          letterSpacing: "-0.04em", color: L.text, margin: "0 0 0.75rem",
        }}>
          Resources
        </h1>
        <p style={{ fontSize: "0.92rem", color: L.sub, lineHeight: 1.75, maxWidth: 520, margin: 0 }}>
          Everything you need to complete your BMDC internship paperwork, understand your payment,
          and verify your visa eligibility.
        </p>
      </div>

      <div style={{ ...W, display: "flex", flexDirection: "column", gap: "1.5rem", paddingBottom: "6rem" }}>

        {/* ── Required Forms ───────────────────────────────────────── */}
        <PageSection>
          <SectionHeader label="01 · Documentation" title="Required Forms" />
          <div style={{ padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[
              {
                title: "Research Team Participation Agreement",
                form: "TLI-BMDC Form",
                desc: "Used when a student participates in a BMDC research team with a stipend. Outlines responsibilities, stipend terms, confidentiality, and IP assignment. Signed by student and PI.",
                when: "Stipend-track students on named research projects",
                fields: ["Student name", "PI name", "Project title", "Start date", "Hours/week", "Stipend amount"],
              },
              {
                title: "Volunteer Researcher Agreement & Release",
                form: "OGC-SC218",
                desc: "University of Minnesota Office of General Counsel form for volunteer researchers. Covers liability release, IP assignment to Regents, visa certification, and confidentiality. Signed by student and BMDC Director.",
                when: "Volunteer-track students; signed by Dr. Hubert Lim",
                fields: ["Student name", "Start & end date", "Hours/week", "Supervisor (Dr. Erdman)", "Services description"],
              },
            ].map(f => (
              <div key={f.title} style={{
                background: L.bg,
                border: `1px solid ${L.border}`,
                borderRadius: 12, padding: "22px 24px",
              }}>
                <span style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.58rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: L.maroon, background: "rgba(168,0,36,0.06)",
                  border: "1px solid rgba(168,0,36,0.15)",
                  padding: "3px 9px", borderRadius: 4,
                  display: "inline-block", marginBottom: 12,
                }}>
                  {f.form}
                </span>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: L.text, letterSpacing: "-0.01em", marginBottom: 8 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.8rem", color: L.sub, lineHeight: 1.72, marginBottom: 14 }}>{f.desc}</p>
                <div style={{
                  background: L.white, border: `1px solid ${L.soft}`,
                  borderRadius: 8, padding: "12px 14px", marginBottom: 14,
                }}>
                  <p style={{
                    fontFamily: "ui-monospace,monospace", fontSize: "0.58rem",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: L.muted, marginBottom: 6,
                  }}>When to use</p>
                  <p style={{ fontSize: "0.8rem", color: L.sub }}>{f.when}</p>
                </div>
                <div>
                  <p style={{
                    fontFamily: "ui-monospace,monospace", fontSize: "0.58rem",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: L.muted, marginBottom: 6,
                  }}>Required fields</p>
                  <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                    {f.fields.map(field => (
                      <li key={field} style={{ fontSize: "0.78rem", color: L.sub, lineHeight: 1.8 }}>{field}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "0 32px 20px" }}>
            <p style={{ fontSize: "0.75rem", color: L.muted }}>
              Forms are provided by your TLI Fellow or BMDC project lead at the time of your agreement. Contact TLI if you need copies.
            </p>
          </div>
        </PageSection>

        {/* ── Stipend & Payment ─────────────────────────────────────── */}
        <PageSection>
          <SectionHeader label="02 · Compensation" title="Stipend & Payment" />
          <div style={{ padding: "28px 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "1.5rem" }}>
              <div>
                <p style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.6rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: L.muted, marginBottom: 12,
                }}>How it gets to you</p>
                <ol style={{ paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "TLI Finance submits your EFS string, name, and student ID as a scholarship",
                    "Scholarship is applied to your UMN student financial account",
                    "Outstanding balance is paid first",
                    "Remaining credit is refunded via direct deposit (or check if no direct deposit on file)",
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.82rem", color: L.sub, lineHeight: 1.65 }}>{item}</li>
                  ))}
                </ol>
              </div>
              <div>
                <p style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.6rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: L.muted, marginBottom: 12,
                }}>Important notes</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "Funds do NOT go to your MyU card",
                    "Bookstore charges (books, computers) can be billed to student account",
                    "Set up direct deposit in MyU for fastest refund",
                    "Payment processed first week of appointment",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ ...mG, fontFamily: "ui-monospace,monospace", fontSize: "0.6rem", flexShrink: 0, paddingTop: 2 }}>—</span>
                      <span style={{ fontSize: "0.82rem", color: L.sub, lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{
              background: L.bg, border: `1px solid ${L.border}`,
              borderRadius: 10, padding: "14px 18px",
            }}>
              <p style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.58rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: L.muted, marginBottom: 6,
              }}>EFS Fund String (Gage Funds)</p>
              <code style={{ fontSize: "0.88rem", color: L.maroon, fontFamily: "ui-monospace,monospace", fontWeight: 600 }}>
                1000-11074-20563-1000012972
              </code>
            </div>
          </div>
        </PageSection>

        {/* ── Visa Eligibility — dark banner + canvas ───────────────── */}
        <div id="visa" style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.12)" }}>

          {/* Dark banner with canvas */}
          <div style={{ position: "relative", overflow: "hidden", background: "#040c14", padding: "4rem 3rem 3.5rem" }}>
            <VisaCanvas />
            {/* Top accent */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(to right, transparent 5%, rgba(16,185,129,0.6) 25%, rgba(52,211,153,0.8) 50%, rgba(16,185,129,0.6) 75%, transparent 95%)",
            }}/>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)", marginBottom: "1.2rem",
              }}>
                03 · Eligibility &nbsp;&bull;&nbsp; International Students
              </p>
              <h2 style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600,
                letterSpacing: "-0.04em", color: "#ffffff",
                lineHeight: 1.1, margin: "0 0 1rem",
              }}>
                Visa Eligibility
              </h2>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 560, margin: 0 }}>
                If you are not a U.S. citizen or permanent resident, you must provide documentation of
                your visa status at the time of signing your agreement.
              </p>
            </div>
          </div>

          {/* Light card body */}
          <div style={{ background: L.white, border: `1px solid ${L.border}`, borderTop: "none", padding: "32px 32px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              {/* Eligible */}
              <div style={{
                background: "rgba(16,185,129,0.04)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: 12, padding: "20px 22px",
              }}>
                <p style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.59rem",
                  letterSpacing: "0.11em", textTransform: "uppercase",
                  color: "#059669", marginBottom: 12,
                }}>Eligible Visa Types</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "J-1 (Professor, Research Scholar, Short-Term Scholar)",
                    "F-1 (student visa, standard enrollment)",
                    "Other visas permitting volunteer activity — verify with ISSS",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#10b981", flexShrink: 0, fontSize: "0.85rem", paddingTop: 1 }}>✓</span>
                      <span style={{ fontSize: "0.82rem", color: L.sub, lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Not eligible */}
              <div style={{
                background: "rgba(168,0,36,0.03)",
                border: "1px solid rgba(168,0,36,0.15)",
                borderRadius: 12, padding: "20px 22px",
              }}>
                <p style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.59rem",
                  letterSpacing: "0.11em", textTransform: "uppercase",
                  color: L.maroon, marginBottom: 12,
                }}>Not Eligible</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    <>Pending H-1B visa application at UMN — <strong style={{ color: L.text, fontWeight: 600 }}>CANNOT volunteer</strong></>,
                    "Temporary visas in positions where others receive pay for the same services",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: L.maroon, flexShrink: 0, fontSize: "0.85rem", paddingTop: 1 }}>✗</span>
                      <span style={{ fontSize: "0.82rem", color: L.sub, lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              background: L.bg, border: `1px solid ${L.soft}`,
              borderRadius: 10, padding: "14px 18px",
            }}>
              <span style={{ fontSize: "0.82rem", color: L.sub, lineHeight: 1.7 }}>
                <strong style={{ color: L.text, fontWeight: 600 }}>ISSS Contact:</strong>{" "}
                For questions about whether your visa allows volunteer participation, contact the International Student
                and Scholar Services (ISSS) office at UMN before applying. Your TLI Fellow can help facilitate this conversation.
              </span>
            </div>
          </div>
        </div>

        {/* ── Intellectual Property ─────────────────────────────────── */}
        <PageSection>
          <SectionHeader label="04 · Legal" title="Intellectual Property" />
          <div style={{ padding: "28px 32px" }}>
            <p style={{ fontSize: "0.87rem", color: L.sub, lineHeight: 1.82, marginBottom: 16 }}>
              All inventions, improvements, discoveries, software, and writings conceived during your
              BMDC volunteer activities belong solely and exclusively to the University of Minnesota Regents.
              This includes work done jointly or solely by you during the period of your appointment.
            </p>
            <div style={{
              background: L.bg, border: "1px solid rgba(168,0,36,0.12)",
              borderLeft: "3px solid rgba(168,0,36,0.4)",
              borderRadius: 10, padding: "14px 18px",
            }}>
              <p style={{ fontSize: "0.82rem", color: L.sub, lineHeight: 1.75, margin: 0 }}>
                <strong style={{ color: L.text, fontWeight: 600 }}>Exception:</strong>{" "}
                This does not apply to inventions developed entirely on your own time without University equipment,
                supplies, facilities, or proprietary information — and that do not relate to the University&apos;s
                research activities.
              </p>
            </div>
          </div>
        </PageSection>

      </div>
    </div>
  );
}
