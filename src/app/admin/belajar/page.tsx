'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface Kursus {
  id: string
  no: number
  title: string
  deskripsi: string | null
  level: string
  materi: number
  durasi: string
  thumbnail_url: string | null
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
  materi: 0, durasi: '1 jam', category: 'pemrograman',
  href: '#', aktif: true,
}

export default function AdminBelajarPage() {
  const [list, setList] = useState<Kursus[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [currentThumbUrl, setCurrentThumbUrl] = useState<string | null>(null)

  // Upload state
  const [thumbFile, setThumbFile] = useState<File | null>(null)
  const [thumbPreview, setThumbPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    setCurrentThumbUrl(null)
    setThumbFile(null)
    setThumbPreview(null)
    setShowModal(true)
  }

  function openEdit(k: Kursus) {
    setEditId(k.id)
    setForm({
      no: k.no, title: k.title, deskripsi: k.deskripsi ?? '',
      level: k.level, materi: k.materi, durasi: k.durasi,
      category: k.category, href: k.href, aktif: k.aktif,
    })
    setCurrentThumbUrl(k.thumbnail_url)
    setThumbFile(null)
    setThumbPreview(k.thumbnail_url)
    setShowModal(true)
  }

  function handleThumbChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setThumbFile(file)
    setThumbPreview(URL.createObjectURL(file))
  }

  function removeThumb() {
    setThumbFile(null)
    setThumbPreview(null)
    setCurrentThumbUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function uploadThumb(id: string): Promise<string | null> {
    if (!thumbFile) return currentThumbUrl
    setUploading(true)
    const ext = thumbFile.name.split('.').pop()
    const path = `${id}.${ext}`
    const { error } = await supabase.storage.from('kursus').upload(path, thumbFile, { upsert: true })
    setUploading(false)
    if (error) return currentThumbUrl
    const { data } = supabase.storage.from('kursus').getPublicUrl(path)
    return data.publicUrl
  }

  async function handleSave() {
    if (!form.title) return
    setSaving(true)

    let targetId = editId
    if (!editId) {
      const { data: inserted } = await supabase.from('kursus').insert({
        no: form.no, title: form.title, deskripsi: form.deskripsi || null,
        level: form.level, materi: Number(form.materi), durasi: form.durasi,
        category: form.category, href: form.href, aktif: form.aktif,
        thumbnail_url: null,
        // legacy fields — beri default agar tidak error jika kolom masih ada
        bg_color: '#f0f4ff', icon: 'school', icon_color: '#0059bb',
      }).select('id').single()
      targetId = inserted?.id ?? null
    }

    if (!targetId) { setSaving(false); return }

    const thumbnail_url = await uploadThumb(targetId)
    await supabase.from('kursus').update({
      no: form.no, title: form.title, deskripsi: form.deskripsi || null,
      level: form.level, materi: Number(form.materi), durasi: form.durasi,
      category: form.category, href: form.href, aktif: form.aktif, thumbnail_url,
    }).eq('id', targetId)

    setSaving(false)
    setShowModal(false)
    load()
  }

  async function handleDelete(id: string, thumbUrl: string | null) {
    if (!confirm('Hapus kursus ini?')) return
    setDeleting(id)
    if (thumbUrl) {
      const path = thumbUrl.split('/kursus/')[1]?.split('?')[0]
      if (path) await supabase.storage.from('kursus').remove([path])
    }
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

  const isBusy = saving || uploading

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

      {/* Grid */}
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
              {/* Thumbnail */}
              <div className="aspect-video bg-gray-50 overflow-hidden relative">
                {k.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={k.thumbnail_url} alt={k.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-gray-200 text-[40px]">image</span>
                    <p className="text-xs text-gray-300">Belum ada thumbnail</p>
                  </div>
                )}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                  <span className="text-[10px] font-bold text-[#0a1628]">{k.no}</span>
                </div>
                {!k.aktif && (
                  <div className="absolute top-2 right-2 bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Nonaktif
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelColor[k.level] ?? 'bg-gray-100 text-gray-600'}`}>
                    {k.level}
                  </span>
                  <span className="text-[10px] bg-[#eef5ff] text-[#0059bb] font-semibold px-2 py-0.5 rounded-full capitalize">
                    {k.category}
                  </span>
                  <span className="text-[11px] text-gray-400 ml-auto flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">layers</span>{k.materi}
                  </span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>{k.durasi}
                  </span>
                </div>
                <h3 className="font-bold text-[#0a1628] text-sm mb-3 line-clamp-2">{k.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAktif(k.id, k.aktif)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition ${
                      k.aktif ? 'border-gray-200 text-gray-500 hover:bg-gray-50' : 'border-green-200 text-green-600 hover:bg-green-50'
                    }`}>
                    <span className="material-symbols-outlined text-[14px]">{k.aktif ? 'visibility_off' : 'visibility'}</span>
                    {k.aktif ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                  <button onClick={() => openEdit(k)}
                    className="p-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 transition">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button onClick={() => handleDelete(k.id, k.thumbnail_url)} disabled={deleting === k.id}
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

              {/* Upload thumbnail */}
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-2">Thumbnail Kursus</label>
                {thumbPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumbPreview} alt="preview" className="w-full max-h-48 object-cover" />
                    <button onClick={removeThumb}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                    <label htmlFor="kursus-upload"
                      className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 hover:bg-[#0059bb] text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition">
                      <span className="material-symbols-outlined text-[14px]">upload</span>Ganti
                    </label>
                  </div>
                ) : (
                  <label htmlFor="kursus-upload"
                    className="flex flex-col items-center justify-center gap-3 w-full h-36 border-2 border-dashed border-[#0059bb]/30 rounded-xl cursor-pointer hover:border-[#0059bb] hover:bg-[#eef5ff] transition">
                    <span className="material-symbols-outlined text-[36px] text-[#0059bb]/40">add_photo_alternate</span>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#0059bb]">Klik untuk upload thumbnail</p>
                      <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WebP · Maks 10 MB</p>
                    </div>
                  </label>
                )}
                <input ref={fileInputRef} id="kursus-upload" type="file"
                  accept="image/jpeg,image/png,image/webp" onChange={handleThumbChange} className="hidden" />
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
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Link Kursus</label>
                  <input value={form.href} onChange={e => setForm({ ...form, href: e.target.value })}
                    placeholder="https://... atau #"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setForm({ ...form, aktif: !form.aktif })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.aktif ? 'bg-[#0059bb]' : 'bg-gray-300'}`}>
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
              <button onClick={handleSave} disabled={isBusy || !form.title}
                className="flex-1 bg-[#0059bb] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition disabled:opacity-60 flex items-center justify-center gap-2">
                {isBusy && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
                {uploading ? 'Mengupload...' : saving ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambahkan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
