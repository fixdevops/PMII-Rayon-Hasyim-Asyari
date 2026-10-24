'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Penulis = {
  id: string
  nama: string
  username: string
  email: string | null
  bio: string | null
  status: 'pending' | 'aktif' | 'nonaktif'
  created_at: string
}

function formatTanggal(t: string) {
  return new Date(t).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

function badgeStatus(status: Penulis['status']) {
  if (status === 'pending')
    return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border bg-amber-50 text-amber-700 border-amber-200">Pending</span>
  if (status === 'aktif')
    return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border bg-green-50 text-green-700 border-green-200">Aktif</span>
  return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border bg-gray-100 text-[#6b6b6b] border-[#e5e5e5]">Nonaktif</span>
}

export default function AdminPengaturanPage() {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [username, setUsername] = useState('')

  const [listPenulis, setListPenulis] = useState<Penulis[]>([])
  const [tabAktif, setTabAktif] = useState<'pending' | 'aktif' | 'nonaktif'>('pending')
  const [loadingPenulis, setLoadingPenulis] = useState(true)

  useEffect(() => {
    setUsername(localStorage.getItem('admin_username') ?? 'admin')
  }, [])

  useEffect(() => {
    loadPenulis()
  }, [])

  async function loadPenulis() {
    setLoadingPenulis(true)
    const { data } = await supabase
      .from('penulis')
      .select('*')
      .order('created_at', { ascending: false })
    setListPenulis((data ?? []) as Penulis[])
    setLoadingPenulis(false)
  }

  async function setujuiPenulis(id: string) {
    await supabase.from('penulis').update({ status: 'aktif' }).eq('id', id)
    loadPenulis()
  }
  async function tolakPenulis(id: string) {
    await supabase.from('penulis').delete().eq('id', id)
    loadPenulis()
  }
  async function nonaktifkanPenulis(id: string) {
    await supabase.from('penulis').update({ status: 'nonaktif' }).eq('id', id)
    loadPenulis()
  }
  async function aktifkanKembali(id: string) {
    await supabase.from('penulis').update({ status: 'aktif' }).eq('id', id)
    loadPenulis()
  }
  async function hapusPenulis(id: string) {
    await supabase.from('penulis').delete().eq('id', id)
    loadPenulis()
  }

  const jmlPending = listPenulis.filter(p => p.status === 'pending').length
  const penulisFilter = listPenulis.filter(p => p.status === tabAktif)

  async function handleChangePass(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)

    if (newPass !== confirmPass) {
      setMsg({ type: 'error', text: 'Password baru tidak cocok.' })
      return
    }
    if (newPass.length < 6) {
      setMsg({ type: 'error', text: 'Password minimal 6 karakter.' })
      return
    }

    setSaving(true)
    const username = localStorage.getItem('admin_username') ?? 'admin'

    // Verifikasi password lama
    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('username', username)
      .eq('password_hash', oldPass)
      .single()

    if (error || !data) {
      setSaving(false)
      setMsg({ type: 'error', text: 'Password lama salah.' })
      return
    }

    // Update password
    await supabase
      .from('admin_users')
      .update({ password_hash: newPass })
      .eq('id', data.id)

    setSaving(false)
    setOldPass('')
    setNewPass('')
    setConfirmPass('')
    setMsg({ type: 'success', text: 'Password berhasil diubah.' })
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-xl font-bold text-[#1a1a1a]">Pengaturan</h2>
        <p className="text-sm text-[#6b6b6b] mt-0.5">Kelola akun dan konfigurasi admin</p>
      </div>

      {/* Info akun */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-sm p-6">
        <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#1a1a1a]">manage_accounts</span>
          Info Akun
        </h3>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#f2f2f2] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#1a1a1a] text-[28px]">person</span>
          </div>
          <div>
            <p className="font-bold text-[#1a1a1a]">{username || 'admin'}</p>
            <p className="text-sm text-[#6b6b6b]">Administrator</p>
          </div>
        </div>
      </div>

      {/* Ganti password */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-sm p-6">
        <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#1a1a1a]">lock_reset</span>
          Ganti Password
        </h3>

        <form onSubmit={handleChangePass} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">Password Lama</label>
            <input type="password" value={oldPass} onChange={e => setOldPass(e.target.value)}
              required placeholder="Password saat ini"
              className="w-full px-4 py-2.5 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">Password Baru</label>
            <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)}
              required placeholder="Minimal 6 karakter"
              className="w-full px-4 py-2.5 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">Konfirmasi Password Baru</label>
            <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
              required placeholder="Ulangi password baru"
              className="w-full px-4 py-2.5 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a]" />
          </div>

          {msg && (
            <div className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl border ${msg.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              <span className="material-symbols-outlined text-[18px]">
                {msg.type === 'success' ? 'check_circle' : 'error'}
              </span>
              {msg.text}
            </div>
          )}

          <button type="submit" disabled={saving}
            className="w-full bg-[#1a1a1a] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#333] transition disabled:opacity-60 flex items-center justify-center gap-2">
            {saving && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
            Simpan Password Baru
          </button>
        </form>
      </div>

      {/* Manajemen Penulis */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-sm p-6">
        <h3 className="font-bold text-[#1a1a1a] mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#1a1a1a]">group</span>
          Manajemen Penulis
        </h3>
        <p className="text-sm text-[#6b6b6b] mb-4">Setujui, tolak, atau nonaktifkan akun penulis berita.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {([
            { key: 'pending', label: 'Pending' },
            { key: 'aktif', label: 'Aktif' },
            { key: 'nonaktif', label: 'Nonaktif' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setTabAktif(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition inline-flex items-center gap-2 ${
                tabAktif === tab.key
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-[#f2f2f2] text-[#6b6b6b] hover:bg-[#e5e5e5]'
              }`}
            >
              {tab.label}
              {tab.key === 'pending' && jmlPending > 0 && (
                <span className="bg-red-500 text-white text-[11px] font-bold rounded-full min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center leading-none">
                  {jmlPending}
                </span>
              )}
            </button>
          ))}
        </div>

        {loadingPenulis ? (
          <div className="flex items-center justify-center py-8 text-[#6b6b6b] gap-2 text-sm">
            <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
            Memuat data penulis...
          </div>
        ) : penulisFilter.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-[#6b6b6b] gap-2 text-sm">
            <span className="material-symbols-outlined text-[28px]">inbox</span>
            Tidak ada penulis {tabAktif}.
          </div>
        ) : (
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#6b6b6b] border-b border-[#e5e5e5]">
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Nama</th>
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Username</th>
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Email</th>
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Tgl Daftar</th>
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Status</th>
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {penulisFilter.map(p => (
                  <tr key={p.id} className="border-b border-[#e5e5e5] align-top">
                    <td className="py-3 px-2 font-semibold text-[#1a1a1a] whitespace-nowrap">{p.nama}</td>
                    <td className="py-3 px-2 text-[#6b6b6b] whitespace-nowrap">@{p.username}</td>
                    <td className="py-3 px-2 text-[#6b6b6b]">{p.email ?? '-'}</td>
                    <td className="py-3 px-2 text-[#6b6b6b] whitespace-nowrap">{formatTanggal(p.created_at)}</td>
                    <td className="py-3 px-2">{badgeStatus(p.status)}</td>
                    <td className="py-3 px-2">
                      <div className="flex flex-wrap gap-2">
                        {p.status === 'pending' && (
                          <>
                            <button
                              onClick={() => setujuiPenulis(p.id)}
                              className="inline-flex items-center gap-1 bg-[#1a1a1a] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#333] transition"
                            >
                              <span className="material-symbols-outlined text-[14px]">check</span> Setujui
                            </button>
                            <button
                              onClick={() => tolakPenulis(p.id)}
                              className="inline-flex items-center gap-1 border border-[#e5e5e5] text-[#6b6b6b] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#f2f2f2] transition"
                            >
                              <span className="material-symbols-outlined text-[14px]">close</span> Tolak
                            </button>
                          </>
                        )}
                        {p.status === 'aktif' && (
                          <button
                            onClick={() => nonaktifkanPenulis(p.id)}
                            className="inline-flex items-center gap-1 border border-[#e5e5e5] text-[#6b6b6b] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#f2f2f2] transition"
                          >
                            <span className="material-symbols-outlined text-[14px]">block</span> Nonaktifkan
                          </button>
                        )}
                        {p.status === 'nonaktif' && (
                          <>
                            <button
                              onClick={() => aktifkanKembali(p.id)}
                              className="inline-flex items-center gap-1 bg-[#1a1a1a] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#333] transition"
                            >
                              <span className="material-symbols-outlined text-[14px]">check</span> Aktifkan kembali
                            </button>
                            <button
                              onClick={() => hapusPenulis(p.id)}
                              className="inline-flex items-center gap-1 border border-red-200 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
                            >
                              <span className="material-symbols-outlined text-[14px]">delete</span> Hapus
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info website */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-sm p-6">
        <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#1a1a1a]">info</span>
          Informasi Sistem
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6b6b6b]">Database</span>
            <span className="font-semibold text-[#1a1a1a]">Supabase</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b6b6b]">Framework</span>
            <span className="font-semibold text-[#1a1a1a]">Next.js 16</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b6b6b]">URL Login Admin</span>
            <code className="text-xs bg-[#f2f2f2] px-2 py-1 rounded font-mono">/rayonerabarulogin</code>
          </div>
        </div>
      </div>
    </div>
  )
}
