'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface Kegiatan {
  id: string
  judul: string
  deskripsi: string | null
  tanggal: string
  lokasi: string | null
  foto_url: string | null
  kategori: string
}

const KATEGORI_OPTIONS = ['umum', 'kajian', 'pelatihan', 'aksi sosial', 'kaderisasi', 'keagamaan', 'rapat']

const emptyForm = { judul: '', deskripsi: '', tanggal: '', lokasi: '', foto_url: '', kategori: 'umum' }

const kategoriColor: Record<string, string> = {
  umum: 'bg-gray-100 text-gray-600',
  kajian: 'bg-blue-100 text-blue-700',
  pelatihan: 'bg-purple-100 text-purple-700',
  'aksi sosial': 'bg-green-100 text-green-700',
  kaderisasi: 'bg-yellow-100 text-yellow-700',
  keagamaan: 'bg-emerald-100 text-emerald-700',
  rapat: 'bg-orange-100 text-orange-700',
}

export default function AdminKegiatanPage() {
  const [list, setList] = useState<Kegiatan[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('kegiatan').select('*').order('tanggal', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openTambah() {
    setEditId(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  function openEdit(k: Kegiatan) {
    setEditId(k.id)
    setForm({
      judul: k.judul,
      deskripsi: k.deskripsi ?? '',
      tanggal: k.tanggal,
      lokasi: k.lokasi ?? '',
      foto_url: k.foto_url ?? '',
      kategori: k.kategori,
    })
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.judul || !form.tanggal) return
    setSaving(true)
    const payload = {
      judul: form.judul,
      deskripsi: form.deskripsi || null,
      tanggal: form.tanggal,
      lokasi: form.lokasi || null,
      foto_url: form.foto_url || null,
      kategori: form.kategori,
    }
    if (editId) {
      await supabase.from('kegiatan').update(payload).eq('id', editId)
    } else {
      await supabase.from('kegiatan').insert(payload)
    }
    setSaving(false)
    setShowModal(false)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus kegiatan ini?')) return
    setDeleting(id)
    await supabase.from('kegiatan').delete().eq('id', id)
    setDeleting(null)
    load()
  }

  const filtered = list.filter(k =>
    k.judul.toLowerCase().includes(search.toLowerCase()) ||
    (k.deskripsi ?? '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#0a1628]">Manajemen Kegiatan</h2>
          <p className="text-sm text-gray-500 mt-0.5">Kelola berita dan kegiatan rayon</p>
        </div>
        <button onClick={openTambah}
          className="flex items-center gap-2 bg-[#0059bb] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition">
          <span className="material-symbols-outlined text-[18px]">event_available</span>
          Tambah Kegiatan
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">search</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Cari kegiatan..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
      </div>

      {/* Grid cards */}
      {loading ? (
        <div className="flex items-center justify-center h-40 text-gray-400">
          <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2 bg-white rounded-2xl border border-gray-100">
          <span className="material-symbols-outlined text-[40px]">event_busy</span>
          <p className="text-sm">Belum ada kegiatan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(k => (
            <div key={k.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
              {/* Foto */}
              <div className="aspect-video bg-gray-50 overflow-hidden">
                {k.foto_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={k.foto_url} alt={k.judul} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-200 text-[48px]">image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${kategoriColor[k.kategori] ?? 'bg-gray-100 text-gray-600'}`}>
                    {k.kategori}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                    {new Date(k.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="font-bold text-[#0a1628] text-sm mb-1 line-clamp-1">{k.judul}</h3>
                {k.deskripsi && <p className="text-xs text-gray-500 line-clamp-2 mb-3">{k.deskripsi}</p>}
                {k.lokasi && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                    <span className="material-symbols-outlined text-[13px]">location_on</span>
                    {k.lokasi}
                  </p>
                )}
                <div className="flex gap-2">
                  <button onClick={() => openEdit(k)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-blue-200 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-50 transition">
                    <span className="material-symbols-outlined text-[15px]">edit</span>Edit
                  </button>
                  <button onClick={() => handleDelete(k.id)} disabled={deleting === k.id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-red-200 text-red-500 rounded-xl text-xs font-semibold hover:bg-red-50 transition disabled:opacity-50">
                    <span className="material-symbols-outlined text-[15px]">
                      {deleting === k.id ? 'progress_activity' : 'delete'}
                    </span>Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <h3 className="font-bold text-[#0a1628]">{editId ? 'Edit Kegiatan' : 'Tambah Kegiatan'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Judul <span className="text-red-500">*</span></label>
                <input value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })}
                  placeholder="Judul kegiatan"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Tanggal <span className="text-red-500">*</span></label>
                  <input type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Kategori</label>
                  <select value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]">
                    {KATEGORI_OPTIONS.map(k => <option key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Lokasi</label>
                <input value={form.lokasi} onChange={e => setForm({ ...form, lokasi: e.target.value })}
                  placeholder="Lokasi kegiatan"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Deskripsi</label>
                <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })}
                  rows={3} placeholder="Deskripsi kegiatan..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">URL Foto</label>
                <input value={form.foto_url} onChange={e => setForm({ ...form, foto_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
                {form.foto_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.foto_url} alt="preview" className="mt-2 w-full h-32 object-cover rounded-xl border border-gray-100" />
                )}
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">
                Batal
              </button>
              <button onClick={handleSave} disabled={saving || !form.judul || !form.tanggal}
                className="flex-1 bg-[#0059bb] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition disabled:opacity-60 flex items-center justify-center gap-2">
                {saving && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
                {editId ? 'Simpan Perubahan' : 'Tambahkan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
