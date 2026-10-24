'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false })

// Generate slug URL-friendly dari judul (disalin persis dari src/app/admin/kegiatan/page.tsx)
function generateSlug(judul: string, id: string): string {
  const base = judul
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')   // hapus karakter non-alfanumerik
    .replace(/\s+/g, '-')            // spasi → tanda hubung
    .replace(/-+/g, '-')             // double dash → single
    .slice(0, 60)                    // max 60 karakter
    .replace(/-$/, '')               // hapus trailing dash
  return `${base}-${id.slice(0, 8)}`
}

interface BeritaSaya {
  id: string
  judul: string
  slug: string | null
  deskripsi: string | null
  konten: string | null
  tanggal: string
  lokasi: string | null
  foto_url: string | null
}

const emptyForm = { judul: '', deskripsi: '', konten: '', tanggal: '', lokasi: '' }

export default function PenulisBeritaSayaPage() {
  const router = useRouter()
  const [penulisId, setPenulisId] = useState<string | null>(null)
  const [list, setList] = useState<BeritaSaya[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  // Edit modal state
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [currentFotoUrl, setCurrentFotoUrl] = useState<string | null>(null)
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async (id: string) => {
    setLoading(true)
    const { data } = await supabase.from('kegiatan')
      .select('*')
      .eq('penulis_id', id)
      .order('tanggal', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    async function init() {
      const id = localStorage.getItem('penulis_id')
      setPenulisId(id)
      if (!id) { setLoading(false); return }

      // Verifikasi identitas sebelum load data
      const username = localStorage.getItem('penulis_username') || ''
      const res = await fetch(
        `/api/penulis/verify?penulis_id=${encodeURIComponent(id)}&username=${encodeURIComponent(username)}`
      )
      const json = await res.json()
      if (!json.valid) {
        // Hapus semua data sesi dan redirect ke login
        localStorage.removeItem('penulis_logged_in')
        localStorage.removeItem('penulis_id')
        localStorage.removeItem('penulis_nama')
        localStorage.removeItem('penulis_username')
        router.replace('/login-penulis')
        return
      }

      load(id)
    }
    init()
  }, [load, router])

  function openEdit(k: BeritaSaya) {
    setEditId(k.id)
    setForm({
      judul: k.judul, deskripsi: k.deskripsi ?? '',
      konten: k.konten ?? '', tanggal: k.tanggal, lokasi: k.lokasi ?? '',
    })
    setCurrentFotoUrl(k.foto_url)
    setFotoFile(null)
    setFotoPreview(k.foto_url)
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditId(null)
    setForm(emptyForm)
    setCurrentFotoUrl(null)
    setFotoFile(null)
    setFotoPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
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
    const { error } = await supabase.storage.from('kegiatan').upload(path, fotoFile, { upsert: true })
    setUploading(false)
    if (error) return currentFotoUrl
    const { data } = supabase.storage.from('kegiatan').getPublicUrl(path)
    return data.publicUrl
  }

  async function handleSave() {
    if (!editId || !penulisId) return
    if (!form.judul || !form.tanggal) return
    setSaving(true)

    const foto_url = await uploadFoto(editId)
    const slug = generateSlug(form.judul, editId)

    await supabase.from('kegiatan').update({
      judul: form.judul, deskripsi: form.deskripsi || null,
      konten: form.konten || null,
      tanggal: form.tanggal, lokasi: form.lokasi || null,
      foto_url, slug,
    }).eq('id', editId).eq('penulis_id', penulisId)

    setSaving(false)
    closeModal()
    load(penulisId)
  }

  async function handleDelete(id: string, fotoUrl: string | null) {
    if (!penulisId) return
    if (!confirm('Hapus berita ini? Tindakan ini tidak bisa dibatalkan.')) return
    setDeleting(id)
    if (fotoUrl) {
      const path = fotoUrl.split('/kegiatan/')[1]?.split('?')[0]
      if (path) await supabase.storage.from('kegiatan').remove([path])
    }
    await supabase.from('kegiatan').delete().eq('id', id).eq('penulis_id', penulisId)
    setDeleting(null)
    load(penulisId)
  }

  const isBusy = saving || uploading

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#1a1a1a]">Berita Saya</h2>
          <p className="text-sm text-[#6b6b6b] mt-0.5">Kelola berita yang Anda tulis</p>
        </div>
        <Link href="/penulis/tulis"
          className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition">
          <span className="material-symbols-outlined text-[18px]">edit_note</span>
          Tulis Berita Baru
        </Link>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-40 text-[#6b6b6b]">
          <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
        </div>
      ) : list.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-[#6b6b6b] gap-3 bg-white rounded-2xl border border-[#e5e5e5]">
          <span className="material-symbols-outlined text-[40px]" style={{fontVariationSettings: "'FILL' 1"}}>article</span>
          <p className="text-sm">Belum ada berita.</p>
          <Link href="/penulis/tulis" className="text-sm font-semibold text-[#1a1a1a] hover:underline">
            Tulis berita pertama Anda →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
          <div className="divide-y divide-[#e5e5e5]">
            {list.map(k => {
              const tayang = !!k.konten
              return (
                <div key={k.id} className="flex items-center gap-4 p-4 hover:bg-[#f9f9f9] transition">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#f2f2f2]">
                    {k.foto_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={k.foto_url} alt={k.judul} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px] text-[#6b6b6b]">image</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        tayang ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {tayang ? 'Tayang' : 'Belum ada konten'}
                      </span>
                      <span className="text-xs text-[#6b6b6b] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                        {new Date(k.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#1a1a1a] text-sm mt-1 line-clamp-1">{k.judul}</h3>
                    {k.lokasi && (
                      <p className="text-xs text-[#6b6b6b] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[13px]">location_on</span>
                        {k.lokasi}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {k.slug && (
                      <a href={`/news/${k.slug}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 py-2 px-3 border border-[#e5e5e5] text-[#6b6b6b] rounded-xl text-xs font-semibold hover:bg-[#f9f9f9] transition"
                        title="Lihat berita">
                        <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                      </a>
                    )}
                    <button onClick={() => openEdit(k)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 border border-[#1a1a1a]/20 text-[#1a1a1a] rounded-xl text-xs font-semibold hover:bg-[#1a1a1a] hover:text-white transition">
                      <span className="material-symbols-outlined text-[15px]">edit</span>Edit
                    </button>
                    <button onClick={() => handleDelete(k.id, k.foto_url)} disabled={deleting === k.id}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 border border-red-200 text-red-500 rounded-xl text-xs font-semibold hover:bg-red-50 transition disabled:opacity-50">
                      <span className="material-symbols-outlined text-[15px]">
                        {deleting === k.id ? 'progress_activity' : 'delete'}
                      </span>Hapus
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && editId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5] sticky top-0 bg-white z-10">
              <h3 className="font-bold text-[#1a1a1a]">Edit Berita</h3>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-[#f2f2f2] transition">
                <span className="material-symbols-outlined text-[20px] text-[#6b6b6b]">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">

              {/* Upload foto */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Foto Kegiatan</label>
                {fotoPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-[#e5e5e5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={fotoPreview} alt="preview" className="w-full max-h-48 object-cover" />
                    <button onClick={removeFoto} type="button"
                      className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                    <label htmlFor="berita-edit-upload"
                      className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 hover:bg-[#1a1a1a] text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition">
                      <span className="material-symbols-outlined text-[14px]">upload</span>Ganti
                    </label>
                  </div>
                ) : (
                  <label htmlFor="berita-edit-upload"
                    className="flex flex-col items-center justify-center gap-3 w-full h-36 border-2 border-dashed border-[#1a1a1a]/30 rounded-xl cursor-pointer hover:border-[#1a1a1a] hover:bg-[#f7f7f7] transition">
                    <span className="material-symbols-outlined text-[36px] text-[#1a1a1a]/40">add_photo_alternate</span>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#1a1a1a]">Klik untuk upload foto</p>
                      <p className="text-xs text-[#6b6b6b] mt-0.5">JPG, PNG, WebP · Maks 10 MB</p>
                    </div>
                  </label>
                )}
                <input ref={fileInputRef} id="berita-edit-upload" type="file"
                  accept="image/jpeg,image/png,image/webp" onChange={handleFotoChange} className="hidden" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">Judul <span className="text-red-500">*</span></label>
                <input value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })}
                  placeholder="Judul berita/kegiatan"
                  className="w-full px-4 py-2.5 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/10" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">Tanggal <span className="text-red-500">*</span></label>
                <input type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">Lokasi</label>
                <input value={form.lokasi} onChange={e => setForm({ ...form, lokasi: e.target.value })}
                  placeholder="Lokasi kegiatan"
                  className="w-full px-4 py-2.5 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/10" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">
                  Motivasi
                  <span className="ml-1 font-normal text-[#6b6b6b] text-xs">(tampil italic di bawah gambar)</span>
                </label>
                <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })}
                  rows={5} placeholder="Tulis kalimat motivasi atau deskripsi singkat kegiatan..."
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/10 resize-y min-h-[100px]" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">
                  Konten Lengkap
                  <span className="ml-1 font-normal text-[#6b6b6b] text-xs">(tampil di halaman detail)</span>
                </label>
                <RichTextEditor
                  value={form.konten}
                  onChange={val => setForm(f => ({ ...f, konten: val }))}
                  placeholder="Tulis isi berita/kegiatan lengkap di sini..."
                />
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={closeModal}
                className="flex-1 py-2.5 border border-[#e5e5e5] rounded-xl text-sm font-semibold text-[#6b6b6b] hover:bg-[#f9f9f9] transition">
                Batal
              </button>
              <button onClick={handleSave} disabled={isBusy || !form.judul || !form.tanggal}
                className="flex-1 bg-[#1a1a1a] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-black transition disabled:opacity-60 flex items-center justify-center gap-2">
                {isBusy && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
                {uploading ? 'Mengupload...' : saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
