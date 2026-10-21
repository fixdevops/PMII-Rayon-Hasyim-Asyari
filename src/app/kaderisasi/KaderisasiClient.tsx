'use client'

import Link from 'next/link'
import Image from 'next/image'
import FadeInUp from '@/components/FadeInUp'

interface Kursus {
  id: string
  no: number
  title: string
  deskripsi: string | null
  level: string
  materi: number
  durasi: string
  bg_color: string
  icon: string
  icon_color: string
  thumbnail_url?: string | null
  category: string
  href: string
}

interface Kegiatan {
  id: string
  judul: string
  slug: string | null
  tanggal: string
  foto_url: string | null
  deskripsi: string | null
}

interface Props {
  kursus: Kursus[]
  kegiatan: Kegiatan[]
}

const levelBadge: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
}

const quickLinks = [
  { icon: 'auto_stories', label: 'Materi Belajar', href: '/kaderisasi' },
  { icon: 'event', label: 'Kegiatan', href: '/news' },
  { icon: 'photo_library', label: 'Galeri Foto', href: '/galeri' },
  { icon: 'groups', label: 'Anggota', href: '/anggota' },
  { icon: 'route', label: 'Visi & Misi', href: '/visi-misi' },
  { icon: 'help', label: 'FAQ', href: '/faq' },
]

const fallbackCards = [
  { no: 1, title: 'Dasar-Dasar PMII', level: 'Beginner', deskripsi: 'Pengenalan sejarah, nilai, dan struktur organisasi PMII.' },
  { no: 2, title: 'Keislaman dan Ahlussunnah', level: 'Beginner', deskripsi: 'Pemahaman dasar Aswaja An-Nahdliyah sebagai landasan berorganisasi.' },
  { no: 3, title: 'Kepemimpinan & Manajemen', level: 'Intermediate', deskripsi: 'Skill kepemimpinan, manajemen organisasi, dan pengambilan keputusan.' },
  { no: 4, title: 'Pengabdian Masyarakat', level: 'Advanced', deskripsi: 'Program aksi sosial, pemberdayaan komunitas, dan pengabdian nyata.' },
]

export default function KaderisasiClient({ kursus, kegiatan }: Props) {
  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative bg-white border-b border-[#e5e5e5] overflow-hidden pt-20 md:pt-28 pb-0">
        {/* Subtle orb background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full bg-blue-400 opacity-[0.04]"
            style={{ width: 320, height: 320, top: '-10%', left: '-5%', filter: 'blur(80px)' }} />
          <div className="absolute rounded-full bg-blue-400 opacity-[0.03]"
            style={{ width: 400, height: 400, top: '20%', left: '65%', filter: 'blur(80px)' }} />
        </div>

        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 pb-16">

            {/* Kiri */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] tracking-[0.2em] font-bold text-blue-500 uppercase">KADER</span>
                <span className="text-[#d0d0d0]">·</span>
                <span className="text-[11px] tracking-[0.2em] font-bold text-blue-500 uppercase">ILMU</span>
                <span className="text-[#d0d0d0]">·</span>
                <span className="text-[11px] tracking-[0.2em] font-bold text-blue-500 uppercase">PENGABDIAN</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                <span className="text-[#1a1a1a]">PMII </span>
                <span className="text-blue-500">Rayon Hasyim Asy&apos;ari</span>
              </h1>
              <p className="text-[#6b6b6b] text-base md:text-lg leading-relaxed max-w-xl mb-8">
                Membentuk kader yang berilmu, berakhlak, dan berdaya guna untuk masyarakat, bangsa, dan agama.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#roadmap"
                  className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#333] text-white font-bold text-sm px-6 py-3 rounded-full transition">
                  Mulai Belajar
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <Link href="#berita"
                  className="inline-flex items-center gap-2 border border-[#e5e5e5] hover:border-[#1a1a1a] text-[#6b6b6b] hover:text-[#1a1a1a] font-bold text-sm px-6 py-3 rounded-full transition">
                  Lihat Berita
                </Link>
              </div>
            </div>

            {/* Kanan: logo + info */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-[#f2f2f2] flex items-center justify-center border border-[#e5e5e5]">
                  <Image src="/logorayon.png" alt="Logo PMII Rayon Hasyim Asy'ari"
                    width={160} height={160} className="rounded-full object-contain p-3" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#1a1a1a] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  FST UNUGIRI
                </div>
              </div>
              <div className="bg-[#f9f9f9] border border-[#e5e5e5] rounded-2xl p-4 max-w-[220px] w-full">
                <p className="text-[#6b6b6b] text-[10px] font-semibold uppercase tracking-widest mb-1">Tentang Rayon</p>
                <h3 className="text-[#1a1a1a] text-sm font-bold mb-2">Rayon Hasyim Asy&apos;ari</h3>
                <p className="text-[#6b6b6b] text-[11px] leading-relaxed">
                  Organisasi kader mahasiswa FST UNUGIRI berbasis Aswaja An-Nahdliyah.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-[#e5e5e5] bg-[#f9f9f9]">
          <div className="max-w-[1100px] mx-auto px-6 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: 'menu_book', label: 'Kajian & Diskusi' },
                  { icon: 'self_improvement', label: 'Pengembangan Diri' },
                  { icon: 'volunteer_activism', label: 'Aksi Sosial' },
                  { icon: 'diversity_3', label: 'Kebersamaan' },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-1.5 bg-white border border-[#e5e5e5] rounded-full px-3 py-1.5">
                    <span className="material-symbols-outlined text-[14px] text-blue-500">{f.icon}</span>
                    <span className="text-[#6b6b6b] text-[11px] font-medium">{f.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6">
                {[
                  { value: '128', label: 'Kader' },
                  { value: '6', label: 'Program Berjalan' },
                  { value: '2019', label: 'Tahun Berdiri' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-extrabold text-[#1a1a1a]">{s.value}</div>
                    <div className="text-[10px] text-[#6b6b6b] font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP BELAJAR ── */}
      <section id="roadmap" className="bg-[#f8f9fb] py-14">
        <div className="max-w-[1100px] mx-auto px-6">
          <FadeInUp>
            <div className="flex items-start gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#1a1a1a]/5 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[20px] text-[#1a1a1a]">route</span>
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#1a1a1a]">Roadmap Belajar</h2>
                <p className="text-sm text-[#6b6b6b] mt-0.5">Pilih jalur belajarmu dan mulai perjalanan kaderisasi</p>
              </div>
            </div>
          </FadeInUp>

          {/* Scroll horizontal di mobile, grid di desktop */}
          <div className="-mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-3 md:pb-0 md:grid md:grid-cols-4">
              {(kursus.length > 0 ? kursus : fallbackCards).map((course, i) => {
                const isReal = 'href' in course
                const href = isReal ? (course as Kursus).href : '#'
                const thumbnail = isReal ? (course as Kursus).thumbnail_url : null
                const bgColor = isReal ? (course as Kursus).bg_color : '#f2f2f2'
                const icon = isReal ? (course as Kursus).icon : 'school'
                const iconColor = isReal ? (course as Kursus).icon_color : '#6b6b6b'
                return (
                  <FadeInUp key={i} delay={i * 70}>
                    <a
                      href={href !== '#' ? href : undefined}
                      target={href !== '#' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="w-[230px] md:w-auto flex flex-col bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-md transition-all group"
                    >
                      {/* Card header */}
                      <div
                        className="relative h-28 flex items-center justify-center overflow-hidden"
                        style={{ background: thumbnail ? undefined : (bgColor ?? '#f2f2f2') }}
                      >
                        {thumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumbnail} alt={course.title} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <span className="text-[72px] font-black text-[#1a1a1a]/8 select-none leading-none">{course.no}</span>
                            <span className="absolute material-symbols-outlined text-[32px] opacity-30"
                              style={{ color: iconColor, fontVariationSettings: "'FILL' 1" }}>
                              {icon}
                            </span>
                          </>
                        )}
                        {/* Nomor */}
                        <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-[11px] font-bold text-white">{course.no}</span>
                        </div>
                        {/* Level */}
                        <div className="absolute bottom-3 right-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelBadge[course.level] ?? 'bg-gray-100 text-gray-600'}`}>
                            {course.level}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-[14px] font-bold text-[#1a1a1a] leading-snug mb-2">{course.title}</h3>
                        {course.deskripsi && (
                          <p className="text-[12px] text-[#6b6b6b] leading-relaxed line-clamp-3 flex-1">{course.deskripsi}</p>
                        )}
                        <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold">
                          {href === '#' ? (
                            <span className="text-[#6b6b6b] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">lock</span>
                              Segera Hadir
                            </span>
                          ) : (
                            <span className="text-[#1a1a1a] flex items-center gap-1">
                              Mulai Belajar
                              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  </FadeInUp>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── BERITA + QUICK ACCESS ── */}
      <section id="berita" className="bg-white py-14">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Berita & Informasi */}
            <div className="lg:col-span-2">
              <FadeInUp>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#f2f2f2] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px] text-[#1a1a1a]">newspaper</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#1a1a1a]">Berita &amp; Informasi</h2>
                      <p className="text-xs text-[#6b6b6b]">Update terbaru dari rayon</p>
                    </div>
                  </div>
                  <Link href="/news" className="text-xs text-[#6b6b6b] hover:text-[#1a1a1a] font-semibold flex items-center gap-1 transition">
                    Lihat Semua
                    <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </Link>
                </div>
              </FadeInUp>

              <div className="flex flex-col divide-y divide-[#e5e5e5]">
                {kegiatan.length === 0 ? (
                  <p className="text-sm text-[#6b6b6b] py-8 text-center">Belum ada berita.</p>
                ) : (
                  kegiatan.map((k, i) => (
                    <FadeInUp key={k.id} delay={i * 60}>
                      <Link href={`/news/${k.slug ?? k.id}`}
                        className="flex gap-4 py-4 hover:bg-[#f9f9f9] -mx-3 px-3 rounded-xl transition group">
                        <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-[#f2f2f2]">
                          {k.foto_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={k.foto_url} alt={k.judul}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-[20px] text-[#c0c0c0]">image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-bold text-[#1a1a1a] leading-snug line-clamp-2 group-hover:underline mb-1">
                            {k.judul}
                          </h3>
                          <p className="text-[11px] text-[#6b6b6b]">
                            {new Date(k.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </Link>
                    </FadeInUp>
                  ))
                )}
              </div>
            </div>

            {/* Quick Access */}
            <div className="lg:col-span-1">
              <FadeInUp>
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#f2f2f2] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-[#1a1a1a]">grid_view</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#1a1a1a]">Quick Access</h2>
                    <p className="text-xs text-[#6b6b6b]">Navigasi cepat ke halaman lain</p>
                  </div>
                </div>
              </FadeInUp>

              <div className="grid grid-cols-3 gap-3">
                {quickLinks.map((q, i) => (
                  <FadeInUp key={q.label} delay={i * 40}>
                    <Link href={q.href}
                      className="flex flex-col items-center gap-1.5 bg-[#f9f9f9] hover:bg-[#f2f2f2] border border-[#e5e5e5] rounded-xl p-3 transition group">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#e5e5e5] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px] text-[#1a1a1a]">{q.icon}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-[#1a1a1a] text-center leading-tight">{q.label}</span>
                    </Link>
                  </FadeInUp>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
