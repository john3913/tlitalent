export default function Opportunities() {
  const projects = [
    {
      id: "ifp",
      tag: "IFP",
      name: "Innovation Fellows Program",
      lead: "Danny Sachs",
      type: "Research & Innovation",
      hours: "5–10 hrs/week",
      schedule: "Semester-based",
      stipend: "Yes — TLI Scholarship",
      skills: ["Design Thinking", "Prototyping", "Market Research", "Clinical Needs"],
      desc: "Work embedded in BMDC innovation teams pursuing early-stage medical device concepts. You'll move from clinician-identified unmet needs through ideation, research, and early prototype development. Ideal for MDI students with interest in the full innovation arc.",
      open: true,
    },
    {
      id: "medworx",
      tag: "MedWorX",
      name: "MedWorX Contract Engineering",
      lead: "Eric Little (transitioning from BMDC staff)",
      type: "Engineering & Fabrication",
      hours: "Up to 14 hrs/week",
      schedule: "Semester-based",
      stipend: "Yes — TLI Scholarship",
      skills: ["CAD/CAM", "3D Printing", "Machining", "Clinical Collaboration"],
      desc: "A contract engineering function where BMDC student staff work on real clinical problems alongside clinicians, typically building physical models and functional prototypes. Hands-on fabrication focus with direct clinical feedback loops.",
      open: true,
    },
    {
      id: "anatomyu",
      tag: "Anatomy U",
      name: "Anatomy U",
      lead: "Ali Kahlert",
      type: "Education & Device Design",
      hours: "5–8 hrs/week",
      schedule: "Semester-based",
      stipend: "Yes — TLI Scholarship",
      skills: ["Anatomical Modeling", "Device Integration", "CAD", "Medical Education"],
      desc: "Development of anatomical models integrated with medical devices to teach anatomy and device design. Combines fabrication skill with pedagogical goals. Excellent for students interested in medical education and simulation-based training tools.",
      open: true,
    },
    {
      id: "clip",
      tag: "CLIP",
      name: "Clinician Led Innovation Program",
      lead: "BMDC Staff",
      type: "Long-Arc Clinical Research",
      hours: "Variable",
      schedule: "Not tied to school calendar (multi-semester)",
      stipend: "Yes — TLI Scholarship",
      skills: ["Research Methods", "Clinical Engagement", "Iterative Development"],
      desc: "Long-duration projects driven by practicing clinicians investigating real clinical problems. These are not tied to the academic calendar and may span multiple semesters. Best suited for students with strong clinical domain interest and commitment to a defined project arc.",
      open: false,
    },
    {
      id: "urop",
      tag: "UROP",
      name: "Undergraduate Research Opportunities Program",
      lead: "Student-proposed",
      type: "Independent Research",
      hours: "Variable",
      schedule: "Flexible",
      stipend: "UROP Grant (separate application)",
      skills: ["Independent Research", "Grant Writing", "BMDC Lab Access"],
      desc: "If you have your own research project that aligns with BMDC capabilities, you may apply for a UROP grant declaring the BMDC as your research site. This is a good path for students with a defined research agenda of their own that benefits from BMDC resources and expertise.",
      open: true,
    },
  ];

  return (
    <div className="max-w-[1360px] mx-auto px-8 lg:px-16 py-16">
      <p className="label mb-2">BMDC Research Programs</p>
      <h1 className="text-4xl font-bold text-white mb-4">Available Opportunities</h1>
      <p className="text-slate-400 max-w-2xl mb-12 leading-relaxed">
        All programs are facilitated through the TLI–BMDC partnership. Stipends are paid
        as scholarships to your UMN student financial account. Work hours must remain below
        14 hours/week for stipend-eligible positions.
      </p>

      <div className="flex flex-col gap-6">
        {projects.map((p) => (
          <div key={p.id} id={p.id} className="card card-hover p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="label text-[#a8001f] border border-[#7a0019]/40 px-2.5 py-1 rounded">
                  {p.tag}
                </span>
                <h2 className="text-xl font-bold text-white">{p.name}</h2>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                p.open
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-700/30 text-slate-500 border border-slate-700"
              }`}>
                {p.open ? "Accepting Students" : "Waitlist Only"}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed mb-6">{p.desc}</p>

            <div className="grid sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Type", value: p.type },
                { label: "Hours", value: p.hours },
                { label: "Schedule", value: p.schedule },
                { label: "Stipend", value: p.stipend },
              ].map((m) => (
                <div key={m.label} className="bg-[#0d1117] rounded-lg p-3">
                  <div className="label mb-1">{m.label}</div>
                  <div className="text-sm text-white font-medium">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {p.skills.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded bg-[#1e2d3d] text-slate-300 border border-[#1e2d3d]">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-500">Lead: {p.lead}</span>
              {p.open && (
                <a href="/apply" className="btn-primary text-sm !py-2 !px-5">
                  Apply for {p.tag}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
