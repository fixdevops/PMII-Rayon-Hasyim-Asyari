import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/[0.08]">
      <div className="max-w-5xl mx-auto px-6">

        {/* Main row */}
        <div className="py-12 flex flex-col md:flex-row items-start justify-between gap-10">

          {/* Brand */}
          <div className="max-w-[200px]">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logoi pmii.png"
                alt="Logo PMII"
                width={36}
                height={36}
                className="object-contain flex-shrink-0"
              />
              <span className="font-bold text-[14px] text-[#001e40] leading-tight">
                PMII Rayon<br />Hasyim Asy&apos;ari
              </span>
            </div>
            <p className="text-[13px] text-[#0f0f0f]/50 leading-relaxed">
              Fakultas Sains &amp; Teknologi.<br />
              Dzikir, Fikir, Amal Sholeh.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">

            {/* Halaman — 2 kolom */}
            <div>
              <p className="text-[11px] font-semibold text-[#0f0f0f]/40 uppercase tracking-widest mb-4">
                Halaman
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                {[
                  { href: "/", label: "Beranda" },
                  { href: "/#tentang", label: "Tentang" },
                  { href: "/kaderisasi", label: "Belajar" },
                  { href: "/news", label: "News" },
                  { href: "/galeri", label: "Galeri" },
                  { href: "/anggota", label: "Anggota" },
                  { href: "/daftar-penulis", label: "Daftar Penulis" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[13px] text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Kontak */}
            <div>
              <p className="text-[11px] font-semibold text-[#0f0f0f]/40 uppercase tracking-widest mb-4">
                Kontak
              </p>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="mailto:rayonfst@pmii.or.id"
                    className="text-[13px] text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors"
                  >
                    rayonfst@pmii.or.id
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[13px] text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/[0.06] py-5 flex items-center justify-center">
          <p className="text-[12px] text-[#0f0f0f]/40">
            © 2026 PMII Rayon Hasyim Asy&apos;ari FST. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
