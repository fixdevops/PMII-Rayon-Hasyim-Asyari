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

const levelProgress: Record<string, number> = {
  Beginner: 10,
  Intermediate: 35,
  Advanced: 20,
}

const programUnggulan = [
  {
    icon: 'menu_book',
    name: 'Kajian Rutin',
    desc: 'Diskusi ilmiah dan kajian keislaman setiap minggu bersama seluruh kader.',
    color: '#3b82f6',
    bg: 'bg-blue-50',
  },
  {
    icon: 'school',
    name: 'PKD & PKL',
    desc: 'Pelatihan Kader Dasar dan Pelatihan Kader Lanjutan sebagai tahapan kaderisasi formal.',
    color: '#10b981',
    bg: 'bg-emerald-50',
  },
  {
    icon: 'volunteer_activism',
    name: 'Aksi Sosial',
    desc: 'Kegiatan pengabdian masyarakat, bakti sosial, dan kepedulian lingkungan.',
    color: '#f59e0b',
    bg: 'bg-amber-50',
  },
  {
    icon: 'diversity_3',
    name: 'Kaderisasi',
    desc: 'Program pembinaan karakter, kepemimpinan, dan pengembangan potensi kader.',
    color: '#8b5cf6',
    bg: 'bg-violet-50',
  },
]

const quickLinks = [
  { icon: 'auto_stories', label: 'Materi Belajar', href: '/kaderisasi', color: '#3b82f6' },
  { icon: 'event', label: 'Kalender Kegiatan', href: '/kegiatan', color: '#10b981' },
  { icon: 'photo_library', label: 'Galeri Foto', href: '/galeri', color: '#f59e0b' },
  { icon: 'newspaper', label: 'Berita & Info', href: '/news', color: '#ef4444' },
  { icon: 'groups', label: 'Data Anggota', href: '/anggota', color: '#8b5cf6' },
  { icon: 'help', label: 'FAQ', href: '/faq', color: '#6b7280' },
]

const fallbackCards = [
  {
    no: 1, title: 'Dasar-Dasar PMII', level: 'Beginner', materi: 12, durasi: '2 Jam',
    deskripsi: 'Pengenalan sejarah, nilai, dan struktur organisasi PMII.'
  },
  {
    no: 2, title: 'Keislaman dan Ahlussunnah', level: 'Beginner', materi: 8, durasi: '3 Jam',
    deskripsi: 'Pemahaman dasar Aswaja An-Nahdliyah sebagai landasan berorganisasi.'
  },
  {
    no: 3, title: 'Kepemimpinan & Manajemen', level: 'Intermediate', materi: 10, durasi: '4 Jam',
    deskripsi: 'Skill kepemimpinan, manajemen organisasi, dan pengambilan keputusan.'
  },
  {
    no: 4, title: 'Pengabdian Masyarakat', level: 'Advanced', materi: 6, durasi: '5 Jam',
    deskripsi: 'Program aksi sosial, pemberdayaan komunitas, dan pengabdian nyata.'
  },
]

export default function KaderisasiClient({ kursus, kegiatan }: Props) {
  const roadmapKursus = kursus.slice(0, 4)

  return (
    <div className="w-full">
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-white border-b border-[#e5e5e5] overflow-hidden pt-20 md:pt-28 pb-0">
        {/* Decorative subtle dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { w: 200, h: 200, t: '-5%', l: '-5%', opacity: 0.04 },
            { w: 300, h: 300, t: '30%', l: '60%', opacity: 0.03 },
          ].map((orb, i) => (
            <div key={i} className="absolute rounded-full bg-blue-500"
              style={{ width: orb.w, height: orb.h, top: orb.t, left: orb.l, opacity: orb.opacity, filter: 'blur(60px)' }}
            />
          ))}
        </div>

        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 pb-16">
            {/* Left content */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] tracking-[0.2em] font-bold text-blue-500 uppercase">KADER</span>
                <span className="text-[#d0d0d0]">·</span>
                <span className="text-[11px] tracking-[0.2em] font-bold text-blue-500 uppercase">ILMU</span>
                <span className="text-[#d0d0d0]">·</span>
                <span className="text-[11px] tracking-[0.2em] font-bold text-blue-500 uppercase">PENGABDIAN</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                <span className="text-[#1a1a1a]">PMII </span>
                <span className="text-blue-500">Rayon Hasyim Asy&apos;ari</span>
              </h1>

              {/* Subtitle */}
              <p className="text-[#6b6b6b] text-base md:text-lg leading-relaxed max-w-xl mb-8">
                Membentuk kader yang berilmu, berakhlak, dan berdaya guna untuk masyarakat, bangsa, dan agama.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#roadmap"
                  className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#333] text-white font-bold text-sm px-6 py-3 rounded-full transition"
                >
                  Mulai Belajar
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <Link
                  href="#program"
                  className="inline-flex items-center gap-2 border border-[#e5e5e5] hover:border-[#1a1a1a] text-[#6b6b6b] hover:text-[#1a1a1a] font-bold text-sm px-6 py-3 rounded-full transition"
                >
                  Jelajahi Program
                </Link>
              </div>
            </div>

            {/* Right: Logo + Info Card */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              {/* Logo */}
              <div className="relative">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-[#f2f2f2] flex items-center justify-center border border-[#e5e5e5]">
                  <Image
                    src="/logorayon.png"
                    alt="Logo PMII Rayon Hasyim Asy'ari"
                    width={160}
                    height={160}
                    className="rounded-full object-contain p-3"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#1a1a1a] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  FST UNUGIRI
                </div>
              </div>

              {/* Info card */}
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
              {/* Feature pills */}
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

              {/* Stats */}
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

      {/* ===== ROADMAP BELAJAR ===== */}
      <section id="roadmap" className="bg-[#f8f9fb] py-14">
        <div className="max-w-[1100px] mx-auto px-6">
          <FadeInUp>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-blue-500">route</span>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-[#1a1a1a]">Roadmap Belajar</h2>
                  <p className="text-sm text-[#6b6b6b] mt-0.5">Jalur pembelajaran terstruktur untuk setiap kader PMII</p>
                </div>
              </div>
              <Link href="/kaderisasi" className="text-sm text-blue-500 font-semibold hover:underline flex items-center gap-1">
                Lihat Semua Materi
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </FadeInUp>

          {/* Roadmap cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmapKursus.length === 0 ? (
              fallbackCards.map((c, i) => (
                <FadeInUp key={i} delay={i * 80}>
                  <div className="relative bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-md transition-all group">
                    {/* Number badge */}
                    <div className="bg-gradient-to-br from-[#0d2a4a] to-[#0a1628] h-28 flex items-center justify-center relative">
                      <span className="text-[72px] font-black text-white/10 select-none">{c.no}</span>
                      <div className="absolute bottom-3 left-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelBadge[c.level] ?? 'bg-gray-100 text-gray-600'}`}>
                          {c.level}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-[13px] font-bold text-[#1a1a1a] leading-snug mb-2">{c.title}</h3>
                      <p className="text-[11px] text-[#6b6b6b] leading-relaxed line-clamp-2 mb-3">{c.deskripsi}</p>
                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex justify-between text-[10px] text-[#6b6b6b] mb-1">
                          <span>Progress</span>
                          <span>{levelProgress[c.level] ?? 0}%</span>
                        </div>
                        <div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${levelProgress[c.level] ?? 0}%` }}
                          />
                        </div>
                      </div>
                      {/* Stats */}
                      <div className="flex items-center gap-3 text-[10px] text-[#6b6b6b]">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[11px]">layers</span>
                          1 Modul
                        </span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[11px]">schedule</span>
                          {c.durasi}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[11px]">article</span>
                          {c.materi} Materi
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeInUp>
              ))
            ) : (
              roadmapKursus.map((course, i) => (
                <FadeInUp key={course.id} delay={i * 80}>
                  <a
                    href={course.href !== '#' ? course.href : undefined}
                    target={course.href !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="relative bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-md transition-all group block"
                  >
                    {/* Thumbnail / color header */}
                    <div
                      className="relative h-28 flex items-center justify-center overflow-hidden"
                      style={{ background: course.thumbnail_url ? undefined : (course.bg_color ?? '#0d2a4a') }}
                    >
                      {course.thumbnail_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[72px] font-black text-white/10 select-none">{course.no}</span>
                      )}
                      <div className="absolute top-3 left-3">
                        <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-[11px] font-bold text-white">{course.no}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelBadge[course.level] ?? 'bg-gray-100 text-gray-600'}`}>
                          {course.level}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-[13px] font-bold text-[#1a1a1a] leading-snug mb-2">{course.title}</h3>
                      {course.deskripsi && (
                        <p className="text-[11px] text-[#6b6b6b] leading-relaxed line-clamp-2 mb-3">{course.deskripsi}</p>
                      )}
                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex justify-between text-[10px] text-[#6b6b6b] mb-1">
                          <span>Progress</span>
                          <span>{levelProgress[course.level] ?? 10}%</span>
                        </div>
                        <div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${levelProgress[course.level] ?? 10}%` }}
                          />
                        </div>
                      </div>
                      {/* Stats */}
                      <div className="flex items-center gap-3 text-[10px] text-[#6b6b6b]">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[11px]">layers</span>
                          1 Modul
                        </span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[11px]">schedule</span>
                          {course.durasi}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[11px]">article</span>
                          {course.materi} Materi
                        </span>
                      </div>
                    </div>
                  </a>
                </FadeInUp>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM: Program + Berita + Quick Access ===== */}
      <section id="program" className="bg-white py-14">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Program Unggulan — spans 2 cols */}
            <div className="lg:col-span-2">
              <FadeInUp>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px] text-amber-500">stars</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#1a1a1a]">Program Unggulan</h2>
                      <p className="text-xs text-[#6b6b6b]">Kegiatan utama yang dijalankan rayon</p>
                    </div>
                  </div>
                  <Link href="/kegiatan" className="text-xs text-blue-500 font-semibold hover:underline flex items-center gap-1">
                    Lihat Semua
                    <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </Link>
                </div>
              </FadeInUp>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {programUnggulan.map((p, i) => (
                  <FadeInUp key={p.name} delay={i * 60}>
                    <div className={`${p.bg} rounded-xl p-4 flex items-start gap-3 transition group`}>
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: p.color + '20' }}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ color: p.color }}>{p.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-0.5">{p.name}</h3>
                        <p className="text-[11px] text-[#6b6b6b] leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>

              {/* Quick Access — below program */}
              <FadeInUp delay={120} className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-extrabold text-[#1a1a1a]">Quick Access</h2>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {quickLinks.map((q) => (
                    <Link
                      key={q.label}
                      href={q.href}
                      className="flex flex-col items-center gap-1.5 bg-[#f8f9fb] hover:bg-[#f0f4ff] border border-[#e5e5e5] rounded-xl p-3 transition group"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: q.color + '15' }}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ color: q.color }}>{q.icon}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-[#1a1a1a] text-center leading-tight">{q.label}</span>
                    </Link>
                  ))}
                </div>
              </FadeInUp>
            </div>

            {/* Berita & Informasi — 1 col */}
            <div className="lg:col-span-1">
              <FadeInUp>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px] text-red-500">newspaper</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#1a1a1a]">Berita &amp; Informasi</h2>
                      <p className="text-xs text-[#6b6b6b]">Update terbaru dari rayon</p>
                    </div>
                  </div>
                  <Link href="/news" className="text-xs text-blue-500 font-semibold hover:underline flex items-center gap-1">
                    Lihat Semua
                    <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </Link>
                </div>
              </FadeInUp>

              <div className="flex flex-col gap-4">
                {kegiatan.length === 0 ? (
                  <div className="text-sm text-[#6b6b6b] text-center py-8">Belum ada berita.</div>
                ) : (
                  kegiatan.map((k, i) => (
                    <FadeInUp key={k.id} delay={i * 60}>
                      <Link
                        href={`/news/${k.slug ?? k.id}`}
                        className="flex gap-3 group hover:bg-[#f8f9fb] -mx-2 px-2 py-2 rounded-xl transition"
                      >
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-[#f0f0f0]">
                          {k.foto_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={k.foto_url}
                              alt={k.judul}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-[20px] text-[#c0c0c0]">image</span>
                            </div>
                          )}
                        </div>
                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Kegiatan</span>
                          </div>
                          <h3 className="text-[12px] font-bold text-[#1a1a1a] leading-snug line-clamp-2 group-hover:underline">
                            {k.judul}
                          </h3>
                          <p className="text-[10px] text-[#6b6b6b] mt-1">
                            {new Date(k.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </Link>
                    </FadeInUp>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
