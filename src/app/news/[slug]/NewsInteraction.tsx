'use client'

import { useEffect, useState } from 'react'

interface Props {
  kegiatanId: string
  judul: string
  deskripsi: string | null
  url: string
}

interface Komentar {
  id: string
  kegiatan_id: string
  nama: string
  isi: string
  parent_id: string | null
  created_at: string
  replies: Komentar[]
}

// ─── Helper ────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return 'baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function initials(name: string): string {
  return name.trim().charAt(0).toUpperCase()
}

// ─── Heart/Like icon ───────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

// ─── Bookmark SVG icon ─────────────────────────────────────────────────────

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 3h14a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
    </svg>
  )
}

// ─── Trash SVG icon ────────────────────────────────────────────────────────

function TrashIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

// ─── Reply/Comment tree item ────────────────────────────────────────────────

interface KomentarItemProps {
  komentar: Komentar
  kegiatanId: string
  isAdmin: boolean
  replyTo: string | null
  replyNama: string
  replyIsi: string
  submittingReply: boolean
  onSetReplyTo: (id: string | null) => void
  onReplyNamaChange: (v: string) => void
  onReplyIsiChange: (v: string) => void
  onSubmitReply: (parentId: string) => void
  onDelete: (id: string) => void
  depth?: number
}

function KomentarItem({
  komentar,
  kegiatanId,
  isAdmin,
  replyTo,
  replyNama,
  replyIsi,
  submittingReply,
  onSetReplyTo,
  onReplyNamaChange,
  onReplyIsiChange,
  onSubmitReply,
  onDelete,
  depth = 0,
}: KomentarItemProps) {
  const showReplyForm = replyTo === komentar.id

  return (
    <div className={depth > 0 ? 'ml-8 border-l-2 border-[#e5e5e5] pl-4' : ''}>
      <div className="flex items-start gap-3 py-4">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-sm flex-shrink-0">
          {initials(komentar.nama)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-sm text-[#1a1a1a]">{komentar.nama}</span>
            <span className="text-xs text-[#6b6b6b]">{timeAgo(komentar.created_at)}</span>
          </div>
          <p className="text-sm text-[#292929] leading-relaxed whitespace-pre-wrap break-words">
            {komentar.isi}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => onSetReplyTo(showReplyForm ? null : komentar.id)}
              className="text-xs text-[#6b6b6b] hover:text-[#1a1a1a] transition font-medium"
            >
              {showReplyForm ? 'Batal' : 'Balas'}
            </button>
            {isAdmin && (
              <button
                onClick={() => onDelete(komentar.id)}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition"
                aria-label="Hapus komentar"
              >
                <TrashIcon />
                Hapus
              </button>
            )}
          </div>

          {/* Reply form inline */}
          {showReplyForm && (
            <div className="mt-3 space-y-2">
              <input
                type="text"
                placeholder="Nama Anda"
                value={replyNama}
                onChange={(e) => onReplyNamaChange(e.target.value)}
                className="w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a]"
              />
              <textarea
                placeholder="Tulis balasan..."
                value={replyIsi}
                onChange={(e) => onReplyIsiChange(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => onSubmitReply(komentar.id)}
                  disabled={submittingReply || !replyNama.trim() || !replyIsi.trim()}
                  className="px-4 py-2 bg-[#1a1a1a] text-white text-sm rounded-xl hover:bg-[#333] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submittingReply ? 'Mengirim...' : 'Kirim'}
                </button>
                <button
                  onClick={() => onSetReplyTo(null)}
                  className="px-4 py-2 border border-[#e5e5e5] text-sm rounded-xl hover:bg-gray-50 transition"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {komentar.replies.length > 0 && (
        <div>
          {komentar.replies.map((reply) => (
            <KomentarItem
              key={reply.id}
              komentar={reply}
              kegiatanId={kegiatanId}
              isAdmin={isAdmin}
              replyTo={replyTo}
              replyNama={replyNama}
              replyIsi={replyIsi}
              submittingReply={submittingReply}
              onSetReplyTo={onSetReplyTo}
              onReplyNamaChange={onReplyNamaChange}
              onReplyIsiChange={onReplyIsiChange}
              onSubmitReply={onSubmitReply}
              onDelete={onDelete}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Default export: Action bar (Apresiasi + Bookmark)
// ═══════════════════════════════════════════════════════════════════════════

export default function NewsInteraction({ kegiatanId }: Props) {
  const [count, setCount] = useState(0)
  const [clapped, setClapped] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [fav, setFav] = useState(false)

  // Init from localStorage & fetch count
  useEffect(() => {
    setClapped(localStorage.getItem(`clapped_${kegiatanId}`) === 'true')
    setFav(localStorage.getItem(`fav_${kegiatanId}`) === 'true')

    fetch(`/api/apresiasi?kegiatan_id=${encodeURIComponent(kegiatanId)}`)
      .then((r) => r.ok ? r.json() : Promise.resolve({ count: 0 }))
      .then((d) => { if (typeof d.count === 'number') setCount(d.count) })
      .catch(() => {})
  }, [kegiatanId])

  async function handleClap() {
    if (clapped) return
    setAnimating(true)
    setTimeout(() => setAnimating(false), 600)
    try {
      const res = await fetch('/api/apresiasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kegiatan_id: kegiatanId }),
      })
      const d = await res.json()
      if (typeof d.count === 'number') setCount(d.count)
    } catch {
      setCount((c) => c + 1)
    }
    setClapped(true)
    localStorage.setItem(`clapped_${kegiatanId}`, 'true')
  }

  function handleFav() {
    const next = !fav
    setFav(next)
    if (next) {
      localStorage.setItem(`fav_${kegiatanId}`, 'true')
    } else {
      localStorage.removeItem(`fav_${kegiatanId}`)
    }
  }

  return (
    <div className="flex items-center gap-6">
      {/* Apresiasi */}
      <button
        onClick={handleClap}
        disabled={clapped}
        aria-label="Apresiasi"
        className={`flex flex-col items-center gap-0.5 transition-transform ${
          animating ? 'scale-125' : 'scale-100'
        } ${
          clapped
            ? 'text-[#1a1a1a] cursor-not-allowed opacity-70'
            : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
        }`}
        style={{ transition: 'transform 0.2s ease, color 0.15s' }}
      >
        <HeartIcon filled={clapped} />
        <span className="text-[11px] font-medium tabular-nums">{count}</span>
      </button>

      {/* Favorit */}
      <button
        onClick={handleFav}
        aria-label={fav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
        className={`flex flex-col items-center gap-0.5 transition ${
          fav ? 'text-[#1a1a1a]' : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
        }`}
      >
        <BookmarkIcon filled={fav} />
        <span className="text-[11px] font-medium tabular-nums">{fav ? '1' : '0'}</span>
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Named export: Komentar section
// ═══════════════════════════════════════════════════════════════════════════

export function KomentarSection({ kegiatanId }: Props) {
  const [komentarList, setKomentarList] = useState<Komentar[]>([])
  const [loadingKomentar, setLoadingKomentar] = useState(true)

  // New top-level comment
  const [nama, setNama] = useState('')
  const [isi, setIsi] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Reply state
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyNama, setReplyNama] = useState('')
  const [replyIsi, setReplyIsi] = useState('')
  const [submittingReply, setSubmittingReply] = useState(false)

  // Admin state (checked client-side)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(localStorage.getItem('admin_logged_in') === 'true')

    fetch(`/api/komentar?kegiatan_id=${encodeURIComponent(kegiatanId)}`)
      .then((r) => r.ok ? r.json() : Promise.resolve([]))
      .then((d) => {
        if (Array.isArray(d)) setKomentarList(d)
      })
      .catch(() => {})
      .finally(() => setLoadingKomentar(false))
  }, [kegiatanId])

  // Count total comments including replies
  function countAll(list: Komentar[]): number {
    return list.reduce((acc, k) => acc + 1 + countAll(k.replies), 0)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nama.trim() || !isi.trim() || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/komentar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kegiatan_id: kegiatanId, nama: nama.trim(), isi: isi.trim() }),
      })
      const newK: Komentar = await res.json()
      setKomentarList((prev) => [...prev, { ...newK, replies: newK.replies ?? [] }])
      setNama('')
      setIsi('')
    } catch {
      // silent
    } finally {
      setSubmitting(false)
    }
  }

  async function handleSubmitReply(parentId: string) {
    if (!replyNama.trim() || !replyIsi.trim() || submittingReply) return
    setSubmittingReply(true)
    try {
      const res = await fetch('/api/komentar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kegiatan_id: kegiatanId,
          nama: replyNama.trim(),
          isi: replyIsi.trim(),
          parent_id: parentId,
        }),
      })
      const newK: Komentar = await res.json()

      // Append reply to the correct parent in state
      function appendReply(list: Komentar[]): Komentar[] {
        return list.map((k) => {
          if (k.id === parentId) {
            return { ...k, replies: [...k.replies, { ...newK, replies: [] }] }
          }
          return { ...k, replies: appendReply(k.replies) }
        })
      }

      setKomentarList((prev) => appendReply(prev))
      setReplyTo(null)
      setReplyNama('')
      setReplyIsi('')
    } catch {
      // silent
    } finally {
      setSubmittingReply(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus komentar ini?')) return
    try {
      await fetch(`/api/komentar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer rayon-admin-2025' },
      })

      // Remove from state (including nested replies)
      function removeKomentar(list: Komentar[]): Komentar[] {
        return list
          .filter((k) => k.id !== id)
          .map((k) => ({ ...k, replies: removeKomentar(k.replies) }))
      }

      setKomentarList((prev) => removeKomentar(prev))
    } catch {
      // silent
    }
  }

  const totalCount = countAll(komentarList)

  return (
    <section className="mt-12 border-t border-[#e5e5e5] pt-8">
      {/* Header */}
      <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">
        Komentar ({totalCount})
      </h2>

      {/* Form komentar baru */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <input
          type="text"
          placeholder="Nama Anda"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          className="w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a]"
        />
        <textarea
          placeholder="Tulis komentar..."
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          required
          rows={4}
          className="w-full rounded-xl border border-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] resize-none"
        />
        <button
          type="submit"
          disabled={submitting || !nama.trim() || !isi.trim()}
          className="px-5 py-2.5 bg-[#1a1a1a] text-white text-sm font-medium rounded-xl hover:bg-[#333] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? 'Mengirim...' : 'Kirim Komentar'}
        </button>
      </form>

      {/* List komentar */}
      {loadingKomentar ? (
        <div className="flex justify-center py-8 text-[#6b6b6b]">
          <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
          </svg>
        </div>
      ) : komentarList.length === 0 ? (
        <p className="text-sm text-[#6b6b6b] text-center py-8">
          Belum ada komentar. Jadilah yang pertama!
        </p>
      ) : (
        <div className="divide-y divide-[#e5e5e5]">
          {komentarList.map((k) => (
            <KomentarItem
              key={k.id}
              komentar={k}
              kegiatanId={kegiatanId}
              isAdmin={isAdmin}
              replyTo={replyTo}
              replyNama={replyNama}
              replyIsi={replyIsi}
              submittingReply={submittingReply}
              onSetReplyTo={(id) => {
                setReplyTo(id)
                setReplyNama('')
                setReplyIsi('')
              }}
              onReplyNamaChange={setReplyNama}
              onReplyIsiChange={setReplyIsi}
              onSubmitReply={handleSubmitReply}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
