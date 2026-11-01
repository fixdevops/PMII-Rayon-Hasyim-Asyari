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
  const [idx, setIdx] = useState<number | null>(null) // null = grid view, number = zoom view
  const [loading, setLoading] = useState(false)

  const openAlbum = async () => {
    setOpen(true)
    setIdx(null)
    setLoading(true)
    const { data } = await supabase
      .from('galeri_foto')
      .select('*')
      .eq('galeri_id', item.id)
      .order('urutan', { ascending: true })
    if (data && data.length > 0) {
      setFotos(data)
    } else {
      setFotos([{ id: item.id, foto_url: item.foto_url, urutan: 0 }])
    }
    setLoading(false)
  }

  const close = () => {
    setOpen(false)
    setIdx(null)
  }

  const openZoom = (i: number) => setIdx(i)
  const closeZoom = () => setIdx(null)

  const prev = useCallback(() => setIdx(i => i !== null ? (i - 1 + fotos.length) % fotos.length : null), [fotos.length])
  const next = useCallback(() => setIdx(i => i !== null ? (i + 1) % fotos.length : null), [fotos.length])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (idx !== null) {
        if (e.key === 'ArrowLeft') prev()
        else if (e.key === 'ArrowRight') next()
        else if (e.key === 'Escape') closeZoom()
      } else {
        if (e.key === 'Escape') close()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, idx, prev, next])

  // Prevent body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Kartu Album ── */}
      <div
        onClick={openAlbum}
        className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-[#e5e5e5] hover:shadow-lg transition-all duration-200 cursor-pointer bg-gray-50"
      >
        {/* Aspect ratio box */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.foto_url}
            alt={item.judul}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {/* Info di bawah */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h4 className="text-white text-[14px] font-bold leading-snug line-clamp-1">{item.judul}</h4>
            {item.keterangan && (
              <p className="text-white/70 text-[12px] mt-0.5">{item.keterangan}</p>
            )}
            <span className="flex items-center gap-1 text-white/60 text-[11px] mt-1.5">
              <span className="material-symbols-outlined text-[13px]">collections</span>
              Klik untuk lihat foto
            </span>
          </div>
        </div>
      </div>

      {/* ── Popup / Lightbox ── */}
      {open && (
        <div className="fixed inset-0 z-[999] flex flex-col" style={{ background: 'rgba(0,0,0,0.92)' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0 border-b border-white/10">
            <div className="flex items-center gap-3">
              {idx !== null && (
                <button
                  onClick={closeZoom}
                  className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition"
                  title="Kembali ke grid"
                >
                  <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                </button>
              )}
              <div>
                <p className="text-white font-bold text-[15px]">{item.judul}</p>
                <p className="text-white/50 text-[12px]">
                  {loading
                    ? 'Memuat foto...'
                    : idx !== null
                      ? `${idx + 1} / ${fotos.length}`
                      : `${fotos.length} foto`}
                </p>
              </div>
            </div>
            <button
              onClick={close}
              className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* ── LOADING ── */}
          {loading && (
            <div className="flex-1 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[48px] animate-spin">progress_activity</span>
            </div>
          )}

          {/* ── GRID VIEW (semua foto tampil) ── */}
          {!loading && idx === null && (
            <div className="flex-1 overflow-y-auto p-5">
              <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {fotos.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => openZoom(i)}
                    className="relative aspect-square overflow-hidden rounded-xl border-2 border-transparent hover:border-white/60 transition-all group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.foto_url}
                      alt={`Foto ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Zoom icon on hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[28px]">zoom_in</span>
                    </div>
                    {/* Nomor */}
                    <span className="absolute top-1.5 left-1.5 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      {i + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── ZOOM VIEW (satu foto + slider) ── */}
          {!loading && idx !== null && (
            <>
              {/* Foto utama */}
              <div className="flex-1 flex items-center justify-center relative overflow-hidden px-14">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={fotos[idx]?.id}
                  src={fotos[idx]?.foto_url}
                  alt={`Foto ${idx + 1}`}
                  className="max-h-full max-w-full object-contain rounded-xl select-none"
                  style={{ maxHeight: 'calc(100vh - 220px)' }}
                />
                {fotos.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition"
                    >
                      <span className="material-symbols-outlined text-[26px]">chevron_left</span>
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition"
                    >
                      <span className="material-symbols-outlined text-[26px]">chevron_right</span>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip (geser) */}
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
                        i === idx
                          ? 'border-white scale-110'
                          : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.foto_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      )}
    </>
  )
}
