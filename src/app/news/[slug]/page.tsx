import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import AspirasiButton from "@/components/AspirasiButton";
import ShareButtons from "@/components/ShareButtons";
import NewsInteraction, { KomentarSection } from "./NewsInteraction";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic'

interface Kegiatan {
  id: string
  judul: string
  slug: string
  deskripsi: string | null
  konten: string | null
  tanggal: string
  lokasi: string | null
  foto_url: string | null
  penulis_id?: string | null
  penulis_nama?: string | null
}

async function getBySlug(slug: string): Promise<Kegiatan | null> {
  // Coba cari by slug dulu
  const { data } = await supabase
    .from("kegiatan")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()
  if (data) return data

  // Fallback: coba cari by id (untuk URL lama /news/uuid)
  const { data: byId } = await supabase
    .from("kegiatan")
    .select("*")
    .eq("id", slug)
    .maybeSingle()
  return byId ?? null
}

async function getNewsLain(id: string): Promise<Kegiatan[]> {
  const { data } = await supabase
    .from("kegiatan")
    .select("id, judul, slug, tanggal, foto_url, deskripsi, lokasi, konten")
    .neq("id", id)
    .order("tanggal", { ascending: false })
    .limit(3)
  return data ?? []
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const kegiatan = await getBySlug(slug)
  if (!kegiatan) return { title: "News tidak ditemukan" }

  const BASE = 'https://www.pmiirayonhasyimasyari.my.id'
  const pageUrl = `${BASE}/news/${kegiatan.slug ?? slug}`

  // OG image dinamis via /api/og — WA dan platform lain bisa crawl dengan baik
  const ogParams = new URLSearchParams({
    judul: kegiatan.judul,
    ...(kegiatan.deskripsi ? { deskripsi: kegiatan.deskripsi } : {}),
    ...(kegiatan.foto_url ? { foto: kegiatan.foto_url } : {}),
  })
  const ogImageUrl = `${BASE}/api/og?${ogParams.toString()}`

  const desc = kegiatan.deskripsi ?? `Berita dan kegiatan PMII Rayon Hasyim Asy'ari: ${kegiatan.judul}`

  return {
    title: `${kegiatan.judul} | PMII Rayon Hasyim Asy'ari`,
    description: desc,
    openGraph: {
      title: kegiatan.judul,
      description: desc,
      url: pageUrl,
      siteName: "PMII Rayon Hasyim Asy'ari",
      type: 'article',
      publishedTime: kegiatan.tanggal,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: kegiatan.judul }],
      locale: 'id_ID',
    },
    twitter: {
      card: 'summary_large_image',
      title: kegiatan.judul,
      description: desc,
      images: [ogImageUrl],
    },
  }
}

export default async function NewsDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const kegiatan = await getBySlug(slug)

  if (!kegiatan) notFound()

  const newsLain = await getNewsLain(kegiatan.id)

  // Reading time calculation
  const wordCount = (kegiatan.konten ?? '').replace(/(<([^>]+)>)/gi, '').split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const tanggalFormatted = new Date(kegiatan.tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="bg-white text-[#1a1a1a] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[
        { label: "News", href: "/news" },
        { label: kegiatan.judul },
      ]} />

      <main className="flex-grow w-full pb-16 pt-6 md:pt-24">
        <div className="max-w-[680px] mx-auto px-6">

          {/* Kembali ke News */}
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition mb-8"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L6 8l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Kembali ke News
          </Link>

          <article>
            {/* Judul */}
            <h1
              className="font-bold text-[#1a1a1a] leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 2.625rem)' }}
            >
              {kegiatan.judul}
            </h1>

            {/* Author info row */}
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logorayon.png"
                alt="Redaksi"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="font-medium text-sm text-[#1a1a1a]">{kegiatan.penulis_nama ? kegiatan.penulis_nama : "Redaksi Rayon Hasyim Asy'ari"}</p>
                <p className="text-[#6b6b6b] text-sm">
                  {tanggalFormatted}
                  <span className="mx-1.5">·</span>
                  {readTime} menit baca
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#e5e5e5] my-4" />

            {/* Action row */}
            <div className="flex items-center justify-between gap-3 mb-8">
              <div className="flex items-center gap-4">
                <NewsInteraction
                  kegiatanId={kegiatan.id}
                  judul={kegiatan.judul}
                  deskripsi={kegiatan.deskripsi}
                  url={`https://www.pmiirayonhasyimasyari.my.id/news/${kegiatan.slug ?? kegiatan.id}`}
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Share — 1 tombol cerdas */}
                <ShareButtons
                  judul={kegiatan.judul}
                  deskripsi={kegiatan.deskripsi}
                  url={`https://www.pmiirayonhasyimasyari.my.id/news/${kegiatan.slug}`}
                />
              </div>
            </div>
          </article>
        </div>

        {/* Hero image — sedikit lebih lebar dari kolom artikel */}
        {kegiatan.foto_url ? (
          <>
            <div className="max-w-[800px] mx-auto px-6 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={kegiatan.foto_url}
                alt={kegiatan.judul}
                className="w-full object-cover rounded-lg"
                style={{ aspectRatio: '16/9', maxHeight: '400px' }}
              />
            </div>
            {/* Motivasi — tepat di bawah gambar, tengah, italic */}
            {kegiatan.deskripsi && (
              <div className="max-w-[680px] mx-auto px-6 mb-8">
                <p className="text-[14px] text-[#6b6b6b] leading-relaxed text-center italic">
                  {kegiatan.deskripsi}
                </p>
              </div>
            )}
          </>
        ) : (
          /* Tidak ada foto: motivasi tetap muncul di kolom artikel */
          kegiatan.deskripsi && (
            <div className="max-w-[680px] mx-auto px-6 mb-8">
              <p className="text-[17px] text-[#6b6b6b] leading-relaxed text-center italic">
                {kegiatan.deskripsi}
              </p>
            </div>
          )
        )}

        <div className="max-w-[680px] mx-auto px-6">
          {/* Body teks */}
          {kegiatan.konten && kegiatan.konten !== '<p></p>' ? (
            <div
              style={{ fontFamily: 'Georgia, serif' }}
              className="
                prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-[#1a1a1a]
                prose-p:text-[#292929] prose-p:leading-[1.8]
                prose-a:text-[#1a8917] hover:prose-a:underline
                prose-strong:text-[#1a1a1a]
                prose-blockquote:border-l-4 prose-blockquote:border-[#1a1a1a] prose-blockquote:italic prose-blockquote:text-[#6b6b6b] prose-blockquote:not-italic
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:text-[#292929]
              "
              dangerouslySetInnerHTML={{ __html: kegiatan.konten }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-[#6b6b6b] gap-2">
              <p className="text-sm">Konten lengkap belum ditambahkan.</p>
            </div>
          )}

          {/* Footer artikel */}
          <div className="mt-12">
            {/* 3 dots separator */}
            <div className="flex justify-center gap-2 my-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b3b3b3]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#b3b3b3]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#b3b3b3]" />
            </div>

            {/* Author bio card */}
            <div className="bg-[#f9f9f9] rounded-2xl p-6 mb-10">
              <div className="flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logorayon.png"
                  alt="Redaksi"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="font-bold text-lg text-[#1a1a1a] mb-1">Redaksi Rayon Hasyim Asy&apos;ari</p>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">
                    Redaksi resmi PMII Rayon Hasyim Asy&apos;ari FST UNUGIRI Bojonegoro. Menyajikan informasi kegiatan, kajian, dan perkembangan organisasi.
                  </p>
                  <button className="border border-[#1a1a1a] text-[#1a1a1a] rounded-full px-5 py-2 text-sm font-medium hover:bg-[#1a1a1a] hover:text-white transition">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Komentar */}
          <KomentarSection
            kegiatanId={kegiatan.id}
            judul={kegiatan.judul}
            deskripsi={kegiatan.deskripsi}
            url={`https://www.pmiirayonhasyimasyari.my.id/news/${kegiatan.slug ?? kegiatan.id}`}
          />

          {/* Rekomendasi untuk Anda */}
          {newsLain.length > 0 && (
            <section className="mt-6 mb-16">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Rekomendasi untuk Anda</h2>
              <div>
                {newsLain.map((k, i) => {
                  const kWordCount = (k.konten ?? '').replace(/(<([^>]+)>)/gi, '').split(/\s+/).filter(Boolean).length
                  const kReadTime = Math.max(1, Math.ceil(kWordCount / 200))
                  const kTanggal = new Date(k.tanggal).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })
                  return (
                    <div key={k.id}>
                      {i > 0 && <div className="border-t border-[#e5e5e5]" />}
                      <Link href={`/news/${k.slug ?? k.id}`} className="flex items-start gap-4 py-5 hover:bg-[#f9f9f9] -mx-3 px-3 rounded-lg transition group">
                        {/* Kiri: teks */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#1a1a1a] text-[16px] leading-snug mb-1 line-clamp-2 group-hover:underline">
                            {k.judul}
                          </h3>
                          <p className="text-[#6b6b6b] text-sm">
                            {kTanggal}
                            <span className="mx-1.5">·</span>
                            {kReadTime} menit baca
                          </p>
                        </div>
                        {/* Kanan: gambar */}
                        <div className="w-[112px] h-[75px] rounded overflow-hidden flex-shrink-0 bg-[#f2f2f2]">
                          {k.foto_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={k.foto_url}
                              alt={k.judul}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21 15l-5-5-4 4-3-3-5 5V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10zm0 2.828l-5-5-4 4-3-3-5 4.172V19a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1.172z"/>
                              </svg>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

        </div>
      </main>

      <AspirasiButton />
      <Footer />
    </div>
  )
}
