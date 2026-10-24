'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface BeritaTerbaru {
  id: string
  judul: string
  slug: string | null
  tanggal: string
  foto_url: string | null
}

export default function PenulisDashboard() {
  const [penulisId, setPenulisId] = useState<string | null>(null)
  const [penulisNama, setPenulisNama] = useState('')
  const [total, setTotal] = useState(0)
  const [terbaru, setTerbaru] = useState<BeritaTerbaru[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = localStorage.getItem('penulis_id')
    const nama = localStorage.getItem('penulis_nama') || ''
    setPenulisId(id)
    setPenulisNama(nama)
    if (!id) { setLoading(false); return }
    async function load(id: string) {
      const [countRes, listRes] = await Promise.all([
        supabase.from('kegiatan').select('id', { count: 'exact', head: true }).eq('penulis_id', id),
        supabase.from('kegiatan')
          .select('id, judul, slug, tanggal, foto_url')
          .eq('penulis_id', id)
          .order('tanggal', { ascending: false })
          .limit(5),
      ])
      setTotal(countRes.count ?? 0)
      setTerbaru(listRes.data ?? [])
      setLoading(false)
    }
    load(id)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1a1a1a]">
          Halo, {penulisNama || 'Penulis'} 👋
        </h2>
        <p className="text-sm text-[#6b6b6b] mt-1">
          Tulis dan kelola berita rayon dari sini. Berita yang Anda tulis hanya bisa diakses oleh Anda.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#e5e5e5] hover:shadow-sm transition">
          <div className="flex items-start justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-[#f2f2f2] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-[#1a1a1a]" style={{fontVariationSettings: "'FILL' 1"}}>
                article
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1a1a1a]">{loading ? '...' : total}</p>
          <p className="text-sm text-[#6b6b6b] mt-0.5">Total Berita</p>
        </div>

        <Link href="/penulis/tulis"
          className="bg-[#1a1a1a] rounded-2xl p-5 border border-[#1a1a1a] hover:bg-black transition group flex flex-col justify-between">
          <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px] text-white" style={{fontVariationSettings: "'FILL' 1"}}>
              edit_note
            </span>
          </div>
          <p className="text-base font-bold text-white mt-3">Tulis Berita Baru</p>
          <p className="text-sm text-white/60 mt-0.5">Mulai menulis sekarang</p>
        </Link>
      </div>

      {/* Berita terbaru */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#1a1a1a]">Berita Terbaru Anda</h3>
          <Link href="/penulis/berita-saya" className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition flex items-center gap-1">
            Lihat semua
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32 text-[#6b6b6b]">
            <span className="material-symbols-outlined text-[28px] animate-spin">progress_activity</span>
          </div>
        ) : terbaru.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-[#6b6b6b] gap-2">
            <span className="material-symbols-outlined text-[40px]" style={{fontVariationSettings: "'FILL' 1"}}>article</span>
            <p className="text-sm">Belum ada berita. Yuk tulis berita pertama Anda.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e5e5e5]">
            {terbaru.map(k => (
              <Link key={k.id} href={`/penulis/berita-saya`}
                className="flex items-center gap-4 py-4 hover:bg-[#f9f9f9] -mx-3 px-3 rounded-lg transition">
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#f2f2f2]">
                  {k.foto_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={k.foto_url} alt={k.judul} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px] text-[#6b6b6b]">image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#1a1a1a] text-sm line-clamp-1">{k.judul}</h4>
                  <p className="text-xs text-[#6b6b6b] mt-1">
                    {new Date(k.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#6b6b6b]">chevron_right</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
