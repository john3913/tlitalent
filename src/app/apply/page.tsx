"use client";
import { useState } from "react";
import Link from "next/link";

const programs = [
  { id: "ifp",  label: "Innovation Fellows Program (IFP)"          },
  { id: "mwx",  label: "MedWorX Contract Engineering"              },
  { id: "anu",  label: "Anatomy U"                                 },
  { id: "clip", label: "Clinician Led Innovation Program (CLIP)"   },
  { id: "urop", label: "UROP — Independent Research at BMDC"       },
  { id: "open", label: "Not sure — open to matching"               },
];

const visaTypes = [
  "U.S. Citizen or Permanent Resident",
  "F-1 Student Visa",
  "J-1 Research Scholar",
  "J-1 Professor",
  "J-1 Short-Term Scholar",
  "Other — I will verify with ISSS",
];

/* Light palette */
const L = {
  bg:      "#f7f5f8",
  white:   "#ffffff",
  border:  "rgba(0,0,0,0.07)",
  soft:    "rgba(0,0,0,0.045)",
  text:    "#111118",
  sub:     "#5c5c6c",
  muted:   "#9898a6",
  maroon:  "#a80024",
  inputBg: "#ffffff",
  inputBd: "rgba(0,0,0,0.11)",
};

const IS: React.CSSProperties = {
  background: L.inputBg,
  border: `1px solid ${L.inputBd}`,
  borderRadius: 8,
  color: L.text,
  padding: "11px 14px",
  width: "100%",
  outline: "none",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  transition: "border-color 0.15s, box-shadow 0.15s",
  appearance: "auto" as const,
};

const mG: React.CSSProperties = {
  background: "linear-gradient(135deg, #c0002e 0%, #780018 100%)",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
};

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(168,0,36,0.55)";
  e.currentTarget.style.boxShadow  = "0 0 0 3px rgba(168,0,36,0.09)";
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = L.inputBd;
  e.currentTarget.style.boxShadow  = "none";
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: "block", marginBottom: 7,
      fontFamily: "ui-monospace,monospace",
      fontSize: "0.64rem", fontWeight: 600,
      letterSpacing: "0.1em", textTransform: "uppercase",
      color: L.muted,
    }}>
      {children}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: "0.72rem", color: L.muted, marginTop: 5 }}>{children}</p>;
}

function Card({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: L.white,
      border: `1px solid ${L.border}`,
      borderRadius: 14,
      padding: "28px 32px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.03)",
    }}>
      <div style={{ borderBottom: `1px solid ${L.soft}`, paddingBottom: 16, marginBottom: 22 }}>
        <h2 style={{ fontSize: "0.92rem", fontWeight: 600, color: L.text, letterSpacing: "-0.01em", margin: 0 }}>
          {title}
        </h2>
        {sub && <p style={{ fontSize: "0.78rem", color: L.muted, marginTop: 4, lineHeight: 1.55 }}>{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", studentId: "", program: "",
    major: "", year: "", visa: "", resume: "",
    availability: "", hours: "", fiveThings: "", goals: "", agree: false,
  });

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div style={{ background: L.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%", margin: "0 auto 28px",
            background: "linear-gradient(135deg, rgba(168,0,36,0.1), rgba(80,0,18,0.05))",
            border: "1px solid rgba(168,0,36,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: L.maroon, fontSize: "1.3rem" }}>✓</span>
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 600, color: L.text, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Application Submitted
          </h1>
          <p style={{ fontSize: "0.9rem", color: L.sub, lineHeight: 1.75, marginBottom: 32 }}>
            Your interest form has been received. A TLI Fellow or BMDC staff member will follow up within a few business days.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/process" className="btn-light" style={{ fontSize: "13px" }}>View process guide</Link>
            <Link href="/" className="btn-light" style={{ fontSize: "13px" }}>Back to home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: L.bg, minHeight: "100vh" }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(to bottom, #ffffff, #f7f5f8)",
        borderBottom: `1px solid ${L.border}`,
        padding: "5rem 0 4.5rem",
      }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 4rem" }}>
          <p style={{
            fontFamily: "ui-monospace,monospace", fontSize: "0.63rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: L.muted, marginBottom: "1.4rem",
          }}>
            TLI &times; BMDC &nbsp;&bull;&nbsp; Interest Form
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "end" }}>
            <div>
              <h1 style={{
                fontSize: "clamp(2.6rem, 4vw, 3.6rem)",
                fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.07,
                color: L.text, margin: "0 0 1.5rem",
              }}>
                Apply for a{" "}
                <span style={mG}>TLI&nbsp;BMDC</span><br />
                Internship
              </h1>
              {/* Quick stats */}
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                {[
                  { n: "4 Programs", sub: "IFP · MedWorX · ANU · CLIP" },
                  { n: "$1,500+",    sub: "Semester stipend"            },
                  { n: "<14 hrs",    sub: "Per week"                    },
                ].map(s => (
                  <div key={s.n} style={{
                    padding: "5px 12px", borderRadius: 6,
                    background: L.white, border: `1px solid ${L.border}`,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: L.maroon }}>{s.n}</span>
                    <span style={{ fontSize: "0.68rem", color: L.muted, marginLeft: 6 }}>{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ fontSize: "0.95rem", color: L.sub, lineHeight: 1.82, margin: 0 }}>
              Complete this form to express interest in a BMDC research opportunity.
              Your TLI Fellow must have recommended you before submitting — BMDC staff
              will match you to a project team based on your skills, interests, and availability.
            </p>
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ──────────────────────────────────────── */}
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "3.5rem 4rem 7rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2.5rem", alignItems: "start" }}>

          {/* Form */}
          <form
            onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {/* Personal */}
            <Card title="Personal Information">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <Label>Full Name *</Label>
                  <input required placeholder="First Last" value={form.name}
                    onChange={e => set("name", e.target.value)}
                    style={IS} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <Label>UMN Email *</Label>
                  <input required type="email" placeholder="x500@umn.edu" value={form.email}
                    onChange={e => set("email", e.target.value)}
                    style={IS} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <Label>Student ID *</Label>
                  <input required placeholder="1234567" value={form.studentId}
                    onChange={e => set("studentId", e.target.value)}
                    style={IS} onFocus={onFocus} onBlur={onBlur} />
                  <Hint>Required for stipend processing</Hint>
                </div>
                <div>
                  <Label>Graduate Program *</Label>
                  <input required placeholder="MDI, MOT, ST, BME…" value={form.major}
                    onChange={e => set("major", e.target.value)}
                    style={IS} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <Label>Program Year</Label>
                  <select value={form.year} onChange={e => set("year", e.target.value)}
                    style={{ ...IS, color: form.year ? L.text : L.muted }}
                    onFocus={onFocus} onBlur={onBlur}>
                    <option value="">Select year</option>
                    {["1st Year","2nd Year","3rd Year","4th Year+"].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Visa Status *</Label>
                  <select required value={form.visa} onChange={e => set("visa", e.target.value)}
                    style={{ ...IS, color: form.visa ? L.text : L.muted }}
                    onFocus={onFocus} onBlur={onBlur}>
                    <option value="">Select status</option>
                    {visaTypes.map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </Card>

            {/* Program */}
            <Card title="Program & Availability">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <Label>Preferred Program *</Label>
                  <select required value={form.program} onChange={e => set("program", e.target.value)}
                    style={{ ...IS, color: form.program ? L.text : L.muted }}
                    onFocus={onFocus} onBlur={onBlur}>
                    <option value="">Select program</option>
                    {programs.map(p => <option key={p.id}>{p.label}</option>)}
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <Label>Weekly Availability</Label>
                    <select value={form.availability} onChange={e => set("availability", e.target.value)}
                      style={{ ...IS, color: form.availability ? L.text : L.muted }}
                      onFocus={onFocus} onBlur={onBlur}>
                      <option value="">Select schedule</option>
                      {["Weekdays flexible","Mon / Wed / Fri","Tue / Thu","Afternoons only"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>Hours per Week</Label>
                    <select value={form.hours} onChange={e => set("hours", e.target.value)}
                      style={{ ...IS, color: form.hours ? L.text : L.muted }}
                      onFocus={onFocus} onBlur={onBlur}>
                      <option value="">Select range</option>
                      {["5–8 hours","8–12 hours","12–14 hours"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Five Things */}
            <Card
              title="Your Five Things Pitch"
              sub="BMDC project leads use this as the primary signal to evaluate fit. Name specific tools, techniques, clinical environments, and skills — vague answers reduce your chance of a match."
            >
              <div>
                <Label>What five things will you bring to the BMDC? *</Label>
                <textarea required rows={10}
                  placeholder={"1. \n2. \n3. \n4. \n5. "}
                  value={form.fiveThings}
                  onChange={e => set("fiveThings", e.target.value)}
                  style={{
                    ...IS, resize: "vertical",
                    fontFamily: "ui-monospace,monospace",
                    fontSize: "0.84rem", lineHeight: 1.78,
                  }}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>
            </Card>

            {/* Goals */}
            <Card title="Goals & Background">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <Label>What do you hope to gain?</Label>
                  <textarea rows={4} value={form.goals}
                    placeholder="Learning goals, career interests, research questions…"
                    onChange={e => set("goals", e.target.value)}
                    style={{ ...IS, resize: "vertical" }}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>
                <div>
                  <Label>Resume / CV</Label>
                  <input placeholder="Google Drive link, LinkedIn, or brief description"
                    value={form.resume}
                    onChange={e => set("resume", e.target.value)}
                    style={IS} onFocus={onFocus} onBlur={onBlur}
                  />
                  <Hint>Share a link or briefly describe your background</Hint>
                </div>
              </div>
            </Card>

            {/* Agreement */}
            <div style={{
              background: "linear-gradient(160deg, #fffafa, #fff7f7)",
              border: "1px solid rgba(168,0,36,0.12)",
              borderRadius: 14, padding: "24px 32px",
              boxShadow: "0 1px 4px rgba(168,0,36,0.05)",
            }}>
              <p style={{ fontSize: "0.8rem", color: L.sub, lineHeight: 1.82, marginBottom: 16 }}>
                By submitting I confirm: (1) a TLI Fellow has recommended me; (2) I have reviewed visa
                eligibility requirements; (3) I understand participation requires an IP assignment
                agreement with the University of Minnesota Regents; (4) all information is accurate.
              </p>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                <input
                  type="checkbox" required checked={form.agree}
                  onChange={e => set("agree", e.target.checked)}
                  style={{ width: 15, height: 15, marginTop: 3, flexShrink: 0, accentColor: L.maroon }}
                />
                <span style={{ fontSize: "0.86rem", color: L.sub, lineHeight: 1.55 }}>
                  I confirm the above and am ready to proceed with the BMDC application process.
                </span>
              </label>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
              <button type="submit" className="btn-primary" style={{ padding: "14px 52px", fontSize: "15px", letterSpacing: "0.01em" }}>
                Submit Application →
              </button>
            </div>
          </form>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 72, display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Stipend */}
            <div style={{
              background: L.white,
              border: `1px solid ${L.border}`,
              borderRadius: 14, overflow: "hidden",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}>
              <div style={{
                padding: "20px 24px",
                background: "linear-gradient(135deg, #7a0019 0%, #c4002e 100%)",
              }}>
                <p style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.6rem",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)", marginBottom: 8,
                }}>
                  Semester Stipend
                </p>
                <div style={{
                  fontSize: "2.4rem", fontWeight: 600, letterSpacing: "-0.04em",
                  color: "#ffffff", lineHeight: 1, marginBottom: 6,
                }}>
                  $1,500+
                </div>
                <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.6 }}>
                  Applied as a UMN scholarship to your student account in the first week of your appointment.
                </p>
              </div>
              <div style={{ padding: "16px 24px", borderTop: `1px solid ${L.border}` }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { label: "Payment type",   val: "UMN Scholarship"      },
                    { label: "Timing",         val: "Week 1 of appointment" },
                    { label: "Remaining credit", val: "Direct deposit / check" },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: "0.75rem", color: L.muted }}>{r.label}</span>
                      <span style={{ fontSize: "0.75rem", color: L.sub, fontWeight: 500 }}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process tracker */}
            <div style={{
              background: L.white,
              border: `1px solid ${L.border}`,
              borderRadius: 14, overflow: "hidden",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}>
              <div style={{ padding: "16px 22px", borderBottom: `1px solid ${L.soft}` }}>
                <p style={{ fontFamily: "ui-monospace,monospace", fontSize: "0.62rem", letterSpacing: "0.11em", textTransform: "uppercase", color: L.muted, margin: 0 }}>
                  Process Overview
                </p>
              </div>
              {[
                { n: "01", label: "Fellow recommends you" },
                { n: "02", label: "Submit this form", active: true },
                { n: "03", label: "BMDC reviews & matches" },
                { n: "04", label: "Meet the team" },
                { n: "05", label: "Sign agreement" },
                { n: "06", label: "Start working" },
              ].map((s, i) => (
                <div key={s.n} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 22px",
                  borderBottom: i < 5 ? `1px solid ${L.soft}` : "none",
                  background: s.active ? "rgba(168,0,36,0.035)" : "transparent",
                }}>
                  <span style={{
                    fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                    ...(s.active ? mG : { color: L.muted }),
                    flexShrink: 0,
                  }}>
                    {s.n}
                  </span>
                  <span style={{
                    fontSize: "0.78rem", flex: 1,
                    color: s.active ? L.text : L.muted,
                    fontWeight: s.active ? 600 : 400,
                  }}>
                    {s.label}
                  </span>
                  {s.active && (
                    <span style={{
                      fontSize: "0.58rem", fontFamily: "ui-monospace,monospace",
                      letterSpacing: "0.07em", textTransform: "uppercase",
                      color: L.maroon, fontWeight: 600,
                    }}>
                      HERE
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Visa */}
            <div style={{
              background: "linear-gradient(160deg, #fffafa, #fff7f7)",
              border: "1px solid rgba(168,0,36,0.12)",
              borderRadius: 14, padding: "20px 22px",
              boxShadow: "0 2px 12px rgba(168,0,36,0.05)",
            }}>
              <p style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.6rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: L.maroon, marginBottom: 10,
              }}>
                Visa Notice
              </p>
              <p style={{ fontSize: "0.76rem", color: L.sub, lineHeight: 1.7 }}>
                Pending <strong style={{ color: L.text, fontWeight: 500 }}>H-1B applicants at UMN</strong> cannot volunteer.
                F-1 students and J-1 scholars are permitted.{" "}
                <Link href="/resources#visa" style={{ color: L.maroon, textDecoration: "underline", textUnderlineOffset: 3 }}>
                  Full guide →
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
