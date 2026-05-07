import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TLI Talent — UMN Internship Program",
  description: "Connect international grad students with research internships at the Bakken Medical Devices Center through the Technological Leadership Institute.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#1e1e22] py-10 mt-20">
          <div className="max-w-[1360px] mx-auto px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[13px] text-[#5a5a60]">TLI Talent &mdash; University of Minnesota</span>
            <p className="label">TLI &times; BMDC Partnership &bull; 2026</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
