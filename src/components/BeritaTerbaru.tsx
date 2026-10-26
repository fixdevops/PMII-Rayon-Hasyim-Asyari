import Link from "next/link";
import { supabase } from "@/lib/supabase";
import FadeInUp from "@/components/FadeInUp";

interface Kegiatan {
  id: string;
  judul: string;
  slug: string | null;
  deskripsi: string | null;
  tanggal: string;
  foto_url: string | null;
  konten: string | null;
}

async function getBeritaTerbaru(): Promise<Kegiatan[]> {
  const { data } = await supabase
    .from("kegiatan")
    .select("id, judul, slug, deskripsi, tanggal, foto_url, konten")
    .order("tanggal", { ascending: false })
    .limit(4);
  return data ?? [];
}

function readTime(konten: string | null) {
  const words = (konten ?? "").replace(/(<([^>]+)>)/gi, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatTanggal(t: string) {
  return new Date(t).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BeritaTerbaru() {
  const berita = await getBeritaTerbaru();
  if (berita.length === 0) return null;

  const [utama, ...sisanya] = berita;

  return (
    <section className="py-20 bg-white">
      <div className="w-full px-[var(--page-padding)]">
        <div className="mx-auto max-w-[var(--container-width)]">

          {/* Header */}
          <FadeInUp className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[12px] font-bold text-[#0059bb] uppercase tracking-widest mb-2">Terbaru</p>
              <h2 className="text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-[#0a1628] leading-tight">
                Berita & Kegiatan
              </h2>
            </div>
            <Link
              href="/news"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#0059bb] hover:underline"
            >
              Lihat semua
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </FadeInUp>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Berita utama — span 2 kolom di lg */}
            <FadeInUp className="lg:col-span-2" delay={0}>
              <Link
                href={`/news/${utama.slug ?? utama.id}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden border border-[#e5e5e5] hover:shadow-lg transition-shadow duration-300"
              >
                {/* Gambar */}
                <div className="relative w-full overflow-hidden bg-[#f2f2f2]" style={{ aspectRatio: "16/9" }}>
                  {utama.foto_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={utama.foto_url}
                      alt={utama.judul}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[48px] text-gray-300">image</span>
                    </div>
                  )}
                </div>

                {/* Konten */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-[12px] text-[#6b6b6b] mb-2">
                    {formatTanggal(utama.tanggal)}
                    <span className="mx-1.5">·</span>
                    {readTime(utama.konten)} menit baca
                  </p>
                  <h3 className="font-bold text-[#0a1628] text-[18px] leading-snug mb-2 group-hover:text-[#0059bb] transition-colors line-clamp-2">
                    {utama.judul}
                  </h3>
                  {utama.deskripsi && (
                    <p className="text-[13px] text-[#6b6b6b] leading-relaxed line-clamp-2 flex-1">
                      {utama.deskripsi}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0059bb] group-hover:gap-2 transition-all">
                    Baca selengkapnya
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </FadeInUp>

            {/* Berita kecil — kolom kanan */}
            <FadeInUp className="flex flex-col gap-4" delay={80}>
              {sisanya.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug ?? item.id}`}
                  className="group flex gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:shadow-md transition-shadow duration-300"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#f2f2f2]">
                    {item.foto_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.foto_url}
                        alt={item.judul}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[24px] text-gray-300">image</span>
                      </div>
                    )}
                  </div>

                  {/* Teks */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[#6b6b6b] mb-1">
                      {formatTanggal(item.tanggal)}
                    </p>
                    <h4 className="font-semibold text-[13px] text-[#0a1628] leading-snug line-clamp-2 group-hover:text-[#0059bb] transition-colors">
                      {item.judul}
                    </h4>
                    {item.deskripsi && (
                      <p className="text-[11px] text-[#6b6b6b] leading-relaxed line-clamp-2 mt-1">
                        {item.deskripsi}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </FadeInUp>

          </div>

          {/* Tombol lihat semua — mobile */}
          <div className="mt-8 flex justify-center md:hidden">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0059bb] text-[#0059bb] text-sm font-semibold hover:bg-[#0059bb] hover:text-white transition"
            >
              Lihat semua berita
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
