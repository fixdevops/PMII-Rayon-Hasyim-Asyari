import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import AspirasiButton from "@/components/AspirasiButton";

export const metadata: Metadata = {
  title: "Roadmap Proker | PMII Rayon Hasyim Asy'ari",
  description: "Roadmap program kerja PMII Rayon Hasyim Asy'ari FST UNUGIRI Bojonegoro.",
};

export default function RoadmapPage() {
  return (
    <div className="text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ddeeff 0%, #eef5ff 30%, #ffffff 60%)" }}>
      <Navbar />
      <MobileNav />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 pb-16 pt-24">

        <PageHeader crumbs={[{ label: "Informasi" }, { label: "Roadmap Proker" }]} />

        {/* Segera Hadir */}
        <div className="max-w-2xl mx-auto text-center py-20">

          {/* Label bar */}
          <div className="flex justify-start mb-10">
            <div className="w-[260px] text-center py-1.5 rounded-r-lg text-white font-bold text-[17px] tracking-wide"
              style={{ background: "linear-gradient(to right, transparent, #0059bb, #fbbf24, transparent)" }}>
              Roadmap Proker
            </div>
          </div>

          {/* Icon */}
          <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg"
            style={{ background: "#0059bb" }}>
            <span className="material-symbols-outlined text-white text-[44px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              route
            </span>
          </div>

          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[13px] font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            🚧 Segera Hadir
          </span>

          <h1 className="text-[clamp(1.8rem,5vw,2.5rem)] font-black text-[#001e40] tracking-tight mb-4">
            Roadmap Program Kerja
          </h1>

          <p className="text-[15px] text-[#4a5a6e] leading-relaxed max-w-md mx-auto mb-10">
            Kami sedang menyusun roadmap program kerja PMII Rayon Hasyim Asy&apos;ari periode 2024–2025.
            Halaman ini akan segera hadir dengan informasi lengkap.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#001e40]/15 to-transparent mb-10" />

          <p className="text-[13px] text-[#4a5a6e] mb-5">Ingin tahu lebih lanjut? Hubungi kami:</p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white text-[14px] font-bold px-7 py-3 rounded-full transition-colors hover:opacity-90"
            style={{ background: "#0059bb" }}
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
            Hubungi via WhatsApp
          </a>
        </div>

      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
