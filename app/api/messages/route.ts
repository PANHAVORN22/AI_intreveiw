import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { messageCreateSchema } from '@/lib/api/validators'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const parse = messageCreateSchema.safeParse(body)
  if (!parse.success) return NextResponse.json({ error: 'Validation failed', details: parse.error.flatten() }, { status: 400 })

  try {
    const supabase = await createSupabaseServerClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData || !userData.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase.from('messages').insert([parse.data]).select('*').single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const session_id = url.searchParams.get('session_id')
    const supabase = await createSupabaseServerClient()

    let query = supabase.from('messages').select('*')
    if (session_id) query = query.eq('session_id', session_id)

    const { data, error } = await query.order('created_at', { ascending: true })
    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
