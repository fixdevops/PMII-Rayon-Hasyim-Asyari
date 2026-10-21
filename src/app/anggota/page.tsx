import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/FadeInUp";
import AspirasiButton from "@/components/AspirasiButton";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Anggota | PMII Rayon Hasyim Asy'ari",
  description: "Daftar pengurus dan anggota PMII Rayon Hasyim Asy'ari FST UNUGIRI Bojonegoro.",
};

async function getAnggota() {
  const { data } = await supabase
    .from("anggota")
    .select("*")
    .order("urutan", { ascending: true });
  return data ?? [];
}

const fallbackAnggota = [
  { id: "1", nama: "\u2014", jabatan: "Ketua Rayon", departemen: "BPH Pengurus Rayon", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "2", nama: "\u2014", jabatan: "Wakil Ketua", departemen: "BPH Pengurus Rayon", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "3", nama: "\u2014", jabatan: "Sekretaris Umum", departemen: "BPH Pengurus Rayon", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "4", nama: "\u2014", jabatan: "Bendahara Umum", departemen: "BPH Pengurus Rayon", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "5", nama: "\u2014", jabatan: "Koordinator", departemen: "Biro Jaringan", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "6", nama: "\u2014", jabatan: "Koordinator", departemen: "Biro Kaderisasi", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "7", nama: "\u2014", jabatan: "Koordinator", departemen: "Biro Keagamaan", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "8", nama: "\u2014", jabatan: "Koordinator", departemen: "Biro Keperempuanan", foto_url: null, portfolio_url: null, angkatan: null },
  { id: "9", nama: "\u2014", jabatan: "Koordinator", departemen: "Biro Kreativitas dan Media Sosial", foto_url: null, portfolio_url: null, angkatan: null },
];

export default async function AnggotaPage() {
  const dbAnggota = await getAnggota();
  const anggotaList = dbAnggota.length > 0 ? dbAnggota : fallbackAnggota;

  return (
    <div className="bg-white text-[#1a1a1a] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Informasi", href: "/anggota" }, { label: "Anggota" }]} />

      <main className="flex-grow w-full px-6 pb-16 pt-6 md:pt-24">
        <div className="max-w-[900px] mx-auto">

          <div className="border-b border-[#e5e5e5] pb-8 mb-10">
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-3">Pengurus &amp; Anggota</h1>
            <p className="text-[#6b6b6b] text-[17px]">Daftar lengkap pengurus dan anggota PMII Rayon Hasyim Asy&apos;ari FST UNUGIRI periode 2026.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-5">
            {anggotaList.map((a, i) => (
              <FadeInUp key={a.id} delay={i * 40}>
                <div className="flex flex-col rounded-xl overflow-hidden bg-white border border-[#e5e5e5] h-full">

                  <div className="aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]">
                    {a.foto_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.foto_url}
                        alt={a.nama}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#6b6b6b] text-[56px]">person</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-3 gap-2">
                    <div className="flex-1">
                      <p className="text-[14px] font-bold text-[#1a1a1a] leading-tight text-center">{a.nama}</p>
                      <p className="text-[11px] text-[#6b6b6b] font-medium text-center mt-0.5">{a.jabatan}</p>
                      {a.departemen && a.departemen !== "BPH Pengurus Rayon" && (
                        <p className="text-[10px] text-[#6b6b6b] text-center mt-1">{a.departemen}</p>
                      )}
                      {a.angkatan && (
                        <p className="text-[10px] text-[#6b6b6b]/60 text-center mt-0.5">Angkatan {a.angkatan}</p>
                      )}
                    </div>

                    <a
                      href={a.portfolio_url ?? "#"}
                      className={`flex items-center justify-center gap-1.5 text-[11px] font-bold py-1.5 rounded-full transition-all duration-200 ${
                        a.portfolio_url
                          ? "border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                          : "bg-[#f5f5f5] text-[#6b6b6b]/50 pointer-events-none"
                      }`}
                      {...(a.portfolio_url
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : { "aria-disabled": "true", tabIndex: -1 }
                      )}
                    >
                      {a.portfolio_url ? "Portfolio" : "Soon"}
                    </a>
                  </div>

                </div>
              </FadeInUp>
            ))}
          </div>

        </div>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
