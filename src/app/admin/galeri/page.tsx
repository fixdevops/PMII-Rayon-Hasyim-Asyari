'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface Galeri {
  id: string
  judul: string
  foto_url: string
  keterangan: string | null
  tanggal: string
}

const emptyForm = {
  judul: '',
  keterangan: '',
  tanggal: new Date().toISOString().split('T')[0],
}

export default function AdminGaleriPage() {
  const [list, setList] = useState<Galeri[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [currentFotoUrl, setCurrentFotoUrl] = useState<string | null>(null)

  // Upload state
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [lightbox, setLightbox] = useState<Galeri | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('galeri').select('*').order('tanggal', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openTambah() {
    setEditId(null)
    setForm({ ...emptyForm, tanggal: new Date().toISOString().split('T')[0] })
    setCurrentFotoUrl(null)
    setFotoFile(null)
    setFotoPreview(null)
    setShowModal(true)
  }

  function openEdit(g: Galeri) {
    setEditId(g.id)
    setForm({ judul: g.judul, keterangan: g.keterangan ?? '', tanggal: g.tanggal })
    setCurrentFotoUrl(g.foto_url)
    setFotoFile(null)
    setFotoPreview(g.foto_url)
    setShowModal(true)
  }

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFotoFile(file)
    setFotoPreview(URL.createObjectURL(file))
  }

  function removeFoto() {
    setFotoFile(null)
    setFotoPreview(null)
    setCurrentFotoUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function uploadFoto(id: string): Promise<string | null> {
    if (!fotoFile) return currentFotoUrl
    setUploading(true)
    const ext = fotoFile.name.split('.').pop()
    const path = `${id}.${ext}`
    const { error } = await supabase.storage
      .from('galeri')
      .upload(path, fotoFile, { upsert: true })
    setUploading(false)
    if (error) return currentFotoUrl
    const { data } = supabase.storage.from('galeri').getPublicUrl(path)
    return data.publicUrl
  }

  async function handleSave() {
    if (!form.judul) return
    // Wajib ada foto (baru atau existing)
    if (!fotoPreview) {
      alert('Pilih foto terlebih dahulu.')
      return
    }
    setSaving(true)

    let targetId = editId
    if (!editId) {
      const { data: inserted } = await supabase
        .from('galeri')
        .insert({
          judul: form.judul,
          foto_url: '',
          keterangan: form.keterangan || null,
          tanggal: form.tanggal,
        })
        .select('id')
        .single()
      targetId = inserted?.id ?? null
    }

    if (!targetId) { setSaving(false); return }

    const foto_url = await uploadFoto(targetId)

    await supabase.from('galeri').update({
      judul: form.judul,
      foto_url: foto_url ?? '',
      keterangan: form.keterangan || null,
      tanggal: form.tanggal,
    }).eq('id', targetId)

    setSaving(false)
    setShowModal(false)
    load()
  }

  async function handleDelete(id: string, fotoUrl: string) {
    if (!confirm('Hapus foto ini?')) return
    setDeleting(id)
    // Hapus file dari storage
    if (fotoUrl) {
      const path = fotoUrl.split('/galeri/')[1]?.split('?')[0]
      if (path) await supabase.storage.from('galeri').remove([path])
    }
    await supabase.from('galeri').delete().eq('id', id)
    setDeleting(null)
    load()
  }

  const filtered = list.filter(g =>
    g.judul.toLowerCase().includes(search.toLowerCase()) ||
    (g.keterangan ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const isBusy = saving || uploading

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#0a1628]">Manajemen Galeri</h2>
          <p className="text-sm text-gray-500 mt-0.5">Kelola foto dokumentasi kegiatan</p>
        </div>
        <button onClick={openTambah}
          className="flex items-center gap-2 bg-[#0059bb] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition">
          <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
          Tambah Foto
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari foto..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
        </div>
        <span className="text-sm text-gray-400">{filtered.length} foto</span>
      </div>

      {/* Masonry grid */}
      {loading ? (
        <div className="flex items-center justify-center h-40 text-gray-400">
          <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2 bg-white rounded-2xl border border-gray-100">
          <span className="material-symbols-outlined text-[40px]">photo_library</span>
          <p className="text-sm">Belum ada foto</p>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 xl:columns-4 gap-3 space-y-3">
          {filtered.map(g => (
            <div key={g.id} className="break-inside-avoid group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition">
              <div className="relative overflow-hidden cursor-pointer" onClick={() => setLightbox(g)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.foto_url} alt={g.judul}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[28px] opacity-0 group-hover:opacity-100 transition">zoom_in</span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-[#0a1628] line-clamp-1">{g.judul}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(g.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                {g.keterangan && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{g.keterangan}</p>}
                <div className="flex gap-2 mt-2">
                  <button onClick={() => openEdit(g)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-blue-200 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-50 transition">
                    <span className="material-symbols-outlined text-[13px]">edit</span>Edit
                  </button>
                  <button onClick={() => handleDelete(g.id, g.foto_url)} disabled={deleting === g.id}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-red-200 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-50 transition disabled:opacity-50">
                    <span className="material-symbols-outlined text-[13px]">
                      {deleting === g.id ? 'progress_activity' : 'delete'}
                    </span>Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white transition">
            <span className="material-symbols-outlined text-[32px]">close</span>
          </button>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.foto_url} alt={lightbox.judul} className="w-full rounded-2xl object-contain max-h-[80vh]" />
            <div className="mt-3 text-center">
              <p className="text-white font-semibold">{lightbox.judul}</p>
              {lightbox.keterangan && <p className="text-white/60 text-sm mt-1">{lightbox.keterangan}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-[#0a1628]">{editId ? 'Edit Foto' : 'Tambah Foto'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">

              {/* Upload area */}
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-2">
                  Foto <span className="text-red-500">*</span>
                </label>

                {fotoPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={fotoPreview} alt="preview" className="w-full max-h-56 object-cover" />
                    <button
                      onClick={removeFoto}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                    <label
                      htmlFor="galeri-upload"
                      className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 hover:bg-[#0059bb] text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition"
                    >
                      <span className="material-symbols-outlined text-[14px]">upload</span>
                      Ganti
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="galeri-upload"
                    className="flex flex-col items-center justify-center gap-3 w-full h-40 border-2 border-dashed border-[#0059bb]/30 rounded-xl cursor-pointer hover:border-[#0059bb] hover:bg-[#eef5ff] transition"
                  >
                    <span className="material-symbols-outlined text-[40px] text-[#0059bb]/40">add_photo_alternate</span>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#0059bb]">Klik untuk upload foto</p>
                      <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WebP · Maks 10 MB</p>
                    </div>
                  </label>
                )}

                <input
                  ref={fileInputRef}
                  id="galeri-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFotoChange}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">
                  Judul <span className="text-red-500">*</span>
                </label>
                <input value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })}
                  placeholder="Judul foto"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Tanggal</label>
                <input type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Keterangan</label>
                <textarea value={form.keterangan} onChange={e => setForm({ ...form, keterangan: e.target.value })}
                  rows={2} placeholder="Keterangan foto (opsional)"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] resize-none" />
              </div>

            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">
                Batal
              </button>
              <button onClick={handleSave} disabled={isBusy || !form.judul || !fotoPreview}
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
