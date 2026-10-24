'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface KomentarRow {
  id: string
  kegiatan_id: string
  nama: string
  isi: string
  parent_id: string | null
  created_at: string
}

export default function AdminKomentarPage() {
  const [list, setList] = useState<KomentarRow[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('komentar')
      .select('*')
      .order('created_at', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function handleDelete(id: string) {
    if (!confirm('Hapus komentar ini? Balasan di dalamnya juga akan ikut terhapus.')) return
    setDeleting(id)
    try {
      await fetch(`/api/komentar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer rayon-admin-2025' },
      })
      setList((prev) => prev.filter((k) => k.id !== id))
    } catch {
      alert('Gagal menghapus komentar.')
    } finally {
      setDeleting(null)
    }
  }

  function timeAgo(dateStr: string): string {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
    if (diff < 60) return 'baru saja'
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filtered = list.filter((k) => {
    const q = search.toLowerCase()
    return (
      k.nama.toLowerCase().includes(q) ||
      k.isi.toLowerCase().includes(q) ||
      k.kegiatan_id.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#1a1a1a]">Manajemen Komentar</h2>
          <p className="text-sm text-[#6b6b6b] mt-0.5">Kelola komentar di halaman berita</p>
        </div>
        <div className="bg-white border border-[#e5e5e5] rounded-2xl px-4 py-2 text-sm text-[#1a1a1a]">
          Total: <span className="font-bold">{list.length}</span> komentar
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6b6b6b] text-[18px]">
          search
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari komentar..."
          className="w-full pl-9 pr-4 py-2.5 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a]"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-40 text-[#6b6b6b]">
          <span className="material-symbols-outlined text-[32px] animate-spin">
            progress_activity
          </span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-[#6b6b6b] gap-2 bg-white rounded-2xl border border-[#e5e5e5]">
          <span className="material-symbols-outlined text-[40px]">comment</span>
          <p className="text-sm">Belum ada komentar</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#f9f9f9] text-left">
                  <th className="px-4 py-3 font-semibold text-[#1a1a1a] w-32">Nama</th>
                  <th className="px-4 py-3 font-semibold text-[#1a1a1a]">Komentar</th>
                  <th className="px-4 py-3 font-semibold text-[#1a1a1a] w-40 hidden md:table-cell">
                    Berita
                  </th>
                  <th className="px-4 py-3 font-semibold text-[#1a1a1a] w-36 hidden sm:table-cell">
                    Waktu
                  </th>
                  <th className="px-4 py-3 font-semibold text-[#1a1a1a] w-20">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {filtered.map((k) => (
                  <tr key={k.id} className="hover:bg-[#f9f9f9]/50 transition">
                    {/* Nama */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#f2f2f2] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-[#1a1a1a]">
                            {k.nama.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-[#1a1a1a] truncate max-w-[80px]">
                          {k.nama}
                        </span>
                      </div>
                    </td>

                    {/* Isi */}
                    <td className="px-4 py-3">
                      <p className="text-[#6b6b6b] leading-relaxed line-clamp-2 max-w-[300px]">
                        {k.isi.length > 100 ? k.isi.slice(0, 100) + '...' : k.isi}
                      </p>
                      {k.parent_id && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#6b6b6b] mt-1">
                          <span className="material-symbols-outlined text-[12px]">reply</span>
                          Balasan
                        </span>
                      )}
                    </td>

                    {/* Kegiatan ID */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Link
                        href={`/news/${k.kegiatan_id}`}
                        target="_blank"
                        className="text-[#1a1a1a] underline underline-offset-2 hover:text-[#333] text-xs truncate block max-w-[140px]"
                        title={k.kegiatan_id}
                      >
                        {k.kegiatan_id.length > 20
                          ? k.kegiatan_id.slice(0, 20) + '...'
                          : k.kegiatan_id}
                      </Link>
                    </td>

                    {/* Waktu */}
                    <td className="px-4 py-3 hidden sm:table-cell text-[#6b6b6b] text-xs whitespace-nowrap">
                      {timeAgo(k.created_at)}
                    </td>

                    {/* Aksi */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(k.id)}
                        disabled={deleting === k.id}
                        className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-600 transition disabled:opacity-50"
                        aria-label="Hapus komentar"
                      >
                        <span className="material-symbols-outlined text-[15px]">delete</span>
                        {deleting === k.id ? '...' : 'Hapus'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
