import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export interface Komentar {
  id: string
  kegiatan_id: string
  nama: string
  isi: string
  parent_id: string | null
  created_at: string
  replies: Komentar[]
}

export async function GET(request: NextRequest) {
  const kegiatanId = request.nextUrl.searchParams.get('kegiatan_id')
  if (!kegiatanId) {
    return NextResponse.json({ error: 'kegiatan_id diperlukan' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('komentar')
    .select('*')
    .eq('kegiatan_id', kegiatanId)
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Build tree: flatten list → nested tree
  const rows = (data ?? []) as Omit<Komentar, 'replies'>[]
  const map = new Map<string, Komentar>()
  const roots: Komentar[] = []

  for (const row of rows) {
    map.set(row.id, { ...row, replies: [] })
  }

  for (const row of rows) {
    const node = map.get(row.id)!
    if (row.parent_id && map.has(row.parent_id)) {
      map.get(row.parent_id)!.replies.push(node)
    } else {
      roots.push(node)
    }
  }

  return NextResponse.json(roots)
}

export async function POST(request: NextRequest) {
  let body: { kegiatan_id?: string; nama?: string; isi?: string; parent_id?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON tidak valid' }, { status: 400 })
  }

  const { kegiatan_id, nama, isi, parent_id } = body
  if (!kegiatan_id || !nama || !isi) {
    return NextResponse.json({ error: 'kegiatan_id, nama, dan isi diperlukan' }, { status: 400 })
  }

  const insertData: Record<string, string> = { kegiatan_id, nama, isi }
  if (parent_id) insertData.parent_id = parent_id

  const { data, error } = await supabase
    .from('komentar')
    .insert(insertData)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ...data, replies: [] })
}
