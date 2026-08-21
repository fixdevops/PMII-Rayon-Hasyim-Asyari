"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home", desc: "Halaman Utama" },
  { href: "/kegiatan", label: "News", desc: "Kegiatan Terkini" },
  { href: "/galeri", label: "Galeri", desc: "Dokumentasi Foto" },
  { href: "/kaderisasi", label: "Belajar", desc: "Sistem Kaderisasi" },
  { href: "/#tentang", label: "Tentang", desc: "Tentang Rayon" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger button — kanan atas */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 right-4 z-50 md:hidden w-10 h-10 rounded-xl bg-white border border-black/[0.08] shadow-sm flex flex-col justify-center items-center gap-[5px]"
        aria-label="Buka menu"
      >
        <span className="w-5 h-[2px] bg-[#001e40] rounded-full" />
        <span className="w-5 h-[2px] bg-[#001e40] rounded-full" />
        <span className="w-3 h-[2px] bg-[#001e40] rounded-full self-end mr-[5px]" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 md:hidden bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            {/* Sidebar — dari kanan */}
            <motion.aside
              key="sidebar"
              className="fixed top-0 right-0 bottom-0 z-[60] md:hidden flex flex-col bg-white"
              style={{
                width: "75vw",
                maxWidth: 300,
                boxShadow: "-4px 0 32px rgba(0,0,0,0.12)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-14 pb-5 border-b border-black/[0.06]">
                <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                  <Image src="/logoi pmii.png" alt="Logo PMII" width={40} height={40} className="object-contain" />
                  <div>
                    <p className="text-[13px] font-black text-[#001e40] tracking-wide leading-none">PMII</p>
                    <p className="text-[9px] font-semibold text-[#001e40]/50 tracking-widest leading-none mt-1 uppercase">Rayon Hasyim Asy&apos;ari</p>
                  </div>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-[#0f0f0f]/50 hover:text-[#0f0f0f] transition-all"
                  aria-label="Tutup menu"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Nav items — tanpa icon */}
              <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {navItems.map((item, i) => {
                  const base = item.href.split("#")[0];
                  const isActive = pathname === base || (base !== "/" && pathname.startsWith(base));
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.05, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-150 ${
                          isActive
                            ? "bg-[#001e40]/[0.06]"
                            : "hover:bg-black/[0.04]"
                        }`}
                      >
                        <div>
                          <p className={`text-[15px] font-semibold leading-none ${
                            isActive ? "text-[#001e40]" : "text-[#0f0f0f]/70"
                          }`}>
                            {item.label}
                          </p>
                          <p className="text-[11px] text-[#0f0f0f]/35 leading-none mt-1">
                            {item.desc}
                          </p>
                        </div>

                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0059bb] flex-shrink-0" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer CTA */}
              <div className="px-4 pb-10 pt-3 border-t border-black/[0.06]">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#001e40] text-white font-bold text-[13px] transition-all active:scale-95 hover:bg-[#002d5e]"
                >
                  Daftar Free Bootcamp
                </a>
                <p className="text-[10px] text-[#0f0f0f]/25 text-center mt-3">
                  © 2025 PMII Rayon Hasyim Asy&apos;ari FST
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
