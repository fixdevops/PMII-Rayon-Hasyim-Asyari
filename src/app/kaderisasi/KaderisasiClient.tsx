'use client'

import { useState } from 'react'
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

const levelColor: Record<string, string> = {
  Beginner: 'bg-[#f2f2f2] text-[#6b6b6b]',
  Intermediate: 'bg-[#f2f2f2] text-[#6b6b6b]',
  Advanced: 'bg-[#f2f2f2] text-[#1a1a1a]',
}

export default function KaderisasiClient({ kursus }: { kursus: Kursus[] }) {
  const [activeFilter, setActiveFilter] = useState('all')

  // Bangun daftar kategori dari data
  const rawCategories = Array.from(new Set(kursus.map(k => k.category)))
  const categories = [
    { label: 'Semua', value: 'all' },
    ...rawCategories.map(c => ({
      label: c.charAt(0).toUpperCase() + c.slice(1).replace(/-/g, ' '),
      value: c,
    })),
  ]

  const filtered = activeFilter === 'all'
    ? kursus
    : kursus.filter(k => k.category === activeFilter)

  return (
    <>
      {/* Header */}
      <FadeInUp>
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Roadmap Belajar</h1>
          <p className="text-base text-[#6b6b6b] max-w-xl">
            Kumpulan materi belajar untuk kader PMII Rayon Hasyim Asy&apos;ari — dari pemrograman, desain, data, hingga ke-Islaman.
          </p>
        </div>
      </FadeInUp>

      {/* Filter chips */}
      <FadeInUp delay={60}>
        <div className="flex gap-2 flex-wrap mt-6 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
                activeFilter === cat.value
                  ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                  : 'bg-[#f2f2f2] text-[#6b6b6b] border-transparent hover:bg-[#e5e5e5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </FadeInUp>

      {/* Course grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-[#6b6b6b] gap-3 bg-white/60 rounded-2xl border border-[#e5e5e5]">
          <span className="material-symbols-outlined text-[48px] text-[#6b6b6b]/30">school</span>
          <p className="text-sm font-medium">Belum ada kursus di kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((course, i) => (
            <FadeInUp key={course.id} delay={i * 50}>
              <a
                href={course.href}
                target={course.href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex flex-col rounded-2xl overflow-hidden bg-white border border-[#e5e5e5] hover:shadow-sm transition-all duration-200 group h-full"
              >
                {/* Thumbnail */}
                <div
                  className="relative w-full flex items-center justify-center overflow-hidden"
                  style={{ background: course.thumbnail_url ? undefined : (course.bg_color ?? '#f0f4ff'), minHeight: 120 }}
                >
                  {course.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ minHeight: 120, maxHeight: 160 }}
                    />
                  ) : (
                    <>
                      {/* Nomor */}
                      <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                        <span className="text-[11px] font-bold text-[#1a1a1a]">{course.no}</span>
                      </div>
                      {/* Icon fallback */}
                      <span
                        className="material-symbols-outlined text-[56px] group-hover:scale-110 transition-transform duration-300"
                        style={{ color: course.icon_color ?? '#6b6b6b', fontVariationSettings: "'FILL' 1" }}
                      >
                        {course.icon ?? 'school'}
                      </span>
                    </>
                  )}
                  {/* Nomor overlay jika ada thumbnail */}
                  {course.thumbnail_url && (
                    <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-sm">
                      <span className="text-[11px] font-bold text-white">{course.no}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                  {/* Level & stats */}
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelColor[course.level] ?? 'bg-gray-100 text-gray-600'}`}>
                      {course.level}
                    </span>
                    <span className="text-[11px] text-[#6b6b6b] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">layers</span>
                      {course.materi} materi
                    </span>
                    <span className="text-[11px] text-[#6b6b6b] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      {course.durasi}
                    </span>
                  </div>

                  {/* Judul */}
                  <h3 className="text-[14px] font-bold text-[#1a1a1a] leading-snug mb-1.5">
                    {course.title}
                  </h3>

                  {/* Deskripsi */}
                  {course.deskripsi && (
                    <p className="text-[12px] text-[#6b6b6b] leading-relaxed line-clamp-3 flex-1">
                      {course.deskripsi}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-[#1a1a1a]">
                    {course.href === '#' ? 'Segera Hadir' : 'Mulai Belajar'}
                    {course.href !== '#' && (
                      <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </FadeInUp>
          ))}
        </div>
      )}

      {/* Banner bawah */}
      <FadeInUp delay={100} className="mt-12">
        <div className="rounded-xl bg-[#f9f9f9] border border-[#e5e5e5] p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-lg mb-1 text-[#1a1a1a]">Punya rekomendasi materi?</h3>
            <p className="text-[#6b6b6b] text-sm">
              Sampaikan saran materi atau kelas yang ingin kamu lihat di sini melalui layanan aspirasi.
            </p>
          </div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); document.querySelector<HTMLButtonElement>('.fixed.bottom-6')?.click() }}
            className="flex-shrink-0 bg-[#1a1a1a] text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#333] transition"
          >
            Kirim Aspirasi
          </a>
        </div>
      </FadeInUp>
    </>
  )
}
