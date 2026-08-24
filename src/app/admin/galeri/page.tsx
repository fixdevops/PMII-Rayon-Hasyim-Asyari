'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface GaleriFoto {
  id: string
  foto_url: string
  urutan: number
}

interface Galeri {
  id: string
  judul: string
  foto_url: string        // cover photo (foto pertama)
  keterangan: string | null
  tanggal: string
  galeri_foto?: GaleriFoto[]
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

  // Multi-foto state
  const [fotoFiles, setFotoFiles] = useState<File[]>([])
  const [fotoPreviews, setFotoPreviews] = useState<string[]>([])   // preview baru (blob)
  const [existingFotos, setExistingFotos] = useState<GaleriFoto[]>([])  // foto sudah tersimpan
  const [deletedFotoIds, setDeletedFotoIds] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // Lightbox state
  const [lightboxAlbum, setLightboxAlbum] = useState<Galeri | null>(null)
  const [lightboxFotos, setLightboxFotos] = useState<GaleriFoto[]>([])
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const [lightboxLoading, setLightboxLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('galeri')
      .select('*')
      .order('tanggal', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  // Buka lightbox album
  async function openLightbox(g: Galeri) {
    setLightboxAlbum(g)
    setLightboxIdx(0)
    setLightboxLoading(true)
    const { data } = await supabase
      .from('galeri_foto')
      .select('*')
      .eq('galeri_id', g.id)
      .order('urutan', { ascending: true })
    // Kalau belum ada di galeri_foto, fallback ke foto_url cover
    if (data && data.length > 0) {
      setLightboxFotos(data)
    } else {
      setLightboxFotos([{ id: g.id, foto_url: g.foto_url, urutan: 0 }])
    }
    setLightboxLoading(false)
  }

  function openTambah() {
    setEditId(null)
    setForm({ ...emptyForm, tanggal: new Date().toISOString().split('T')[0] })
    setFotoFiles([])
    setFotoPreviews([])
    setExistingFotos([])
    setDeletedFotoIds([])
    setShowModal(true)
  }

  async function openEdit(g: Galeri) {
    setEditId(g.id)
    setForm({ judul: g.judul, keterangan: g.keterangan ?? '', tanggal: g.tanggal })
    setFotoFiles([])
    setFotoPreviews([])
    setDeletedFotoIds([])
    setShowModal(true)
    // Load foto existing
    const { data } = await supabase
      .from('galeri_foto')
      .select('*')
      .eq('galeri_id', g.id)
      .order('urutan', { ascending: true })
    if (data && data.length > 0) {
      setExistingFotos(data)
    } else if (g.foto_url) {
      // Fallback cover lama (belum punya galeri_foto)
      setExistingFotos([{ id: '__cover__', foto_url: g.foto_url, urutan: 0 }])
    } else {
      setExistingFotos([])
    }
  }

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setFotoFiles(prev => [...prev, ...files])
    const previews = files.map(f => URL.createObjectURL(f))
    setFotoPreviews(prev => [...prev, ...previews])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removeNewFoto(idx: number) {
    setFotoFiles(prev => prev.filter((_, i) => i !== idx))
    setFotoPreviews(prev => prev.filter((_, i) => i !== idx))
  }

  function removeExistingFoto(foto: GaleriFoto) {
    setExistingFotos(prev => prev.filter(f => f.id !== foto.id))
    if (foto.id !== '__cover__') setDeletedFotoIds(prev => [...prev, foto.id])
  }

  async function uploadFotos(galeriId: string): Promise<string[]> {
    const urls: string[] = []
    setUploading(true)
    for (let i = 0; i < fotoFiles.length; i++) {
      const file = fotoFiles[i]
      const ext = file.name.split('.').pop()
      const path = `${galeriId}/${Date.now()}_${i}.${ext}`
      const { error } = await supabase.storage
        .from('galeri')
        .upload(path, file, { upsert: true })
      if (!error) {
        const { data } = supabase.storage.from('galeri').getPublicUrl(path)
        urls.push(data.publicUrl)
      }
    }
    setUploading(false)
    return urls
  }

  async function handleSave() {
    if (!form.judul) return
    const totalFotos = existingFotos.length + fotoFiles.length
    if (totalFotos === 0) {
      alert('Pilih minimal 1 foto.')
      return
    }
    setSaving(true)

    let targetId = editId

    if (!editId) {
      // Insert album baru
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

    // Upload foto baru ke storage
    const newUrls = await uploadFotos(targetId)

    // Hapus foto yang ditandai dihapus dari galeri_foto
    if (deletedFotoIds.length > 0) {
      await supabase.from('galeri_foto').delete().in('id', deletedFotoIds)
    }

    // Tentukan urutan mulai dari existing yang tersisa
    const existingCount = existingFotos.filter(f => f.id !== '__cover__').length
    // Insert foto baru ke galeri_foto
    if (newUrls.length > 0) {
      const rows = newUrls.map((url, i) => ({
        galeri_id: targetId!,
        foto_url: url,
        urutan: existingCount + i,
      }))
      await supabase.from('galeri_foto').insert(rows)
    }

    // Tentukan cover: prioritas existing pertama, baru pertama, lama
    let coverUrl = ''
    if (existingFotos.length > 0 && existingFotos[0].id !== '__cover__') {
      coverUrl = existingFotos[0].foto_url
    } else if (newUrls.length > 0) {
      coverUrl = newUrls[0]
    } else if (existingFotos.length > 0) {
      coverUrl = existingFotos[0].foto_url
    }

    // Kalau masih ada cover lama (__cover__) dan ada foto baru, migrasi ke galeri_foto
    const hasCoverFallback = existingFotos.some(f => f.id === '__cover__')
    if (hasCoverFallback && editId) {
      const coverFoto = existingFotos.find(f => f.id === '__cover__')
      if (coverFoto) {
        // Cek apakah sudah ada di galeri_foto
        const { data: existing } = await supabase
          .from('galeri_foto')
          .select('id')
          .eq('galeri_id', targetId)
          .eq('foto_url', coverFoto.foto_url)
        if (!existing || existing.length === 0) {
          await supabase.from('galeri_foto').insert({
            galeri_id: targetId,
            foto_url: coverFoto.foto_url,
            urutan: 0,
          })
        }
        coverUrl = coverFoto.foto_url
      }
    }

    // Update cover di tabel galeri
    await supabase.from('galeri').update({
      judul: form.judul,
      foto_url: coverUrl,
      keterangan: form.keterangan || null,
      tanggal: form.tanggal,
    }).eq('id', targetId)

    setSaving(false)
    setShowModal(false)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus album ini beserta semua fotonya?')) return
    setDeleting(id)
    // Hapus semua foto dari storage
    const { data: fotos } = await supabase
      .from('galeri_foto')
      .select('foto_url')
      .eq('galeri_id', id)
    if (fotos && fotos.length > 0) {
      const paths = fotos.map(f => {
        const parts = f.foto_url.split('/galeri/')
        return parts[1]?.split('?')[0] ?? ''
      }).filter(Boolean)
      if (paths.length > 0) await supabase.storage.from('galeri').remove(paths)
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
          <p className="text-sm text-gray-500 mt-0.5">Kelola album foto dokumentasi kegiatan</p>
        </div>
        <button onClick={openTambah}
          className="flex items-center gap-2 bg-[#0059bb] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition">
          <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
          Tambah Album
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari album..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
        </div>
        <span className="text-sm text-gray-400">{filtered.length} album</span>
      </div>

      {/* Grid album */}
      {loading ? (
        <div className="flex items-center justify-center h-40 text-gray-400">
          <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2 bg-white rounded-2xl border border-gray-100">
          <span className="material-symbols-outlined text-[40px]">photo_library</span>
          <p className="text-sm">Belum ada album</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(g => (
            <div key={g.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition">
              {/* Cover */}
              <div className="relative aspect-video overflow-hidden bg-gray-50 cursor-pointer"
                onClick={() => openLightbox(g)}>
                {g.foto_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.foto_url} alt={g.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-200 text-[48px]">photo_library</span>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition flex items-center justify-center">
                  <div className="flex items-center gap-2 bg-white/90 text-[#0059bb] px-3 py-1.5 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition">
                    <span className="material-symbols-outlined text-[15px]">collections</span>
                    Lihat Foto
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold text-[#0a1628] line-clamp-1">{g.judul}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(g.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                {g.keterangan && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{g.keterangan}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(g)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-blue-200 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-50 transition">
                    <span className="material-symbols-outlined text-[13px]">edit</span>Edit
                  </button>
                  <button onClick={() => handleDelete(g.id)} disabled={deleting === g.id}
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

      {/* ── LIGHTBOX ALBUM ── */}
      {lightboxAlbum && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col" onClick={() => setLightboxAlbum(null)}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" onClick={e => e.stopPropagation()}>
            <div>
              <p className="text-white font-bold text-lg">{lightboxAlbum.judul}</p>
              <p className="text-white/50 text-sm">
                {lightboxLoading ? '...' : `${lightboxIdx + 1} / ${lightboxFotos.length} foto`}
              </p>
            </div>
            <button onClick={() => setLightboxAlbum(null)}
              className="text-white/70 hover:text-white transition p-2">
              <span className="material-symbols-outlined text-[28px]">close</span>
            </button>
          </div>

          {/* Main photo */}
          <div className="flex-1 flex items-center justify-center px-4 relative overflow-hidden" onClick={e => e.stopPropagation()}>
            {lightboxLoading ? (
              <span className="material-symbols-outlined text-white text-[48px] animate-spin">progress_activity</span>
            ) : lightboxFotos.length > 0 ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxFotos[lightboxIdx]?.foto_url}
                  alt={`Foto ${lightboxIdx + 1}`}
                  className="max-h-full max-w-full object-contain rounded-xl select-none"
                />
                {/* Nav prev */}
                {lightboxFotos.length > 1 && (
                  <>
                    <button
                      onClick={() => setLightboxIdx(i => (i - 1 + lightboxFotos.length) % lightboxFotos.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition">
                      <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                    </button>
                    <button
                      onClick={() => setLightboxIdx(i => (i + 1) % lightboxFotos.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition">
                      <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                    </button>
                  </>
                )}
              </>
            ) : null}
          </div>

          {/* Thumbnail strip */}
          {lightboxFotos.length > 1 && (
            <div className="flex-shrink-0 flex gap-2 overflow-x-auto px-6 pb-5 pt-3 justify-center" onClick={e => e.stopPropagation()}>
              {lightboxFotos.map((f, i) => (
                <button key={f.id} onClick={() => setLightboxIdx(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${i === lightboxIdx ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.foto_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── MODAL TAMBAH / EDIT ALBUM ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-[#0a1628]">{editId ? 'Edit Album' : 'Tambah Album Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-5">

              {/* Info album */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">
                    Judul Album <span className="text-red-500">*</span>
                  </label>
                  <input value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })}
                    placeholder="Nama album / agenda"
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
                    rows={2} placeholder="Keterangan album (opsional)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] resize-none" />
                </div>
              </div>

              {/* Foto-foto */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-[#0a1628]">
                    Foto <span className="text-red-500">*</span>
                    <span className="ml-1 font-normal text-gray-400 text-xs">
                      ({existingFotos.length + fotoFiles.length} foto)
                    </span>
                  </label>
                  <label htmlFor="galeri-multi-upload"
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#0059bb] cursor-pointer hover:underline">
                    <span className="material-symbols-outlined text-[15px]">add_photo_alternate</span>
                    Tambah Foto
                  </label>
                </div>
                <input
                  ref={fileInputRef}
                  id="galeri-multi-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleFotoChange}
                  className="hidden"
                />

                {/* Grid preview */}
                {(existingFotos.length > 0 || fotoPreviews.length > 0) ? (
                  <div className="grid grid-cols-3 gap-2">
                    {/* Foto existing (sudah tersimpan) */}
                    {existingFotos.map((f, i) => (
                      <div key={f.id} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={f.foto_url} alt="" className="w-full h-full object-cover" />
                        {i === 0 && (
                          <span className="absolute top-1 left-1 bg-[#0059bb] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Cover</span>
                        )}
                        <button onClick={() => removeExistingFoto(f)}
                          className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs">
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </div>
                    ))}
                    {/* Foto baru (belum diupload) */}
                    {fotoPreviews.map((url, i) => (
                      <div key={url} className="relative aspect-square rounded-xl overflow-hidden border border-dashed border-[#0059bb]/40 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <span className="absolute top-1 left-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Baru</span>
                        <button onClick={() => removeNewFoto(i)}
                          className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </div>
                    ))}
                    {/* Tombol tambah di grid */}
                    <label htmlFor="galeri-multi-upload"
                      className="aspect-square rounded-xl border-2 border-dashed border-[#0059bb]/30 flex flex-col items-center justify-center cursor-pointer hover:border-[#0059bb] hover:bg-[#eef5ff] transition">
                      <span className="material-symbols-outlined text-[28px] text-[#0059bb]/40">add</span>
                      <span className="text-[10px] text-[#0059bb]/60 font-semibold mt-0.5">Tambah</span>
                    </label>
                  </div>
                ) : (
                  /* Empty upload area */
                  <label htmlFor="galeri-multi-upload"
                    className="flex flex-col items-center justify-center gap-3 w-full h-36 border-2 border-dashed border-[#0059bb]/30 rounded-xl cursor-pointer hover:border-[#0059bb] hover:bg-[#eef5ff] transition">
                    <span className="material-symbols-outlined text-[36px] text-[#0059bb]/40">add_photo_alternate</span>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#0059bb]">Klik untuk upload foto</p>
                      <p className="text-xs text-gray-400 mt-0.5">Bisa pilih banyak sekaligus · JPG, PNG, WebP</p>
                    </div>
                  </label>
                )}
              </div>

            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">
                Batal
              </button>
              <button onClick={handleSave}
                disabled={isBusy || !form.judul || (existingFotos.length + fotoFiles.length === 0)}
                className="flex-1 bg-[#0059bb] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition disabled:opacity-60 flex items-center justify-center gap-2">
                {isBusy && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
                {uploading ? 'Mengupload...' : saving ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Buat Album'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
