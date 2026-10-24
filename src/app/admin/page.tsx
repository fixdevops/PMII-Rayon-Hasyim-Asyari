'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Stats {
  anggota: number
  kegiatan: number
  galeri: number
  aspirasi: number
  aspirasiBaru: number
  komentar: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    anggota: 0, kegiatan: 0, galeri: 0, aspirasi: 0, aspirasiBaru: 0, komentar: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      const [anggota, kegiatan, galeri, aspirasi, aspirasiBaru, komentar] = await Promise.all([
        supabase.from('anggota').select('id', { count: 'exact', head: true }),
        supabase.from('kegiatan').select('id', { count: 'exact', head: true }),
        supabase.from('galeri').select('id', { count: 'exact', head: true }),
        supabase.from('aspirasi').select('id', { count: 'exact', head: true }),
        supabase.from('aspirasi').select('id', { count: 'exact', head: true }).eq('status', 'baru'),
        supabase.from('komentar').select('id', { count: 'exact', head: true }),
      ])
      setStats({
        anggota: anggota.count ?? 0,
        kegiatan: kegiatan.count ?? 0,
        galeri: galeri.count ?? 0,
        aspirasi: aspirasi.count ?? 0,
        aspirasiBaru: aspirasiBaru.count ?? 0,
        komentar: komentar.count ?? 0,
      })
      setLoading(false)
    }
    loadStats()
  }, [])

  const cards = [
    { label: 'Anggota', value: stats.anggota, icon: 'diversity_3', color: '#0059bb', href: '/admin/anggota' },
    { label: 'Kegiatan', value: stats.kegiatan, icon: 'event', color: '#059669', href: '/admin/kegiatan' },
    { label: 'Galeri', value: stats.galeri, icon: 'photo_library', color: '#7c3aed', href: '/admin/galeri' },
    { label: 'Aspirasi', value: stats.aspirasi, icon: 'forum', color: '#d97706', href: '/admin/aspirasi', badge: stats.aspirasiBaru },
    { label: 'Komentar', value: stats.komentar, icon: 'comment', color: '#0891b2', href: '/admin/komentar' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1a1a1a]">Selamat datang di Admin Panel</h2>
        <p className="text-sm text-[#6b6b6b] mt-1">Kelola seluruh konten website PMII Rayon Hasyim Asy&apos;ari dari sini.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map(card => (
          <Link key={card.label} href={card.href}
            className="bg-white rounded-2xl p-5 border border-[#e5e5e5] hover:shadow-sm transition group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{background: card.color + '18'}}>
                <span className="material-symbols-outlined text-[22px]"
                  style={{color: card.color, fontVariationSettings: "'FILL' 1"}}>
                  {card.icon}
                </span>
              </div>
              {card.badge ? (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {card.badge} baru
                </span>
              ) : null}
            </div>
            <p className="text-2xl font-bold text-[#1a1a1a]">
              {loading ? '...' : card.value}
            </p>
            <p className="text-sm text-[#6b6b6b] mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
        <h3 className="font-bold text-[#1a1a1a] mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Tambah Anggota', icon: 'person_add', href: '/admin/anggota?action=tambah', color: '#0059bb' },
            { label: 'Tambah Kegiatan', icon: 'event_available', href: '/admin/kegiatan?action=tambah', color: '#059669' },
            { label: 'Upload Galeri', icon: 'add_photo_alternate', href: '/admin/galeri?action=tambah', color: '#7c3aed' },
            { label: 'Tambah Kursus', icon: 'add_circle', href: '/admin/belajar', color: '#0099cc' },
            { label: 'Lihat Aspirasi', icon: 'mark_chat_read', href: '/admin/aspirasi', color: '#d97706' },
          ].map(item => (
            <Link key={item.label} href={item.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#e5e5e5] hover:border-[#d5d5d5] hover:bg-[#f9f9f9] transition text-center">
              <span className="material-symbols-outlined text-[24px]"
                style={{color: item.color, fontVariationSettings: "'FILL' 1"}}>
                {item.icon}
              </span>
              <span className="text-xs font-semibold text-[#1a1a1a]">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Info panel — clean, no gradient */}
      <div className="bg-[#f9f9f9] border border-[#e5e5e5] rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-[28px] text-[#6b6b6b]" style={{fontVariationSettings: "'FILL' 1"}}>
            info
          </span>
          <div>
            <h3 className="font-bold text-[#1a1a1a] mb-2">Panduan Admin</h3>
            <ul className="text-sm text-[#6b6b6b] space-y-1 list-disc list-inside">
              <li>Tambah/edit/hapus anggota pengurus di menu <strong className="text-[#1a1a1a]">Anggota</strong></li>
              <li>Kelola berita dan kegiatan di menu <strong className="text-[#1a1a1a]">Kegiatan</strong></li>
              <li>Upload foto dokumentasi di menu <strong className="text-[#1a1a1a]">Galeri</strong></li>
              <li>Tanggapi aspirasi kader di menu <strong className="text-[#1a1a1a]">Aspirasi</strong></li>
              <li>Moderasi komentar di menu <strong className="text-[#1a1a1a]">Komentar</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
