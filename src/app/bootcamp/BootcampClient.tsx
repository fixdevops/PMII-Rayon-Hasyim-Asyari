"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function BootcampClient() {
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !nama) return;
    setSending(true);
    setError("");

    // Simpan ke tabel aspirasi sebagai notifikasi interest bootcamp
    const { error: dbErr } = await supabase.from("aspirasi").insert({
      nama: nama.trim(),
      pesan: `[BOOTCAMP INTEREST] Email: ${email.trim()}`,
      status: "baru",
    });

    setSending(false);
    if (dbErr) { setError("Gagal mendaftar. Coba lagi."); return; }
    setSent(true);
  }

  const features = [
    { icon: "terminal", label: "Pemrograman Dasar", desc: "HTML, CSS, JavaScript, Python dari nol" },
    { icon: "design_services", label: "UI/UX Design", desc: "Figma, prototyping, dan design thinking" },
    { icon: "psychology", label: "AI & Data", desc: "Machine learning dan analitik data" },
    { icon: "hub", label: "Kolaborasi Tim", desc: "Project nyata bersama kader FST" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto text-center">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-6"
      >
        <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[13px] font-bold tracking-widest uppercase px-5 py-2 rounded-full">
          🚧 Segera Hadir
        </span>
      </motion.div>

      {/* Judul */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-[clamp(2rem,6vw,3.2rem)] font-black text-[#001e40] tracking-tight leading-[1.1] mb-4"
      >
        Bootcamp<br />
        <span className="text-[#0059bb]">PMII Rayon</span> Hasyim Asy&apos;ari
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[15px] text-[#4a5a6e] leading-relaxed max-w-lg mx-auto mb-10"
      >
        Program intensif belajar teknologi untuk kader FST UNUGIRI. Dari nol hingga siap berkarir
        — dibimbing langsung oleh praktisi dan senior rayon.
      </motion.p>

      {/* Feature cards */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.07 }}
            className="bg-white/80 border border-[#d0e4ff] rounded-2xl p-4 backdrop-blur-sm"
          >
            <span
              className="material-symbols-outlined text-[32px] text-[#0059bb] mb-2 block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {f.icon}
            </span>
            <p className="text-[13px] font-bold text-[#0a1628] mb-0.5">{f.label}</p>
            <p className="text-[11px] text-[#4a5a6e]">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#001e40]/15 to-transparent mb-10" />

      {/* Form notifikasi */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-2xl border border-[#d0e4ff] shadow-sm p-8 max-w-md mx-auto"
      >
        {sent ? (
          <div className="text-center py-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-green-600 text-[32px]">check_circle</span>
            </div>
            <h3 className="font-bold text-[#001e40] text-lg mb-2">Kamu sudah terdaftar!</h3>
            <p className="text-sm text-[#4a5a6e]">
              Kami akan menghubungi kamu segera setelah pendaftaran bootcamp dibuka.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-bold text-[#001e40] text-lg mb-1">Daftar Notifikasi</h2>
            <p className="text-sm text-[#4a5a6e] mb-5">
              Masukkan datamu dan kami akan beritahu kamu begitu bootcamp dibuka.
            </p>
            <form onSubmit={handleNotify} className="space-y-3 text-left">
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">
                  Nama lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  value={nama}
                  onChange={e => setNama(e.target.value)}
                  required
                  placeholder="Nama kamu"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">
                  Email aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20"
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-xl">{error}</p>
              )}
              <button
                type="submit"
                disabled={sending || !email || !nama}
                className="w-full flex items-center justify-center gap-2 bg-[#0059bb] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#0047a0] transition disabled:opacity-60"
              >
                {sending && (
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                )}
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  notifications_active
                </span>
                {sending ? "Mendaftarkan..." : "Beritahu Saya"}
              </button>
            </form>
          </>
        )}
      </motion.div>

    </div>
  );
}
