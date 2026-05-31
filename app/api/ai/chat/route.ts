import { NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { generateChatResponse } from '@/lib/ai/evaluate'

export const runtime = 'nodejs'

type ChatRequest = {
  sessionId?: string
  currentCode?: string
  language?: string
  message?: string
  messages?: Array<{ type?: string; content?: string }>
  context?: {
    candidateName?: string
    interviewType?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: ChatRequest

    try {
      body = (await request.json()) as ChatRequest
    } catch {
      return new Response('Invalid JSON payload.', { status: 400 })
    }

    const message = body.message?.trim()
    if (!message) {
      return new Response('Message is required.', { status: 400 })
    }

    const supabase = await createSupabaseServerClient()
    const { data: { user } = {} } = await supabase.auth.getUser()

    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { data: sessionData } = body.sessionId
      ? await supabase
          .from('interview_sessions')
          .select('id, started_at, problems(title, difficulty)')
          .eq('id', body.sessionId)
          .single()
      : { data: null }

    const problem = Array.isArray(sessionData?.problems) ? sessionData?.problems[0] : sessionData?.problems
    const transcript = (body.messages ?? [])
      .map((entry) => `${entry.type === 'candidate' ? 'Candidate' : 'AI'}: ${entry.content ?? ''}`)
      .join('\n')
    const aiText = await generateChatResponse({
      problemTitle: problem?.title ?? 'Technical session',
      difficulty: problem?.difficulty ?? 'medium',
      language: body.language ?? 'typescript',
      currentCode: body.currentCode ?? '',
      candidateName: body.context?.candidateName,
      interviewType: body.context?.interviewType,
      elapsedMinutes: sessionData?.started_at ? Math.max(0, Math.floor((Date.now() - new Date(sessionData.started_at).getTime()) / 60000)) : 0,
      message,
      transcript,
    })

    const encoder = new TextEncoder()
    const chunks = aiText.match(/.{1,24}(\s|$)/g) ?? [aiText]

    const stream = new ReadableStream({
      start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk))
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('AI chat route failed', error)

    const fallback = 'I’m having trouble starting the AI stream right now. Please try again in a moment.'
    const encoder = new TextEncoder()

    return new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(fallback))
          controller.close()
        },
      }),
      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      },
    )
  }
}
