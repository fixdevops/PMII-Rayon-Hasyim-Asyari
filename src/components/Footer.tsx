import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-black/[0.06]">
      <div className="w-full px-[var(--page-padding)]">
        <div className="mx-auto max-w-[var(--container-width)] py-12 flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#001e40] flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="font-semibold text-[15px] text-[#0f0f0f]">
                PMII Rayon Hasyim Asyari
              </span>
            </div>
            <p className="text-[14px] text-[#0f0f0f]/50 leading-relaxed font-medium">
              Fakultas Sains & Teknologi.<br />
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
                  { href: "/kaderisasi", label: "Kaderisasi" },
                  { href: "/kegiatan", label: "Kegiatan" },
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
                  <a
                    href="mailto:rayonfst@pmii.or.id"
                    className="text-[14px] font-medium text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors"
                  >
                    rayonfst@pmii.or.id
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[14px] font-medium text-[#0f0f0f]/60 hover:text-[#0f0f0f] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/[0.06] py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-[#0f0f0f]/40 font-medium tracking-tight">
            © 2025 PMII Rayon Hasyim Asyari FST.
          </p>
          <p className="text-[13px] text-[#0f0f0f]/40 font-medium tracking-tight">
            Generasi Ulul Albab
          </p>
        </div>
      </div>
    </footer>
  );
}
