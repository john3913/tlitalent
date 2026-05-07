"use client";
import { useState } from "react";

const programs = [
  { id: "ifp",    label: "Innovation Fellows Program (IFP)",         hours: "8–10 hrs/wk",  desc: "Embedded with BMDC teams from unmet need through prototype." },
  { id: "mwx",    label: "MedWorX Contract Engineering",              hours: "10–14 hrs/wk", desc: "Heavy fabrication and CAD focus, real clinical feedback loops." },
  { id: "anu",    label: "Anatomy U",                                 hours: "5–8 hrs/wk",   desc: "Anatomical models for surgical training and device design." },
  { id: "clip",   label: "Clinician Led Innovation Program (CLIP)",   hours: "5–10 hrs/wk",  desc: "Long-arc projects with clinician-investigators across semesters." },
  { id: "urop",   label: "UROP — Independent Research at BMDC",       hours: "Varies",       desc: "Self-directed research with BMDC faculty support." },
  { id: "open",   label: "Not sure — open to matching",               hours: "—",            desc: "BMDC staff will evaluate fit based on your skills and availability." },
];

const programLabels = programs.map(p => p.label);

const visaTypes = [
  "U.S. Citizen or Permanent Resident",
  "F-1 Student Visa",
  "J-1 Research Scholar",
  "J-1 Professor",
  "J-1 Short-Term Scholar",
  "Other — I will verify with ISSS",
];

const processSteps = [
  { n: "01", label: "Fellow recommends you" },
  { n: "02", label: "Submit this form" },
  { n: "03", label: "BMDC reviews & matches" },
  { n: "04", label: "Meet the project team" },
  { n: "05", label: "Sign your agreement" },
  { n: "06", label: "Start working" },
];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: "block", fontSize: "0.68rem", fontWeight: 600,
        letterSpacing: "0.09em", textTransform: "uppercase",
        color: "#808088", marginBottom: "7px",
        fontFamily: "ui-monospace,monospace",
      }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: "0.74rem", color: "#909098", marginTop: "5px" }}>{hint}</p>}
    </div>
  );
}

function FormSection({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #e0e0e6",
      borderRadius: 10,
      padding: "32px 36px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.04)",
    }}>
      <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #ebebf0" }}>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.01em", margin: 0 }}>
          {title}
        </h2>
        {sub && <p style={{ fontSize: "0.82rem", color: "#6e6e73", marginTop: "5px", lineHeight: 1.55, margin: "5px 0 0" }}>{sub}</p>}
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
      <div style={{ background: "#f2f2f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 1.5rem" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", margin: "0 auto 28px",
            background: "linear-gradient(135deg, rgba(144,0,32,0.1), rgba(80,0,18,0.05))",
            border: "1px solid rgba(144,0,32,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#900020", fontSize: "1.5rem" }}>✓</span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.025em", marginBottom: "12px" }}>
            Application Submitted
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#6e6e73", lineHeight: 1.7, marginBottom: "32px" }}>
            Your interest form has been received. A TLI Fellow or BMDC staff member will follow up with next steps.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/process" className="btn-outline" style={{ fontSize: "13px", color: "#3d3d3f", borderColor: "#c8c8ce" }}>View process guide</a>
            <a href="/" className="btn-outline" style={{ fontSize: "13px", color: "#3d3d3f", borderColor: "#c8c8ce" }}>Back to home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f0f0f4", minHeight: "100vh", color: "#111114" }}>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(to bottom, #111114, #1a1a1f)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "5rem 0 4rem",
      }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 4rem" }}>
          <p style={{
            fontFamily: "ui-monospace,monospace", fontSize: "0.66rem",
            letterSpacing: "0.11em", textTransform: "uppercase",
            color: "#505058", marginBottom: "1.5rem",
          }}>
            TLI &times; BMDC Interest Form
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end" }}>
            <h1 style={{
              fontSize: "clamp(2.6rem, 4vw, 3.6rem)",
              fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.07,
              color: "#ffffff", margin: 0,
            }}>
              Apply for a<br />TLI BMDC Internship
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#a8a8b2", lineHeight: 1.75, margin: 0 }}>
              Express your interest in a BMDC research opportunity. Your TLI Fellow
              must recommend you before submitting. BMDC staff will match you to a
              project team based on your skills and availability.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "3.5rem 4rem 6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2.5rem", alignItems: "start" }}>

          {/* ── Left: Form ─────────────────────────────────── */}
          <form
            onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {/* Personal */}
            <FormSection title="Personal Information">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <Field label="Full Name *">
                  <input required placeholder="First Last" value={form.name} onChange={e => set("name", e.target.value)}
                    style={{ background: "#fafafa", border: "1px solid #d4d4da", color: "#111114", borderRadius: 6, padding: "11px 14px", width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "#a80024"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,0,36,0.08)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#d4d4da"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </Field>
                <Field label="UMN Email *">
                  <input required type="email" placeholder="x500@umn.edu" value={form.email} onChange={e => set("email", e.target.value)}
                    style={{ background: "#fafafa", border: "1px solid #d4d4da", color: "#111114", borderRadius: 6, padding: "11px 14px", width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "#a80024"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,0,36,0.08)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#d4d4da"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </Field>
                <Field label="Student ID *" hint="Required for stipend processing">
                  <input required placeholder="1234567" value={form.studentId} onChange={e => set("studentId", e.target.value)}
                    style={{ background: "#fafafa", border: "1px solid #d4d4da", color: "#111114", borderRadius: 6, padding: "11px 14px", width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "#a80024"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,0,36,0.08)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#d4d4da"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </Field>
                <Field label="Graduate Program *">
                  <input required placeholder="e.g. MDI, MOT, ST, BME…" value={form.major} onChange={e => set("major", e.target.value)}
                    style={{ background: "#fafafa", border: "1px solid #d4d4da", color: "#111114", borderRadius: 6, padding: "11px 14px", width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "#a80024"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,0,36,0.08)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#d4d4da"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </Field>
                <Field label="Program Year">
                  <select value={form.year} onChange={e => set("year", e.target.value)}
                    style={{ background: "#fafafa", border: "1px solid #d4d4da", color: "#111114", borderRadius: 6, padding: "11px 14px", width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}>
                    <option value="">Select year</option>
                    {["1st Year","2nd Year","3rd Year","4th Year+"].map(y => <option key={y}>{y}</option>)}
                  </select>
                </Field>
                <Field label="Visa Status *">
                  <select required value={form.visa} onChange={e => set("visa", e.target.value)}
                    style={{ background: "#fafafa", border: "1px solid #d4d4da", color: "#111114", borderRadius: 6, padding: "11px 14px", width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}>
                    <option value="">Select status</option>
                    {visaTypes.map(v => <option key={v}>{v}</option>)}
                  </select>
                </Field>
              </div>
            </FormSection>

            {/* Program */}
            <FormSection title="Program Interest">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Field label="Preferred BMDC Program *">
                  <select required value={form.program} onChange={e => set("program", e.target.value)}
                    style={{ background: "#fafafa", border: "1px solid #d4d4da", color: "#111114", borderRadius: 6, padding: "11px 14px", width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}>
                    <option value="">Select program</option>
                    {programLabels.map(p => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                  <Field label="Weekly Availability">
                    <select value={form.availability} onChange={e => set("availability", e.target.value)}
                      style={{ background: "#fafafa", border: "1px solid #d4d4da", color: "#111114", borderRadius: 6, padding: "11px 14px", width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}>
                      <option value="">Select days</option>
                      <option>Weekdays flexible</option>
                      <option>Mon / Wed / Fri preferred</option>
                      <option>Tue / Thu preferred</option>
                      <option>Afternoons only</option>
                    </select>
                  </Field>
                  <Field label="Hours per Week">
                    <select value={form.hours} onChange={e => set("hours", e.target.value)}
                      style={{ background: "#fafafa", border: "1px solid #d4d4da", color: "#111114", borderRadius: 6, padding: "11px 14px", width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}>
                      <option value="">Select range</option>
                      <option>5–8 hours</option>
                      <option>8–12 hours</option>
                      <option>12–14 hours</option>
                    </select>
                  </Field>
                </div>
              </div>
            </FormSection>

            {/* Five Things */}
            <FormSection
              title="Your Five Things Pitch"
              sub="BMDC staff use this to evaluate fit. Be specific: technical skills, tools mastered, clinical experience, research done, perspectives you bring."
            >
              <Field label="What five things will you bring to the BMDC? *">
                <textarea
                  required rows={10}
                  placeholder={"1. \n2. \n3. \n4. \n5. "}
                  value={form.fiveThings}
                  onChange={e => set("fiveThings", e.target.value)}
                  style={{
                    resize: "vertical", fontFamily: "ui-monospace,monospace",
                    fontSize: "0.85rem", lineHeight: 1.7,
                    background: "#fafafa", border: "1px solid #d4d4da",
                    color: "#111114", borderRadius: 6, padding: "11px 14px",
                    width: "100%", outline: "none",
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#a80024"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,0,36,0.08)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#d4d4da"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </Field>
            </FormSection>

            {/* Goals */}
            <FormSection title="Goals & Background">
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <Field label="What do you hope to gain from this experience?">
                  <textarea rows={4} value={form.goals}
                    placeholder="Describe your learning goals, career interests, or research questions…"
                    onChange={e => set("goals", e.target.value)}
                    style={{
                      resize: "vertical",
                      background: "#fafafa", border: "1px solid #d4d4da",
                      color: "#111114", borderRadius: 6, padding: "11px 14px",
                      width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit",
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = "#a80024"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,0,36,0.08)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#d4d4da"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </Field>
                <Field label="Resume / CV" hint="Share a link (Google Drive, LinkedIn, etc.) or briefly describe your background.">
                  <input placeholder="Link or description" value={form.resume} onChange={e => set("resume", e.target.value)}
                    style={{ background: "#fafafa", border: "1px solid #d4d4da", color: "#111114", borderRadius: 6, padding: "11px 14px", width: "100%", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "#a80024"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,0,36,0.08)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#d4d4da"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </Field>
              </div>
            </FormSection>

            {/* Agreement */}
            <div style={{
              background: "#ffffff", border: "1px solid #e0e0e6",
              borderRadius: 10, padding: "28px 36px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}>
              <p style={{ fontSize: "0.82rem", color: "#6e6e73", lineHeight: 1.75, marginBottom: "18px" }}>
                By submitting I confirm: (1) a TLI Fellow has recommended me; (2) I have reviewed visa eligibility
                requirements; (3) I understand participation requires an IP assignment agreement with the
                University of Minnesota Regents; (4) all information provided is accurate.
              </p>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                <input
                  type="checkbox" required checked={form.agree}
                  onChange={e => set("agree", e.target.checked)}
                  style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0, accentColor: "#900020" }}
                />
                <span style={{ fontSize: "0.875rem", color: "#3d3d3f", lineHeight: 1.5 }}>
                  I confirm the above and am ready to proceed with the BMDC application process.
                </span>
              </label>
            </div>

            {/* Submit */}
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "4px" }}>
              <button type="submit" className="btn-primary" style={{ padding: "13px 44px", fontSize: "15px" }}>
                Submit Application →
              </button>
            </div>
          </form>

          {/* ── Right: Sidebar ──────────────────────────────── */}
          <div style={{ position: "sticky", top: "72px", display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Programs */}
            <div style={{
              background: "#111114", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10, overflow: "hidden",
            }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.64rem",
                  letterSpacing: "0.11em", textTransform: "uppercase", color: "#505058", margin: 0,
                }}>
                  Available Programs
                </p>
              </div>
              {programs.slice(0, 4).map((p, i) => (
                <div key={p.id} style={{
                  padding: "14px 24px",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "3px" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#e0e0e8" }}>
                      {p.label.split(" (")[0].split(" Contract")[0].split(" Led")[0]}
                    </span>
                    <span style={{
                      fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                      color: "#505058", flexShrink: 0, marginLeft: "8px",
                    }}>
                      {p.hours}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.74rem", color: "#606068", lineHeight: 1.5, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stipend */}
            <div style={{
              background: "linear-gradient(160deg, #1a1416 0%, #130e10 100%)",
              border: "1px solid rgba(168,0,36,0.14)",
              borderRadius: 10, padding: "20px 24px",
            }}>
              <p style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.64rem",
                letterSpacing: "0.11em", textTransform: "uppercase",
                color: "#a80024", marginBottom: "12px",
              }}>
                Stipend
              </p>
              <div style={{
                fontSize: "2rem", fontWeight: 600, letterSpacing: "-0.04em",
                background: "linear-gradient(to bottom, #ffffff, #a8a8b2)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                marginBottom: "6px",
              }}>
                $1,500+
              </div>
              <p style={{ fontSize: "0.78rem", color: "#808088", lineHeight: 1.6, margin: 0 }}>
                Applied as a UMN scholarship to your student financial account during the
                first week of your appointment. Direct deposit or check for remaining credit.
              </p>
            </div>

            {/* Process Steps */}
            <div style={{
              background: "#111114", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10, overflow: "hidden",
            }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{
                  fontFamily: "ui-monospace,monospace", fontSize: "0.64rem",
                  letterSpacing: "0.11em", textTransform: "uppercase", color: "#505058", margin: 0,
                }}>
                  Process Overview
                </p>
              </div>
              {processSteps.map((s, i) => (
                <div key={s.n} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "11px 24px",
                  borderBottom: i < processSteps.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  background: s.n === "02" ? "rgba(168,0,36,0.06)" : "transparent",
                }}>
                  <span style={{
                    fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                    background: s.n === "02"
                      ? "linear-gradient(135deg, #c0002e, #800018)"
                      : "none",
                    WebkitBackgroundClip: s.n === "02" ? "text" : "unset",
                    WebkitTextFillColor: s.n === "02" ? "transparent" : "#404048",
                    backgroundClip: s.n === "02" ? "text" : "unset",
                    color: s.n === "02" ? undefined : "#404048",
                    flexShrink: 0, width: "1.6rem",
                  }}>
                    {s.n}
                  </span>
                  <span style={{
                    fontSize: "0.78rem",
                    color: s.n === "02" ? "#d0d0d8" : "#606068",
                    fontWeight: s.n === "02" ? 500 : 400,
                  }}>
                    {s.label}
                  </span>
                  {s.n === "02" && (
                    <span style={{
                      marginLeft: "auto", fontSize: "0.6rem", fontFamily: "ui-monospace,monospace",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "#c0002e",
                    }}>
                      You are here
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Visa notice */}
            <div style={{
              background: "#111114", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10, padding: "18px 22px",
            }}>
              <p style={{
                fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#505058", marginBottom: "8px",
              }}>
                Visa Notice
              </p>
              <p style={{ fontSize: "0.76rem", color: "#707078", lineHeight: 1.65, margin: 0 }}>
                Students with a <span style={{ color: "#c8c8d0", fontWeight: 500 }}>pending H-1B application</span> at UMN cannot serve as volunteers.
                J-1 professors, research scholars, and short-term scholars are permitted.{" "}
                <a href="/resources#visa" style={{ color: "#c0002e", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Full eligibility guide →
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
