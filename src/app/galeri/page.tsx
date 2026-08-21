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
  title: "Galeri | PMII Rayon Hasyim Asy'ari",
  description: "Dokumentasi visual kegiatan PMII Rayon Hasyim Asy'ari FST UNUGIRI Bojonegoro.",
};

const fallbackItems = [
  { id: "1", judul: "Seminar Nasional Teknologi", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfrSt8V_x9P7USfSXffEShtCkO7MoRsZNSzhbsVWF2Eo5vRHRwlDo0QDihC9H22LmqQs7QLz-UoHIBBAGcYLcBCae6xhAfLkrz-kSdgukbpy86kYEN0z8LjXOFtYwcLwYWGRCAe5qzSBg20zmTWX78pVnN_QqhswfVwUQxfxd3p5S5yamtNccy-47GkdJEjynsPyWCxFuHElspfpCw9fCzFAzXbNjg_IGCu9MV3tSODt0k7fhkXW4b", keterangan: "Pelatihan • Okt 2023", tanggal: "2023-10-01" },
  { id: "2", judul: "Mimbar Bebas Akademik", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEk2A9TXxkJs70BRglsv-4c89cb_iaR__leDe4SXhZJX-asB6ntDzccVBuGvQn2N-Y60KcJtXnPXqGIp3pxg0g1uCqFyGS-ofZET3jDEZ1Qn-CK8NZlp3UW2ZgZqIbm45F0_EQ_ZqCjh4etAbb75qyju-5Avs9YkXub8d1xaiyt-N7CgeB70j78O75XY2KqUVzRZGUUx74kBgbmDVrFJzVEx28uVA8KtN4FsES53MRBPe__dZiL-Lh", keterangan: "Diskusi • Nov 2023", tanggal: "2023-11-01" },
  { id: "3", judul: "Koordinasi Kepengurusan", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfetDghZCeUImXvZo4LO_7QOVm_GptcC_Kd4KzFmGbJHP4nYtF1Ts7tVdr-67HdRdjC4ijOL4bgAFq9_1VstXKEEPkuzUhQG3FBW6HdfJ9CuZfERD3ZkkUqhAS8gI52YJzn7CQV9ksUPHAmx5yxXqfVawdHlRHjvWY6EJEby6oXL_DiWtRpdr72WMwCK1Nl1-wkJQ0QbaiX1dxiun50p2y8hbLGUcG8mnUEsYWic1lbvr9JmUdTDPe", keterangan: "Rapat • Des 2023", tanggal: "2023-12-01" },
  { id: "4", judul: "Pelantikan Pengurus Baru", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_J5lr37qBczDj7-TIcCvB5BlBWh4wNk9il1WUjQQM_chVxM4sw3hUARzyMq8NRt-T557rp-SLQQ_QV1oYLqyU6vNmgprKrHJ1V1yK1zV9mc-yWypzBw2WT5lujXSzXvRGrDUFIbN7Q62BRT7FMJ8wvBkdZG6c1Mq2Ed3ZF26-BUzW_BhAGCZ6Nx4G7S97JbkP0LLrXKckmQnb3TtF1KX0f2RiFUzkxNy5JrmxqZU8G4B-f1H3udRO", keterangan: "Kegiatan • Jan 2026", tanggal: "2026-01-01" },
  { id: "5", judul: "Halaqah Mingguan", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUR7ZbaVAIia8Bt114DxvSJW5aDoIdw1riRrHI9lw9LWIjE3LgkBJjiIG-bXhYftRW85YooH_QPbb7GbiIqPeXAduz39wmo-ibyYcflnWkr7HwsE8PdP-09AF3zsXmSIdvC909ErQ19jGJCsAE4jQSnFONEYNfekiybGqR9G6IIaEG6r3QUJECNRvEi_6tqdzMx31M8pog3u_KCGnBDDDT9dXXnfagSeJch7N_v17XBFJBsRk2e_l0", keterangan: "Kajian • Feb 2026", tanggal: "2026-02-01" },
  { id: "6", judul: "Bakti Sosial Kampus", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS1wSpVf88qF1irAzxwac8aivUKijPlvpICAdo7BjS7S76_DJXjUwo2EV_DFNE1OojLClw7pmkhQjz9508_BR2QO5i6G9dlVOPzz6Wy6g8gUgVA6QGHrnFhRLr-v64pie93MyzEtYQrS25uIxrIHwTyt105lBlaCAvha3a6IeBp5_H-5DswpEpBVYBU5CGmmPxB_d7gLWLjmVSPoKIOU_DWtE46AXLY8ifNTqiOF7F6c5ebV-Y5vB-", keterangan: "Sosial • Mar 2026", tanggal: "2026-03-01" },
];

async function getGaleri() {
  const { data } = await supabase
    .from("galeri")
    .select("*")
    .order("tanggal", { ascending: false });
  return data ?? [];
}

export default async function GaleriPage() {
  const galeriList = await getGaleri();
  const items = galeriList.length > 0 ? galeriList : fallbackItems;

  return (
    <div className="text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ddeeff 0%, #eef5ff 30%, #ffffff 60%)" }}>
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Galeri" }]} />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 pb-16 pt-6 md:pt-24">
        <section className="max-w-4xl mx-auto">

          <div className="flex justify-end mb-8">
            <div className="w-[220px] text-center py-1.5 rounded-l-lg text-white font-bold text-[17px] tracking-wide"
              style={{ background: "linear-gradient(to left, transparent, #0059bb, #fbbf24, transparent)" }}>
              Galeri
            </div>
          </div>

          <p className="text-[14px] text-[#3a4a5e] mb-10 text-right max-w-xl ml-auto">
            Dokumentasi visual kegiatan dan momen berharga PMII Rayon Hasyim Asy&apos;ari.
          </p>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-[#3a4a5e] gap-2">
              <span className="material-symbols-outlined text-[40px]">photo_library</span>
              <p className="text-sm">Belum ada foto di galeri.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {items.map((item, i) => (
                <FadeInUp key={item.id} delay={i * 60}>
                  <div className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-[#d0e4ff] hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className="relative w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.foto_url}
                        alt={item.judul}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span className="text-white/70 text-[11px] font-medium mb-0.5">{item.keterangan}</span>
                        <h4 className="text-white text-[15px] font-semibold leading-snug">{item.judul}</h4>
                      </div>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/kegiatan"
              className="inline-flex items-center gap-2 border border-[#0059bb]/30 text-[#0059bb] text-[14px] font-semibold px-6 py-2.5 rounded-full hover:bg-[#0059bb] hover:text-white transition-all duration-200">
              <svg className="w-4 h-4 rotate-180" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Lihat Kegiatan & News
            </Link>
          </div>

        </section>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
