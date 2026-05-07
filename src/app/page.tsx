import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";

const stats = [
  { value: "4", label: "Active Programs" },
  { value: "$1,500+", label: "Semester Stipend" },
  { value: "5–14 hrs", label: "Per Week" },
  { value: "MDI · ST · MOT", label: "Eligible Programs" },
];

const programs = [
  {
    id: "ifp",
    tag: "IFP",
    name: "Innovation Fellows Program",
    lead: "Danny Sachs",
    desc: "Embedded with BMDC innovation teams working on early-stage medical device concepts from clinician insights to prototypes.",
  },
  {
    id: "medworx",
    tag: "MedWorX",
    name: "MedWorX Contract Engineering",
    lead: "Eric Little",
    desc: "Build real models and prototypes alongside clinicians solving active clinical problems. Hands-on fabrication and CAD focus.",
  },
  {
    id: "anatomyu",
    tag: "Anatomy U",
    name: "Anatomy U",
    lead: "Ali Kahlert",
    desc: "Develop anatomical models integrated with medical devices to advance surgical training and device design education.",
  },
  {
    id: "clip",
    tag: "CLIP",
    name: "Clinician Led Innovation",
    lead: "BMDC Staff",
    desc: "Multi-semester projects not tied to school calendar. Work directly with clinician-investigators on long-arc challenges.",
  },
];

const steps = [
  ["01", "TLI Fellow recommends you"],
  ["02", "Submit interest form & resume"],
  ["03", "BMDC reviews & matches"],
  ["04", "Meet the project team"],
  ["05", "Sign your agreement"],
  ["06", "Start your project"],
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ──────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <HeroCanvas />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0e0e10] to-transparent pointer-events-none z-10" />

        <div className="relative z-20 max-w-6xl mx-auto px-8 py-28 w-full">
          <div className="max-w-[680px]">
            <p className="label mb-6 fade-up">TLI &times; BMDC &nbsp;&bull;&nbsp; University of Minnesota</p>

            <h1 className="text-[3.4rem] sm:text-[4.2rem] font-semibold text-white leading-[1.06] tracking-[-0.035em] mb-7 fade-up-2">
              Research internships<br />
              for international<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #e8004a 0%, #8a001e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                grad students.
              </span>
            </h1>

            <p className="text-[1.05rem] text-[#98989f] max-w-[520px] mb-10 leading-relaxed fade-up-3">
              The Technological Leadership Institute places UMN graduate students
              inside Bakken Medical Devices Center research teams — with stipends,
              mentorship, and real clinical problems to solve.
            </p>

            <div className="flex flex-wrap gap-3 fade-up-4">
              <Link href="/apply" className="btn-primary px-8 py-[11px] text-[15px]">
                Apply Now
              </Link>
              <Link href="/opportunities" className="btn-outline px-8 py-[11px] text-[15px]">
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────── */}
      <section className="border-y border-[#222224]" style={{ background: "linear-gradient(to bottom, #141416, #111113)" }}>
        <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#222224]">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-6">
              <div
                className="text-[1.7rem] font-semibold tracking-tight mb-0.5"
                style={{
                  background: "linear-gradient(to bottom, #ffffff 0%, #b0b0b8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Programs ──────────────────────── */}
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label mb-3">Available programs</p>
            <h2 className="text-[2rem] font-semibold text-white tracking-[-0.02em]">
              BMDC Research Teams
            </h2>
          </div>
          <Link href="/opportunities" className="btn-outline text-[13px] !py-1.5 !px-5">
            View all
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {programs.map((p) => (
            <Link key={p.id} href={`/opportunities#${p.id}`} className="card card-hover p-7 block">
              <div className="flex items-center justify-between mb-4">
                <span className="tag-maroon">{p.tag}</span>
                <span className="text-[0.78rem] text-[#6e6e73]">{p.lead}</span>
              </div>
              <h3 className="text-[0.97rem] font-medium text-white mb-2 tracking-[-0.01em]">
                {p.name}
              </h3>
              <p className="text-[0.855rem] text-[#98989f] leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Process ───────────────────────── */}
      <section
        className="border-t border-[#222224]"
        style={{ background: "linear-gradient(to bottom, #141416, #111113)" }}
      >
        <div className="max-w-6xl mx-auto px-8 py-24">
          <p className="label mb-3">How it works</p>
          <h2 className="text-[2rem] font-semibold text-white tracking-[-0.02em] mb-12">
            Six steps from interest to first day.
          </h2>

          <div className="grid sm:grid-cols-3 gap-3">
            {steps.map(([n, step]) => (
              <div key={n} className="card p-6">
                <div
                  className="text-[1.1rem] font-semibold font-mono mb-3"
                  style={{
                    background: "linear-gradient(135deg, #c8003a 0%, #800018 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {n}
                </div>
                <p className="text-[0.875rem] text-[#d8d8dc] leading-snug">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/process" className="btn-outline text-[13px]">
              Full process guide
            </Link>
          </div>
        </div>
      </section>

      {/* ── Visa notice ───────────────────── */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div
          className="rounded-2xl p-9"
          style={{
            background: "linear-gradient(160deg, #181618 0%, #130e10 100%)",
            border: "1px solid rgba(192,0,58,0.18)",
          }}
        >
          <p className="label mb-3" style={{ color: "#c0003a" }}>Important</p>
          <h3 className="text-[1.15rem] font-medium text-white mb-3 tracking-[-0.01em]">
            International Student Visa Notice
          </h3>
          <p className="text-[0.875rem] text-[#98989f] leading-relaxed max-w-2xl mb-5">
            Students on certain temporary visas may only volunteer in positions where others do not
            receive compensation for the same services.{" "}
            <span className="text-[#e0e0e4]">
              Students with a pending H-1B application at UMN cannot serve as volunteers.
            </span>{" "}
            J-1 professors, research scholars, and short-term scholars are permitted.
          </p>
          <Link
            href="/resources#visa"
            className="text-[0.875rem] underline underline-offset-4 transition-colors"
            style={{ color: "#d0003a" }}
          >
            Full visa eligibility guide →
          </Link>
        </div>
      </section>
    </div>
  );
}
