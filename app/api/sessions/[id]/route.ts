import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { sessionUpdateSchema } from '@/lib/api/validators'

export const runtime = 'nodejs'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase
      .from('interview_sessions')
      .select('*, messages(*), evaluations(*)')
      .eq('id', id)
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }
  const parse = sessionUpdateSchema.safeParse(body)
  if (!parse.success) {
    return NextResponse.json({ error: 'Validation failed', details: parse.error.flatten() }, { status: 400 })
  }

  try {
    const supabase = await createSupabaseServerClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData || !userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('interview_sessions')
      .update(parse.data)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const supabase = await createSupabaseServerClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData || !userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase.from('interview_sessions').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
