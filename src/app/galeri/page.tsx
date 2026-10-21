import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/FadeInUp";
import AspirasiButton from "@/components/AspirasiButton";
import { supabase } from "@/lib/supabase";
import GaleriAlbumClient from "./GaleriAlbumClient";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Galeri | PMII Rayon Hasyim Asy'ari",
  description: "Dokumentasi visual kegiatan PMII Rayon Hasyim Asy'ari FST UNUGIRI Bojonegoro.",
};

export interface GaleriItem {
  id: string
  judul: string
  foto_url: string
  keterangan: string | null
  tanggal: string
}

const fallbackItems: GaleriItem[] = [
  { id: "1", judul: "Seminar Nasional Teknologi", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfrSt8V_x9P7USfSXffEShtCkO7MoRsZNSzhbsVWF2Eo5vRHRwlDo0QDihC9H22LmqQs7QLz-UoHIBBAGcYLcBCae6xhAfLkrz-kSdgukbpy86kYEN0z8LjXOFtYwcLwYWGRCAe5qzSBg20zmTWX78pVnN_QqhswfVwUQxfxd3p5S5yamtNccy-47GkdJEjynsPyWCxFuHElspfpCw9fCzFAzXbNjg_IGCu9MV3tSODt0k7fhkXW4b", keterangan: "Pelatihan • Okt 2023", tanggal: "2023-10-01" },
  { id: "2", judul: "Mimbar Bebas Akademik", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEk2A9TXxkJs70BRglsv-4c89cb_iaR__leDe4SXhZJX-asB6ntDzccVBuGvQn2N-Y60KcJtXnPXqGIp3pxg0g1uCqFyGS-ofZET3jDEZ1Qn-CK8NZlp3UW2ZgZqIbm45F0_EQ_ZqCjh4etAbb75qyju-5Avs9YkXub8d1xaiyt-N7CgeB70j78O75XY2KqUVzRZGUUx74kBgbmDVrFJzVEx28uVA8KtN4FsES53MRBPe__dZiL-Lh", keterangan: "Diskusi • Nov 2023", tanggal: "2023-11-01" },
  { id: "3", judul: "Koordinasi Kepengurusan", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfetDghZCeUImXvZo4LO_7QOVm_GptcC_Kd4KzFmGbJHP4nYtF1Ts7tVdr-67HdRdjC4ijOL4bgAFq9_1VstXKEEPkuzUhQG3FBW6HdfJ9CuZfERD3ZkkUqhAS8gI52YJzn7CQV9ksUPHAmx5yxXqfVawdHlRHjvWY6EJEby6oXL_DiWtRpdr72WMwCK1Nl1-wkJQ0QbaiX1dxiun50p2y8hbLGUcG8mnUEsYWic1lbvr9JmUdTDPe", keterangan: "Rapat • Des 2023", tanggal: "2023-12-01" },
  { id: "4", judul: "Pelantikan Pengurus Baru", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_J5lr37qBczDj7-TIcCvB5BlBWh4wNk9il1WUjQQM_chVxM4sw3hUARzyMq8NRt-T557rp-SLQQ_QV1oYLqyU6vNmgprKrHJ1V1yK1zV9mc-yWypzBw2WT5lujXSzXvRGrDUFIbN7Q62BRT7FMJ8wvBkdZG6c1Mq2Ed3ZF26-BUzW_BhAGCZ6Nx4G7S97JbkP0LLrXKckmQnb3TtF1KX0f2RiFUzkxNy5JrmxqZU8G4B-f1H3udRO", keterangan: "Kegiatan • Jan 2026", tanggal: "2026-01-01" },
  { id: "5", judul: "Halaqah Mingguan", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUR7ZbaVAIia8Bt114DxvSJW5aDoIdw1riRrHI9lw9LWIjE3LgkBJjiIG-bXhYftRW85YooH_QPbb7GbiIqPeXAduz39wmo-ibyYcflnWkr7HwsE8PdP-09AF3zsXmSIdvC909ErQ19jGJCsAE4jQSnFONEYNfekiybGqR9G6IIaEG6r3QUJECNRvEi_6tqdzMx31M8pog3u_KCGnBDDDT9dXXnfagSeJch7N_v17XBFJBsRk2e_l0", keterangan: "Kajian • Feb 2026", tanggal: "2026-02-01" },
  { id: "6", judul: "Bakti Sosial Kampus", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS1wSpVf88qF1irAzxwac8aivUKijPlvpICAdo7BjS7S76_DJXjUwo2EV_DFNE1OojLClw7pmkhQjz9508_BR2QO5i6G9dlVOPzz6Wy6g8gUgVA6QGHrnFhRLr-v64pie93MyzEtYQrS25uIxrIHwTyt105lBlaCAvha3a6IeBp5_H-5DswpEpBVYBU5CGmmPxB_d7gLWLjmVSPoKIOU_DWtE46AXLY8ifNTqiOF7F6c5ebV-Y5vB-", keterangan: "Sosial • Mar 2026", tanggal: "2026-03-01" },
];

async function getGaleri(): Promise<GaleriItem[]> {
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
    <div className="bg-white text-[#1a1a1a] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[{ label: "Galeri" }]} />

      <main className="flex-grow w-full px-6 pb-16 pt-6 md:pt-24">
        <div className="max-w-[900px] mx-auto">

          <div className="border-b border-[#e5e5e5] pb-8 mb-10">
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-3">Galeri Foto</h1>
            <p className="text-[#6b6b6b] text-[17px]">Dokumentasi visual kegiatan dan momen berharga PMII Rayon Hasyim Asy&apos;ari.</p>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-[#6b6b6b] gap-2">
              <span className="material-symbols-outlined text-[40px]">photo_library</span>
              <p className="text-sm">Belum ada foto di galeri.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {items.map((item, i) => (
                <FadeInUp key={item.id} delay={i * 60}>
                  <GaleriAlbumClient item={item} />
                </FadeInUp>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/kegiatan"
              className="inline-flex items-center gap-2 border border-[#1a1a1a] text-[#1a1a1a] text-[14px] font-semibold px-6 py-2.5 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all duration-200">
              <svg className="w-4 h-4 rotate-180" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Lihat Kegiatan &amp; News
            </Link>
          </div>

        </div>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  );
}
