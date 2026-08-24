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
    if (data && data.length > 0) {
      setFotos(data)
    } else {
      // Fallback: hanya foto cover
      setFotos([{ id: item.id, foto_url: item.foto_url, urutan: 0 }])
    }
    setLoading(false)
  }

  const close = () => setOpen(false)

  const prev = useCallback(() => setIdx(i => (i - 1 + fotos.length) % fotos.length), [fotos.length])
  const next = useCallback(() => setIdx(i => (i + 1) % fotos.length), [fotos.length])

  // Keyboard navigation
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

  return (
    <>
      {/* Album card */}
      <div
        onClick={openAlbum}
        className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-[#d0e4ff] hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.foto_url}
            alt={item.judul}
            className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Overlay info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <span className="text-white/70 text-[11px] font-medium mb-0.5">{item.keterangan}</span>
            <h4 className="text-white text-[15px] font-semibold leading-snug">{item.judul}</h4>
            <span className="flex items-center gap-1 text-white/60 text-[11px] mt-1">
              <span className="material-symbols-outlined text-[12px]">collections</span>
              Lihat semua foto
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 bg-black/95 z-[999] flex flex-col"
          onClick={close}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            onClick={e => e.stopPropagation()}
          >
            <div>
              <p className="text-white font-bold">{item.judul}</p>
              <p className="text-white/50 text-sm">
                {loading ? 'Memuat...' : `${idx + 1} / ${fotos.length} foto`}
              </p>
            </div>
            <button
              onClick={close}
              className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Foto utama */}
          <div
            className="flex-1 flex items-center justify-center relative overflow-hidden px-14"
            onClick={e => e.stopPropagation()}
          >
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
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition"
                    >
                      <span className="material-symbols-outlined text-[22px]">chevron_left</span>
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition"
                    >
                      <span className="material-symbols-outlined text-[22px]">chevron_right</span>
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
              onClick={e => e.stopPropagation()}
            >
              {fotos.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => setIdx(i)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === idx
                      ? 'border-white scale-105'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.foto_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
