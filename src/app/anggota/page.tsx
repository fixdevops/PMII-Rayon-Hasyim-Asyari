import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/FadeInUp";
import AspirasiButton from "@/components/AspirasiButton";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Anggota | PMII Rayon Hasyim Asy'ari",
  description: "Daftar pengurus dan anggota PMII Rayon Hasyim Asy'ari FST UNUGIRI Bojonegoro.",
};

async function getAnggota() {
  const { data } = await supabase
    .from("anggota")
    .select("*")
    .order("created_at", { ascending: true });
  return data ?? [];
}

// Fallback jika database kosong
const fallbackAnggota = [
  { id: "1", nama: "—", jabatan: "Ketua Rayon", departemen: "BPH Pengurus Rayon", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "2", nama: "—", jabatan: "Wakil Ketua", departemen: "BPH Pengurus Rayon", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "3", nama: "—", jabatan: "Sekretaris Umum", departemen: "BPH Pengurus Rayon", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "4", nama: "—", jabatan: "Bendahara Umum", departemen: "BPH Pengurus Rayon", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "5", nama: "—", jabatan: "Koordinator", departemen: "Biro Jaringan", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "6", nama: "—", jabatan: "Koordinator", departemen: "Biro Kaderisasi", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "7", nama: "—", jabatan: "Koordinator", departemen: "Biro Keagamaan", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "8", nama: "—", jabatan: "Koordinator", departemen: "Biro Keperempuanan", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "9", nama: "—", jabatan: "Koordinator", departemen: "Biro Kreativitas dan Media Sosial", foto_url: null, portfolio_url: null, angkatan: null },
];

export default async function AnggotaPage() {
  const dbAnggota = await getAnggota();
  const anggotaList = dbAnggota.length > 0 ? dbAnggota : fallbackAnggota;

  return (
    <div
      className="text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ddeeff 0%, #eef5ff 30%, #ffffff 60%)" }}
    >
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Informasi", href: "/anggota" }, { label: "Anggota" }]} />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 pb-16 pt-6 md:pt-24">

        {/* Label */}
        <div className="flex justify-start mb-8">
          <div
            className="w-[260px] text-center py-1.5 rounded-r-lg text-white font-bold text-[17px] tracking-wide"
            style={{ background: "linear-gradient(to right, transparent, #0059bb, #fbbf24, transparent)" }}
          >
            Pengurus & Anggota
          </div>
        </div>

        <p className="text-[14px] text-[#3a4a5e] mb-10 max-w-xl">
          Daftar lengkap pengurus dan anggota PMII Rayon Hasyim Asy&apos;ari FST UNUGIRI periode 2026.
        </p>

        {/* Grid anggota */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-5">
          {anggotaList.map((a, i) => (
            <FadeInUp key={a.id} delay={i * 40}>
              <div className="flex flex-col rounded-2xl overflow-hidden bg-white/80 border border-[#d0e4ff] backdrop-blur-sm hover:shadow-md transition-all duration-200 h-full">

                {/* Foto */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#eef5ff]">
                  {a.foto_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.foto_url}
                      alt={a.nama}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#001e40]/20 text-[56px]">person</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-3 gap-2">
                  {/* Nama & jabatan */}
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#001e40] leading-tight text-center">{a.nama}</p>
                    <p className="text-[11px] text-[#4a5a6e] font-medium text-center mt-0.5">{a.jabatan}</p>
                    {a.departemen && a.departemen !== "BPH Pengurus Rayon" && (
                      <p className="text-[10px] text-[#0059bb] font-semibold text-center mt-1">{a.departemen}</p>
                    )}
                    {a.angkatan && (
                      <p className="text-[10px] text-[#4a5a6e]/60 text-center mt-0.5">Angkatan {a.angkatan}</p>
                    )}
                  </div>

                  {/* Tombol portfolio */}
                  <a
                    href={a.portfolio_url ?? "#"}
                    className={`flex items-center justify-center gap-1.5 text-[11px] font-bold py-1.5 rounded-lg transition-all duration-200 ${
                      a.portfolio_url
                        ? "bg-[#0059bb] text-white hover:bg-[#003d8a]"
                        : "bg-[#001e40]/[0.06] text-[#001e40]/40 pointer-events-none"
                    }`}
                    {...(a.portfolio_url
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : { "aria-disabled": "true", tabIndex: -1 }
                    )}
                  >
                    <span
                      className="material-symbols-outlined text-[13px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {a.portfolio_url ? "open_in_new" : "hourglass_empty"}
                    </span>
                    {a.portfolio_url ? "Portfolio" : "Soon"}
                  </a>
                </div>

              </div>
            </FadeInUp>
          ))}
        </div>

      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
