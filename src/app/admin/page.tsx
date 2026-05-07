const applicants = [
  {
    name: "Supritha Uday",
    email: "uday0010@umn.edu",
    id: "—",
    program: "IFP",
    visa: "F-1",
    status: "Submitted to TLI",
    date: "2026-04-10",
    notes: "Stipend transfer pending",
  },
  {
    name: "Sayali Kawalkar",
    email: "kawal015@umn.edu",
    id: "—",
    program: "MedWorX",
    visa: "F-1",
    status: "Submitted to TLI",
    date: "2026-04-15",
    notes: "Sent interest pitch to Bakken. In queue.",
  },
  {
    name: "Abdul-Awwal Adesalu",
    email: "adesa017@umn.edu",
    id: "—",
    program: "Open",
    visa: "—",
    status: "Contacted",
    date: "2026-04-20",
    notes: "Alternate email: awwalwork@gmail.com",
  },
  {
    name: "Tejeshwini Ramesh Subasri",
    email: "rames189@umn.edu",
    id: "—",
    program: "Open",
    visa: "—",
    status: "In Review",
    date: "2026-04-28",
    notes: "",
  },
];

const statusColors: Record<string, string> = {
  "Submitted to TLI": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "In Review": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Contacted": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Pending": "bg-slate-700/30 text-slate-400 border-slate-700",
};

export default function Admin() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="label mb-2">Internal View</p>
          <h1 className="text-4xl font-bold text-white">Applicant Tracker</h1>
        </div>
        <div className="flex gap-3">
          <div className="card px-5 py-3 text-center">
            <div className="text-2xl font-bold text-white">{applicants.length}</div>
            <div className="label">Total</div>
          </div>
          <div className="card px-5 py-3 text-center">
            <div className="text-2xl font-bold text-emerald-400">{applicants.filter(a => a.status === "Submitted to TLI").length}</div>
            <div className="label">Submitted</div>
          </div>
          <div className="card px-5 py-3 text-center">
            <div className="text-2xl font-bold text-amber-400">{applicants.filter(a => a.status === "In Review").length}</div>
            <div className="label">In Review</div>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2d3d] bg-[#0d1117]">
                {["Student", "Email", "Program", "Visa", "Status", "Date", "Notes"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left label whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applicants.map((a, i) => (
                <tr
                  key={i}
                  className="border-b border-[#1e2d3d] hover:bg-[#0d1117]/60 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-white whitespace-nowrap">{a.name}</td>
                  <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{a.email}</td>
                  <td className="px-5 py-4">
                    <span className="label text-[#a8001f] border border-[#7a0019]/30 px-2 py-0.5 rounded">
                      {a.program}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{a.visa}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[a.status] || statusColors["Pending"]}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{a.date}</td>
                  <td className="px-5 py-4 text-slate-400 max-w-xs">{a.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 card p-6">
        <h3 className="text-white font-semibold mb-4">EFS Stipend Submission Checklist</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-400">
          <div className="bg-[#0d1117] rounded-lg p-4">
            <div className="label mb-2">Required from Student</div>
            <ul className="space-y-1">
              <li>— Student full name</li>
              <li>— UMN Student ID</li>
              <li>— Signed agreement form</li>
              <li>— Visa documentation (if intl.)</li>
            </ul>
          </div>
          <div className="bg-[#0d1117] rounded-lg p-4">
            <div className="label mb-2">Submit to TLI Finance</div>
            <ul className="space-y-1">
              <li>— EFS string</li>
              <li>— Student name + ID</li>
              <li>— Scholarship amount</li>
              <li>— Semester/appointment dates</li>
            </ul>
          </div>
          <div className="bg-[#0d1117] rounded-lg p-4">
            <div className="label mb-2">EFS String</div>
            <code className="text-[#ffcc33] font-mono text-xs block mt-2 leading-relaxed">
              1000-11074-20563-<br/>1000012972
            </code>
            <p className="text-xs text-slate-600 mt-2">(Gage Funds)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
