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
  { nama: "Sahabat Azam", jabatan: "Ketua Rayon", foto: "/yon azam.webp", portfolio: null },
  { nama: "—", jabatan: "Wakil Ketua", foto: null, portfolio: null },
  { nama: "—", jabatan: "Sekretaris Umum", foto: null, portfolio: null },
  { nama: "—", jabatan: "Bendahara Umum", foto: null, portfolio: null },
  { nama: "—", jabatan: "Koor Dept. Kaderisasi", foto: null, portfolio: null },
  { nama: "—", jabatan: "Koor Dept. Keagamaan", foto: null, portfolio: null },
  { nama: "—", jabatan: "Koor Dept. Sains & Teknologi", foto: null, portfolio: null },
  { nama: "—", jabatan: "Koor Dept. Komunikasi", foto: null, portfolio: null },
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
      <MobileHeader crumbs={[{ label: "Informasi", href: "/anggota" }, { label: "Anggota" }]} />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 pb-16 pt-6 md:pt-24">
        <section className="max-w-4xl mx-auto space-y-14">

          {/* ── PENGURUS HARIAN ── */}
          <div>
            <div className="flex justify-start mb-8">
              <div className="w-[260px] text-center py-1.5 rounded-r-lg text-white font-bold text-[17px] tracking-wide"
                style={{ background: "linear-gradient(to right, transparent, #0059bb, #fbbf24, transparent)" }}>
                Pengurus Harian
              </div>
            </div>

            {/* Grid 2 kolom */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pengurus.map((p, i) => (
                <FadeInUp key={i} delay={i * 50}>
                  <div className="flex flex-col rounded-2xl overflow-hidden bg-white/80 border border-[#d0e4ff] backdrop-blur-sm hover:shadow-md transition-all duration-200">
                    {/* Foto */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#eef5ff]">
                      {p.foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.foto}
                          alt={p.nama}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#001e40]/20 text-[48px]">person</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3 flex flex-col gap-2">
                      <div>
                        <p className="text-[14px] font-bold text-[#001e40] leading-tight text-center">{p.nama}</p>
                        <p className="text-[11px] text-[#4a5a6e] font-medium text-center mt-0.5">{p.jabatan}</p>
                      </div>

                      {/* Visit button */}
                      <a
                        href={p.portfolio ?? "#"}
                        className={`flex items-center justify-center gap-1.5 text-[11px] font-bold py-1.5 rounded-lg transition-all duration-200 ${
                          p.portfolio
                            ? "bg-[#0059bb] text-white hover:bg-[#003d8a]"
                            : "bg-[#001e40]/[0.06] text-[#001e40]/40 pointer-events-none"
                        }`}
                        {...(p.portfolio ? { target: "_blank", rel: "noopener noreferrer" } : { "aria-disabled": "true" })}
                      >
                        <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {p.portfolio ? "open_in_new" : "hourglass_empty"}
                        </span>
                        {p.portfolio ? "Visit" : "Soon"}
                      </a>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#001e40]/15 to-transparent" />

          {/* ── DEPARTEMEN ── */}
          <div>
            <div className="flex justify-end mb-8">
              <div className="w-[220px] text-center py-1.5 rounded-l-lg text-white font-bold text-[17px] tracking-wide"
                style={{ background: "linear-gradient(to left, transparent, #0059bb, #fbbf24, transparent)" }}>
                Departemen
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
