'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { GaleriItem } from './page'

interface GaleriFoto {
  id: string
  foto_url: string
  urutan: number
}

interface Props {
  item: GaleriItem
}

export default function GaleriAlbumClient({ item }: Props) {
  const [open, setOpen] = useState(false)
  const [fotos, setFotos] = useState<GaleriFoto[]>([])
  const [idx, setIdx] = useState(0)
  const [loading, setLoading] = useState(false)

  const openAlbum = async () => {
    setOpen(true)
    setIdx(0)
    setLoading(true)
    const { data } = await supabase
      .from('galeri_foto')
      .select('*')
      .eq('galeri_id', item.id)
      .order('urutan', { ascending: true })
    setFotos(data && data.length > 0
      ? data
      : [{ id: item.id, foto_url: item.foto_url, urutan: 0 }]
    )
    setLoading(false)
  }

  const close = () => setOpen(false)
  const prev = useCallback(() => setIdx(i => (i - 1 + fotos.length) % fotos.length), [fotos.length])
  const next = useCallback(() => setIdx(i => (i + 1) % fotos.length), [fotos.length])

  // Keyboard
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, prev, next])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Touch/swipe support
  const touchStartX = useState<number>(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX[1](e.touches[0].clientX)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX[0] - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
  }

  return (
    <>
      {/* ── Kartu ── */}
      <div
        onClick={openAlbum}
        className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-[#e5e5e5] hover:shadow-lg transition-all duration-200 cursor-pointer bg-gray-50"
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.foto_url}
            alt={item.judul}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h4 className="text-white text-[14px] font-bold leading-snug line-clamp-1">{item.judul}</h4>
            {item.keterangan && <p className="text-white/70 text-[12px] mt-0.5">{item.keterangan}</p>}
            <span className="flex items-center gap-1 text-white/60 text-[11px] mt-1.5">
              <span className="material-symbols-outlined text-[13px]">collections</span>
              Klik untuk lihat foto
            </span>
          </div>
        </div>
      </div>

      {/* ── Lightbox Slider ── */}
      {open && (
        <div
          className="fixed inset-0 z-[999] flex flex-col bg-black/95"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
            <div>
              <p className="text-white font-bold text-[15px]">{item.judul}</p>
              <p className="text-white/50 text-[13px]">
                {loading ? 'Memuat...' : `${idx + 1} / ${fotos.length} foto`}
              </p>
            </div>
            <button
              onClick={close}
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              <span className="material-symbols-outlined text-[26px]">close</span>
            </button>
          </div>

          {/* Foto Utama */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden px-14">
            {loading ? (
              <span className="material-symbols-outlined text-white text-[48px] animate-spin">progress_activity</span>
            ) : fotos.length > 0 ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={fotos[idx]?.id}
                  src={fotos[idx]?.foto_url}
                  alt={`Foto ${idx + 1}`}
                  className="max-h-full max-w-full object-contain rounded-xl select-none"
                  style={{ maxHeight: 'calc(100vh - 200px)' }}
                />
                {fotos.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition"
                    >
                      <span className="material-symbols-outlined text-[28px]">chevron_left</span>
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition"
                    >
                      <span className="material-symbols-outlined text-[28px]">chevron_right</span>
                    </button>
                  </>
                )}
              </>
            ) : null}
          </div>

          {/* Thumbnail strip */}
          {fotos.length > 1 && (
            <div
              className="flex-shrink-0 flex gap-2 overflow-x-auto px-5 py-3 justify-center"
              style={{ scrollbarWidth: 'none' }}
            >
              {fotos.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => setIdx(i)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === idx ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.foto_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Dot indicator (kalau foto sedikit) */}
          {fotos.length > 1 && fotos.length <= 10 && (
            <div className="flex justify-center gap-1.5 pb-4">
              {fotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`rounded-full transition-all ${
                    i === idx ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
