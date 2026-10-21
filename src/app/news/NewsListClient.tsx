'use client'

import { useState } from 'react'
import Link from 'next/link'
import FadeInUp from '@/components/FadeInUp'

interface Activity {
  id: string
  judul: string
  slug?: string | null
  kategori: string
  tanggal: string
  deskripsi?: string | null
  foto_url?: string | null
  lokasi?: string | null
}

interface Props {
  activities: Activity[]
}

export default function NewsListClient({ activities }: Props) {
  const kategoriList = ['Semua', ...Array.from(new Set(activities.map(a => a.kategori)))]
  const [aktifTab, setAktif] = useState('Semua')

  const filtered = aktifTab === 'Semua' ? activities : activities.filter(a => a.kategori === aktifTab)

  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {kategoriList.map(k => (
          <button
            key={k}
            onClick={() => setAktif(k)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
              aktifTab === k
                ? 'bg-[#1a1a1a] text-white'
                : 'bg-[#f2f2f2] text-[#6b6b6b] hover:bg-[#e5e5e5]'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-[#6b6b6b] gap-2">
          <p className="text-sm">Belum ada news di kategori ini.</p>
        </div>
      ) : (
        <>
          {/* Featured / artikel pertama */}
          {featured && (
            <FadeInUp key={featured.id}>
              <Link href={`/news/${featured.slug ?? featured.id}`} className="block group mb-0">
                <article>
                  {/* Foto — ukuran proporsional, tidak terlalu tinggi */}
                  <div className="w-full rounded-xl overflow-hidden bg-[#f2f2f2] mb-4" style={{ aspectRatio: '16/9', maxHeight: '260px' }}>
                    {featured.foto_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={featured.foto_url}
                        alt={featured.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 15l-5-5-4 4-3-3-5 5V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10zm0 2.828l-5-5-4 4-3-3-5 4.172V19a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1.172z"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Deskripsi singkat — tepat di bawah gambar */}
                  {featured.deskripsi && (
                    <p className="text-[#6b6b6b] text-sm leading-relaxed line-clamp-2 mb-3">
                      {featured.deskripsi}
                    </p>
                  )}

                  {/* Judul */}
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] leading-tight mb-3 group-hover:underline">
                    {featured.judul}
                  </h2>

                  {/* Author row */}
                  <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logorayon.png"
                      alt="Redaksi"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-[#1a1a1a] font-medium">Redaksi</span>
                    <span>·</span>
                    <span>
                      {new Date(featured.tanggal).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                </article>
              </Link>
              <div className="border-b border-[#e5e5e5] my-8" />
            </FadeInUp>
          )}

          {/* Rest of articles — list style */}
          {rest.map((act, i) => (
            <FadeInUp key={act.id} delay={i * 60}>
              <Link
                href={`/news/${act.slug ?? act.id}`}
                className="flex justify-between gap-4 py-5 border-b border-[#e5e5e5] hover:bg-[#f9f9f9] -mx-3 px-3 rounded-lg transition group"
              >
                {/* Kiri: teks */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-[#1a1a1a] leading-snug mb-2 line-clamp-2 group-hover:underline">
                    {act.judul}
                  </h3>
                  {act.deskripsi && (
                    <p className="hidden sm:block text-[#6b6b6b] text-sm leading-relaxed line-clamp-2 mb-3">
                      {act.deskripsi}
                    </p>
                  )}
                  {/* Meta */}
                  <div className="flex items-center gap-1.5 text-xs text-[#6b6b6b] flex-wrap mt-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logorayon.png"
                      alt="Redaksi"
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span className="text-[#1a1a1a] font-medium">Redaksi</span>
                    <span>·</span>
                    <span>
                      {new Date(act.tanggal).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Kanan: thumbnail — proporsional & responsif */}
                <div
                  className="flex-shrink-0 rounded overflow-hidden bg-[#f2f2f2]"
                  style={{ width: 'clamp(80px, 20vw, 140px)', aspectRatio: '4/3' }}
                >
                  {act.foto_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={act.foto_url}
                      alt={act.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
            </FadeInUp>
          ))}
        </>
      )}
    </div>
  )
}
