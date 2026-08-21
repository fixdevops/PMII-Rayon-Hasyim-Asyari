import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/FadeInUp";
import AspirasiButton from "@/components/AspirasiButton";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "News & Kegiatan | PMII Rayon Hasyim Asy'ari",
  description: "Berita dan kegiatan terkini PMII Rayon Hasyim Asy'ari FST UNUGIRI Bojonegoro.",
};

const kategoriColor: Record<string, string> = {
  umum: 'bg-gray-100 text-gray-700',
  kajian: 'bg-blue-100 text-blue-700',
  pelatihan: 'bg-purple-100 text-purple-700',
  'aksi sosial': 'bg-green-100 text-green-700',
  kaderisasi: 'bg-yellow-100 text-yellow-700',
  keagamaan: 'bg-emerald-100 text-emerald-700',
  rapat: 'bg-orange-100 text-orange-700',
}

async function getKegiatan() {
  const { data } = await supabase
    .from("kegiatan")
    .select("*")
    .order("tanggal", { ascending: false });
  return data ?? [];
}

// Fallback data jika database kosong
const fallbackActivities = [
  {
    id: "1", kategori: "Kajian Rutin",
    tanggal: "2026-10-15",
    judul: "Bedah Buku: Filsafat Sains Modern",
    deskripsi: "Mendiskusikan kaitan antara perkembangan sains kontemporer dengan nilai-nilai dasar pergerakan.",
    foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUR7ZbaVAIia8Bt114DxvSJW5aDoIdw1riRrHI9lw9LWIjE3LgkBJjiIG-bXhYftRW85YooH_QPbb7GbiIqPeXAduz39wmo-ibyYcflnWkr7HwsE8PdP-09AF3zsXmSIdvC909ErQ19jGJCsAE4jQSnFONEYNfekiybGqR9G6IIaEG6r3QUJECNRvEi_6tqdzMx31M8pog3u_KCGnBDDDT9dXXnfagSeJch7N_v17XBFJBsRk2e_l0",
    lokasi: null,
  },
  {
    id: "2", kategori: "Pelatihan",
    tanggal: "2026-10-22",
    judul: "Workshop Data Analitik Dasar",
    deskripsi: "Pelatihan keterampilan praktis analisis data menggunakan Python untuk kader PMII Rayon FST.",
    foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrH0fW16CNvX_-XnpCfodtx9fnljl95YlPcYuFheATjYjVCPjtSlJsqPGwL0z6jI-Y5zcKvXMlBbA92SPYghG4u1OKK0Vx0VqKA_lyfZLQhqW6U0iV-tt2WLHyuU2QTn5GDSCg-qPe8QDhXJ3abwLThyQfpL4In_Bs_oz2TpMKGcxo5w4HDnPshnD4iMP_gh9QFxnulsNiuLKCCHJ7-AB8zwSmoQT5h3dPdSyRxaSps5dSdVqkdaVl",
    lokasi: null,
  },
  {
    id: "3", kategori: "Aksi Sosial",
    tanggal: "2026-11-05",
    judul: "Gerakan Bersih Lingkungan Kampus",
    deskripsi: "Implementasi nilai Hablum Minal Alam melalui aksi nyata menjaga kelestarian ekosistem kampus.",
    foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS1wSpVf88qF1irAzxwac8aivUKijPlvpICAdo7BjS7S76_DJXjUwo2EV_DFNE1OojLClw7pmkhQjz9508_BR2QO5i6G9dlVOPzz6Wy6g8gUgVA6QGHrnFhRLr-v64pie93MyzEtYQrS25uIxrIHwTyt105lBlaCAvha3a6IeBp5_H-5DswpEpBVYBU5CGmmPxB_d7gLWLjmVSPoKIOU_DWtE46AXLY8ifNTqiOF7F6c5ebV-Y5vB-",
    lokasi: null,
  },
];

export default async function KegiatanPage() {
  const kegiatanList = await getKegiatan();
  const activities = kegiatanList.length > 0 ? kegiatanList : fallbackActivities;

  return (
    <div className="text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ddeeff 0%, #eef5ff 30%, #ffffff 60%)" }}>
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "News" }]} />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 pb-16 pt-6 md:pt-24">
        <section className="max-w-4xl mx-auto">

          <div className="flex justify-start mb-8">
            <div className="w-[260px] text-center py-1.5 rounded-r-lg text-white font-bold text-[17px] tracking-wide"
              style={{ background: "linear-gradient(to right, transparent, #0059bb, #fbbf24, transparent)" }}>
              Kegiatan Terkini
            </div>
          </div>

          <p className="text-[14px] text-[#3a4a5e] mb-10 max-w-xl">
            Beragam kegiatan, kajian, pelatihan, dan aksi sosial yang dijalankan PMII Rayon Hasyim Asy&apos;ari.
          </p>

          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-[#3a4a5e] gap-2">
              <span className="material-symbols-outlined text-[40px]">event_busy</span>
              <p className="text-sm">Belum ada kegiatan terdaftar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activities.map((act, i) => (
                <FadeInUp key={act.id} delay={i * 60}>
                  <article className="group rounded-2xl overflow-hidden bg-white/80 border border-[#d0e4ff] hover:shadow-md transition-all duration-200 cursor-pointer backdrop-blur-sm">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      {act.foto_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={act.foto_url} alt={act.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-gray-200 text-[48px]">image</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold shadow-sm border border-black/[0.06] capitalize ${kategoriColor[act.kategori] ?? 'bg-white/90 text-[#0f0f0f]'}`}>
                          {act.kategori}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-[12px] text-[#0f0f0f]/40 font-medium mb-2">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        {new Date(act.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <h3 className="text-[16px] font-semibold tracking-tight mb-2 leading-snug">{act.judul}</h3>
                      {act.deskripsi && (
                        <p className="text-[13px] text-[#0f0f0f]/55 leading-relaxed line-clamp-2">{act.deskripsi}</p>
                      )}
                      {act.lokasi && (
                        <p className="text-[12px] text-[#0f0f0f]/40 mt-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">location_on</span>
                          {act.lokasi}
                        </p>
                      )}
                    </div>
                  </article>
                </FadeInUp>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/galeri"
              className="inline-flex items-center gap-2 border border-[#0059bb]/30 text-[#0059bb] text-[14px] font-semibold px-6 py-2.5 rounded-full hover:bg-[#0059bb] hover:text-white transition-all duration-200">
              Lihat Galeri Foto
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

        </section>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
