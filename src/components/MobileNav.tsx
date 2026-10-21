"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kaderisasi", label: "Belajar" },
  { href: "/#tentang", label: "Tentang" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 md:hidden w-9 h-9 rounded-full bg-white border border-black/[0.1] shadow-sm flex flex-col justify-center items-center gap-[5px]"
        aria-label="Buka menu"
      >
        <span className="w-5 h-[2px] bg-[#1a1a1a] rounded-full" />
        <span className="w-5 h-[2px] bg-[#1a1a1a] rounded-full" />
        <span className="w-5 h-[2px] bg-[#1a1a1a] rounded-full" />
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

            {/* Sidebar */}
            <motion.aside
              key="sidebar"
              className="fixed top-0 right-0 bottom-0 z-[60] md:hidden flex flex-col bg-white"
              style={{
                width: "min(280px, 80vw)",
                boxShadow: "-4px 0 40px rgba(0,0,0,0.15)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-black/[0.06]">
                <Link
                  href="/"
                  className="flex items-center gap-2.5"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src="/logorayon.png"
                    alt="Logo PMII Rayon Hasyim Asy'ari"
                    width={32}
                    height={32}
                    className="rounded-full object-contain"
                  />
                  <span className="text-[13px] font-bold text-[#1a1a1a]">
                    PMII Rayon Hasyim Asy&apos;ari
                  </span>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f2f2f2] flex items-center justify-center"
                  aria-label="Tutup menu"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 1l10 10M11 1L1 11"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {navItems.map((item, i) => {
                  const base = item.href.split("#")[0];
                  const isActive =
                    pathname === base ||
                    (base !== "/" && pathname.startsWith(base));
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
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] transition-all duration-150 ${
                          isActive
                            ? "bg-[#f2f2f2] text-[#1a1a1a] font-semibold"
                            : "text-[#6b6b6b] hover:bg-[#f9f9f9]"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] flex-shrink-0" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="px-4 pb-10 pt-3 border-t border-black/[0.06]">
                <p className="text-[10px] text-[#6b6b6b] text-center">
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
