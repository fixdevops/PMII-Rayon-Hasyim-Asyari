"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function AspirasiButton() {
  const [open, setOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pesan.trim()) return;
    setSending(true);
    setError("");
    const { error: dbError } = await supabase.from("aspirasi").insert({
      nama: nama.trim() || null,
      pesan: pesan.trim(),
      status: "baru",
    });
    setSending(false);
    if (dbError) {
      setError("Gagal mengirim. Coba lagi.");
      return;
    }
    setSent(true);
    setNama("");
    setPesan("");
  }

  function handleClose() {
    setOpen(false);
    setSent(false);
    setError("");
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 text-white font-bold py-3 px-5 rounded-full shadow-lg"
        style={{ background: "linear-gradient(135deg, #0059bb 0%, #fbbf24 100%)" }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }, scale: { type: "spring" } }}
      >
        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 8.25V5.25L20.25 3V21L15 18.75V15.75M15 8.25C15 10.3211 13.3211 12 11.25 12H8.25C6.17893 12 4.5 10.3211 4.5 8.25C4.5 6.17893 6.17893 4.5 8.25 4.5H11.25C13.3211 4.5 15 6.17893 15 8.25ZM8.25 12V19.5" />
          </svg>
        </span>
        Aspirasi
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-black/[0.06]">
                <div className="flex items-center justify-between">
                  <h2 className="text-[18px] font-black text-[#001e40]">Layanan Aspirasi</h2>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-lg bg-black/[0.05] hover:bg-black/10 flex items-center justify-center transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 1l10 10M11 1L1 11" stroke="#0f0f0f" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                <p className="text-[13px] text-[#4a5a6e] mt-2">
                  Sampaikan aspirasi, kritik, atau saran untuk PMII Rayon Hasyim Asy&apos;ari.
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                {sent ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-green-600 text-[32px]">check_circle</span>
                    </div>
                    <h3 className="font-bold text-[#001e40] mb-2">Aspirasi Terkirim!</h3>
                    <p className="text-sm text-gray-500 mb-4">Terima kasih, aspirasi kamu telah kami terima dan akan segera ditanggapi.</p>
                    <button onClick={handleClose}
                      className="bg-[#0059bb] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition">
                      Tutup
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">
                        Nama <span className="text-gray-400 font-normal">(opsional)</span>
                      </label>
                      <input value={nama} onChange={e => setNama(e.target.value)}
                        placeholder="Nama kamu atau kosongkan"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">
                        Aspirasi / Pesan <span className="text-red-500">*</span>
                      </label>
                      <textarea value={pesan} onChange={e => setPesan(e.target.value)}
                        rows={4} placeholder="Tulis aspirasi, kritik, saran, atau laporan kamu..."
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 resize-none" />
                    </div>
                    {error && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-xl">{error}</p>
                    )}
                    <button type="submit" disabled={sending || !pesan.trim()}
                      className="w-full bg-[#0059bb] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition disabled:opacity-60 flex items-center justify-center gap-2">
                      {sending && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
                      {sending ? "Mengirim..." : "Kirim Aspirasi"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
