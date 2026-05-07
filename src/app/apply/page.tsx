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

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", studentId: "", program: "",
    major: "", year: "", visa: "", resume: "",
    availability: "", hours: "",
    fiveThings: "",
    goals: "",
    agree: false,
  });

  const update = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-emerald-400 text-2xl">✓</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Application Submitted</h1>
        <p className="text-slate-400 leading-relaxed mb-8">
          Your interest form has been received. A TLI Fellow or BMDC staff member will follow up
          with next steps. In the meantime, review the{" "}
          <a href="/process" className="text-[#ff6677] underline underline-offset-4">program process</a>{" "}
          and{" "}
          <a href="/resources" className="text-[#ff6677] underline underline-offset-4">visa &amp; payment resources</a>.
        </p>
        <a href="/" className="btn-outline">Back to Home</a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="label mb-2">TLI &times; BMDC Interest Form</p>
      <h1 className="text-4xl font-bold text-white mb-3">Apply for an Internship</h1>
      <p className="text-slate-400 mb-10 leading-relaxed">
        Complete this form to express interest in a BMDC research opportunity through TLI.
        Your TLI Fellow must have recommended you before submission. Fields marked with * are required.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className="flex flex-col gap-8"
      >
        {/* Personal Info */}
        <section className="card p-8">
          <h2 className="text-lg font-bold text-white mb-6">Personal Information</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="label mb-2 block">Full Name *</label>
              <input required placeholder="First Last" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div>
              <label className="label mb-2 block">UMN Email *</label>
              <input required type="email" placeholder="x500@umn.edu" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div>
              <label className="label mb-2 block">Student ID *</label>
              <input required placeholder="1234567" value={form.studentId} onChange={(e) => update("studentId", e.target.value)} />
            </div>
            <div>
              <label className="label mb-2 block">Graduate Program *</label>
              <input required placeholder="e.g. MDI, MOT, ST, BME..." value={form.major} onChange={(e) => update("major", e.target.value)} />
            </div>
            <div>
              <label className="label mb-2 block">Program Year</label>
              <select value={form.year} onChange={(e) => update("year", e.target.value)}>
                <option value="">Select year</option>
                <option>1st Year</option><option>2nd Year</option>
                <option>3rd Year</option><option>4th Year+</option>
              </select>
            </div>
            <div>
              <label className="label mb-2 block">Visa Status *</label>
              <select required value={form.visa} onChange={(e) => update("visa", e.target.value)}>
                <option value="">Select status</option>
                {visaTypes.map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Program Preference */}
        <section className="card p-8">
          <h2 className="text-lg font-bold text-white mb-6">Program Interest</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="label mb-2 block">Preferred BMDC Program *</label>
              <select required value={form.program} onChange={(e) => update("program", e.target.value)}>
                <option value="">Select program</option>
                {programs.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label mb-2 block">Weekly Availability</label>
                <select value={form.availability} onChange={(e) => update("availability", e.target.value)}>
                  <option value="">Select days</option>
                  <option>Weekdays flexible</option>
                  <option>Mon/Wed/Fri preferred</option>
                  <option>Tue/Thu preferred</option>
                  <option>Afternoons only</option>
                </select>
              </div>
              <div>
                <label className="label mb-2 block">Hours Available per Week</label>
                <select value={form.hours} onChange={(e) => update("hours", e.target.value)}>
                  <option value="">Select range</option>
                  <option>5–8 hours</option>
                  <option>8–12 hours</option>
                  <option>12–14 hours</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* The Five Things */}
        <section className="card p-8">
          <h2 className="text-lg font-bold text-white mb-2">Your &ldquo;5 Things&rdquo; Pitch *</h2>
          <p className="text-sm text-slate-500 mb-5 leading-relaxed">
            BMDC staff use this to evaluate fit for their project teams. Be specific: skills,
            experiences, perspectives, tools you&apos;ve mastered, problems you&apos;ve solved.
          </p>
          <label className="label mb-2 block">What five things will you bring to the BMDC?</label>
          <textarea
            required
            rows={8}
            placeholder={"1. \n2. \n3. \n4. \n5. "}
            value={form.fiveThings}
            onChange={(e) => update("fiveThings", e.target.value)}
            className="resize-y"
          />
        </section>

        {/* Goals */}
        <section className="card p-8">
          <h2 className="text-lg font-bold text-white mb-5">Goals &amp; Background</h2>
          <div className="flex flex-col gap-5">
            <div>
              <label className="label mb-2 block">What do you hope to gain from this experience?</label>
              <textarea
                rows={4}
                placeholder="Describe your learning goals, career interests, or research questions..."
                value={form.goals}
                onChange={(e) => update("goals", e.target.value)}
                className="resize-y"
              />
            </div>
            <div>
              <label className="label mb-2 block">Resume / CV Link or Description</label>
              <input
                placeholder="Link to your resume (Google Drive, LinkedIn, etc.) or describe your background"
                value={form.resume}
                onChange={(e) => update("resume", e.target.value)}
              />
              <p className="text-xs text-slate-600 mt-2">
                A TLI Fellow or BMDC staff member may request your full resume separately.
              </p>
            </div>
          </div>
        </section>

        {/* Agreement */}
        <section className="card p-8 border-[#7a0019]/20">
          <h2 className="text-lg font-bold text-white mb-4">Acknowledgment</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-5">
            By submitting this form I confirm that: (1) a TLI Fellow has recommended me for this
            program; (2) I have reviewed the visa eligibility requirements; (3) I understand that
            participation requires signing an IP assignment agreement with the University of Minnesota;
            and (4) the information provided is accurate.
          </p>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={form.agree}
              onChange={(e) => update("agree", e.target.checked)}
              className="w-4 h-4 mt-0.5 flex-shrink-0 accent-[#7a0019]"
            />
            <span className="text-sm text-slate-300">
              I confirm the above and am ready to proceed with the BMDC application process.
            </span>
          </label>
        </section>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary text-base px-10 py-3">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
