"use client";
import { useState } from "react";
import Link from "next/link";

const programs = [
  { id: "ifp",  label: "Innovation Fellows Program",         tag: "IFP",     hours: "8–10 hrs/wk" },
  { id: "mwx",  label: "MedWorX Contract Engineering",       tag: "MedWorX", hours: "10–14 hrs/wk" },
  { id: "anu",  label: "Anatomy U",                          tag: "ANU",     hours: "5–8 hrs/wk" },
  { id: "clip", label: "Clinician Led Innovation Program",   tag: "CLIP",    hours: "5–10 hrs/wk" },
  { id: "urop", label: "UROP — Independent Research",        tag: "UROP",    hours: "Varies" },
  { id: "open", label: "Not sure — open to matching",        tag: "OPEN",    hours: "—" },
];

const visaTypes = [
  "U.S. Citizen or Permanent Resident",
  "F-1 Student Visa",
  "J-1 Research Scholar",
  "J-1 Professor",
  "J-1 Short-Term Scholar",
  "Other — I will verify with ISSS",
];

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 7,
  color: "#e8e8f0",
  padding: "11px 14px",
  width: "100%",
  outline: "none",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: "block", fontSize: "0.64rem", fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "#5a5a6a", marginBottom: "8px",
        fontFamily: "ui-monospace,monospace",
      }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: "0.72rem", color: "#4a4a58", marginTop: "5px" }}>{hint}</p>}
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 12,
      padding: "28px 32px",
    }}>
      <div style={{ marginBottom: "22px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#d0d0dc", letterSpacing: "-0.01em", margin: 0 }}>
          {title}
        </h2>
        {sub && <p style={{ fontSize: "0.78rem", color: "#52525e", marginTop: "4px", lineHeight: 1.55, margin: "5px 0 0" }}>{sub}</p>}
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

  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(192,0,50,0.6)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,0,36,0.12)";
    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
  };
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
  };

  if (submitted) {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 2rem" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%", margin: "0 auto 28px",
            background: "linear-gradient(135deg, rgba(192,0,50,0.14), rgba(80,0,18,0.06))",
            border: "1px solid rgba(192,0,50,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#c0003a", fontSize: "1.3rem" }}>✓</span>
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.03em", marginBottom: "12px" }}>
            Application Submitted
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#7a7a8a", lineHeight: 1.75, marginBottom: "32px" }}>
            Your interest form has been received. A TLI Fellow or BMDC staff member will follow up within a few business days.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link href="/process" className="btn-outline" style={{ fontSize: "13px" }}>View process guide</Link>
            <Link href="/" className="btn-outline" style={{ fontSize: "13px" }}>Back to home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "5.5rem 0 4.5rem",
        background: "linear-gradient(to bottom, #0c0c11, var(--bg))",
      }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 4rem" }}>
          <p style={{
            fontFamily: "ui-monospace,monospace", fontSize: "0.64rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#404050", marginBottom: "1.5rem",
          }}>
            TLI &times; BMDC Interest Form
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "end" }}>
            <div>
              <h1 style={{
                fontSize: "clamp(2.8rem, 4vw, 3.8rem)",
                fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.06,
                color: "#ffffff", margin: "0 0 1.1rem",
              }}>
                Apply for a<br />TLI BMDC Internship
              </h1>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {[{ n: "4", l: "Programs" }, { n: "$1,500+", l: "Stipend" }, { n: "<14 hrs", l: "Per week" }].map(s => (
                  <div key={s.l} style={{
                    padding: "5px 12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 5,
                    display: "flex", gap: "6px", alignItems: "baseline",
                  }}>
                    <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "0.78rem", color: "#d0d0dc", fontWeight: 600 }}>{s.n}</span>
                    <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#404050" }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ fontSize: "0.93rem", color: "#7a7a8a", lineHeight: 1.8, margin: 0 }}>
              Express your interest in a BMDC research opportunity. Your TLI Fellow
              must recommend you before submitting. BMDC staff match students to
              project teams based on skills, availability, and project needs.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "3.5rem 4rem 7rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "2.5rem", alignItems: "start" }}>

          {/* Form */}
          <form
            onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {/* Personal */}
            <Section title="Personal Information">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Full Name *", key: "name", placeholder: "First Last", type: "text", req: true },
                  { label: "UMN Email *", key: "email", placeholder: "x500@umn.edu", type: "email", req: true },
                ].map(f => (
                  <Field key={f.key} label={f.label}>
                    <input required={f.req} type={f.type} placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form] as string}
                      onChange={e => set(f.key, e.target.value)}
                      style={inputStyle} onFocus={focusIn} onBlur={focusOut}
                    />
                  </Field>
                ))}
                <Field label="Student ID *" hint="Required for stipend processing">
                  <input required placeholder="1234567" value={form.studentId}
                    onChange={e => set("studentId", e.target.value)}
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut}
                  />
                </Field>
                <Field label="Graduate Program *">
                  <input required placeholder="MDI, MOT, ST, BME…" value={form.major}
                    onChange={e => set("major", e.target.value)}
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut}
                  />
                </Field>
                <Field label="Program Year">
                  <select value={form.year} onChange={e => set("year", e.target.value)}
                    style={{ ...inputStyle, color: form.year ? "#e8e8f0" : "#5a5a6a" }}
                    onFocus={focusIn} onBlur={focusOut}>
                    <option value="" style={{ color: "#5a5a6a", background: "#1a1a22" }}>Select year</option>
                    {["1st Year","2nd Year","3rd Year","4th Year+"].map(y =>
                      <option key={y} style={{ background: "#1a1a22", color: "#e8e8f0" }}>{y}</option>
                    )}
                  </select>
                </Field>
                <Field label="Visa Status *">
                  <select required value={form.visa} onChange={e => set("visa", e.target.value)}
                    style={{ ...inputStyle, color: form.visa ? "#e8e8f0" : "#5a5a6a" }}
                    onFocus={focusIn} onBlur={focusOut}>
                    <option value="" style={{ color: "#5a5a6a", background: "#1a1a22" }}>Select status</option>
                    {visaTypes.map(v =>
                      <option key={v} style={{ background: "#1a1a22", color: "#e8e8f0" }}>{v}</option>
                    )}
                  </select>
                </Field>
              </div>
            </Section>

            {/* Program */}
            <Section title="Program & Availability">
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <Field label="Preferred Program *">
                  <select required value={form.program} onChange={e => set("program", e.target.value)}
                    style={{ ...inputStyle, color: form.program ? "#e8e8f0" : "#5a5a6a" }}
                    onFocus={focusIn} onBlur={focusOut}>
                    <option value="" style={{ color: "#5a5a6a", background: "#1a1a22" }}>Select program</option>
                    {programs.map(p =>
                      <option key={p.id} style={{ background: "#1a1a22", color: "#e8e8f0" }}>{p.label}</option>
                    )}
                  </select>
                </Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field label="Weekly Availability">
                    <select value={form.availability} onChange={e => set("availability", e.target.value)}
                      style={{ ...inputStyle, color: form.availability ? "#e8e8f0" : "#5a5a6a" }}
                      onFocus={focusIn} onBlur={focusOut}>
                      <option value="" style={{ background: "#1a1a22" }}>Select schedule</option>
                      {["Weekdays flexible","Mon / Wed / Fri","Tue / Thu","Afternoons only"].map(o =>
                        <option key={o} style={{ background: "#1a1a22", color: "#e8e8f0" }}>{o}</option>
                      )}
                    </select>
                  </Field>
                  <Field label="Hours per Week">
                    <select value={form.hours} onChange={e => set("hours", e.target.value)}
                      style={{ ...inputStyle, color: form.hours ? "#e8e8f0" : "#5a5a6a" }}
                      onFocus={focusIn} onBlur={focusOut}>
                      <option value="" style={{ background: "#1a1a22" }}>Select range</option>
                      {["5–8 hours","8–12 hours","12–14 hours"].map(o =>
                        <option key={o} style={{ background: "#1a1a22", color: "#e8e8f0" }}>{o}</option>
                      )}
                    </select>
                  </Field>
                </div>
              </div>
            </Section>

            {/* Five Things */}
            <Section
              title="Your Five Things Pitch"
              sub="BMDC project leads use this to evaluate fit. Name specific tools, techniques, clinical environments, and skills. Vague answers reduce your chance of a match."
            >
              <Field label="What five things will you bring to the BMDC? *">
                <textarea required rows={10}
                  placeholder={"1. \n2. \n3. \n4. \n5. "}
                  value={form.fiveThings}
                  onChange={e => set("fiveThings", e.target.value)}
                  style={{
                    ...inputStyle, resize: "vertical",
                    fontFamily: "ui-monospace,monospace",
                    fontSize: "0.84rem", lineHeight: 1.75,
                  }}
                  onFocus={focusIn} onBlur={focusOut}
                />
              </Field>
            </Section>

            {/* Goals */}
            <Section title="Goals & Background">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Field label="What do you hope to gain?">
                  <textarea rows={4} value={form.goals}
                    placeholder="Learning goals, career interests, research questions…"
                    onChange={e => set("goals", e.target.value)}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={focusIn} onBlur={focusOut}
                  />
                </Field>
                <Field label="Resume / CV" hint="Google Drive link, LinkedIn, or brief description.">
                  <input placeholder="Link or description" value={form.resume}
                    onChange={e => set("resume", e.target.value)}
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut}
                  />
                </Field>
              </div>
            </Section>

            {/* Agreement */}
            <div style={{
              background: "rgba(168,0,36,0.04)",
              border: "1px solid rgba(168,0,36,0.12)",
              borderRadius: 12, padding: "24px 32px",
            }}>
              <p style={{ fontSize: "0.8rem", color: "#5a5a6a", lineHeight: 1.8, marginBottom: "16px" }}>
                By submitting I confirm: (1) a TLI Fellow has recommended me; (2) I have reviewed visa
                eligibility requirements; (3) I understand participation requires an IP assignment
                agreement with the University of Minnesota Regents; (4) all information is accurate.
              </p>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                <input
                  type="checkbox" required checked={form.agree}
                  onChange={e => set("agree", e.target.checked)}
                  style={{ width: "15px", height: "15px", marginTop: "3px", flexShrink: 0, accentColor: "#c0003a" }}
                />
                <span style={{ fontSize: "0.85rem", color: "#a8a8b8", lineHeight: 1.55 }}>
                  I confirm the above and am ready to proceed.
                </span>
              </label>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "4px" }}>
              <button type="submit" className="btn-primary" style={{ padding: "13px 48px", fontSize: "15px" }}>
                Submit Application →
              </button>
            </div>
          </form>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: "72px", display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* Programs */}
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
                <p style={{ fontFamily: "ui-monospace,monospace", fontSize: "0.62rem", letterSpacing: "0.11em", textTransform: "uppercase", color: "#404050", margin: 0 }}>
                  Programs
                </p>
              </div>
              {programs.slice(0, 4).map((p, i) => (
                <div key={p.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 20px",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  background: "rgba(255,255,255,0.015)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{
                      fontFamily: "ui-monospace,monospace", fontSize: "0.58rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      background: "linear-gradient(135deg,#e05070,#c0003a)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                      {p.tag}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#c0c0cc" }}>{p.label.split(" (")[0]}</span>
                  </div>
                  <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "0.6rem", color: "#404050", flexShrink: 0, marginLeft: "8px" }}>
                    {p.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Stipend */}
            <div style={{
              background: "linear-gradient(160deg, #1a1416, #130e10)",
              border: "1px solid rgba(168,0,36,0.15)",
              borderRadius: 12, padding: "20px",
            }}>
              <p style={{ fontFamily: "ui-monospace,monospace", fontSize: "0.62rem", letterSpacing: "0.11em", textTransform: "uppercase", color: "#a80024", marginBottom: "10px" }}>
                Stipend
              </p>
              <div style={{
                fontSize: "2.1rem", fontWeight: 600, letterSpacing: "-0.04em",
                background: "linear-gradient(to bottom, #ffffff, #a0a0b0)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                marginBottom: "8px",
              }}>
                $1,500+
              </div>
              <p style={{ fontSize: "0.76rem", color: "#5a5a6a", lineHeight: 1.65, margin: 0 }}>
                Applied as a UMN scholarship during the first week of your appointment.
                Remaining credit refunded via direct deposit.
              </p>
            </div>

            {/* Process: You are here */}
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
                <p style={{ fontFamily: "ui-monospace,monospace", fontSize: "0.62rem", letterSpacing: "0.11em", textTransform: "uppercase", color: "#404050", margin: 0 }}>
                  Process
                </p>
              </div>
              {[
                "01 Fellow recommends you",
                "02 Submit this form",
                "03 BMDC reviews & matches",
                "04 Meet the team",
                "05 Sign agreement",
                "06 Start working",
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 20px",
                  borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.03)" : "none",
                  background: i === 1 ? "rgba(168,0,36,0.06)" : "rgba(255,255,255,0.01)",
                }}>
                  <span style={{
                    fontFamily: "ui-monospace,monospace", fontSize: "0.62rem",
                    color: i === 1 ? "#c0002e" : "#303040", flexShrink: 0,
                  }}>
                    {s.slice(0, 2)}
                  </span>
                  <span style={{ fontSize: "0.76rem", color: i === 1 ? "#c8c8d4" : "#404050", flex: 1 }}>
                    {s.slice(3)}
                  </span>
                  {i === 1 && (
                    <span style={{
                      fontSize: "0.58rem", fontFamily: "ui-monospace,monospace",
                      letterSpacing: "0.07em", textTransform: "uppercase", color: "#c0002e",
                    }}>
                      here
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Visa */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 20px" }}>
              <p style={{ fontFamily: "ui-monospace,monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#404050", marginBottom: "8px" }}>
                Visa Notice
              </p>
              <p style={{ fontSize: "0.74rem", color: "#5a5a6a", lineHeight: 1.65, margin: 0 }}>
                Pending <span style={{ color: "#b0b0c0" }}>H-1B applicants at UMN</span> cannot volunteer.
                J-1 scholars and F-1 students are permitted.{" "}
                <Link href="/resources#visa" style={{ color: "#c0002e", textDecoration: "underline", textUnderlineOffset: "3px" }}>
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
