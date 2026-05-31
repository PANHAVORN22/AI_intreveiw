import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { generateReviewResponse } from '@/lib/ai/evaluate'

export const runtime = 'nodejs'

type ReviewRequest = {
  sessionId?: string
  code?: string
  language?: string
}

export async function POST(request: NextRequest) {
  let body: ReviewRequest

  try {
    body = (await request.json()) as ReviewRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const code = body.code?.trim()
  if (!code) {
    return NextResponse.json({ error: 'Code is required.' }, { status: 400 })
  }

  const supabase = await createSupabaseServerClient()
  const { data: { user } = {} } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: sessionData } = body.sessionId
    ? await supabase
        .from('interview_sessions')
        .select('id, problems(title, difficulty)')
        .eq('id', body.sessionId)
        .single()
    : { data: null }

  const problem = Array.isArray(sessionData?.problems) ? sessionData?.problems[0] : sessionData?.problems
  const text = await generateReviewResponse({
    problemTitle: problem?.title ?? 'Technical session',
    difficulty: problem?.difficulty ?? 'medium',
    language: body.language ?? 'typescript',
    currentCode: code,
  })

  return NextResponse.json({ review: text })
}
