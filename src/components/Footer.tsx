import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-black/[0.06]">
      <div className="w-full px-[var(--page-padding)]">
        <div className="mx-auto max-w-[var(--container-width)] py-12 flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logoi pmii.png"
                alt="Logo PMII"
                width={44}
                height={44}
                className="object-contain flex-shrink-0"
              />
              <span className="font-bold text-[15px] text-[#001e40]">
                PMII Rayon Hasyim Asy&apos;ari
              </span>
            </div>
            <p className="text-[14px] text-[#0f0f0f]/50 leading-relaxed font-medium">
              Fakultas Sains &amp; Teknologi.<br />
              Dzikir, Fikir, Amal Sholeh.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <p className="text-[11px] font-semibold text-[#0f0f0f]/40 uppercase tracking-wider mb-3">
                Halaman
              </p>
              <ul className="space-y-2">
                {[
                  { href: "/", label: "Beranda" },
                  { href: "/#tentang", label: "Tentang" },
                  { href: "/kaderisasi", label: "Belajar" },
                  { href: "/kegiatan", label: "News" },
                  { href: "/galeri", label: "Galeri" },
                  { href: "/anggota", label: "Anggota" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14px] font-medium text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#0f0f0f]/40 uppercase tracking-wider mb-3">
                Kontak
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:rayonfst@pmii.or.id"
                    className="text-[14px] font-medium text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors">
                    rayonfst@pmii.or.id
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                    className="text-[14px] font-medium text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#"
                    className="text-[14px] font-medium text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/[0.06] py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image src="/logoi pmii.png" alt="Logo" width={22} height={22} className="object-contain opacity-60" />
            <p className="text-[13px] text-[#0f0f0f]/40 font-medium tracking-tight">
              © 2025 PMII Rayon Hasyim Asy&apos;ari FST.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
