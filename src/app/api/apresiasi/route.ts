import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const kegiatanId = request.nextUrl.searchParams.get('kegiatan_id')
  if (!kegiatanId) {
    return NextResponse.json({ error: 'kegiatan_id diperlukan' }, { status: 400 })
  }

  const { count, error } = await supabase
    .from('apresiasi')
    .select('*', { count: 'exact', head: true })
    .eq('kegiatan_id', kegiatanId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ count: count ?? 0 })
}

export async function POST(request: NextRequest) {
  let body: { kegiatan_id?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON tidak valid' }, { status: 400 })
  }

  const { kegiatan_id } = body
  if (!kegiatan_id) {
    return NextResponse.json({ error: 'kegiatan_id diperlukan' }, { status: 400 })
  }

  const { error: insertError } = await supabase
    .from('apresiasi')
    .insert({ kegiatan_id })

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  const { count, error: countError } = await supabase
    .from('apresiasi')
    .select('*', { count: 'exact', head: true })
    .eq('kegiatan_id', kegiatan_id)

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 })
  }

  return NextResponse.json({ count: count ?? 0 })
}
