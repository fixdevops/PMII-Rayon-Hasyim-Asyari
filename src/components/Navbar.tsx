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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 hidden md:block bg-white transition-shadow duration-300"
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
      }}
      suppressHydrationWarning
    >
      <div className="w-full px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between h-[60px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/logorayon.png"
                alt="Logo PMII Rayon Hasyim Asy'ari"
                width={40}
                height={40}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[14px] font-bold text-[#1a1a1a]">PMII</span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-[#6b6b6b]">
                Rayon Hasyim Asy&apos;ari
              </span>
            </div>
          </Link>

          {/* Nav links — plain, seperti footer */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const base = link.href.split("#")[0];
              const isActive = pathname === base || (base !== "/" && pathname.startsWith(base));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[14px] transition-colors duration-150 ${
                    isActive
                      ? "text-[#1a1a1a] font-semibold"
                      : "text-[#6b6b6b] hover:text-[#1a1a1a] font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Spacer kanan agar nav tetap center */}
          <div className="w-[120px]" />

        </div>
      </div>
    </nav>
  );
}
