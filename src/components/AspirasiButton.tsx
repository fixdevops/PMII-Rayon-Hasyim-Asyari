"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AspirasiButton() {
  const [open, setOpen] = useState(false);

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
        {/* Icon */}
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
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
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
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-lg bg-black/[0.05] hover:bg-black/10 flex items-center justify-center transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 1l10 10M11 1L1 11" stroke="#0f0f0f" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <p className="text-[14px] text-[#4a5a6e] leading-relaxed mb-6">
                  Fasilitas ini disediakan sebagai sarana bagi seluruh mahasiswa untuk menyampaikan
                  aspirasi, kritik, saran, atau laporan terkait berbagai isu dan pelayanan di
                  lingkungan PMII Rayon Hasyim Asy&apos;ari. Gunakanlah saluran ini untuk membantu
                  meningkatkan kualitas organisasi.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20PMII%20Rayon%20Hasyim%20Asyari%2C%20saya%20ingin%20menyampaikan%20aspirasi%3A"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#001e40] hover:bg-[#002d5e] text-white py-2.5 px-4 rounded-xl font-bold text-[13px] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Kirim via WhatsApp
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-black/[0.05] hover:bg-black/[0.08] text-[#0f0f0f]/60 font-semibold text-[13px] transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
