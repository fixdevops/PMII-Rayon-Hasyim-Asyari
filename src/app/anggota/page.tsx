import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/FadeInUp";
import AspirasiButton from "@/components/AspirasiButton";

export const metadata: Metadata = {
  title: "Anggota | PMII Rayon Hasyim Asy'ari",
  description: "Daftar pengurus dan anggota PMII Rayon Hasyim Asy'ari FST UNUGIRI Bojonegoro.",
};

const pengurus = [
  { nama: "Sahabat Azam", jabatan: "Ketua Rayon", foto: "/yon azam.webp" },
  { nama: "—", jabatan: "Wakil Ketua", foto: null },
  { nama: "—", jabatan: "Sekretaris Umum", foto: null },
  { nama: "—", jabatan: "Bendahara Umum", foto: null },
];

const departemen = [
  { nama: "Dept. Kaderisasi", icon: "school", desc: "Bertanggung jawab atas proses kaderisasi formal dan non-formal anggota PMII Rayon." },
  { nama: "Dept. Keagamaan", icon: "mosque", desc: "Mengelola kajian rutin, kegiatan keagamaan, dan pengembangan nilai-nilai Islam Aswaja." },
  { nama: "Dept. Sains & Teknologi", icon: "terminal", desc: "Wadah riset, pelatihan teknologi, dan inovasi bagi kader berlatar Sains dan Teknologi." },
  { nama: "Dept. Sosial & Lingkungan", icon: "public", desc: "Menggerakkan aksi sosial, kepedulian lingkungan, dan hubungan kemasyarakatan." },
  { nama: "Dept. Komunikasi & Informasi", icon: "campaign", desc: "Mengelola media sosial, publikasi kegiatan, dan informasi organisasi." },
  { nama: "Dept. Kewirausahaan", icon: "storefront", desc: "Mengembangkan jiwa wirausaha kader melalui pelatihan dan program ekonomi kreatif." },
];

export default function AnggotaPage() {
  return (
    <div className="text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ddeeff 0%, #eef5ff 30%, #ffffff 60%)" }}>
      <Navbar />
      <MobileNav />
      <MobileHeader />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 pb-16 pt-6 md:pt-24">

        <section className="max-w-4xl mx-auto space-y-14">

          {/* Pengurus Harian */}
          <div>
            <div className="flex justify-start">
              <div className="w-[260px] text-center py-1.5 rounded-r-lg text-white font-bold text-[17px] tracking-wide"
                style={{ background: "linear-gradient(to right, transparent, #0059bb, #fbbf24, transparent)" }}>
                Pengurus Harian
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {pengurus.map((p, i) => (
                <FadeInUp key={i} delay={i * 60}>
                  <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/70 border border-[#d0e4ff] backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-[#001e40]/10 bg-[#d0e4ff] flex items-center justify-center">
                      {p.foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.foto} alt={p.nama} className="w-full h-full object-cover object-top" />
                      ) : (
                        <span className="material-symbols-outlined text-[#001e40]/30 text-[28px]">person</span>
                      )}
                    </div>
                    <p className="text-[14px] font-bold text-[#001e40] leading-tight mb-0.5">{p.nama}</p>
                    <p className="text-[11px] text-[#4a5a6e] font-medium">{p.jabatan}</p>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#001e40]/15 to-transparent" />

          {/* Departemen */}
          <div>
            <div className="flex justify-end">
              <div className="w-[220px] text-center py-1.5 rounded-l-lg text-white font-bold text-[17px] tracking-wide"
                style={{ background: "linear-gradient(to left, transparent, #0059bb, #fbbf24, transparent)" }}>
                Departemen
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departemen.map((d, i) => (
                <FadeInUp key={i} delay={i * 60}>
                  <div className="flex gap-4 items-start p-5 rounded-2xl bg-white/70 border border-[#d0e4ff] backdrop-blur-sm hover:shadow-sm transition-all duration-200">
                    <div className="w-10 h-10 rounded-xl bg-[#001e40] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{d.icon}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#001e40] mb-1">{d.nama}</p>
                      <p className="text-[12px] text-[#4a5a6e] leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>

        </section>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
