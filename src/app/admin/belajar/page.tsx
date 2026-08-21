'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

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
  aktif: boolean
}

const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced']
const CATEGORY_OPTIONS = ['pemrograman', 'islam', 'desain', 'data', 'lainnya']

const levelColor: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
}

const emptyForm = {
  no: 1, title: '', deskripsi: '', level: 'Beginner',
  materi: 0, durasi: '1 jam', bg_color: '#f0f4ff',
  icon: 'school', icon_color: '#0059bb', category: 'pemrograman',
  href: '#', aktif: true,
}

export default function AdminBelajarPage() {
  const [list, setList] = useState<Kursus[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('kursus').select('*').order('no', { ascending: true })
    setList(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openTambah() {
    setEditId(null)
    const maxNo = list.length > 0 ? Math.max(...list.map(k => k.no)) + 1 : 1
    setForm({ ...emptyForm, no: maxNo })
    setShowModal(true)
  }

  function openEdit(k: Kursus) {
    setEditId(k.id)
    setForm({
      no: k.no, title: k.title, deskripsi: k.deskripsi ?? '',
      level: k.level, materi: k.materi, durasi: k.durasi,
      bg_color: k.bg_color, icon: k.icon, icon_color: k.icon_color,
      category: k.category, href: k.href, aktif: k.aktif,
    })
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.title) return
    setSaving(true)
    const payload = {
      no: form.no, title: form.title, deskripsi: form.deskripsi || null,
      level: form.level, materi: Number(form.materi), durasi: form.durasi,
      bg_color: form.bg_color, icon: form.icon, icon_color: form.icon_color,
      category: form.category, href: form.href, aktif: form.aktif,
    }
    if (editId) {
      await supabase.from('kursus').update(payload).eq('id', editId)
    } else {
      await supabase.from('kursus').insert(payload)
    }
    setSaving(false)
    setShowModal(false)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus kursus ini?')) return
    setDeleting(id)
    await supabase.from('kursus').delete().eq('id', id)
    setDeleting(null)
    load()
  }

  async function toggleAktif(id: string, aktif: boolean) {
    await supabase.from('kursus').update({ aktif: !aktif }).eq('id', id)
    setList(prev => prev.map(k => k.id === id ? { ...k, aktif: !aktif } : k))
  }

  const filtered = list.filter(k =>
    k.title.toLowerCase().includes(search.toLowerCase()) ||
    k.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#0a1628]">Manajemen Kursus Belajar</h2>
          <p className="text-sm text-gray-500 mt-0.5">Kelola daftar kursus dan materi belajar kader</p>
        </div>
        <button onClick={openTambah}
          className="flex items-center gap-2 bg-[#0059bb] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition">
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Tambah Kursus
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">search</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Cari kursus..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
      </div>

      {/* Grid preview kartu */}
      {loading ? (
        <div className="flex items-center justify-center h-40 text-gray-400">
          <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2 bg-white rounded-2xl border border-gray-100">
          <span className="material-symbols-outlined text-[40px]">school</span>
          <p className="text-sm">Belum ada kursus</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(k => (
            <div key={k.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition ${k.aktif ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
              {/* Preview thumbnail */}
              <div
                className="relative flex items-center justify-center"
                style={{ background: k.bg_color, minHeight: 100 }}
              >
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                  <span className="text-[10px] font-bold text-[#0a1628]">{k.no}</span>
                </div>
                {!k.aktif && (
                  <div className="absolute top-2 right-2 bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Nonaktif
                  </div>
                )}
                <span
                  className="material-symbols-outlined text-[48px]"
                  style={{ color: k.icon_color, fontVariationSettings: "'FILL' 1" }}
                >
                  {k.icon}
                </span>
              </div>

              <div className="p-4">
                {/* Level & kategori */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelColor[k.level] ?? 'bg-gray-100 text-gray-600'}`}>
                    {k.level}
                  </span>
                  <span className="text-[10px] bg-[#eef5ff] text-[#0059bb] font-semibold px-2 py-0.5 rounded-full capitalize">
                    {k.category}
                  </span>
                  <span className="text-[11px] text-gray-400 ml-auto flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">layers</span>
                    {k.materi}
                  </span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {k.durasi}
                  </span>
                </div>

                <h3 className="font-bold text-[#0a1628] text-sm mb-1 line-clamp-1">{k.title}</h3>
                {k.deskripsi && <p className="text-xs text-gray-500 line-clamp-2 mb-3">{k.deskripsi}</p>}

                {/* Link */}
                <p className="text-xs text-gray-400 truncate mb-3">
                  <span className="material-symbols-outlined text-[12px] mr-1">link</span>
                  {k.href === '#' ? 'Belum ada link' : k.href}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button onClick={() => toggleAktif(k.id, k.aktif)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition ${
                      k.aktif
                        ? 'border-gray-200 text-gray-500 hover:bg-gray-50'
                        : 'border-green-200 text-green-600 hover:bg-green-50'
                    }`}>
                    <span className="material-symbols-outlined text-[14px]">{k.aktif ? 'visibility_off' : 'visibility'}</span>
                    {k.aktif ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                  <button onClick={() => openEdit(k)}
                    className="p-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 transition">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button onClick={() => handleDelete(k.id)} disabled={deleting === k.id}
                    className="p-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition disabled:opacity-50">
                    <span className="material-symbols-outlined text-[16px]">
                      {deleting === k.id ? 'progress_activity' : 'delete'}
                    </span>
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
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-[#0a1628]">{editId ? 'Edit Kursus' : 'Tambah Kursus'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Preview mini */}
              <div className="rounded-xl overflow-hidden border border-gray-100 flex gap-0">
                <div className="flex items-center justify-center w-24 flex-shrink-0"
                  style={{ background: form.bg_color, minHeight: 72 }}>
                  <span className="material-symbols-outlined text-[36px]"
                    style={{ color: form.icon_color, fontVariationSettings: "'FILL' 1" }}>
                    {form.icon}
                  </span>
                </div>
                <div className="flex-1 p-3 bg-gray-50">
                  <p className="text-xs font-bold text-[#0a1628] line-clamp-1">{form.title || 'Judul kursus...'}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{form.level} · {form.materi} materi · {form.durasi}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Nomor urut</label>
                  <input type="number" value={form.no} onChange={e => setForm({ ...form, no: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Level</label>
                  <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]">
                    {LEVEL_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Judul <span className="text-red-500">*</span></label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Judul kursus"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Deskripsi</label>
                <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })}
                  rows={3} placeholder="Deskripsi singkat kursus..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Kategori</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]">
                    {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Jumlah Materi</label>
                  <input type="number" value={form.materi} onChange={e => setForm({ ...form, materi: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Durasi</label>
                  <input value={form.durasi} onChange={e => setForm({ ...form, durasi: e.target.value })}
                    placeholder="contoh: 2 jam"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Icon (Material)</label>
                  <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
                    placeholder="contoh: computer"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Warna Background</label>
                  <div className="flex gap-2">
                    <input type="color" value={form.bg_color} onChange={e => setForm({ ...form, bg_color: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                    <input value={form.bg_color} onChange={e => setForm({ ...form, bg_color: e.target.value })}
                      className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Warna Icon</label>
                  <div className="flex gap-2">
                    <input type="color" value={form.icon_color} onChange={e => setForm({ ...form, icon_color: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                    <input value={form.icon_color} onChange={e => setForm({ ...form, icon_color: e.target.value })}
                      className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Link Kursus</label>
                <input value={form.href} onChange={e => setForm({ ...form, href: e.target.value })}
                  placeholder="https://... atau # jika belum ada"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]" />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, aktif: !form.aktif })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.aktif ? 'bg-[#0059bb]' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.aktif ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
                <label className="text-sm font-semibold text-[#0a1628]">
                  {form.aktif ? 'Aktif — tampil di halaman belajar' : 'Nonaktif — tersembunyi dari publik'}
                </label>
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">
                Batal
              </button>
              <button onClick={handleSave} disabled={saving || !form.title}
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
