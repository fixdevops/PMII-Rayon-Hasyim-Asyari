'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPengaturanPage() {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(localStorage.getItem('admin_username') ?? 'admin')
  }, [])

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
        <h2 className="text-xl font-bold text-[#0a1628]">Pengaturan</h2>
        <p className="text-sm text-gray-500 mt-0.5">Kelola akun dan konfigurasi admin</p>
      </div>

      {/* Info akun */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-[#0a1628] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#0059bb]">manage_accounts</span>
          Info Akun
        </h3>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#eef5ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#0059bb] text-[28px]">person</span>
          </div>
          <div>
            <p className="font-bold text-[#0a1628]">{username || 'admin'}</p>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>

      {/* Ganti password */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-[#0a1628] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#0059bb]">lock_reset</span>
          Ganti Password
        </h3>

        <form onSubmit={handleChangePass} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Password Lama</label>
            <input type="password" value={oldPass} onChange={e => setOldPass(e.target.value)}
              required placeholder="Password saat ini"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Password Baru</label>
            <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)}
              required placeholder="Minimal 6 karakter"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0a1628] mb-1.5">Konfirmasi Password Baru</label>
            <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
              required placeholder="Ulangi password baru"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20" />
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
            className="w-full bg-[#0059bb] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#0047a0] transition disabled:opacity-60 flex items-center justify-center gap-2">
            {saving && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
            Simpan Password Baru
          </button>
        </form>
      </div>

      {/* Info website */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-[#0a1628] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#0059bb]">info</span>
          Informasi Sistem
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Database</span>
            <span className="font-semibold text-[#0a1628]">Supabase</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Framework</span>
            <span className="font-semibold text-[#0a1628]">Next.js 16</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">URL Login Admin</span>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">/rayonerabarulogin</code>
          </div>
        </div>
      </div>
    </div>
  )
}
