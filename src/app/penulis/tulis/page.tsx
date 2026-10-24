'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
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

const emptyForm = { judul: '', deskripsi: '', konten: '', tanggal: '', lokasi: '' }

export default function PenulisTulisPage() {
  const router = useRouter()
  const [form, setForm] = useState(emptyForm)

  // Upload state
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFotoFile(file)
    setFotoPreview(URL.createObjectURL(file))
  }

  function removeFoto() {
    setFotoFile(null)
    setFotoPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.judul || !form.tanggal) return
    setSaving(true)

    const penulisId = localStorage.getItem('penulis_id')
    const penulisNama = localStorage.getItem('penulis_nama') || ''
    if (!penulisId) {
      setError('Sesi penulis tidak ditemukan. Silakan login ulang.')
      setSaving(false)
      return
    }

    // Step 1: insert kegiatan dengan foto_url null
    const { data: inserted, error: insertError } = await supabase.from('kegiatan').insert({
      judul: form.judul,
      deskripsi: form.deskripsi || null,
      konten: form.konten || null,
      tanggal: form.tanggal,
      lokasi: form.lokasi || null,
      foto_url: null,
      penulis_id: penulisId,
      penulis_nama: penulisNama,
    }).select('id').single()

    if (insertError || !inserted) {
      setError(insertError?.message ?? 'Gagal menyimpan berita.')
      setSaving(false)
      return
    }

    const id = inserted.id

    // Step 2: upload foto (jika ada) lalu update slug + foto_url
    let foto_url: string | null = null
    if (fotoFile) {
      setUploading(true)
      const ext = fotoFile.name.split('.').pop()
      const path = `${id}.${ext}`
      const { error: upErr } = await supabase.storage.from('kegiatan').upload(path, fotoFile, { upsert: true })
      setUploading(false)
      if (!upErr) {
        const { data } = supabase.storage.from('kegiatan').getPublicUrl(path)
        foto_url = data.publicUrl
      }
    }

    const slug = generateSlug(form.judul, id)
    await supabase.from('kegiatan').update({ foto_url, slug }).eq('id', id).eq('penulis_id', penulisId)

    setSaving(false)
    router.push('/penulis/berita-saya')
  }

  const isBusy = saving || uploading

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.push('/penulis/berita-saya')}
          className="p-2 rounded-xl hover:bg-[#f2f2f2] transition">
          <span className="material-symbols-outlined text-[22px] text-[#6b6b6b]">arrow_back</span>
        </button>
        <div>
          <h2 className="text-xl font-bold text-[#1a1a1a]">Tulis Berita Baru</h2>
          <p className="text-sm text-[#6b6b6b] mt-0.5">Isi detail berita/kegiatan rayon</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e5e5e5] p-6 space-y-4">

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
              <label htmlFor="penulis-upload"
                className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 hover:bg-[#1a1a1a] text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition">
                <span className="material-symbols-outlined text-[14px]">upload</span>Ganti
              </label>
            </div>
          ) : (
            <label htmlFor="penulis-upload"
              className="flex flex-col items-center justify-center gap-3 w-full h-36 border-2 border-dashed border-[#1a1a1a]/30 rounded-xl cursor-pointer hover:border-[#1a1a1a] hover:bg-[#f7f7f7] transition">
              <span className="material-symbols-outlined text-[36px] text-[#1a1a1a]/40">add_photo_alternate</span>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#1a1a1a]">Klik untuk upload foto</p>
                <p className="text-xs text-[#6b6b6b] mt-0.5">JPG, PNG, WebP · Maks 10 MB</p>
              </div>
            </label>
          )}
          <input ref={fileInputRef} id="penulis-upload" type="file"
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

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => router.push('/penulis/berita-saya')}
            className="flex-1 py-2.5 border border-[#e5e5e5] rounded-xl text-sm font-semibold text-[#6b6b6b] hover:bg-[#f9f9f9] transition">
            Batal
          </button>
          <button type="submit" disabled={isBusy || !form.judul || !form.tanggal}
            className="flex-1 bg-[#1a1a1a] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-black transition disabled:opacity-60 flex items-center justify-center gap-2">
            {isBusy && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
            {uploading ? 'Mengupload...' : saving ? 'Menyimpan...' : 'Publikasikan'}
          </button>
        </div>
      </form>
    </div>
  )
}
