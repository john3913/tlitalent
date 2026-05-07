import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";

const stats = [
  { value: "4", label: "Active Programs" },
  { value: "$1,500+", label: "Semester Stipend" },
  { value: "5–14", label: "Hours / Week" },
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
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a12] via-[#080e1c] to-[#050a12]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(122,0,25,0.12),transparent)]" />
        <HeroCanvas />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <p className="label mb-5 text-[#7a0019]">TLI &times; BMDC Partnership &bull; University of Minnesota</p>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight mb-6 animate-fade-up">
              Research Internships<br />
              <span className="text-[#a8001f]">for International</span><br />
              Grad Students
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed animate-fade-up-2">
              The Technological Leadership Institute connects UMN graduate students
              with paid research opportunities at the Bakken Medical Devices Center —
              building prototypes, working with clinicians, and gaining real-world
              medical innovation experience.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up-3">
              <Link href="/apply" className="btn-primary text-base px-8 py-3">
                Apply Now
              </Link>
              <Link href="/opportunities" className="btn-outline text-base px-8 py-3">
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[#1e2d3d] bg-[#0d1117]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs preview */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label mb-2">Available programs</p>
            <h2 className="text-3xl font-bold text-white">BMDC Research Teams</h2>
          </div>
          <Link href="/opportunities" className="btn-outline text-sm">
            View all
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {programs.map((p) => (
            <Link key={p.id} href={`/opportunities#${p.id}`} className="card card-hover p-6 block">
              <div className="flex items-start justify-between mb-3">
                <span className="label text-[#a8001f] border border-[#7a0019]/40 px-2 py-0.5 rounded">
                  {p.tag}
                </span>
                <span className="text-xs text-slate-500">{p.lead}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{p.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Process teaser */}
      <section className="border-t border-[#1e2d3d] bg-[#0d1117]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="label mb-2">How it works</p>
          <h2 className="text-3xl font-bold text-white mb-10">5 Steps to Your BMDC Internship</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              "TLI Fellow recommends you",
              "Submit interest form & resume",
              "BMDC reviews & matches you",
              "Sign your agreement",
              "Start your project",
            ].map((step, i) => (
              <div key={i} className="flex-1 card p-5">
                <div className="text-[#7a0019] font-bold text-2xl mb-2 font-mono">{String(i + 1).padStart(2, "0")}</div>
                <p className="text-sm text-slate-300 leading-snug">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/process" className="btn-outline">
              Full Process Details
            </Link>
          </div>
        </div>
      </section>

      {/* Visa notice */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="card border-[#7a0019]/30 bg-[#7a0019]/5 p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-10 h-10 rounded-lg bg-[#7a0019]/20 border border-[#7a0019]/30 flex items-center justify-center flex-shrink-0">
            <span className="text-[#ff4455] text-lg">!</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">International Student Visa Notice</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              Students on certain temporary visas may volunteer only in positions where others do not receive compensation for the same services.
              <strong className="text-slate-300"> Students with a pending H-1B visa application to work at UMN CANNOT serve as volunteers.</strong> J-1 professors, research scholars, and short-term scholars are permitted.
            </p>
            <Link href="/resources#visa" className="text-sm text-[#ff6677] hover:text-[#ff8888] underline underline-offset-4">
              Full visa eligibility guide →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
