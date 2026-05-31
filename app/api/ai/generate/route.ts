import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { generateProblemResponse } from '@/lib/ai/evaluate'

export const runtime = 'nodejs'

type GenerateRequest = {
  title?: string
  difficulty?: string
  tags?: string[]
  save?: boolean
}

export async function POST(request: NextRequest) {
  let body: GenerateRequest

  try {
    body = (await request.json()) as GenerateRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const title = body.title?.trim()
  if (!title) {
    return NextResponse.json({ error: 'Title is required.' }, { status: 400 })
  }

  const problem = await generateProblemResponse({
    title,
    difficulty: body.difficulty ?? 'medium',
    tags: body.tags ?? [],
  })

  if (body.save) {
    const supabase = await createSupabaseServerClient()
    const { data: { user } = {} } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase.from('problems').insert({
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      tags: problem.tags,
      starter_code: problem.starter_code,
      test_cases: problem.test_cases,
      created_by: user.id,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ problem })
}
