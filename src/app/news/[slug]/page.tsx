import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import AspirasiButton from "@/components/AspirasiButton";
import ShareButtons from "@/components/ShareButtons";
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
  kategori: string
}

const kategoriColor: Record<string, string> = {
  umum: 'bg-gray-100 text-gray-700',
  kajian: 'bg-blue-100 text-blue-700',
  pelatihan: 'bg-purple-100 text-purple-700',
  'aksi sosial': 'bg-green-100 text-green-700',
  kaderisasi: 'bg-yellow-100 text-yellow-700',
  keagamaan: 'bg-emerald-100 text-emerald-700',
  rapat: 'bg-orange-100 text-orange-700',
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
    .select("id, judul, slug, tanggal, foto_url, kategori, deskripsi, lokasi, konten")
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

  const pageUrl = `https://rayonhasyimasyari.vercel.app/news/${kegiatan.slug}`
  const ogImage = kegiatan.foto_url
    ? [{ url: kegiatan.foto_url, width: 1200, height: 630, alt: kegiatan.judul }]
    : [{ url: 'https://rayonhasyimasyari.vercel.app/logorayon.png', width: 1200, height: 630, alt: "PMII Rayon Hasyim Asy'ari" }]

  return {
    title: `${kegiatan.judul} | PMII Rayon Hasyim Asy'ari`,
    description: kegiatan.deskripsi ?? `News PMII Rayon Hasyim Asy'ari: ${kegiatan.judul}`,
    openGraph: {
      title: kegiatan.judul,
      description: kegiatan.deskripsi ?? `News PMII Rayon Hasyim Asy'ari`,
      url: pageUrl,
      siteName: "PMII Rayon Hasyim Asy'ari",
      type: 'article',
      publishedTime: kegiatan.tanggal,
      images: ogImage,
      locale: 'id_ID',
    },
    twitter: {
      card: 'summary_large_image',
      title: kegiatan.judul,
      description: kegiatan.deskripsi ?? `News PMII Rayon Hasyim Asy'ari`,
      images: kegiatan.foto_url ? [kegiatan.foto_url] : ['https://rayonhasyimasyari.vercel.app/logorayon.png'],
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

  return (
    <div className="text-[#0f0f0f] overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ddeeff 0%, #eef5ff 20%, #ffffff 50%)" }}>
      <Navbar />
      <MobileNav />
      <MobileHeader crumbs={[
        { label: "News", href: "/news" },
        { label: kegiatan.judul },
      ]} />

      <main className="flex-grow w-full px-6 pb-16 pt-6 md:pt-24">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb desktop */}
          <div className="hidden md:flex items-center gap-2 text-[13px] text-[#0f0f0f]/40 mb-6">
            <Link href="/news" className="hover:text-[#0059bb] transition">News</Link>
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[#0f0f0f]/60 line-clamp-1">{kegiatan.judul}</span>
          </div>

          {/* Artikel */}
          <article>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold capitalize border border-black/[0.06] ${kategoriColor[kegiatan.kategori] ?? 'bg-gray-100 text-gray-700'}`}>
                {kegiatan.kategori}
              </span>
              <span className="flex items-center gap-1 text-[13px] text-[#0f0f0f]/40">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                {new Date(kegiatan.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              {kegiatan.lokasi && (
                <span className="flex items-center gap-1 text-[13px] text-[#0f0f0f]/40">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  {kegiatan.lokasi}
                </span>
              )}
            </div>

            <h1 className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-[#001e40] leading-tight mb-6">
              {kegiatan.judul}
            </h1>

            {kegiatan.foto_url && (
              <div className="rounded-2xl overflow-hidden mb-8 border border-[#d0e4ff]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={kegiatan.foto_url} alt={kegiatan.judul}
                  className="w-full object-cover max-h-[480px]" />
              </div>
            )}

            {kegiatan.deskripsi && (
              <p className="text-[16px] text-[#3a4a5e] leading-relaxed font-medium border-l-4 border-[#0059bb] pl-4 mb-8 italic">
                {kegiatan.deskripsi}
              </p>
            )}

            {kegiatan.konten && kegiatan.konten !== '<p></p>' ? (
              <div
                className="
                  prose prose-sm md:prose-base max-w-none
                  prose-headings:text-[#001e40] prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
                  prose-p:text-[#0f0f0f]/80 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-[#0059bb] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[#001e40]
                  prose-blockquote:border-l-4 prose-blockquote:border-[#0059bb] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#3a4a5e]
                  prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5
                  prose-li:text-[#0f0f0f]/80 prose-li:mb-1
                "
                dangerouslySetInnerHTML={{ __html: kegiatan.konten }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-[#3a4a5e]/50 gap-2 rounded-2xl border border-dashed border-[#d0e4ff]">
                <span className="material-symbols-outlined text-[36px]">article</span>
                <p className="text-sm">Konten lengkap belum ditambahkan.</p>
              </div>
            )}
          </article>

          <ShareButtons
            judul={kegiatan.judul}
            deskripsi={kegiatan.deskripsi}
            url={`https://rayonhasyimasyari.vercel.app/news/${kegiatan.slug}`}
          />

          <div className="mt-10">
            <Link href="/news"
              className="inline-flex items-center gap-2 border border-[#0059bb]/30 text-[#0059bb] text-[14px] font-semibold px-5 py-2.5 rounded-full hover:bg-[#0059bb] hover:text-white transition-all duration-200">
              <svg className="w-4 h-4 rotate-180" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kembali ke News
            </Link>
          </div>

          {newsLain.length > 0 && (
            <section className="mt-16">
              <h2 className="text-[17px] font-bold text-[#001e40] mb-5">News Lainnya</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {newsLain.map(k => (
                  <Link key={k.id} href={`/news/${k.slug ?? k.id}`}
                    className="group rounded-xl overflow-hidden bg-white/80 border border-[#d0e4ff] hover:shadow-md transition-all duration-200">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      {k.foto_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={k.foto_url} alt={k.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-gray-200 text-[36px]">image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-[11px] text-[#0f0f0f]/40 mb-1">
                        {new Date(k.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <h3 className="text-[13px] font-semibold text-[#001e40] line-clamp-2 leading-snug">{k.judul}</h3>
                    </div>
                  </Link>
                ))}
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
