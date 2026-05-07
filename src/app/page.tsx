import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import ProgramMap from "@/components/ProgramMap";

const programs = [
  { id: "ifp",     tag: "IFP",       name: "Innovation Fellows Program",   lead: "Danny Sachs",
    desc: "Embedded with BMDC teams from clinician-identified unmet need all the way through early prototype development." },
  { id: "medworx", tag: "MedWorX",   name: "MedWorX Contract Engineering", lead: "Eric Little",
    desc: "Build real models and prototypes alongside clinicians solving active clinical problems. Heavy fabrication and CAD focus." },
  { id: "anatomyu",tag: "Anatomy U", name: "Anatomy U",                    lead: "Ali Kahlert",
    desc: "Develop anatomical models integrated with medical devices to advance surgical training and device design education." },
  { id: "clip",    tag: "CLIP",      name: "Clinician Led Innovation",      lead: "BMDC Staff",
    desc: "Long-arc projects not tied to the school calendar. Work directly with clinician-investigators across multiple semesters." },
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

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden flex items-center" style={{ minHeight: "92vh" }}>
        <HeroCanvas />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, #0e0e10 0%, transparent 100%)" }}/>

        <div className="relative z-20 w-full max-w-[1360px] mx-auto px-8 lg:px-16 py-32">
          <div className="max-w-[780px]">
            <p className="label mb-7 fade-up">TLI &times; BMDC &nbsp;&bull;&nbsp; University of Minnesota</p>

            <h1 className="fade-up-2"
              style={{
                fontSize: "clamp(3rem, 5.5vw, 5.2rem)",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.038em",
                color: "#f5f5f7",
                marginBottom: "1.75rem",
              }}
            >
              Research internships<br />
              for international<br />
              <span style={{
                background: "linear-gradient(130deg, #f03060 0%, #8a001e 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                grad students.
              </span>
            </h1>

            <p className="fade-up-3"
              style={{
                fontSize: "1.125rem", color: "#98989f", lineHeight: 1.7,
                maxWidth: "560px", marginBottom: "2.5rem", fontWeight: 400,
              }}
            >
              The Technological Leadership Institute places UMN graduate students
              inside Bakken Medical Devices Center research teams — with stipends,
              mentorship, and real clinical problems to solve.
            </p>

            <div className="flex flex-wrap gap-4 fade-up-4">
              <Link href="/apply" className="btn-primary px-9 py-3 text-[15px]">
                Apply Now
              </Link>
              <Link href="/opportunities" className="btn-outline px-9 py-3 text-[15px]">
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROGRAM INFOGRAPHIC
      ════════════════════════════════════════ */}
      <ProgramMap />

      {/* ════════════════════════════════════════
          PROGRAM CARDS
      ════════════════════════════════════════ */}
      <section className="max-w-[1360px] mx-auto px-8 lg:px-16 py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label mb-3">Available programs</p>
            <h2 style={{
              fontSize: "2.2rem", fontWeight: 600,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #f5f5f7 0%, #888890 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              BMDC Research Teams
            </h2>
          </div>
          <Link href="/opportunities" className="btn-outline text-[13px] !py-[7px] !px-5">
            View all →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {programs.map((p) => (
            <Link key={p.id} href={`/opportunities#${p.id}`} className="card card-hover p-7 block">
              <div className="flex items-center justify-between mb-5">
                <span className="tag-maroon">{p.tag}</span>
                <span className="text-[0.75rem] text-[#6e6e73]">{p.lead}</span>
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 500, color: "#f0f0f2", letterSpacing: "-0.01em", marginBottom: "0.6rem" }}>
                {p.name}
              </h3>
              <p style={{ fontSize: "0.845rem", color: "#98989f", lineHeight: 1.65 }}>{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROCESS
      ════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(to bottom, #111115, #0d0d0f)" }}
        className="border-t border-[#222226]">
        <div className="max-w-[1360px] mx-auto px-8 lg:px-16 py-28">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="label mb-3">How it works</p>
              <h2 style={{
                fontSize: "2.2rem", fontWeight: 600, letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #f5f5f7 0%, #888890 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Six steps from interest<br/>to first day.
              </h2>
            </div>
            <Link href="/process" className="btn-outline text-[13px] !py-[7px] !px-5">
              Full guide →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map(([n, step]) => (
              <div key={n} className="card p-7">
                <div className="mb-4" style={{
                  fontSize: "1.05rem", fontWeight: 700,
                  fontFamily: "ui-monospace, monospace",
                  background: "linear-gradient(135deg, #d03050 0%, #7a0018 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  {n}
                </div>
                <p style={{ fontSize: "0.9rem", color: "#d8d8dc", lineHeight: 1.55 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          VISA NOTICE
      ════════════════════════════════════════ */}
      <section className="max-w-[1360px] mx-auto px-8 lg:px-16 py-24">
        <div className="rounded-2xl p-10 sm:p-14" style={{
          background: "linear-gradient(160deg, #191518 0%, #120e11 100%)",
          border: "1px solid rgba(192,0,58,0.16)",
          boxShadow: "0 0 80px rgba(144,0,32,0.06)",
        }}>
          <div className="max-w-3xl">
            <p className="label mb-3" style={{ color: "#c0003a" }}>Important</p>
            <h3 style={{
              fontSize: "1.4rem", fontWeight: 600, color: "#f0f0f2",
              letterSpacing: "-0.02em", marginBottom: "1rem",
            }}>
              International Student Visa Notice
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#98989f", lineHeight: 1.75, marginBottom: "1.5rem" }}>
              Students on certain temporary visas may only volunteer in positions where others do not receive
              compensation for the same services.{" "}
              <span style={{ color: "#e0e0e4", fontWeight: 500 }}>
                Students with a pending H-1B application at UMN cannot serve as volunteers.
              </span>{" "}
              J-1 professors, research scholars, and short-term scholars are permitted.
            </p>
            <Link href="/resources#visa"
              style={{ fontSize: "0.875rem", color: "#d0003a", textDecoration: "underline", textUnderlineOffset: "4px" }}
              className="hover:opacity-75 transition-opacity">
              Full visa eligibility guide →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
