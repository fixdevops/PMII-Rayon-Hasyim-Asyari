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
  category: string
  href: string
}

const levelColor: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
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
          <div className="flex justify-start mb-2">
            <div
              className="w-[220px] text-center py-1.5 rounded-r-lg text-white font-bold text-[17px] tracking-wide"
              style={{ background: 'linear-gradient(to right, transparent, #0059bb, #fbbf24, transparent)' }}
            >
              Roadmap Belajar
            </div>
          </div>
          <p className="text-[14px] text-[#3a4a5e] mt-3 max-w-xl">
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
                  ? 'bg-[#0059bb] text-white border-[#0059bb]'
                  : 'bg-white/80 text-[#3a4a5e] border-[#d0e4ff] hover:border-[#0059bb]/40 hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </FadeInUp>

      {/* Course grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-[#3a4a5e] gap-3 bg-white/60 rounded-2xl border border-[#d0e4ff]">
          <span className="material-symbols-outlined text-[48px] text-[#0059bb]/30">school</span>
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
                className="flex flex-col rounded-2xl overflow-hidden bg-white border border-[#e8f0fb] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group h-full"
              >
                {/* Thumbnail */}
                <div
                  className="relative w-full flex items-center justify-center"
                  style={{ background: course.bg_color, minHeight: 120 }}
                >
                  {/* Nomor */}
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <span className="text-[11px] font-bold text-[#0a1628]">{course.no}</span>
                  </div>
                  {/* Icon */}
                  <span
                    className="material-symbols-outlined text-[56px] group-hover:scale-110 transition-transform duration-300"
                    style={{ color: course.icon_color, fontVariationSettings: "'FILL' 1" }}
                  >
                    {course.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                  {/* Level & stats */}
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelColor[course.level] ?? 'bg-gray-100 text-gray-600'}`}>
                      {course.level}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">layers</span>
                      {course.materi} materi
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      {course.durasi}
                    </span>
                  </div>

                  {/* Judul */}
                  <h3 className="text-[14px] font-bold text-[#0a1628] leading-snug mb-1.5 group-hover:text-[#0059bb] transition-colors">
                    {course.title}
                  </h3>

                  {/* Deskripsi */}
                  {course.deskripsi && (
                    <p className="text-[12px] text-[#4a5a6e] leading-relaxed line-clamp-3 flex-1">
                      {course.deskripsi}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-[#0059bb]">
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
        <div className="rounded-2xl bg-gradient-to-r from-[#001e40] to-[#0059bb] p-6 flex flex-col md:flex-row items-center gap-4 text-white">
          <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[28px] text-yellow-300"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lightbulb
            </span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-lg mb-1">Punya rekomendasi materi?</h3>
            <p className="text-white/70 text-sm">
              Sampaikan saran materi atau kelas yang ingin kamu lihat di sini melalui layanan aspirasi.
            </p>
          </div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); document.querySelector<HTMLButtonElement>('.fixed.bottom-6')?.click() }}
            className="flex-shrink-0 bg-white text-[#0059bb] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-yellow-300 hover:text-[#001e40] transition"
          >
            Kirim Aspirasi
          </a>
        </div>
      </FadeInUp>
    </>
  )
}
