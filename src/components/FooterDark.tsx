import Link from "next/link";

export default function FooterDark() {
  return (
    <footer className="relative bg-white border-t border-black/[0.06]" id="kontak">
      {/* Contact section */}
      <div className="w-full px-[var(--page-padding)]">
        <div className="mx-auto max-w-[var(--container-width)] py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <p className="text-[13px] font-semibold text-[#0f0f0f]/40 uppercase tracking-wider mb-4">
                Hubungi Kami
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] mb-2">
                Mari Berdiskusi
              </h2>
              <p className="text-[15px] text-[#0f0f0f]/55 font-medium mb-8 leading-relaxed">
                Pintu kami selalu terbuka untuk diskusi, kolaborasi, dan silaturahmi.
              </p>
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-medium text-[#0f0f0f]/50 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ahmad Dzikri"
                    className="w-full rounded-xl border border-black/[0.1] bg-[#f9f9f9] px-4 py-3 text-[15px] text-[#0f0f0f] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#001e40]/20 focus:border-[#001e40]/40 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[13px] font-medium text-[#0f0f0f]/50 mb-1.5">
                    Alamat Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="ahmad@example.com"
                    className="w-full rounded-xl border border-black/[0.1] bg-[#f9f9f9] px-4 py-3 text-[15px] text-[#0f0f0f] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#001e40]/20 focus:border-[#001e40]/40 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[13px] font-medium text-[#0f0f0f]/50 mb-1.5">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tuliskan gagasan atau pertanyaan Anda..."
                    className="w-full rounded-xl border border-black/[0.1] bg-[#f9f9f9] px-4 py-3 text-[15px] text-[#0f0f0f] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#001e40]/20 focus:border-[#001e40]/40 transition-all resize-none h-28"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-[#001e40] text-white text-[14px] font-medium px-6 py-2.5 rounded-full hover:bg-[#001e40]/85 active:scale-95 transition-all duration-150"
                >
                  Kirim Pesan
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <p className="text-[13px] font-semibold text-[#0f0f0f]/40 uppercase tracking-wider mb-6">
                    Informasi Kontak
                  </p>
                  <div className="space-y-5">
                    {[
                      { icon: "location_on", label: "Sekretariat", value: "Kampus FST, Sekretariat PMII Rayon Hasyim Asyari" },
                      { icon: "chat", label: "WhatsApp", value: "+62 812 3456 7890" },
                      { icon: "mail", label: "Email", value: "info@pmiirayonfst.org" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#f0f3ff] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[#001e40] text-[18px]">
                            {item.icon}
                          </span>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#0f0f0f]/40 uppercase tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-[14px] font-medium text-[#0f0f0f]/70">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#f9f9f9] border border-black/[0.06] flex items-center justify-between group cursor-pointer hover:border-black/[0.12] transition-all">
                  <div>
                    <p className="text-[14px] font-semibold text-[#0f0f0f] mb-0.5">Temukan Kami</p>
                    <p className="text-[13px] text-[#0f0f0f]/50">Buka lokasi di Google Maps</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#001e40]/6 flex items-center justify-center text-[#001e40] group-hover:bg-[#001e40] group-hover:text-white transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-black/[0.06] py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#001e40] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">P</span>
            </div>
            <p className="text-[13px] text-[#0f0f0f]/40 font-medium">
              © 2025 PMII Rayon Hasyim Asyari FST
            </p>
          </div>
          <div className="flex items-center gap-5">
            {[
              { href: "/", label: "Beranda" },
              { href: "/kaderisasi", label: "Kaderisasi" },
              { href: "/kegiatan", label: "Kegiatan" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-[13px] text-[#0f0f0f]/40 hover:text-[#0f0f0f] font-medium transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
