"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/opportunities", label: "Opportunities" },
  { href: "/process", label: "How It Works" },
  { href: "/resources", label: "Resources" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="sticky top-0 z-50 border-b border-[#222226] bg-[#0e0e10]/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="max-w-6xl mx-auto px-8 h-12 flex items-center justify-between">
        <Link href="/" className="text-[15px] font-medium text-white tracking-tight">
          TLI Talent
        </Link>
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[13px] transition-colors ${
                path === l.href ? "text-white" : "text-[#a1a1a6] hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/apply" className="btn-primary !py-1.5 !px-4 text-[13px]">
            Apply
          </Link>
        </div>
      </div>
    </nav>
  );
}
