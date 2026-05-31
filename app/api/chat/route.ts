import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ChatRequest = {
  message?: string;
  code?: string;
  language?: string;
  context?: {
    candidateName?: string;
    interviewType?: string;
  };
};

export async function POST(request: Request) {
  let body: ChatRequest;

  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      message: buildFallbackCoachReply(message, body.code, body.language),
      provider: 'fallback',
    });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? 'claude-3-5-sonnet-20240620',
      max_tokens: 500,
      temperature: 0.2,
      system:
        'You are an AI technical interviewer. Give concise coaching, ask one useful follow-up when appropriate, and avoid revealing a full solution unless explicitly requested.',
      messages: [
        {
          role: 'user',
          content: [
            `Candidate: ${body.context?.candidateName ?? 'Candidate'}`,
            `Interview type: ${body.context?.interviewType ?? 'Technical'}`,
            `Language: ${body.language ?? 'unknown'}`,
            `Current code:\n${body.code ?? ''}`,
            `Candidate/interviewer message:\n${message}`,
          ].join('\n\n'),
        },
      ],
    });

    const text = response.content
      .map((block) => ('text' in block ? block.text : ''))
      .join('')
      .trim();

    return NextResponse.json({
      message: text || buildFallbackCoachReply(message, body.code, body.language),
      provider: 'anthropic',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: buildFallbackCoachReply(message, body.code, body.language),
        error: error instanceof Error ? error.message : 'AI provider request failed.',
        provider: 'fallback',
      },
      { status: 200 },
    );
  }
}

function buildFallbackCoachReply(message: string, code = '', language = 'code') {
  const lowerMessage = message.toLowerCase();
  const hasLoop = /\b(for|while|map|reduce|forEach)\b/.test(code);
  const hasTests = /\b(test|expect|assert|case)\b/i.test(code);

  if (lowerMessage.includes('hint')) {
    return `For this ${language} solution, start by naming the invariant you want to preserve after each step. Then walk through one small input and one edge case before changing the code.`;
  }

  if (lowerMessage.includes('edge')) {
    return `Good edge cases to check: empty input, a single item, repeated values, already-sorted or already-valid input, and the largest expected input size. ${hasTests ? 'You already have some test structure, so add the smallest failing case next.' : 'Add the simplest failing case first.'}`;
  }

  if (lowerMessage.includes('review') || lowerMessage.includes('improve')) {
    return `Quick review: the overall structure is readable. ${hasLoop ? 'Pay close attention to whether the loop updates every piece of state in the right order.' : 'Consider making the core iteration explicit so complexity is easier to reason about.'} I would ask the candidate to explain time and space complexity next.`;
  }

  return `I would proceed by clarifying the target behavior, checking one example out loud, and then validating the implementation with a focused edge case. What assumption should we test next?`;
}
