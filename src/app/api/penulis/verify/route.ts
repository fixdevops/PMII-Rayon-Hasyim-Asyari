import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const penulisId = request.nextUrl.searchParams.get('penulis_id')
  const username = request.nextUrl.searchParams.get('username')

  if (!penulisId || !username) {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  // Validasi UUID format dasar untuk mencegah injeksi
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(penulisId)) {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  // Sanitasi username (hanya alfanumerik + _ + .)
  const usernameRegex = /^[a-zA-Z0-9_.]{1,50}$/
  if (!usernameRegex.test(username)) {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('penulis')
    .select('id')
    .eq('id', penulisId)
    .eq('username', username)
    .eq('status', 'aktif')
    .single()

  if (error || !data) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }

  return NextResponse.json({ valid: true })
}
