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
    desc: "Multi-semester projects not tied to school calendar. Work directly with clinician-investigators on long-arc innovation challenges.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <HeroCanvas />

        {/* Bottom fade to body bg */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0e0e10] to-transparent pointer-events-none z-10" />

        <div className="relative z-20 max-w-6xl mx-auto px-8 py-28 w-full">
          <div className="max-w-2xl">
            <p className="label mb-6 fade-up">TLI &times; BMDC &nbsp;&bull;&nbsp; University of Minnesota</p>
            <h1 className="text-[3.25rem] sm:text-[4rem] font-semibold text-white leading-[1.08] tracking-[-0.03em] mb-7 fade-up-2">
              Research internships<br />
              for international<br />
              <span style={{ color: "#c0003a" }}>grad students.</span>
            </h1>
            <p className="text-[1.05rem] text-[#a1a1a6] max-w-xl mb-10 leading-relaxed fade-up-3" style={{ fontWeight: 400 }}>
              The Technological Leadership Institute places UMN graduate students
              inside Bakken Medical Devices Center research teams — with stipends,
              mentorship, and real clinical problems to solve.
            </p>
            <div className="flex flex-wrap gap-3 fade-up-4">
              <Link href="/apply" className="btn-primary px-7 py-2.5 text-[15px]">
                Apply Now
              </Link>
              <Link href="/opportunities" className="btn-outline px-7 py-2.5 text-[15px]">
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#222226] bg-[#141416]">
        <div className="max-w-6xl mx-auto px-8 py-7 grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#222226]">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-6 first:pl-0 last:pr-0">
              <div className="text-[1.6rem] font-semibold text-white tracking-tight mb-0.5">{s.value}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label mb-3">Available programs</p>
            <h2 className="text-[2rem] font-semibold text-white tracking-tight">BMDC Research Teams</h2>
          </div>
          <Link href="/opportunities" className="btn-outline text-[13px] !py-1.5 !px-4">
            View all
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {programs.map((p) => (
            <Link key={p.id} href={`/opportunities#${p.id}`} className="card card-hover p-7 block group">
              <div className="flex items-center justify-between mb-4">
                <span className="label" style={{ color: "#c0003a" }}>{p.tag}</span>
                <span className="text-xs text-[#6e6e73]">{p.lead}</span>
              </div>
              <h3 className="text-[1rem] font-medium text-white mb-2 tracking-tight">{p.name}</h3>
              <p className="text-[0.875rem] text-[#a1a1a6] leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Process teaser */}
      <section className="border-t border-[#222226] bg-[#141416]">
        <div className="max-w-6xl mx-auto px-8 py-24">
          <p className="label mb-3">How it works</p>
          <h2 className="text-[2rem] font-semibold text-white tracking-tight mb-12">Six steps from interest to first day.</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              ["01", "TLI Fellow recommends you"],
              ["02", "Submit interest form & resume"],
              ["03", "BMDC reviews & matches"],
              ["04", "Meet the project team"],
              ["05", "Sign your agreement"],
              ["06", "Start your project"],
            ].map(([n, step]) => (
              <div key={n} className="card p-6">
                <div className="text-[0.75rem] font-mono text-[#6e6e73] mb-3">{n}</div>
                <p className="text-[0.9rem] text-[#f5f5f7] leading-snug">{step}</p>
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

      {/* Visa notice */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="rounded-2xl border border-[#2a2a2e] bg-[#141416] p-8 sm:p-10">
          <p className="label mb-3" style={{ color: "#c0003a" }}>Important</p>
          <h3 className="text-[1.2rem] font-medium text-white mb-3 tracking-tight">International Student Visa Notice</h3>
          <p className="text-[0.9rem] text-[#a1a1a6] leading-relaxed max-w-2xl mb-4">
            Students on certain temporary visas may only volunteer in positions where others do not receive compensation for the same services.
            {" "}<span className="text-[#f5f5f7]">Students with a pending H-1B application at UMN cannot serve as volunteers.</span>
            {" "}J-1 professors, research scholars, and short-term scholars are permitted.
          </p>
          <Link href="/resources#visa" className="text-[0.875rem] text-[#c0003a] hover:text-[#e0003a] underline underline-offset-4 transition-colors">
            Full visa eligibility guide →
          </Link>
        </div>
      </section>
    </div>
  );
}
