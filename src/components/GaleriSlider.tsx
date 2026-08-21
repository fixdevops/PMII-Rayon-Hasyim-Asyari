"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const photos = [
  { src: "/lutfibirupmii.png", label: "Maskot PMII" },
  { src: "/yon azam.webp", label: "Sahabat Azam - Ketua Rayon" },
  { src: "/lutfimeraah.png", label: "Kegiatan PMII" },
  { src: "/lutfibirupmii.png", label: "PMII Rayon FST" },
  { src: "/yon azam.webp", label: "Kaderisasi 2024" },
];

export default function GaleriSlider() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section className="w-full px-[var(--page-padding)] mt-16 pb-4">
      {/* Header bar kanan */}
      <div className="flex justify-end mb-5">
        <div
          className="w-[220px] text-center py-1.5 rounded-l-lg text-white font-bold text-[17px] tracking-wide"
          style={{ background: "linear-gradient(to left, transparent, #0059bb, #fbbf24, transparent)" }}
        >
          Galeri
        </div>
      </div>

      {/* Slider container */}
      <div className="relative mx-auto max-w-[var(--container-width)]">
        <div
          ref={ref}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 border border-black/[0.07] rounded-2xl p-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {photos.map((p, i) => (
            <div
              key={i}
              className="snap-start flex-shrink-0 w-[220px] sm:w-[260px] h-[300px] rounded-xl overflow-hidden relative group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.label}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-[13px] font-semibold">{p.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev button */}
        <motion.button
          onClick={() => scroll("left")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg z-10"
          style={{ background: "linear-gradient(135deg, #0059bb, #fbbf24)" }}
          aria-label="Sebelumnya"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>

        {/* Next button */}
        <motion.button
          onClick={() => scroll("right")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg z-10"
          style={{ background: "linear-gradient(135deg, #0059bb, #fbbf24)" }}
          aria-label="Berikutnya"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      {/* Tombol selengkapnya */}
      <div className="flex justify-center mt-8">
        <motion.a
          href="/kegiatan"
          className="inline-flex items-center gap-3 px-8 py-3 rounded-full text-white font-semibold shadow-lg text-[14px]"
          style={{ background: "linear-gradient(135deg, #001e40 0%, #0059bb 50%, #fbbf24 100%)" }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(0,89,187,0.5)" }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </span>
          Selengkapnya Galeri
        </motion.a>
      </div>
    </section>
  );
}
