"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/opportunities", label: "Opportunities" },
  { href: "/process",       label: "How It Works"  },
  { href: "/resources",     label: "Resources"     },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="sticky top-0 z-50 border-b border-[#222226] bg-[#0e0e10]/85 backdrop-blur-2xl backdrop-saturate-150">
      <div className="max-w-[1360px] mx-auto px-8 lg:px-16 h-13 flex items-center justify-between" style={{ height: "52px" }}>
        <Link href="/" className="text-[15px] font-medium text-white tracking-tight">
          TLI Talent
        </Link>
        <div className="flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[13px] transition-colors duration-150 ${
                path === l.href ? "text-white" : "text-[#a1a1a6] hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/apply" className="btn-primary !py-[7px] !px-[18px] text-[13px]">
            Apply
          </Link>
        </div>
      </div>
    </nav>
  );
}
