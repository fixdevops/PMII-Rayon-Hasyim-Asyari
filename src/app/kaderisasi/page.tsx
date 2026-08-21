import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/FadeInUp";
import AspirasiButton from "@/components/AspirasiButton";

export const metadata: Metadata = {
  title: "Belajar & Kaderisasi | PMII Rayon Hasyim Asy'ari",
  description: "Sistem kaderisasi formal dan ekosistem pembelajaran terintegrasi PMII Rayon Hasyim Asyari FST.",
};

const timelineSteps = [
  { step: "Tahap 01", title: "MAPABA", subtitle: "Masa Penerimaan Anggota Baru", desc: "Fase orientasi awal untuk menanamkan nilai-nilai dasar pergerakan, pengenalan kampus, dan doktrin Ahlussunnah wal Jama'ah.", duration: "3 Hari" },
  { step: "Tahap 02", title: "PKD", subtitle: "Pelatihan Kader Dasar", desc: "Pembentukan kader militan yang memiliki kesadaran kritis, analisis sosial, dan pemahaman ideologi yang komprehensif.", duration: "5 Hari" },
  { step: "Tahap 03", title: "PKL", subtitle: "Pelatihan Kader Lanjut", desc: "Kristalisasi kader penggerak yang difokuskan pada manajemen strategi, kepemimpinan, dan spesialisasi keilmuan Fakultas.", duration: "7 Hari" },
];

const islamList = [
  { icon: "menu_book", label: "Kajian Tafsir & Hadits" },
  { icon: "history_edu", label: "Bedah Buku Ideologi" },
  { icon: "psychology", label: "Diskusi Filsafat Islam" },
  { icon: "diversity_2", label: "Halaqah Mingguan" },
];

const sainsList = [
  { icon: "terminal", label: "Pemrograman & Data" },
  { icon: "design_services", label: "Desain UI/UX" },
  { icon: "science", label: "Riset & Inovasi" },
  { icon: "hub", label: "Proyek Kolaborasi" },
];

export default function KaderisasiPage() {
  return (
    <div className="text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ddeeff 0%, #eef5ff 30%, #ffffff 60%)" }}>
      <Navbar />
      <MobileNav />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 pb-16 pt-24">

        <PageHeader crumbs={[{ label: "Belajar" }, { label: "Kaderisasi" }]} />

        <section className="max-w-4xl mx-auto space-y-16">

          {/* Alur Kaderisasi */}
          <div>
            <div className="flex justify-start mb-8">
              <div className="w-[260px] text-center py-1.5 rounded-r-lg text-white font-bold text-[17px] tracking-wide"
                style={{ background: "linear-gradient(to right, transparent, #0059bb, #fbbf24, transparent)" }}>
                Alur Kaderisasi Formal
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {timelineSteps.map((step, i) => (
                <FadeInUp key={step.title} delay={i * 100}>
                  <div className="group relative p-7 rounded-2xl bg-white/80 border border-[#d0e4ff] hover:shadow-md transition-all duration-200 h-full backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[12px] font-semibold text-[#001e40]/60 uppercase tracking-wider">{step.step}</span>
                      <span className="text-[12px] font-medium text-[#0f0f0f]/35 bg-black/[0.04] px-2.5 py-1 rounded-full">{step.duration}</span>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#001e40] mb-5 group-hover:scale-110 transition-transform" />
                    <h3 className="text-[22px] font-semibold tracking-tight mb-1">{step.title}</h3>
                    <p className="text-[13px] font-medium text-[#0f0f0f]/40 mb-3">{step.subtitle}</p>
                    <p className="text-[14px] text-[#0f0f0f]/55 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#001e40]/15 to-transparent" />

          {/* Pembelajaran */}
          <div>
            <div className="flex justify-end mb-8">
              <div className="w-[280px] text-center py-1.5 rounded-l-lg text-white font-bold text-[17px] tracking-wide"
                style={{ background: "linear-gradient(to left, transparent, #0059bb, #fbbf24, transparent)" }}>
                Ekosistem Pembelajaran
              </div>
            </div>
            <FadeInUp>
              <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-[#d0e4ff] shadow-sm">
                <div className="p-8 bg-white/80 border-b md:border-b-0 md:border-r border-[#d0e4ff]">
                  <div className="w-10 h-10 rounded-xl bg-[#eef5ff] flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-[#001e40] text-[20px]">menu_book</span>
                  </div>
                  <h3 className="text-[20px] font-bold tracking-tight mb-2">Ke-Islaman &amp; Ke-PMII-an</h3>
                  <p className="text-[14px] text-[#0f0f0f]/55 font-medium mb-6 leading-relaxed">Kajian rutin yang mendalami teks-teks klasik, sejarah pergerakan, dan implementasi NDP dalam konteks kekinian.</p>
                  <ul className="space-y-3">
                    {islamList.map((item) => (
                      <li key={item.label} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#eef5ff] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[#001e40] text-[15px]">{item.icon}</span>
                        </div>
                        <span className="text-[14px] font-medium text-[#0f0f0f]/70">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 bg-[#001e40]">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-white text-[20px]">terminal</span>
                  </div>
                  <h3 className="text-[20px] font-bold tracking-tight mb-2 text-white">Sains &amp; Teknologi</h3>
                  <p className="text-[14px] text-white/55 font-medium mb-6 leading-relaxed">Wadah pengembangan skill teknis dan riset akademik yang relevan dengan disiplin ilmu FST.</p>
                  <ul className="space-y-3">
                    {sainsList.map((item) => (
                      <li key={item.label} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-white text-[15px]">{item.icon}</span>
                        </div>
                        <span className="text-[14px] font-medium text-white/70">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInUp>
          </div>

        </section>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
