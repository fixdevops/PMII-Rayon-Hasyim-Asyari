'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface Anggota {
  id: string
  nama: string
  jabatan: string
  departemen: string
  foto_url: string | null
  angkatan: string | null
  portfolio_url: string | null
}

const DEPARTEMEN_OPTIONS = [
  'BPH Pengurus Rayon',
  'Biro Jaringan',
  'Biro Kaderisasi',
  'Biro Keagamaan',
  'Biro Keperempuanan',
  'Biro Kreativitas dan Media Sosial',
]

const emptyForm = {
  nama: '', jabatan: '', departemen: 'BPH Pengurus Rayon',
  angkatan: '', portfolio_url: '',
}

export default function AdminAnggotaPage() {
  const [list, setList] = useState<Anggota[]>([])
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
  const [filterDept, setFilterDept] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('anggota').select('*').order('created_at', { ascending: true })
    setList(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openTambah() {
    setEditId(null)
    setForm(emptyForm)
    setCurrentFotoUrl(null)
    setFotoFile(null)
    setFotoPreview(null)
    setShowModal(true)
  }

  function openEdit(a: Anggota) {
    setEditId(a.id)
    setForm({
      nama: a.nama, jabatan: a.jabatan, departemen: a.departemen,
      angkatan: a.angkatan ?? '', portfolio_url: a.portfolio_url ?? '',
    })
    setCurrentFotoUrl(a.foto_url)
    setFotoFile(null)
    setFotoPreview(a.foto_url)
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
      .from('anggota')
      .upload(path, fotoFile, { upsert: true })
    setUploading(false)
    if (error) return currentFotoUrl
    const { data } = supabase.storage.from('anggota').getPublicUrl(path)
    return data.publicUrl
  }

  async function handleSave() {
    if (!form.nama || !form.jabatan) return
    setSaving(true)

    let targetId = editId
    // Kalau tambah baru, insert dulu untuk dapat ID
    if (!editId) {
      const { data: inserted } = await supabase
        .from('anggota')
        .insert({
          nama: form.nama, jabatan: form.jabatan, departemen: form.departemen,
          angkatan: form.angkatan || null, portfolio_url: form.portfolio_url || null,
          foto_url: null,
        })
        .select('id')
        .single()
      targetId = inserted?.id ?? null
    }

    if (!targetId) { setSaving(false); return }

    const foto_url = await uploadFoto(targetId)

    await supabase.from('anggota').update({
      nama: form.nama, jabatan: form.jabatan, departemen: form.departemen,
      angkatan: form.angkatan || null, portfolio_url: form.portfolio_url || null,
      foto_url,
    }).eq('id', targetId)

    setSaving(false)
    setShowModal(false)
    load()
  }

  async function handleDelete(id: string, fotoUrl: string | null) {
    if (!confirm('Hapus anggota ini?')) return
    setDeleting(id)
    // Hapus foto dari storage jika ada
    if (fotoUrl) {
      const path = fotoUrl.split('/anggota/')[1]
      if (path) await supabase.storage.from('anggota').remove([path])
    }
    await supabase.from('anggota').delete().eq('id', id)
    setDeleting(null)
    load()
  }

  const filtered = list.filter(a => {
    const q = search.toLowerCase()
    const matchSearch = a.nama.toLowerCase().includes(q) || a.jabatan.toLowerCase().includes(q)
    const matchDept = !filterDept || a.departemen === filterDept
    return matchSearch && matchDept
  })

  const isBusy = saving || uploading

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#0a1628]">Manajemen Anggota</h2>
          <p className="text-sm text-gray-500 mt-0.5">Kelola pengurus dan anggota rayon</p>
        </div>
        <button onClick={openTambah}
          className="flex items-center gap-2 bg-[#0059bb] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition">
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Tambah Anggota
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama atau jabatan..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
        </div>
        <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0059bb]">
          <option value="">Semua Biro</option>
          {DEPARTEMEN_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-gray-400">
            <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2">
            <span className="material-symbols-outlined text-[40px]">person_off</span>
            <p className="text-sm">Belum ada anggota</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Anggota</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Jabatan</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Biro</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Angkatan</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-[#eef5ff] flex-shrink-0">
                          {a.foto_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={a.foto_url} alt={a.nama} className="w-full h-full object-cover object-top" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-[#0059bb] text-[18px]">person</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-[#0a1628]">{a.nama}</p>
                          <p className="text-xs text-gray-500 md:hidden">{a.jabatan}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{a.jabatan}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="bg-[#eef5ff] text-[#0059bb] text-xs font-semibold px-2.5 py-1 rounded-full">{a.departemen}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{a.angkatan ?? '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(a)}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => handleDelete(a.id, a.foto_url)} disabled={deleting === a.id}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition disabled:opacity-50">
                          <span className="material-symbols-outlined text-[18px]">
                            {deleting === a.id ? 'progress_activity' : 'delete'}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-[#0a1628]">{editId ? 'Edit Anggota' : 'Tambah Anggota'}</h3>
              <button onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">

              {/* Upload foto */}
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-2">Foto</label>
                <div className="flex items-center gap-4">
                  {/* Preview */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#eef5ff] flex-shrink-0 border border-gray-100">
                    {fotoPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={fotoPreview} alt="preview" className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#0059bb]/30 text-[36px]">person</span>
                      </div>
                    )}
                  </div>

                  {/* Tombol upload */}
                  <div className="flex flex-col gap-2 flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFotoChange}
                      className="hidden"
                      id="foto-upload"
                    />
                    <label
                      htmlFor="foto-upload"
                      className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-[#0059bb]/30 text-[#0059bb] rounded-xl text-sm font-semibold cursor-pointer hover:border-[#0059bb] hover:bg-[#eef5ff] transition"
                    >
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      {fotoPreview ? 'Ganti Foto' : 'Upload Foto'}
                    </label>
                    {fotoPreview && (
                      <button onClick={removeFoto}
                        className="flex items-center justify-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition">
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        Hapus foto
                      </button>
                    )}
                    <p className="text-[11px] text-gray-400">JPG, PNG, WebP · Maks 5 MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Nama <span className="text-red-500">*</span></label>
                <input value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })}
                  placeholder="Nama lengkap"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Jabatan <span className="text-red-500">*</span></label>
                <input value={form.jabatan} onChange={e => setForm({ ...form, jabatan: e.target.value })}
                  placeholder="Contoh: Ketua Rayon"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Biro</label>
                <select value={form.departemen} onChange={e => setForm({ ...form, departemen: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb]">
                  {DEPARTEMEN_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Angkatan</label>
                <input value={form.angkatan} onChange={e => setForm({ ...form, angkatan: e.target.value })}
                  placeholder="Contoh: 2023"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">URL Portfolio</label>
                <input value={form.portfolio_url} onChange={e => setForm({ ...form, portfolio_url: e.target.value })}
                  placeholder="https://github.com/... atau kosongkan"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
                <p className="text-xs text-gray-400 mt-1">Link portfolio, GitHub, LinkedIn, dll.</p>
              </div>

            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">
                Batal
              </button>
              <button onClick={handleSave} disabled={isBusy || !form.nama || !form.jabatan}
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
