import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import FooterDark from "@/components/FooterDark";
import FadeInUp from "@/components/FadeInUp";

export const metadata: Metadata = {
  title: "Kegiatan & Galeri - PMII Rayon Hasyim Asyari",
  description:
    "Eksplorasi kegiatan, dokumentasi visual, dan arsip dinamika pergerakan PMII Rayon Hasyim Asyari FST.",
};

const activities = [
  {
    id: 1,
    category: "Kajian Rutin",
    date: "15 Okt 2024",
    title: "Bedah Buku: Filsafat Sains Modern",
    desc: "Mendiskusikan kaitan antara perkembangan sains kontemporer dengan nilai-nilai dasar pergerakan. Menghadirkan narasumber dari akademisi FST.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUR7ZbaVAIia8Bt114DxvSJW5aDoIdw1riRrHI9lw9LWIjE3LgkBJjiIG-bXhYftRW85YooH_QPbb7GbiIqPeXAduz39wmo-ibyYcflnWkr7HwsE8PdP-09AF3zsXmSIdvC909ErQ19jGJCsAE4jQSnFONEYNfekiybGqR9G6IIaEG6r3QUJECNRvEi_6tqdzMx31M8pog3u_KCGnBDDDT9dXXnfagSeJch7N_v17XBFJBsRk2e_l0",
  },
  {
    id: 2,
    category: "Pelatihan",
    date: "22 Okt 2024",
    title: "Workshop Data Analitik Dasar",
    desc: "Pelatihan keterampilan praktis analisis data menggunakan Python untuk kader PMII Rayon FST guna meningkatkan daya saing di era digital.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrH0fW16CNvX_-XnpCfodtx9fnljl95YlPcYuFheATjYjVCPjtSlJsqPGwL0z6jI-Y5zcKvXMlBbA92SPYghG4u1OKK0Vx0VqKA_lyfZLQhqW6U0iV-tt2WLHyuU2QTn5GDSCg-qPe8QDhXJ3abwLThyQfpL4In_Bs_oz2TpMKGcxo5w4HDnPshnD4iMP_gh9QFxnulsNiuLKCCHJ7-AB8zwSmoQT5h3dPdSyRxaSps5dSdVqkdaVl",
  },
  {
    id: 3,
    category: "Aksi Sosial",
    date: "05 Nov 2024",
    title: "Gerakan Bersih Lingkungan Kampus",
    desc: "Implementasi nilai Hablum Minal Alam melalui aksi nyata menjaga kelestarian ekosistem kampus bersama seluruh civitas akademika.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS1wSpVf88qF1irAzxwac8aivUKijPlvpICAdo7BjS7S76_DJXjUwo2EV_DFNE1OojLClw7pmkhQjz9508_BR2QO5i6G9dlVOPzz6Wy6g8gUgVA6QGHrnFhRLr-v64pie93MyzEtYQrS25uIxrIHwTyt105lBlaCAvha3a6IeBp5_H-5DswpEpBVYBU5CGmmPxB_d7gLWLjmVSPoKIOU_DWtE46AXLY8ifNTqiOF7F6c5ebV-Y5vB-",
  },
];

const galleryItems = [
  {
    id: 1,
    aspect: "aspect-[3/4]",
    label: "Pelatihan • Okt 2023",
    title: "Seminar Nasional Teknologi",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfrSt8V_x9P7USfSXffEShtCkO7MoRsZNSzhbsVWF2Eo5vRHRwlDo0QDihC9H22LmqQs7QLz-UoHIBBAGcYLcBCae6xhAfLkrz-kSdgukbpy86kYEN0z8LjXOFtYwcLwYWGRCAe5qzSBg20zmTWX78pVnN_QqhswfVwUQxfxd3p5S5yamtNccy-47GkdJEjynsPyWCxFuHElspfpCw9fCzFAzXbNjg_IGCu9MV3tSODt0k7fhkXW4b",
  },
  {
    id: 2,
    aspect: "aspect-square",
    label: "Diskusi • Nov 2023",
    title: "Mimbar Bebas Akademik",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEk2A9TXxkJs70BRglsv-4c89cb_iaR__leDe4SXhZJX-asB6ntDzccVBuGvQn2N-Y60KcJtXnPXqGIp3pxg0g1uCqFyGS-ofZET3jDEZ1Qn-CK8NZlp3UW2ZgZqIbm45F0_EQ_ZqCjh4etAbb75qyju-5Avs9YkXub8d1xaiyt-N7CgeB70j78O75XY2KqUVzRZGUUx74kBgbmDVrFJzVEx28uVA8KtN4FsES53MRBPe__dZiL-Lh",
  },
  {
    id: 3,
    aspect: "aspect-video",
    label: "Rapat • Des 2023",
    title: "Koordinasi Kepengurusan",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfetDghZCeUImXvZo4LO_7QOVm_GptcC_Kd4KzFmGbJHP4nYtF1Ts7tVdr-67HdRdjC4ijOL4bgAFq9_1VstXKEEPkuzUhQG3FBW6HdfJ9CuZfERD3ZkkUqhAS8gI52YJzn7CQV9ksUPHAmx5yxXqfVawdHlRHjvWY6EJEby6oXL_DiWtRpdr72WMwCK1Nl1-wkJQ0QbaiX1dxiun50p2y8hbLGUcG8mnUEsYWic1lbvr9JmUdTDPe",
  },
  {
    id: 4,
    aspect: "aspect-[4/5]",
    label: "Kegiatan • Jan 2024",
    title: "Pelantikan Pengurus Baru",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_J5lr37qBczDj7-TIcCvB5BlBWh4wNk9il1WUjQQM_chVxM4sw3hUARzyMq8NRt-T557rp-SLQQ_QV1oYLqyU6vNmgprKrHJ1V1yK1zV9mc-yWypzBw2WT5lujXSzXvRGrDUFIbN7Q62BRT7FMJ8wvBkdZG6c1Mq2Ed3ZF26-BUzW_BhAGCZ6Nx4G7S97JbkP0LLrXKckmQnb3TtF1KX0f2RiFUzkxNy5JrmxqZU8G4B-f1H3udRO",
  },
];

const filterTags = ["Semua", "Kajian", "Pelatihan", "Aksi Sosial"];

export default function KegiatanPage() {
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
                  Jejak Langkah Pergerakan
                </div>
              </FadeInUp>
              <FadeInUp delay={80}>
                <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-balance mb-5">
                  Kegiatan &amp; Dokumentasi.
                </h1>
              </FadeInUp>
              <FadeInUp delay={140}>
                <p className="text-[16px] text-[#0f0f0f]/55 font-medium leading-relaxed max-w-xl mx-auto">
                  Eksplorasi arsip kegiatan, dokumentasi visual, dan dinamika
                  pergerakan PMII Rayon Hasyim Asyari FST.
                </p>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* ── KEGIATAN TERKINI ── */}
        <section id="kegiatan" className="py-20 bg-[#f9fafb]">
          <div className="w-full px-[var(--page-padding)]">
            <div className="mx-auto max-w-[var(--container-width)]">
              <FadeInUp className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-[13px] font-semibold text-[#0f0f0f]/40 uppercase tracking-wider mb-3">
                    Terbaru
                  </p>
                  <h2 className="text-[clamp(1.6rem,3.5vw,2.25rem)] font-semibold tracking-tight">
                    Kegiatan Terkini.
                  </h2>
                </div>
                <button className="hidden md:flex items-center gap-1.5 text-[14px] font-medium text-[#0f0f0f]/50 hover:text-[#0f0f0f] transition-colors">
                  Lihat semua
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </FadeInUp>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {activities.map((act, i) => (
                  <FadeInUp key={act.id} delay={i * 80}>
                    <article className="group relative rounded-2xl overflow-hidden bg-white border border-black/[0.06] hover:border-black/[0.1] hover:shadow-sm transition-all duration-200 cursor-pointer">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f3ff]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={act.img}
                          alt={act.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Category badge */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[12px] font-semibold text-[#0f0f0f] shadow-sm border border-black/[0.06]">
                            {act.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-1.5 text-[13px] text-[#0f0f0f]/40 font-medium mb-2">
                          <span className="material-symbols-outlined text-[15px]">calendar_today</span>
                          {act.date}
                        </div>
                        <h3 className="text-[17px] font-semibold tracking-tight mb-2 leading-snug">
                          {act.title}
                        </h3>
                        <p className="text-[13px] text-[#0f0f0f]/55 font-medium leading-relaxed line-clamp-2">
                          {act.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-[#001e40] group-hover:gap-2 transition-all">
                          Baca selengkapnya
                          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </FadeInUp>
                ))}
              </div>

              {/* Mobile load more */}
              <div className="mt-8 text-center md:hidden">
                <button className="inline-flex items-center justify-center text-[14px] font-medium text-[#0f0f0f] border border-black/[0.1] px-6 py-2.5 rounded-full hover:bg-black/[0.03] transition-colors w-full">
                  Lihat Semua Kegiatan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full px-[var(--page-padding)]">
          <div className="mx-auto max-w-[var(--container-width)]">
            <div className="h-px bg-black/[0.06]" />
          </div>
        </div>

        {/* ── GALERI ── */}
        <section id="galeri" className="py-20 bg-white">
          <div className="w-full px-[var(--page-padding)]">
            <div className="mx-auto max-w-[var(--container-width)]">
              <FadeInUp className="mb-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-semibold text-[#0f0f0f]/40 uppercase tracking-wider mb-3">
                      Dokumentasi Visual
                    </p>
                    <h2 className="text-[clamp(1.6rem,3.5vw,2.25rem)] font-semibold tracking-tight">
                      Arsip Dokumentasi.
                    </h2>
                  </div>
                  {/* Filter tags */}
                  <div className="flex flex-wrap gap-2">
                    {filterTags.map((tag, i) => (
                      <button
                        key={tag}
                        className={`text-[13px] font-medium px-3.5 py-1.5 rounded-full transition-colors ${
                          i === 0
                            ? "bg-[#001e40] text-white"
                            : "bg-black/[0.05] text-[#0f0f0f]/60 hover:bg-black/[0.08] hover:text-[#0f0f0f]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </FadeInUp>

              {/* Masonry grid */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
                {galleryItems.map((item, i) => (
                  <FadeInUp key={item.id} delay={i * 80}>
                    <div className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-[#f0f3ff] cursor-pointer border border-black/[0.04] hover:border-black/[0.08] transition-all duration-200">
                      <div className={`relative w-full ${item.aspect}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.img}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                          <span className="text-white/60 text-[12px] font-medium mb-1">{item.label}</span>
                          <h4 className="text-white text-[17px] font-semibold leading-snug">{item.title}</h4>
                        </div>
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>

              <FadeInUp className="mt-12 text-center">
                <button className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0f0f0f]/60 border border-black/[0.1] px-6 py-2.5 rounded-full hover:text-[#0f0f0f] hover:border-black/[0.2] transition-all">
                  Muat Lebih Banyak
                  <span className="material-symbols-outlined text-[17px]">expand_more</span>
                </button>
              </FadeInUp>
            </div>
          </div>
        </section>
      </main>

      <FooterDark />
    </div>
  );
}
