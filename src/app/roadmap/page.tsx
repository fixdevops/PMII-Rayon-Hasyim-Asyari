import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import AspirasiButton from "@/components/AspirasiButton";

export const metadata: Metadata = {
  title: "Roadmap Proker | PMII Rayon Hasyim Asy'ari",
  description: "Roadmap program kerja PMII Rayon Hasyim Asy'ari FST UNUGIRI Bojonegoro.",
};

export default function RoadmapPage() {
  return (
    <div className="bg-white text-[#1a1a1a] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Informasi", href: "/roadmap" }, { label: "Roadmap Proker" }]} />

      <main className="flex-grow w-full px-6 pb-16 pt-6 md:pt-24">
        <div className="max-w-[680px] mx-auto">

          <div className="border-b border-[#e5e5e5] pb-8 mb-10">
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-3">Roadmap Program Kerja</h1>
            <p className="text-[#6b6b6b] text-[17px]">Rencana strategis program kerja PMII Rayon Hasyim Asy&apos;ari FST UNUGIRI Bojonegoro.</p>
          </div>

          <div className="py-16 flex flex-col items-center text-center">
            {/* Icon SVG */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-8 text-[#e5e5e5]">
              <circle cx="32" cy="32" r="31" stroke="#e5e5e5" strokeWidth="2"/>
              <path d="M20 32h24M32 20v24" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="32" cy="32" r="4" fill="#1a1a1a"/>
            </svg>

            {/* Badge */}
            <span className="inline-flex items-center gap-2 border border-[#e5e5e5] text-[#6b6b6b] text-[12px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
              Segera Hadir
            </span>

            <p className="text-[17px] text-[#292929] leading-[1.8] max-w-[480px] mb-10">
              Kami sedang menyusun roadmap program kerja PMII Rayon Hasyim Asy&apos;ari periode 2026&ndash;2027.
              Halaman ini akan segera hadir dengan informasi lengkap.
            </p>

            <div className="h-px w-24 bg-[#e5e5e5] mb-10" />

            <p className="text-[14px] text-[#6b6b6b] mb-2">Ingin tahu lebih lanjut?</p>
            <p className="text-[14px] text-[#1a1a1a] font-semibold">
              Gunakan tombol <strong>Aspirasi</strong> di pojok kiri bawah untuk menghubungi kami.
            </p>
          </div>

        </div>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
