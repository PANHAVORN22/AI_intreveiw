import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { generateEvaluationResponse } from '@/lib/ai/evaluate'

export const runtime = 'nodejs'

type EvaluateRequest = {
  sessionId?: string
  code?: string
  language?: string
  transcript?: string
}

export async function POST(request: NextRequest) {
  let body: EvaluateRequest

  try {
    body = (await request.json()) as EvaluateRequest
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
  const evaluation = await generateEvaluationResponse({
    problemTitle: problem?.title ?? 'Technical session',
    difficulty: problem?.difficulty ?? 'medium',
    language: body.language ?? 'typescript',
    currentCode: code,
    transcript: body.transcript ?? '',
  })

  if (body.sessionId) {
    const { error } = await supabase.from('evaluations').upsert({
      session_id: body.sessionId,
      scores: evaluation.scores,
      feedback: evaluation.feedback,
      strengths: evaluation.strengths,
      weaknesses: evaluation.weaknesses,
      recommendation: evaluation.recommendation,
      ai_model: evaluation.ai_model,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ evaluation })
}
