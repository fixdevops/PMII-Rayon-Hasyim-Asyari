'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface Aspirasi {
  id: string
  nama: string | null
  pesan: string
  status: string
  created_at: string
}

const STATUS_OPTIONS = ['baru', 'dibaca', 'ditanggapi', 'arsip']

const statusConfig: Record<string, { color: string; label: string; icon: string }> = {
  baru: { color: 'bg-red-100 text-red-700', label: 'Baru', icon: 'mark_unread_chat_alt' },
  dibaca: { color: 'bg-blue-100 text-blue-700', label: 'Dibaca', icon: 'drafts' },
  ditanggapi: { color: 'bg-green-100 text-green-700', label: 'Ditanggapi', icon: 'mark_chat_read' },
  arsip: { color: 'bg-gray-100 text-gray-600', label: 'Arsip', icon: 'inventory_2' },
}

export default function AdminAspirasiPage() {
  const [list, setList] = useState<Aspirasi[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [selected, setSelected] = useState<Aspirasi | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('aspirasi').select('*').order('created_at', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function updateStatus(id: string, status: string) {
    setUpdating(id)
    await supabase.from('aspirasi').update({ status }).eq('id', id)
    setUpdating(null)
    // Update local state immediately
    setList(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus aspirasi ini?')) return
    setDeleting(id)
    await supabase.from('aspirasi').delete().eq('id', id)
    setDeleting(null)
    setSelected(null)
    load()
  }

  const filtered = list.filter(a => {
    const q = search.toLowerCase()
    const matchSearch = (a.pesan.toLowerCase().includes(q)) || ((a.nama ?? '').toLowerCase().includes(q))
    const matchStatus = !filterStatus || a.status === filterStatus
    return matchSearch && matchStatus
  })

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = list.filter(a => a.status === s).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#0a1628]">Manajemen Aspirasi</h2>
          <p className="text-sm text-gray-500 mt-0.5">Kelola pesan dan aspirasi kader</p>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus('')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${!filterStatus ? 'bg-[#0059bb] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
          Semua ({list.length})
        </button>
        {STATUS_OPTIONS.map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${filterStatus === s ? 'bg-[#0059bb] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            <span className="material-symbols-outlined text-[15px]">{statusConfig[s]?.icon}</span>
            {statusConfig[s]?.label} ({counts[s] ?? 0})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">search</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Cari aspirasi..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
      </div>

      {/* List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center h-40 text-gray-400">
            <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center h-40 text-gray-400 gap-2 bg-white rounded-2xl border border-gray-100">
            <span className="material-symbols-outlined text-[40px]">forum</span>
            <p className="text-sm">Belum ada aspirasi</p>
          </div>
        ) : (
          filtered.map(a => (
            <div key={a.id}
              className={`bg-white rounded-2xl border shadow-sm p-5 transition cursor-pointer hover:shadow-md ${selected?.id === a.id ? 'border-[#0059bb] ring-2 ring-[#0059bb]/20' : 'border-gray-100'}`}
              onClick={() => setSelected(selected?.id === a.id ? null : a)}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#eef5ff] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#0059bb] text-[16px]">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0a1628]">{a.nama ?? 'Anonim'}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusConfig[a.status]?.color ?? 'bg-gray-100 text-gray-600'}`}>
                  {statusConfig[a.status]?.label ?? a.status}
                </span>
              </div>

              <p className={`text-sm text-gray-700 leading-relaxed ${selected?.id === a.id ? '' : 'line-clamp-3'}`}>
                {a.pesan}
              </p>

              {/* Expanded actions */}
              {selected?.id === a.id && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">Ubah Status:</p>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map(s => (
                        <button key={s} onClick={(e) => { e.stopPropagation(); updateStatus(a.id, s) }}
                          disabled={updating === a.id}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${a.status === s
                            ? 'border-[#0059bb] text-[#0059bb] bg-[#eef5ff]'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                          {updating === a.id ? '...' : statusConfig[s]?.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(a.id) }}
                    disabled={deleting === a.id}
                    className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 transition disabled:opacity-50">
                    <span className="material-symbols-outlined text-[15px]">delete</span>
                    {deleting === a.id ? 'Menghapus...' : 'Hapus Aspirasi'}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
