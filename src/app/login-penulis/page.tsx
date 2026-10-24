'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { hashPassword } from '@/lib/penulis-auth'

export default function PenulisLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const hash = await hashPassword(password)
    const { data } = await supabase
      .from('penulis')
      .select('id, nama, username, status')
      .eq('username', username)
      .eq('password_hash', hash)
      .maybeSingle()

    setLoading(false)

    if (!data) {
      setError('Username atau password salah.')
      return
    }

    if (data.status === 'aktif') {
      localStorage.setItem('penulis_logged_in', 'true')
      localStorage.setItem('penulis_id', data.id)
      localStorage.setItem('penulis_nama', data.nama)
      localStorage.setItem('penulis_username', data.username)
      router.push('/penulis')
    } else if (data.status === 'pending') {
      setError('Akun belum disetujui admin.')
    } else if (data.status === 'nonaktif') {
      setError('Akun dinonaktifkan.')
    } else {
      setError('Username atau password salah.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/logorayon.png"
              alt="Logo PMII Rayon"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h1 className="text-[#1a1a1a] text-2xl font-bold">Penulis Berita</h1>
          <p className="text-[#6b6b6b] text-sm mt-1">PMII Rayon Hasyim Asy&apos;ari</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#e5e5e5]">
          <h2 className="text-[#1a1a1a] font-bold text-xl mb-6 text-center">Masuk sebagai Penulis</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6b6b6b] text-[20px]">
                  person
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/10 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6b6b6b] text-[20px]">
                  lock
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full pl-10 pr-10 py-3 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/10 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-[#1a1a1a] transition"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPass ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold py-3 rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  Memverifikasi...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">login</span>
                  Masuk
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#6b6b6b] mt-6">
            Belum punya akun?{' '}
            <Link href="/daftar-penulis" className="font-semibold text-[#1a1a1a] hover:underline">
              Daftar jadi penulis
            </Link>
          </p>
        </div>

        <p className="text-center text-[#6b6b6b]/60 text-xs mt-6">
          © 2026 PMII Rayon Hasyim Asy&apos;ari FST UNUGIRI
        </p>
      </div>
    </div>
  )
}
