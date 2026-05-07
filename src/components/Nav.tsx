"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/opportunities", label: "Opportunities" },
  { href: "/process", label: "How It Works" },
  { href: "/resources", label: "Resources" },
  { href: "/apply", label: "Apply" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="sticky top-0 z-50 border-b border-[#1e2d3d] bg-[#050a12]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded bg-[#7a0019] flex items-center justify-center group-hover:bg-[#a8001f] transition-colors">
            <span className="text-white text-xs font-bold tracking-tight">M</span>
          </div>
          <span className="font-semibold text-white text-sm tracking-tight">TLI Talent</span>
          <span className="hidden sm:block text-xs text-slate-500 label pt-0.5">University of Minnesota</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                path === l.href
                  ? "bg-[#7a0019]/20 text-[#ff4455]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              } ${l.label === "Apply" ? "ml-2 btn-primary !py-1.5 !px-4 text-white" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
