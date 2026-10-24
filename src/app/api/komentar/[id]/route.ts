import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const sessionToken = authHeader.slice(7)
  if (!sessionToken || sessionToken.length < 16) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Verifikasi session token ke database
  const { data: adminData, error: authError } = await supabase
    .from('admin_users')
    .select('id')
    .eq('session_token', sessionToken)
    .single()

  if (authError || !adminData) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const { error } = await supabase
    .from('komentar')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
