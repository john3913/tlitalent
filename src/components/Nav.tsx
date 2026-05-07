"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/opportunities", label: "Opportunities" },
  { href: "/process",       label: "Process"       },
  { href: "/resources",     label: "Resources"     },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="sticky top-0 z-50" style={{
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(17,17,20,0.88)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
    }}>
      <div style={{
        maxWidth: 1360, margin: "0 auto",
        padding: "0 4rem", height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Brand */}
        <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", textDecoration: "none" }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.01em" }}>
            TLI Talent
          </span>
          <em style={{
            fontSize: "13px", fontWeight: 400, fontStyle: "italic",
            color: "#606068", letterSpacing: "0",
          }}>
            Development Program
          </em>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontSize: "13px",
              color: path === l.href ? "#ffffff" : "#707078",
              textDecoration: "none",
              transition: "color 0.15s",
              letterSpacing: "0.01em",
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/apply" className="btn-primary" style={{ padding: "7px 18px", fontSize: "13px" }}>
            Apply
          </Link>
        </div>
      </div>
    </nav>
  );
}
