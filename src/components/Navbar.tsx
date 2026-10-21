"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
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
      suppressHydrationWarning
    >
      {/* Animated background overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.92)"
            : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.07)" : "none",
        }}
      />

      <div className="relative w-full px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between h-[68px]">

          {/* ── LOGO ── */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Image
                src="/logorayon.png"
                alt="Logo PMII Rayon Hasyim Asy'ari"
                width={36}
                height={36}
                className="rounded-full object-contain"
              />
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-black tracking-widest text-[#1a1a1a]">PMII</span>
              <span className="text-[9px] font-semibold tracking-widest uppercase text-[#6b6b6b]">
                Rayon Hasyim Asy&apos;ari
              </span>
            </div>
          </Link>

          {/* ── NAV PILL ── */}
          <div
            className="flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-[#f2f2f2]"
            style={{ border: "1px solid rgba(0,0,0,0.06)" }}
          >
            {navLinks.map((link) => {
              const base = link.href.split("#")[0];
              const isActive =
                pathname === base || (base !== "/" && pathname.startsWith(base));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-1.5 rounded-full text-[13px] transition-colors duration-150 outline-none"
                  style={{
                    color: isActive ? "#1a1a1a" : "#6b6b6b",
                    fontWeight: isActive ? 600 : 400,
                  }}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {/* Active pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.1)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover pill */}
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
            href="/bootcamp"
            className="flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 rounded-full relative overflow-hidden"
            style={{
              background: "#1a1a1a",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
            whileHover={{ scale: 1.03, background: "#333" } as Parameters<typeof motion.a>[0]["whileHover"]}
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
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
            </motion.span>

            <span
              className="material-symbols-outlined text-[15px] relative z-10"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              rocket_launch
            </span>
            <span className="relative z-10">Daftar Free Bootcamp</span>
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
