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

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-[0.78rem] font-medium text-[#3d3d3f] mb-1.5 tracking-wide uppercase" style={{ letterSpacing: "0.06em" }}>
        {label}
      </label>
      {children}
      {hint && <p className="text-[0.78rem] text-[#86868b] mt-1.5">{hint}</p>}
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="card p-8 sm:p-10">
      <div className="mb-7">
        <h2 className="text-[1.1rem] font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-[0.85rem] mt-1" style={{ color: "#6e6e73" }}>{subtitle}</p>}
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

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div className="light-page flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-md">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-7"
            style={{ background: "linear-gradient(135deg, rgba(144,0,32,0.12), rgba(80,0,18,0.06))", border: "1px solid rgba(144,0,32,0.2)" }}
          >
            <span style={{ color: "#900020", fontSize: "1.4rem" }}>✓</span>
          </div>
          <h1 className="text-[1.8rem] font-semibold tracking-tight mb-3">Application Submitted</h1>
          <p className="text-[0.9rem] leading-relaxed mb-8" style={{ color: "#6e6e73" }}>
            Your interest form has been received. A TLI Fellow or BMDC staff member will follow up with next steps.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="/process" className="btn-outline text-[13px]">View process guide</a>
            <a href="/" className="btn-outline text-[13px]">Back to home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="light-page">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="label mb-3">TLI &times; BMDC Interest Form</p>
          <h1
            className="text-[2.8rem] font-semibold tracking-[-0.03em] mb-4 leading-[1.1]"
            style={{
              background: "linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Apply for a<br />BMDC Internship
          </h1>
          <p className="text-[0.9rem] leading-relaxed max-w-lg" style={{ color: "#6e6e73" }}>
            Complete this form to express interest in a BMDC research opportunity.
            Your TLI Fellow must have recommended you before submitting.
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-5">

          {/* Personal */}
          <Section title="Personal Information">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name *">
                <input required placeholder="First Last" value={form.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <Field label="UMN Email *">
                <input required type="email" placeholder="x500@umn.edu" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </Field>
              <Field label="Student ID *" hint="Required for stipend processing">
                <input required placeholder="1234567" value={form.studentId} onChange={(e) => set("studentId", e.target.value)} />
              </Field>
              <Field label="Graduate Program *">
                <input required placeholder="e.g. MDI, MOT, ST, BME…" value={form.major} onChange={(e) => set("major", e.target.value)} />
              </Field>
              <Field label="Program Year">
                <select value={form.year} onChange={(e) => set("year", e.target.value)}>
                  <option value="">Select year</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year+</option>
                </select>
              </Field>
              <Field label="Visa Status *">
                <select required value={form.visa} onChange={(e) => set("visa", e.target.value)}>
                  <option value="">Select status</option>
                  {visaTypes.map((v) => <option key={v}>{v}</option>)}
                </select>
              </Field>
            </div>
          </Section>

          {/* Program preference */}
          <Section title="Program Interest">
            <div className="flex flex-col gap-5">
              <Field label="Preferred BMDC Program *">
                <select required value={form.program} onChange={(e) => set("program", e.target.value)}>
                  <option value="">Select program</option>
                  {programs.map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Weekly Availability">
                  <select value={form.availability} onChange={(e) => set("availability", e.target.value)}>
                    <option value="">Select days</option>
                    <option>Weekdays flexible</option>
                    <option>Mon / Wed / Fri preferred</option>
                    <option>Tue / Thu preferred</option>
                    <option>Afternoons only</option>
                  </select>
                </Field>
                <Field label="Hours Available per Week">
                  <select value={form.hours} onChange={(e) => set("hours", e.target.value)}>
                    <option value="">Select range</option>
                    <option>5–8 hours</option>
                    <option>8–12 hours</option>
                    <option>12–14 hours</option>
                  </select>
                </Field>
              </div>
            </div>
          </Section>

          {/* Five Things */}
          <Section
            title="Your Five Things Pitch"
            subtitle="BMDC staff use this to evaluate fit for their teams. Be specific: skills, tools, experiences, research you've done."
          >
            <Field label="What five things will you bring to the BMDC? *">
              <textarea
                required
                rows={9}
                placeholder={"1. \n2. \n3. \n4. \n5. "}
                value={form.fiveThings}
                onChange={(e) => set("fiveThings", e.target.value)}
                className="resize-y"
                style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.85rem" }}
              />
            </Field>
          </Section>

          {/* Goals */}
          <Section title="Goals & Background">
            <div className="flex flex-col gap-5">
              <Field label="What do you hope to gain from this experience?">
                <textarea
                  rows={4}
                  placeholder="Describe your learning goals, career interests, or research questions…"
                  value={form.goals}
                  onChange={(e) => set("goals", e.target.value)}
                  className="resize-y"
                />
              </Field>
              <Field
                label="Resume / CV"
                hint="Share a link (Google Drive, LinkedIn, etc.) or describe your background briefly."
              >
                <input
                  placeholder="Link to resume or brief description"
                  value={form.resume}
                  onChange={(e) => set("resume", e.target.value)}
                />
              </Field>
            </div>
          </Section>

          {/* Agreement */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "linear-gradient(160deg, #f7f7f9 0%, #f0f0f2 100%)", border: "1px solid #e0e0e4" }}
          >
            <p className="text-[0.82rem] leading-relaxed mb-5" style={{ color: "#5a5a5c" }}>
              By submitting I confirm: (1) a TLI Fellow has recommended me; (2) I have reviewed visa eligibility
              requirements; (3) I understand participation requires an IP assignment agreement with the
              University of Minnesota Regents; (4) all information provided is accurate.
            </p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={form.agree}
                onChange={(e) => set("agree", e.target.checked)}
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ accentColor: "#900020" }}
              />
              <span className="text-[0.875rem]" style={{ color: "#3d3d3f" }}>
                I confirm the above and am ready to proceed with the BMDC application process.
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button type="submit" className="btn-primary px-10 py-3 text-[15px]">
              Submit Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
