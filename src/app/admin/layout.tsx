'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/anggota', label: 'Anggota', icon: 'diversity_3' },
  { href: '/admin/kegiatan', label: 'Kegiatan', icon: 'event' },
  { href: '/admin/galeri', label: 'Galeri', icon: 'photo_library' },
  { href: '/admin/belajar', label: 'Belajar', icon: 'school' },
  { href: '/admin/aspirasi', label: 'Aspirasi', icon: 'forum' },
  { href: '/admin/komentar', label: 'Komentar', icon: 'comment' },
  { href: '/admin/pengaturan', label: 'Pengaturan', icon: 'settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [username, setUsername] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in')
    if (!loggedIn) {
      router.replace('/rayonerabarulogin')
      return
    }
    setUsername(localStorage.getItem('admin_username') || 'Admin')
  }, [router])

  function handleLogout() {
    localStorage.removeItem('admin_logged_in')
    localStorage.removeItem('admin_username')
    router.push('/rayonerabarulogin')
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Sidebar Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-[#e5e5e5] z-30 flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:flex
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#e5e5e5]">
          <Image src="/logorayon.png" alt="Logo" width={36} height={36} className="object-contain" />
          <div>
            <p className="font-bold text-sm leading-tight text-[#1a1a1a]">Admin Panel</p>
            <p className="text-[#6b6b6b] text-xs">Rayon Hasyim Asy&apos;ari</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
                  ${isActive
                    ? 'bg-[#f2f2f2] text-[#1a1a1a] font-semibold'
                    : 'text-[#6b6b6b] hover:bg-[#f7f7f7] hover:text-[#1a1a1a]'
                  }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User info + logout */}
        <div className="px-4 py-4 border-t border-[#e5e5e5]">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 bg-[#f2f2f2] rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-[#6b6b6b]">person</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1a1a1a]">{username}</p>
              <p className="text-[#6b6b6b] text-xs">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#6b6b6b] hover:bg-red-50 hover:text-red-500 transition"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#e5e5e5] px-4 lg:px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-[#f2f2f2] transition"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined text-[22px] text-[#6b6b6b]">menu</span>
          </button>
          <h1 className="font-bold text-[#1a1a1a] text-lg flex-1">
            {navItems.find(n => n.href === pathname)?.label ?? 'Admin Panel'}
          </h1>
          <Link
            href="/"
            target="_blank"
            className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a] flex items-center gap-1 transition"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            Lihat Website
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
