import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/FadeInUp";

export const metadata: Metadata = {
  title: "Kaderisasi & Pembelajaran - PMII Rayon Hasyim Asyari",
  description:
    "Sistem kaderisasi formal dan ekosistem pembelajaran terintegrasi PMII Rayon Hasyim Asyari FST.",
};

const timelineSteps = [
  {
    step: "Tahap 01",
    title: "MAPABA",
    subtitle: "Masa Penerimaan Anggota Baru",
    desc: "Fase orientasi awal untuk menanamkan nilai-nilai dasar pergerakan, pengenalan kampus, dan doktrin Ahlussunnah wal Jama'ah.",
    duration: "3 Hari",
  },
  {
    step: "Tahap 02",
    title: "PKD",
    subtitle: "Pelatihan Kader Dasar",
    desc: "Pembentukan kader militan yang memiliki kesadaran kritis, analisis sosial, dan pemahaman ideologi yang komprehensif.",
    duration: "5 Hari",
  },
  {
    step: "Tahap 03",
    title: "PKL",
    subtitle: "Pelatihan Kader Lanjut",
    desc: "Kristalisasi kader penggerak yang difokuskan pada manajemen strategi, kepemimpinan, dan spesialisasi keilmuan Fakultas.",
    duration: "7 Hari",
  },
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

const articles = [
  {
    category: "Seri Epistemologi",
    title: "Epistemologi Integrasi Keilmuan di Era Digital",
    desc: "Menelusuri titik temu antara metodologi sains modern dengan kerangka berpikir filosofis Islam dalam pengembangan teknologi.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvLpvrAMhDPzSfCpG0jJ_8MKrJ5fbIkC7fADAj_rhZ_5vsPXnRDPdAoWqsb48qr5uBJfy4inAP_KIr4WuMm07rBpu_HHyWdDBaWALIPstQIruVdVs2GcaOeoFgcQFaejy4_ZmaaZNLZi1MuyfRFpjKIcbz-lMFV3ivuWiopaLWE2BBLTu1-CtOfJDQDOSFnszPyOKOUYz-Ryl9VE09KjocIYhraU1tcXJ8iJXlYw8U3xszrsIT64L7",
  },
  {
    category: "Diskusi Etika",
    title: "Etika Kecerdasan Buatan dalam Perspektif Maqashid Syariah",
    desc: "Bagaimana hukum Islam merespon perkembangan AI? Diskursus perlindungan data, kemanusiaan, dan tantangan moral abad ke-21.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxGvTNBpxdRKNSUCaMGQznpQVmzqhGTv5Li-wTpqVwffPKhOfOnXH0sJjTb1e8hFT3WlwspPiHgH6IDp9ENuw_rkmObdOwDHuYl4MOXTF-kMR1Qv5hiQlP26ZCupxfwZJoLRVq3a86GZr6ywp5ireVV5U_OunUNikovSAMxljJubwQMJaA3HsfiD4UwFK6DFUS5h5xd9CooswNo3o8Oc45BRJKzi4wT_SE-Ui9_OvhDPHxZ2yBKMZ_",
  },
];

export default function KaderisasiPage() {
  return (
    <div className="bg-white text-[#0f0f0f] overflow-x-hidden">
      <Navbar />
      <MobileNav />

      <main>
        {/* ── PAGE HEADER ── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orb w-[500px] h-[300px] bg-blue-100/50 pointer-events-none" />

          <div className="relative z-10 w-full px-[var(--page-padding)]">
            <div className="mx-auto max-w-[var(--container-width)] text-center">
              <FadeInUp>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#001e40]/[0.06] border border-[#001e40]/[0.1] text-[#001e40] text-[13px] font-medium mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#001e40]" />
                  Sistem Kaderisasi
                </div>
              </FadeInUp>
              <FadeInUp delay={80}>
                <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-balance mb-5">
                  Kaderisasi &amp;
                  <br />
                  <span className="text-[#0f0f0f]/35">Pembelajaran Terintegrasi.</span>
                </h1>
              </FadeInUp>
              <FadeInUp delay={140}>
                <p className="text-[16px] text-[#0f0f0f]/55 font-medium leading-relaxed max-w-xl mx-auto">
                  Membangun intelektual organik yang memadukan nilai ke-Islaman,
                  ideologi ke-PMII-an, serta penguasaan Sains dan Teknologi.
                </p>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* ── KADERISASI TIMELINE ── */}
        <section id="kaderisasi" className="py-20 bg-[#f9fafb]">
          <div className="w-full px-[var(--page-padding)]">
            <div className="mx-auto max-w-[var(--container-width)]">
              <FadeInUp className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-14">
                <div>
                  <p className="text-[13px] font-semibold text-[#0f0f0f]/40 uppercase tracking-wider mb-3">
                    Alur Formal
                  </p>
                  <h2 className="text-[clamp(1.6rem,3.5vw,2.25rem)] font-semibold tracking-tight">
                    Alur Kaderisasi Formal.
                  </h2>
                </div>
                <button className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0f0f0f]/50 hover:text-[#0f0f0f] border border-black/[0.1] px-4 py-2 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-[18px]">edit_document</span>
                  Info Pendaftaran
                </button>
              </FadeInUp>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {timelineSteps.map((step, i) => (
                  <FadeInUp key={step.title} delay={i * 100}>
                    <div className="group relative p-7 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.12] hover:shadow-sm transition-all duration-200 h-full">
                      {/* Step indicator */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[12px] font-semibold text-[#001e40]/60 uppercase tracking-wider">
                          {step.step}
                        </span>
                        <span className="text-[12px] font-medium text-[#0f0f0f]/35 bg-black/[0.04] px-2.5 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>

                      {/* Dot connector */}
                      <div className="w-3 h-3 rounded-full bg-[#001e40] mb-5 group-hover:scale-110 transition-transform" />

                      <h3 className="text-[22px] font-semibold tracking-tight mb-1">{step.title}</h3>
                      <p className="text-[13px] font-medium text-[#0f0f0f]/40 mb-3">{step.subtitle}</p>
                      <p className="text-[14px] text-[#0f0f0f]/55 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PEMBELAJARAN SPLIT ── */}
        <section id="pembelajaran" className="py-20 bg-white">
          <div className="w-full px-[var(--page-padding)]">
            <div className="mx-auto max-w-[var(--container-width)]">
              <FadeInUp className="text-center mb-14">
                <p className="text-[13px] font-semibold text-[#0f0f0f]/40 uppercase tracking-wider mb-3">
                  Dua Pilar Utama
                </p>
                <h2 className="text-[clamp(1.6rem,3.5vw,2.25rem)] font-semibold tracking-tight text-balance max-w-lg mx-auto">
                  Ekosistem Pembelajaran Terintegrasi.
                </h2>
              </FadeInUp>

              <FadeInUp>
                <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm">
                  {/* Ke-Islaman */}
                  <div className="p-10 bg-white border-b md:border-b-0 md:border-r border-black/[0.06]">
                    <div className="w-10 h-10 rounded-xl bg-[#f0f3ff] flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-[#001e40] text-[20px]">menu_book</span>
                    </div>
                    <h3 className="text-[22px] font-semibold tracking-tight mb-2">
                      Ke-Islaman &amp; Ke-PMII-an
                    </h3>
                    <p className="text-[14px] text-[#0f0f0f]/55 font-medium mb-8 leading-relaxed">
                      Kajian rutin yang mendalami teks-teks klasik, sejarah pergerakan,
                      dan implementasi Nilai Dasar Pergerakan dalam konteks kekinian.
                    </p>
                    <ul className="space-y-3">
                      {islamList.map((item) => (
                        <li key={item.label} className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#f0f3ff] flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[#001e40] text-[15px]">{item.icon}</span>
                          </div>
                          <span className="text-[14px] font-medium text-[#0f0f0f]/70">{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sains & Teknologi */}
                  <div className="p-10 bg-[#001e40]">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-white text-[20px]">terminal</span>
                    </div>
                    <h3 className="text-[22px] font-semibold tracking-tight mb-2 text-white">
                      Sains &amp; Teknologi
                    </h3>
                    <p className="text-[14px] text-white/55 font-medium mb-8 leading-relaxed">
                      Wadah pengembangan skill teknis dan riset akademik yang relevan
                      dengan disiplin ilmu Fakultas Sains dan Teknologi.
                    </p>
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
          </div>
        </section>

        {/* ── ARTIKEL / DISKUSI ── */}
        <section className="py-20 bg-[#f9fafb]">
          <div className="w-full px-[var(--page-padding)]">
            <div className="mx-auto max-w-[var(--container-width)]">
              <FadeInUp className="flex items-baseline justify-between mb-12">
                <div>
                  <p className="text-[13px] font-semibold text-[#0f0f0f]/40 uppercase tracking-wider mb-3">
                    Diskursus Keilmuan
                  </p>
                  <h2 className="text-[clamp(1.6rem,3.5vw,2.25rem)] font-semibold tracking-tight">
                    Fokus: Islam &amp; Sains.
                  </h2>
                </div>
                <Link
                  href="#"
                  className="text-[14px] font-medium text-[#0f0f0f]/50 hover:text-[#0f0f0f] transition-colors flex items-center gap-1"
                >
                  Lihat semua
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </FadeInUp>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((a, i) => (
                  <FadeInUp key={a.title} delay={i * 100}>
                    <div className="group cursor-pointer bg-white rounded-2xl border border-black/[0.06] overflow-hidden hover:border-black/[0.12] hover:shadow-sm transition-all duration-200">
                      <div className="aspect-[16/9] overflow-hidden bg-[#f0f3ff]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={a.img}
                          alt={a.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-[12px] font-semibold text-[#001e40] uppercase tracking-wider">
                          {a.category}
                        </span>
                        <h4 className="text-[18px] font-semibold tracking-tight mt-2 mb-2 group-hover:text-[#001e40] transition-colors leading-snug">
                          {a.title}
                        </h4>
                        <p className="text-[14px] text-[#0f0f0f]/55 font-medium leading-relaxed line-clamp-2">
                          {a.desc}
                        </p>
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
