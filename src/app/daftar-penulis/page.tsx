'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { hashPassword } from '@/lib/penulis-auth'

const emptyForm = { nama: '', username: '', email: '', password: '', bio: '' }

export default function DaftarPenulisPage() {
  const [form, setForm] = useState(emptyForm)
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!form.nama || !form.username || !form.password) {
      setError('Nama, username, dan password wajib diisi.')
      return
    }
    setLoading(true)

    const hash = await hashPassword(form.password)
    const { error: insertError } = await supabase.from('penulis').insert({
      nama: form.nama,
      username: form.username,
      email: form.email || null,
      password_hash: hash,
      bio: form.bio || null,
      status: 'pending',
    })

    setLoading(false)

    if (insertError) {
      // Konflik username unik (Postgres unique violation code 23505 / PostgREST 409)
      const isConflict = insertError.code === '23505' ||
        (insertError as unknown as { status?: number }).status === 409
      if (isConflict) {
        setError('Username sudah digunakan.')
      } else {
        setError(insertError.message)
      }
      return
    }

    setForm(emptyForm)
    setSuccess('Pendaftaran berhasil! Menunggu persetujuan admin.')
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
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
          <h1 className="text-[#1a1a1a] text-2xl font-bold">Daftar Penulis</h1>
          <p className="text-[#6b6b6b] text-sm mt-1">PMII Rayon Hasyim Asy&apos;ari</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl shadow-sm p-8">
          <h2 className="text-[#1a1a1a] font-bold text-xl mb-6 text-center">Buat Akun Penulis</h2>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {/* Nama */}
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6b6b6b] text-[20px]">
                  person
                </span>
                <input
                  type="text"
                  value={form.nama}
                  onChange={e => setForm({ ...form, nama: e.target.value })}
                  placeholder="Nama lengkap"
                  required
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-3 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/10 transition"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6b6b6b] text-[20px]">
                  alternate_id
                </span>
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  placeholder="Username untuk login"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/10 transition"
                />
              </div>
            </div>

            {/* Email (opsional) */}
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">
                Email <span className="ml-1 font-normal text-[#6b6b6b] text-xs">(opsional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6b6b6b] text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="email@contoh.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/10 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6b6b6b] text-[20px]">
                  lock
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Password"
                  required
                  autoComplete="new-password"
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

            {/* Bio (opsional) */}
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">
                Bio <span className="ml-1 font-normal text-[#6b6b6b] text-xs">(opsional)</span>
              </label>
              <textarea
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                rows={3}
                placeholder="Cerita singkat tentang Anda..."
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-xl text-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/10 transition resize-y"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                {success}
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
                  Mendaftarkan...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                  Daftar Sekarang
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#6b6b6b] mt-6">
            Sudah punya akun?{' '}
            <Link href="/login-penulis" className="font-semibold text-[#1a1a1a] hover:underline">
              Masuk
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
