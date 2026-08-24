'use client'

import { useState } from 'react'

interface Props {
  judul: string
  deskripsi?: string | null
  url: string
}

export default function ShareButtons({ judul, deskripsi, url }: Props) {
  const [copied, setCopied] = useState(false)

  const text = `${judul}\n${deskripsi ? deskripsi + '\n' : ''}${url}`

  // Native share (HP: muncul sheet Instagram Story, WA, dll)
  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: judul, text: deskripsi ?? judul, url })
      } catch {
        // user cancel — no-op
      }
    }
  }

  // Share ke Instagram: native share kalau ada, fallback copy link
  async function handleIgShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: judul, text: text, url })
      } catch {
        // user cancel — no-op
      }
    } else {
      await navigator.clipboard.writeText(url)
      alert('Link disalin! Tempel di caption atau story Instagram kamu.')
    }
  }

  // Copy link
  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share

  return (
    <div className="border-t border-b border-[#d0e4ff] py-5 my-8">
      <p className="text-[13px] font-semibold text-[#0f0f0f]/50 mb-3">Bagikan berita ini</p>
      <div className="flex flex-wrap items-center gap-2">

        {/* Native share — tampil di mobile */}
        {hasNativeShare && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 bg-[#0059bb] text-white text-[13px] font-bold px-4 py-2.5 rounded-full hover:bg-[#003d8a] transition shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            Bagikan
          </button>
        )}

        {/* WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white text-[13px] font-bold px-4 py-2.5 rounded-full hover:bg-[#1ebe5d] transition shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.534 5.854L.057 23.405a.75.75 0 0 0 .916.927l5.657-1.48A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.513-5.21-1.408l-.374-.22-3.878 1.015 1.034-3.77-.242-.389A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          WhatsApp
        </a>

        {/* Instagram */}
        <button
          onClick={handleIgShare}
          className="flex items-center gap-2 text-white text-[13px] font-bold px-4 py-2.5 rounded-full transition shadow-sm"
          style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
          Instagram
        </button>

        {/* Facebook */}
        <a
          href={fbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1877F2] text-white text-[13px] font-bold px-4 py-2.5 rounded-full hover:bg-[#0d6de0] transition shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.931-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
          </svg>
          Facebook
        </a>

        {/* Copy link */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 text-[13px] font-bold px-4 py-2.5 rounded-full transition shadow-sm border ${
            copied
              ? 'bg-green-50 text-green-600 border-green-200'
              : 'bg-white text-[#0f0f0f]/60 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {copied ? 'check' : 'content_copy'}
          </span>
          {copied ? 'Tersalin!' : 'Salin Link'}
        </button>

      </div>
    </div>
  )
}
