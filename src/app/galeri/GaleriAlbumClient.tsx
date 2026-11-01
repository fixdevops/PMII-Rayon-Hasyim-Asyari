'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
  const touchStartX = useRef(0)

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

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

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
            <p className="text-white/70 text-[12px] mt-0.5">{item.keterangan ?? ''}</p>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {open && (
        <div className="fixed inset-0 z-[999] bg-black flex flex-col">

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-4 pb-8
            bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
            <div className="pointer-events-auto">
              <p className="text-white font-semibold text-[14px] leading-tight">{item.judul}</p>
              <p className="text-white/50 text-[12px]">
                {loading ? 'Memuat...' : `${idx + 1} / ${fotos.length}`}
              </p>
            </div>
            <button
              onClick={close}
              className="pointer-events-auto w-10 h-10 flex items-center justify-center
                text-white/80 hover:text-white hover:bg-white/15 rounded-full transition"
            >
              <span className="material-symbols-outlined text-[26px]">close</span>
            </button>
          </div>

          {/* Foto — slider CSS translate, SEMUA foto di-render agar cache */}
          <div
            className="flex-1 relative overflow-hidden"
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              const diff = touchStartX.current - e.changedTouches[0].clientX
              if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
            }}
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[48px] animate-spin">progress_activity</span>
              </div>
            ) : (
              <>
                {/* Track: geser dengan translate */}
                <div
                  className="absolute inset-0 flex"
                  style={{
                    transform: `translateX(-${idx * 100}%)`,
                    transition: 'transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)',
                    willChange: 'transform',
                    width: `${fotos.length * 100}%`,
                  }}
                >
                  {fotos.map((f) => (
                    <div
                      key={f.id}
                      className="flex items-center justify-center"
                      style={{ width: `${100 / fotos.length}%`, height: '100%' }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={f.foto_url}
                        alt=""
                        className="max-w-full max-h-full object-contain select-none"
                        style={{ maxHeight: '100dvh' }}
                        draggable={false}
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>

                {/* Tombol prev / next */}
                {fotos.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-start pl-2
                        text-transparent hover:text-white/80
                        hover:bg-gradient-to-r hover:from-black/30 hover:to-transparent transition-all"
                    >
                      <span className="material-symbols-outlined text-[36px] drop-shadow">chevron_left</span>
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-end pr-2
                        text-transparent hover:text-white/80
                        hover:bg-gradient-to-l hover:from-black/30 hover:to-transparent transition-all"
                    >
                      <span className="material-symbols-outlined text-[36px] drop-shadow">chevron_right</span>
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Bar bawah: dot + thumbnail */}
          {!loading && fotos.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-10
              bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center pb-4 pt-8 gap-2">
              {/* Dots */}
              <div className="flex gap-1.5">
                {fotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === idx ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
              {/* Thumbnails */}
              <div
                className="flex gap-2 overflow-x-auto px-4 w-full justify-center"
                style={{ scrollbarWidth: 'none' }}
              >
                {fotos.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setIdx(i)}
                    className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      i === idx ? 'border-white scale-110' : 'border-transparent opacity-40 hover:opacity-70'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.foto_url} alt="" className="w-full h-full object-cover" loading="eager" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </>
  )
}
