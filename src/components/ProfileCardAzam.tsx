"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { supabase } from "@/lib/supabase";

// URL foto Firzan selalu di path ini di bucket 'anggota'
const FIRZAN_STORAGE_PATH = "_firzan_profile"

function getFirzanUrl() {
  // Coba semua ekstensi umum — kita simpan versi terbaru dengan cache-bust
  const { data } = supabase.storage.from("anggota").getPublicUrl(FIRZAN_STORAGE_PATH)
  return data.publicUrl
}

export default function ProfileCardAzam() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [fotoUrl, setFotoUrl] = useState<string>("/yon azam.webp");
  const [imgError, setImgError] = useState(false);

  // Fetch foto — ambil dari storage bucket anggota
  useEffect(() => {
    async function loadFoto() {
      const { data: files } = await supabase.storage
        .from("anggota")
        .list("", { search: "_firzan_profile" })

      if (files && files.length > 0) {
        // Sort by updated_at descending — ambil yang paling baru
        const sorted = [...files].sort((a, b) => {
          const ta = a.updated_at ? new Date(a.updated_at).getTime() : 0
          const tb = b.updated_at ? new Date(b.updated_at).getTime() : 0
          return tb - ta
        })
        const latest = sorted[0]
        const { data } = supabase.storage
          .from("anggota")
          .getPublicUrl(latest.name)
        // Tambah cache-bust agar browser tidak pakai cache lama
        setFotoUrl(data.publicUrl + "?v=" + new Date(latest.updated_at ?? "").getTime())
      }
    }
    loadFoto()
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20, mass: 0.5 };

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), spring);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const touch = e.touches[0];
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((touch.clientX - r.left) / r.width - 0.5);
    mouseY.set((touch.clientY - r.top) / r.height - 0.5);
    setHovered(true);
  }

  function onTouchEnd() { mouseX.set(0); mouseY.set(0); setHovered(false); }
  function onLeave() { mouseX.set(0); mouseY.set(0); setHovered(false); }

  const isExternal = fotoUrl.startsWith("http");
  const displayUrl = imgError ? "/yon azam.webp" : fotoUrl;

  return (
    <div style={{ perspective: 1000 }} className="select-none">
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: hovered ? -8 : 0 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative cursor-pointer"
      >
        {/* Glow behind */}
        <motion.div
          className="absolute -inset-6 rounded-[36px] pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0.35, scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "radial-gradient(ellipse at 50% 80%, rgba(0,89,187,0.55) 0%, transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        {/* Card */}
        <div
          className="relative overflow-hidden"
          style={{
            width: 300, height: 420, borderRadius: 28,
            background: "linear-gradient(145deg, #0d1f3c 0%, #001e40 40%, #003070 100%)",
            boxShadow: hovered
              ? "0 40px 80px rgba(0,20,60,0.6), 0 0 0 1px rgba(96,200,255,0.15)"
              : "0 20px 50px rgba(0,20,60,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
            transition: "box-shadow 0.4s ease",
          }}
        >
          {/* Holographic glare */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 rounded-[28px]"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.12) 0%, transparent 60%)`,
              mixBlendMode: "screen",
            }}
          />

          {/* Top shimmer line */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px z-20"
            style={{ background: "linear-gradient(90deg, transparent, rgba(96,200,255,0.6), transparent)" }} />

          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #60c8ff 0%, transparent 70%)" }} />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle, #0059bb 0%, transparent 70%)" }} />

          {/* Photo */}
          <div className="absolute inset-x-0 top-0 bottom-[130px] overflow-hidden">
            <motion.div
              className="relative w-full h-full"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {isExternal ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={displayUrl}
                  alt="Sahabat Firzan"
                  className="w-full h-full object-cover object-top"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Image
                  src={displayUrl}
                  alt="Sahabat Firzan"
                  fill
                  className="object-cover object-top"
                  sizes="300px"
                  priority
                />
              )}
            </motion.div>
            {/* Gradient overlay */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,30,64,0.05) 0%, rgba(0,20,50,0) 30%, rgba(0,20,50,0.75) 75%, rgba(0,20,50,1) 100%)" }} />
          </div>

          {/* PMII badge */}
          <div className="absolute top-4 left-4 z-30">
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md border border-white/15 rounded-full pl-1.5 pr-3 py-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logoi pmii.png" alt="PMII" className="w-5 h-5 object-contain rounded-full" />
              <span className="text-[10px] font-bold text-white/80 tracking-widest">PMII</span>
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
            <motion.h3
              className="text-[22px] font-bold text-white leading-tight mb-0.5"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
              animate={{ y: hovered ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Sahabat Firzan
            </motion.h3>
            <p className="text-[11px] font-bold text-[#60c8ff] tracking-[0.15em] uppercase mb-4">
              Ketua Rayon Hasyim Asy&apos;ari
            </p>
            <div className="h-px mb-4"
              style={{ background: "linear-gradient(90deg, rgba(96,200,255,0.4), rgba(255,255,255,0.1), transparent)" }} />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#60c8ff]/40 flex-shrink-0">
                {isExternal ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayUrl} alt="mini" className="object-cover object-top w-full h-full" />
                ) : (
                  <Image src={displayUrl} alt="mini" width={32} height={32} className="object-cover object-top w-full h-full" />
                )}
              </div>
              <div>
                <p className="text-[11px] font-bold text-white/90 leading-none">@sahabatfirzan</p>
                <p className="text-[10px] text-white/40 leading-none mt-0.5">Rayon FST</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
