"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block" suppressHydrationWarning>
      {/* Background — muncul saat scroll */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.06)" : "none",
        }}
      />

      <div className="relative w-full px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between h-[64px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logorayon.png"
              alt="Logo PMII Rayon Hasyim Asy'ari"
              width={34}
              height={34}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-bold tracking-widest text-[#1a1a1a]">PMII</span>
              <span className="text-[9px] font-medium tracking-widest uppercase text-[#6b6b6b]">
                Rayon Hasyim Asy&apos;ari
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const base = link.href.split("#")[0];
              const isActive = pathname === base || (base !== "/" && pathname.startsWith(base));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-[13px] transition-colors duration-150 ${
                    isActive
                      ? "bg-[#1a1a1a] text-white font-semibold"
                      : "text-[#6b6b6b] hover:text-[#1a1a1a] hover:bg-[#f2f2f2] font-normal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Spacer — agar nav tetap center */}
          <div className="w-[120px]" />

        </div>
      </div>
    </nav>
  );
}
