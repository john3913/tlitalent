export default function Process() {
  const steps = [
    {
      n: "01",
      title: "TLI Fellow Recommendation",
      who: "Your TLI Fellow",
      desc: "Your TLI Fellow identifies you as a strong candidate for the BMDC program and initiates contact. The program currently prioritizes MDI students and is expanding to ST and MOT programs.",
      detail: "Talk to your TLI Fellow about your research interests, technical skills, and availability. They'll submit your name to the BMDC matching pipeline.",
    },
    {
      n: "02",
      title: "Submit Your Interest Form & Materials",
      who: "You (the student)",
      desc: "Complete the TLI Talent interest form, upload your resume, and write a short response to the prompt: \"What five things will you bring to the BMDC?\"",
      detail: "Be specific about skills, experiences, and goals. BMDC project leads use your \"5 things\" pitch to decide whether you're a fit for their team.",
    },
    {
      n: "03",
      title: "BMDC Candidate Review & Matching",
      who: "BMDC Staff",
      desc: "BMDC staff review candidate submissions and match students to open project teams based on skills, interests, and project needs. Bakken handles the matching; TLI supports the process.",
      detail: "You may be contacted for a brief conversation with BMDC staff or project leads before a match is confirmed.",
    },
    {
      n: "04",
      title: "Meet the Project Team",
      who: "You + BMDC Project Lead",
      desc: "If there's a strong match, you'll meet with BMDC staff and the specific project lead to discuss expectations, logistics, start date, and training.",
      detail: "Your TLI Fellow can be looped in at any point to help sort out issues or questions about the process.",
    },
    {
      n: "05",
      title: "Sign Your Agreement",
      who: "You (the student)",
      desc: "Depending on your project type, you'll sign either the Research Team Participation Agreement (with stipend) or the Volunteer Researcher Agreement and Release (volunteer track).",
      detail: "Both agreements include IP assignment to the University of Minnesota. International students must provide visa documentation at signing.",
    },
    {
      n: "06",
      title: "Confirm Stipend & Start Working",
      who: "You + TLI Finance",
      desc: "You agree to the scholarship amount for the project. TLI Finance processes the stipend as a scholarship applied to your UMN student financial account during the first week of your appointment.",
      detail: "Funds go to your student account (not MyU card). Remaining credits are refunded via direct deposit or check. EFS string: 1000-11074-20563-1000012972 (Gage Funds).",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-8 lg:px-16 py-16">
      <p className="label mb-2">Student Checklist</p>
      <h1 className="text-4xl font-bold text-white mb-4">How the Program Works</h1>
      <p className="text-slate-400 max-w-2xl mb-16 leading-relaxed">
        From first contact with your TLI Fellow to your first day in the BMDC lab,
        here&apos;s exactly what to expect at each stage of the process.
      </p>

      <div className="flex flex-col gap-4">
        {steps.map((step, i) => (
          <div key={step.n} className="relative flex gap-6">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-[-16px] w-px bg-gradient-to-b from-[#7a0019] to-transparent" />
            )}
            {/* Number bubble */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7a0019]/20 border border-[#7a0019]/40 flex items-center justify-center mt-1">
              <span className="text-xs font-bold text-[#a8001f] font-mono">{step.n}</span>
            </div>
            {/* Content */}
            <div className="card p-6 flex-1 mb-4">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                <h2 className="text-lg font-bold text-white">{step.title}</h2>
                <span className="label text-slate-500">{step.who}</span>
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">{step.desc}</p>
              <div className="bg-[#0d1117] rounded-lg p-4 border-l-2 border-[#7a0019]">
                <p className="text-sm text-slate-400 leading-relaxed">{step.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grad student work hours */}
      <div className="mt-12 card p-8 border-[#7a0019]/20">
        <h3 className="text-white font-bold text-lg mb-4">Grad Student Work Hour Limits</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <div className="label mb-2">Stipend Track (Scholarship)</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Processed as a scholarship to your UMN student account. No hourly cap — but BMDC expects ~5–14 hrs/week depending on project.
            </p>
          </div>
          <div>
            <div className="label mb-2">Hourly Pay Track (if applicable)</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Hourly payment from BMDC is approved only if the student works <strong className="text-slate-300">fewer than 14 hours per week</strong>. This is the standard grad student work limitation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
