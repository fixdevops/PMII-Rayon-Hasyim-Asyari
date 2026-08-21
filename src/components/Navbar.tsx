"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/kegiatan", label: "News" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kaderisasi", label: "Belajar" },
  { href: "/#tentang", label: "Tentang" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 hidden md:block"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.1 }}
    >
      {/* Blur bg that fades in on scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0)",
          borderBottomColor: scrolled ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: "1px solid",
          boxShadow: scrolled ? "0 1px 24px rgba(0,20,60,0.07)" : "none",
        }}
      />

      <div className="relative w-full px-[var(--page-padding)]">
        <div className="mx-auto max-w-[var(--container-width)] flex items-center justify-between h-[68px]">

          {/* ── BRAND ── */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ rotate: 8, scale: 1.08 }} transition={{ type: "spring", stiffness: 300 }}>
              <Image
                src="/logojadisatu.svg"
                alt="Logo PMII Rayon Hasyim Asy'ari"
                width={38}
                height={38}
                className="object-contain"
              />
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-black text-[#001e40] tracking-[0.08em]">PMII</span>
              <span className="text-[9.5px] font-semibold text-[#001e40]/50 tracking-[0.12em] uppercase">Rayon Hasyim Asy&apos;ari</span>
            </div>
          </Link>

          {/* ── NAV PILL ── */}
          <div
            className="flex items-center gap-1 px-2 py-2 rounded-full"
            style={{
              background: scrolled ? "rgba(0,0,0,0.04)" : "rgba(0,30,64,0.05)",
              border: "1px solid rgba(0,30,64,0.07)",
            }}
          >
            {navLinks.map((link) => {
              const base = link.href.split("#")[0];
              const isActive = pathname === base || (base !== "/" && pathname.startsWith(base));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors duration-150 outline-none"
                  style={{ color: isActive ? "#001e40" : "rgba(15,15,15,0.5)" }}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {/* Active pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      style={{ boxShadow: "0 1px 8px rgba(0,30,64,0.12), 0 0 0 1px rgba(0,30,64,0.06)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover pill background */}
                  <AnimatePresence>
                    {hoveredLink === link.href && !isActive && (
                      <motion.span
                        key="hover"
                        className="absolute inset-0 rounded-full bg-white/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>

                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* ── CTA BUTTON ── */}
          <motion.a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 rounded-full"
            style={{
              background: "linear-gradient(135deg, #001e40 0%, #003d8a 100%)",
              boxShadow: "0 4px 16px rgba(0,30,64,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 24px rgba(0,30,64,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Shimmer */}
            <motion.span
              className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
              initial={false}
            >
              <motion.span
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
              />
            </motion.span>

            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              how_to_reg
            </span>
            Daftar Kader
          </motion.a>

        </div>
      </div>
    </motion.nav>
  );
}
