export default function Resources() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="label mb-2">Forms &amp; Guidance</p>
      <h1 className="text-4xl font-bold text-white mb-4">Resources</h1>
      <p className="text-slate-400 max-w-2xl mb-14 leading-relaxed">
        Everything you need to complete your BMDC internship paperwork, understand your payment,
        and verify your visa eligibility.
      </p>

      {/* Forms */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">Required Forms</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              title: "Research Team Participation Agreement",
              form: "TLI-BMDC Form",
              desc: "Used when a student participates in a BMDC research team with a stipend. Outlines responsibilities, stipend terms, confidentiality, and IP assignment. Signed by student and PI.",
              when: "Stipend-track students on named research projects",
              fields: ["Student name", "PI name", "Project title", "Start date", "Hours/week", "Stipend amount"],
            },
            {
              title: "Volunteer Researcher Agreement & Release",
              form: "OGC-SC218",
              desc: "University of Minnesota Office of General Counsel form for volunteer researchers. Covers liability release, IP assignment to Regents, visa certification, and confidentiality. Signed by student and BMDC Director.",
              when: "Volunteer-track students; signed by Dr. Hubert Lim",
              fields: ["Student name", "Start & end date", "Hours/week", "Supervisor (Dr. Erdman)", "Services description"],
            },
          ].map((f) => (
            <div key={f.title} className="card p-6">
              <span className="label text-[#a8001f] border border-[#7a0019]/30 px-2 py-0.5 rounded mb-3 inline-block">
                {f.form}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{f.desc}</p>
              <div className="bg-[#0d1117] rounded-lg p-4 mb-4">
                <div className="label mb-2">When to use</div>
                <p className="text-sm text-slate-300">{f.when}</p>
              </div>
              <div>
                <div className="label mb-2">Required fields</div>
                <ul className="text-sm text-slate-400 list-disc list-inside space-y-0.5">
                  {f.fields.map((field) => <li key={field}>{field}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-4">
          Forms are provided by your TLI Fellow or BMDC project lead at the time of your agreement. Contact TLI if you need copies.
        </p>
      </section>

      {/* Payment */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">Stipend & Payment</h2>
        <div className="card p-8">
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-3">How It Gets to You</h3>
              <ol className="space-y-3 text-sm text-slate-400 list-decimal list-inside leading-relaxed">
                <li>TLI Finance submits your EFS string, name, and student ID as a scholarship</li>
                <li>Scholarship is applied to your UMN student financial account</li>
                <li>Outstanding balance is paid first</li>
                <li>Remaining credit is refunded via direct deposit (or check if no direct deposit on file)</li>
              </ol>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Important Notes</h3>
              <ul className="space-y-2 text-sm text-slate-400 leading-relaxed">
                <li className="flex gap-2"><span className="text-[#7a0019] mt-0.5">—</span>Funds do NOT go to your MyU card</li>
                <li className="flex gap-2"><span className="text-[#7a0019] mt-0.5">—</span>Bookstore charges (books, computers) can be billed to student account</li>
                <li className="flex gap-2"><span className="text-[#7a0019] mt-0.5">—</span>Set up direct deposit in MyU for fastest refund</li>
                <li className="flex gap-2"><span className="text-[#7a0019] mt-0.5">—</span>Payment processed first week of appointment</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-[#0d1117] rounded-lg p-4">
            <div className="label mb-1">EFS Fund String (Gage Funds)</div>
            <code className="text-sm text-[#ffcc33] font-mono">1000-11074-20563-1000012972</code>
          </div>
        </div>
      </section>

      {/* Visa guidance */}
      <section id="visa">
        <h2 className="text-2xl font-bold text-white mb-6">Visa Eligibility</h2>
        <div className="card border-[#7a0019]/20 p-8">
          <p className="text-slate-400 leading-relaxed mb-6">
            If you are not a U.S. citizen or permanent resident, you must provide documentation of
            your visa status at the time of signing your agreement. Review the eligibility rules below carefully.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-5">
              <div className="label text-emerald-500 mb-3">Eligible Visa Types</div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><span className="text-emerald-500">✓</span>J-1 (Professor, Research Scholar, Short-Term Scholar)</li>
                <li className="flex gap-2"><span className="text-emerald-500">✓</span>F-1 (student visa, standard enrollment)</li>
                <li className="flex gap-2"><span className="text-emerald-500">✓</span>Other visas permitting volunteer activity — verify with ISSS</li>
              </ul>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-5">
              <div className="label text-red-400 mb-3">Not Eligible</div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><span className="text-red-400">✗</span>Pending H-1B visa application at UMN — <strong>CANNOT volunteer</strong></li>
                <li className="flex gap-2"><span className="text-red-400">✗</span>Temporary visas in positions where others receive pay for the same services</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-[#0d1117] rounded-lg p-4 text-sm text-slate-400 leading-relaxed">
            <strong className="text-slate-300">ISSS Contact:</strong> For questions about whether your visa allows volunteer participation, contact the International Student and Scholar Services (ISSS) office at UMN before applying. Your TLI Fellow can help facilitate this conversation.
          </div>
        </div>
      </section>

      {/* IP notice */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-white mb-6">Intellectual Property</h2>
        <div className="card p-8">
          <p className="text-slate-400 leading-relaxed mb-4">
            All inventions, improvements, discoveries, software, and writings conceived during your
            BMDC volunteer activities belong solely and exclusively to the University of Minnesota Regents.
            This includes work done jointly or solely by you during the period of your appointment.
          </p>
          <p className="text-slate-400 leading-relaxed text-sm">
            <strong className="text-slate-300">Exception:</strong> This does not apply to inventions developed entirely on your own time without University equipment, supplies, facilities, or proprietary information — and that do not relate to the University&apos;s research activities.
          </p>
        </div>
      </section>
    </div>
  );
}
