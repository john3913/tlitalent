"use client";
import { useState } from "react";

const programs = [
  "Innovation Fellows Program (IFP)",
  "MedWorX Contract Engineering",
  "Anatomy U",
  "Clinician Led Innovation Program (CLIP)",
  "UROP — Independent Research at BMDC",
  "Not sure — open to matching",
];

const visaTypes = [
  "U.S. Citizen or Permanent Resident",
  "F-1 Student Visa",
  "J-1 Research Scholar",
  "J-1 Professor",
  "J-1 Short-Term Scholar",
  "Other — I will verify with ISSS",
];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: "block", fontSize: "0.72rem", fontWeight: 600,
        letterSpacing: "0.08em", textTransform: "uppercase",
        color: "#5a5a60", marginBottom: "8px",
        fontFamily: "ui-monospace,monospace",
      }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: "0.76rem", color: "#86868b", marginTop: "6px" }}>{hint}</p>}
    </div>
  );
}

function FormSection({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="card" style={{ padding: "36px 40px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.01em" }}>
          {title}
        </h2>
        {sub && <p style={{ fontSize: "0.84rem", color: "#6e6e73", marginTop: "4px", lineHeight: 1.5 }}>{sub}</p>}
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
      <div className="light-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 1.5rem" }}>
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
            <a href="/process" className="btn-outline" style={{ fontSize: "13px" }}>View process guide</a>
            <a href="/" className="btn-outline" style={{ fontSize: "13px" }}>Back to home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="light-page">
      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "72px 32px 96px" }}>

        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <p className="label" style={{ marginBottom: "16px" }}>TLI &times; BMDC Interest Form</p>
          <h1 style={{
            fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 1.08,
            marginBottom: "18px",
            background: "linear-gradient(135deg, #1d1d1f 0%, #4a4a50 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Apply for a TLI BMDC<br />Internship
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#6e6e73", lineHeight: 1.7, maxWidth: "520px" }}>
            Complete this form to express interest in a BMDC research opportunity.
            Your TLI Fellow must have recommended you before submitting.
          </p>
        </div>

        <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Personal */}
          <FormSection title="Personal Information">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <Field label="Full Name *">
                <input required placeholder="First Last" value={form.name} onChange={e => set("name", e.target.value)} />
              </Field>
              <Field label="UMN Email *">
                <input required type="email" placeholder="x500@umn.edu" value={form.email} onChange={e => set("email", e.target.value)} />
              </Field>
              <Field label="Student ID *" hint="Required for stipend processing">
                <input required placeholder="1234567" value={form.studentId} onChange={e => set("studentId", e.target.value)} />
              </Field>
              <Field label="Graduate Program *">
                <input required placeholder="e.g. MDI, MOT, ST, BME…" value={form.major} onChange={e => set("major", e.target.value)} />
              </Field>
              <Field label="Program Year">
                <select value={form.year} onChange={e => set("year", e.target.value)}>
                  <option value="">Select year</option>
                  {["1st Year","2nd Year","3rd Year","4th Year+"].map(y => <option key={y}>{y}</option>)}
                </select>
              </Field>
              <Field label="Visa Status *">
                <select required value={form.visa} onChange={e => set("visa", e.target.value)}>
                  <option value="">Select status</option>
                  {visaTypes.map(v => <option key={v}>{v}</option>)}
                </select>
              </Field>
            </div>
          </FormSection>

          {/* Program */}
          <FormSection title="Program Interest">
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <Field label="Preferred BMDC Program *">
                <select required value={form.program} onChange={e => set("program", e.target.value)}>
                  <option value="">Select program</option>
                  {programs.map(p => <option key={p}>{p}</option>)}
                </select>
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <Field label="Weekly Availability">
                  <select value={form.availability} onChange={e => set("availability", e.target.value)}>
                    <option value="">Select days</option>
                    <option>Weekdays flexible</option>
                    <option>Mon / Wed / Fri preferred</option>
                    <option>Tue / Thu preferred</option>
                    <option>Afternoons only</option>
                  </select>
                </Field>
                <Field label="Hours per Week">
                  <select value={form.hours} onChange={e => set("hours", e.target.value)}>
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
                style={{ resize: "vertical", fontFamily: "ui-monospace,monospace", fontSize: "0.85rem", lineHeight: 1.7 }}
              />
            </Field>
          </FormSection>

          {/* Goals */}
          <FormSection title="Goals & Background">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Field label="What do you hope to gain from this experience?">
                <textarea rows={4} value={form.goals}
                  placeholder="Describe your learning goals, career interests, or research questions…"
                  onChange={e => set("goals", e.target.value)}
                  style={{ resize: "vertical" }}
                />
              </Field>
              <Field label="Resume / CV" hint="Share a link (Google Drive, LinkedIn, etc.) or briefly describe your background.">
                <input placeholder="Link or description" value={form.resume} onChange={e => set("resume", e.target.value)} />
              </Field>
            </div>
          </FormSection>

          {/* Agreement */}
          <div className="alt-block" style={{ padding: "32px 40px" }}>
            <p style={{ fontSize: "0.83rem", color: "#5a5a60", lineHeight: 1.75, marginBottom: "20px" }}>
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
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "8px" }}>
            <button type="submit" className="btn-primary" style={{ padding: "13px 40px", fontSize: "15px" }}>
              Submit Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
