"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface GaleriItem {
  id: string;
  judul: string;
  foto_url: string;
  keterangan: string | null;
}

const fallbackPhotos = [
  { id: "1", judul: "Bedah Buku: Filsafat Sains Modern", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUR7ZbaVAIia8Bt114DxvSJW5aDoIdw1riRrHI9lw9LWIjE3LgkBJjiIG-bXhYftRW85YooH_QPbb7GbiIqPeXAduz39wmo-ibyYcflnWkr7HwsE8PdP-09AF3zsXmSIdvC909ErQ19jGJCsAE4jQSnFONEYNfekiybGqR9G6IIaEG6r3QUJECNRvEi_6tqdzMx31M8pog3u_KCGnBDDDT9dXXnfagSeJch7N_v17XBFJBsRk2e_l0", keterangan: null },
  { id: "2", judul: "Workshop Data Analitik Dasar", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrH0fW16CNvX_-XnpCfodtx9fnljl95YlPcYuFheATjYjVCPjtSlJsqPGwL0z6jI-Y5zcKvXMlBbA92SPYghG4u1OKK0Vx0VqKA_lyfZLQhqW6U0iV-tt2WLHyuU2QTn5GDSCg-qPe8QDhXJ3abwLThyQfpL4In_Bs_oz2TpMKGcxo5w4HDnPshnD4iMP_gh9QFxnulsNiuLKCCHJ7-AB8zwSmoQT5h3dPdSyRxaSps5dSdVqkdaVl", keterangan: null },
  { id: "3", judul: "Gerakan Bersih Lingkungan Kampus", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS1wSpVf88qF1irAzxwac8aivUKijPlvpICAdo7BjS7S76_DJXjUwo2EV_DFNE1OojLClw7pmkhQjz9508_BR2QO5i6G9dlVOPzz6Wy6g8gUgVA6QGHrnFhRLr-v64pie93MyzEtYQrS25uIxrIHwTyt105lBlaCAvha3a6IeBp5_H-5DswpEpBVYBU5CGmmPxB_d7gLWLjmVSPoKIOU_DWtE46AXLY8ifNTqiOF7F6c5ebV-Y5vB-", keterangan: null },
  { id: "4", judul: "Koordinasi Kepengurusan", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfetDghZCeUImXvZo4LO_7QOVm_GptcC_Kd4KzFmGbJHP4nYtF1Ts7tVdr-67HdRdjC4ijOL4bgAFq9_1VstXKEEPkuzUhQG3FBW6HdfJ9CuZfERD3ZkkUqhAS8gI52YJzn7CQV9ksUPHAmx5yxXqfVawdHlRHjvWY6EJEby6oXL_DiWtRpdr72WMwCK1Nl1-wkJQ0QbaiX1dxiun50p2y8hbLGUcG8mnUEsYWic1lbvr9JmUdTDPe", keterangan: null },
  { id: "5", judul: "Pelantikan Pengurus Baru", foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_J5lr37qBczDj7-TIcCvB5BlBWh4wNk9il1WUjQQM_chVxM4sw3hUARzyMq8NRt-T557rp-SLQQ_QV1oYLqyU6vNmgprKrHJ1V1yK1zV9mc-yWypzBw2WT5lujXSzXvRGrDUFIbN7Q62BRT7FMJ8wvBkdZG6c1Mq2Ed3ZF26-BUzW_BhAGCZ6Nx4G7S97JbkP0LLrXKckmQnb3TtF1KX0f2RiFUzkxNy5JrmxqZU8G4B-f1H3udRO", keterangan: null },
];

export default function GaleriSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<GaleriItem[]>([]);

  useEffect(() => {
    supabase
      .from("galeri")
      .select("id, judul, foto_url, keterangan")
      .order("tanggal", { ascending: false })
      .limit(10)
      .then(({ data }) => {
        setPhotos(data && data.length > 0 ? data : fallbackPhotos);
      });
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (photos.length === 0) return null;

  return (
    <section className="w-full px-[var(--page-padding)] mt-10 pb-4">
      {/* Label bar */}
      <div className="flex justify-end mb-5">
        <div
          className="w-[180px] text-center py-1.5 rounded-l-lg text-white font-bold text-[17px] tracking-wide"
          style={{ background: "linear-gradient(to left, transparent, #0059bb, #fbbf24, transparent)" }}
        >
          Galeri
        </div>
      </div>

      {/* Slider */}
      <div className="relative mx-auto max-w-[var(--container-width)]">
        <div className="rounded-2xl border border-[#d0e4ff] bg-white/60 backdrop-blur-sm p-4 relative">
          {/* Scroll area */}
          <div
            ref={ref}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {photos.map((p) => (
              <div
                key={p.id}
                className="snap-start flex-shrink-0 rounded-xl overflow-hidden relative group"
                style={{ width: "320px", height: "200px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.foto_url}
                  alt={p.judul}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-[12px] font-semibold">{p.judul}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Prev button */}
          <motion.button
            onClick={() => scroll("left")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg z-10"
            style={{ background: "linear-gradient(135deg, #0059bb99, #fbbf2499)" }}
            aria-label="Sebelumnya"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          {/* Next button */}
          <motion.button
            onClick={() => scroll("right")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg z-10"
            style={{ background: "linear-gradient(135deg, #0059bb99, #fbbf2499)" }}
            aria-label="Berikutnya"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>

        {/* Tombol selengkapnya */}
        <div className="flex justify-center mt-6">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/galeri"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-white font-bold text-[14px] shadow-lg"
              style={{ background: "linear-gradient(135deg, #001e40 0%, #0059bb 50%, #fbbf24 100%)" }}
            >
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </span>
              Selengkapnya Galeri
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
