import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { sessionCreateSchema } from '@/lib/api/validators'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const parse = sessionCreateSchema.safeParse(body)
  if (!parse.success) {
    return NextResponse.json({ error: 'Validation failed', details: parse.error.flatten() }, { status: 400 })
  }

  try {
    const supabase = await createSupabaseServerClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData || !userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = parse.data
    const { data, error } = await supabase
      .from('interview_sessions')
      .insert([payload])
      .select('*')
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const params = url.searchParams
    const status = params.get('status')
    const candidate_id = params.get('candidate_id')
    const interviewer_id = params.get('interviewer_id')

    const supabase = await createSupabaseServerClient()
    let query = supabase.from('interview_sessions').select('*')

    if (status) query = query.eq('status', status)
    if (candidate_id) query = query.eq('candidate_id', candidate_id)
    if (interviewer_id) query = query.eq('interviewer_id', interviewer_id)

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
