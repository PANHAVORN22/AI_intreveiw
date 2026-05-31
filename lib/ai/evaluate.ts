import type { CodeLanguage, EvaluationScores } from '@/types'
import { buildEvaluationPrompt, buildInterviewerPrompt, buildProblemPrompt, buildReviewPrompt } from './prompts'
import { getAnthropicClient, getGeminiApiKey, getGeminiBearerToken, getGeminiModel, findCompatibleGeminiModel, normalizeGeminiModelName } from './client'

export type ChatInput = {
  problemTitle: string
  difficulty: string
  language: CodeLanguage | string
  currentCode: string
  candidateName?: string
  interviewType?: string
  elapsedMinutes?: number
  transcript?: string
}

export type GeneratedEvaluation = {
  scores: EvaluationScores
  feedback: string
  strengths: string[]
  weaknesses: string[]
  recommendation: 'STRONG_HIRE' | 'HIRE' | 'NO_HIRE'
  ai_model: string
}

export async function generateChatResponse(input: ChatInput & { message: string }) {
  const prompt = buildInterviewerPrompt({
    problemTitle: input.problemTitle,
    difficulty: input.difficulty,
    language: input.language,
    currentCode: input.currentCode,
    candidateName: input.candidateName,
    interviewType: input.interviewType,
    elapsedMinutes: input.elapsedMinutes ?? 0,
  })

  const geminiApiKey = getGeminiApiKey()
  const geminiBearerToken = getGeminiBearerToken()
  if (geminiApiKey || geminiBearerToken) {
    try {
      return await generateGeminiChatResponse({
        systemPrompt: prompt,
        message: input.message,
        transcript: input.transcript,
        model: getGeminiModel(),
        apiKey: geminiApiKey,
        bearerToken: geminiBearerToken,
      })
    } catch (error) {
      console.error('Gemini chat generation failed', error)
    }
  }

  const client = getAnthropicClient()
  if (!client) {
    return buildFallbackChatResponse(input.message, input.currentCode, input.language)
  }

  try {
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? 'claude-3-5-sonnet-20240620',
      max_tokens: 700,
      temperature: 0.3,
      system: prompt,
      messages: [
        {
          role: 'user',
          content: [
            input.transcript ? `Conversation history:\n${input.transcript}` : null,
            `Current candidate message:\n${input.message}`,
          ]
            .filter((value): value is string => Boolean(value))
            .join('\n\n'),
        },
      ],
    })

    return response.content
      .map((block) => ('text' in block ? block.text : ''))
      .join('')
      .trim()
  } catch (error) {
    console.error('Anthropic chat generation failed', error)
    return buildFallbackChatResponse(input.message, input.currentCode, input.language)
  }
}

async function generateGeminiChatResponse(input: {
  systemPrompt: string
  message: string
  transcript?: string
  model: string
  apiKey: string | null
  bearerToken: string | null
}) {
  const contents = [
    input.transcript ? `Conversation history:\n${input.transcript}` : null,
    `Current candidate message:\n${input.message}`,
  ]
    .filter((value): value is string => Boolean(value))
    .join('\n\n')

  const modelName = normalizeGeminiModelName(input.model) ?? getGeminiModel()

  const response = await fetch(
    input.bearerToken ? `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent` : `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(input.apiKey ?? '')}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(input.bearerToken ? { Authorization: `Bearer ${input.bearerToken}` } : {}),
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: input.systemPrompt }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: contents }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 700,
        },
      }),
    },
  )

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    let errorMessage = `Gemini request failed with status ${response.status}`

    if (errorText) {
      try {
        const errorJson = JSON.parse(errorText) as { error?: { message?: string } }
        errorMessage = errorJson.error?.message ?? errorText
      } catch {
        errorMessage = errorText
      }
    }

    // If the API reports the model is unsupported for this method, try to find a compatible model and retry once.
    const unsupportedModelRegex = /not found for API version|not supported for generateContent|not found/i
    if (unsupportedModelRegex.test(errorMessage)) {
      try {
        const alt = await findCompatibleGeminiModel()
        const normalizedAlt = normalizeGeminiModelName(alt)
        const normalizedInput = normalizeGeminiModelName(input.model)
        if (normalizedAlt && normalizedAlt !== normalizedInput) {
          console.warn(`Gemini model ${input.model} unsupported, retrying with ${normalizedAlt}`)
          const retryUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(normalizedAlt)}:generateContent`
          const retryResp = await fetch(
            input.bearerToken ? retryUrl : `${retryUrl}?key=${encodeURIComponent(input.apiKey ?? '')}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(input.bearerToken ? { Authorization: `Bearer ${input.bearerToken}` } : {}),
              },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: input.systemPrompt }] },
                contents: [
                  { role: 'user', parts: [{ text: contents }] },
                ],
                generationConfig: { temperature: 0.3, maxOutputTokens: 700 },
              }),
            },
          )

          if (retryResp.ok) {
            const data = (await retryResp.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }
            const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('').trim()
            return text || buildFallbackChatResponse(input.message, '', 'typescript')
          }
        }
      } catch (err) {
        console.error('Error attempting alt Gemini model', err)
      }
    }

    throw new Error(errorMessage)
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> }
    }>
  }

  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('').trim()

  return text || buildFallbackChatResponse(input.message, '', 'typescript')
}

export async function generateReviewResponse(input: ChatInput) {
  const client = getAnthropicClient()
  const prompt = buildReviewPrompt({
    problemTitle: input.problemTitle,
    difficulty: input.difficulty,
    language: input.language,
    currentCode: input.currentCode,
  })

  if (!client) {
    return buildFallbackReview(input.currentCode, input.language)
  }

  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? 'claude-3-5-sonnet-20240620',
    max_tokens: 900,
    temperature: 0.2,
    system: prompt,
    messages: [{ role: 'user', content: input.currentCode }],
  })

  return response.content
    .map((block) => ('text' in block ? block.text : ''))
    .join('')
    .trim()
}

export async function generateEvaluationResponse(input: ChatInput) {
  const client = getAnthropicClient()
  const prompt = buildEvaluationPrompt({
    problemTitle: input.problemTitle,
    difficulty: input.difficulty,
    language: input.language,
    currentCode: input.currentCode,
    transcript: input.transcript ?? '',
  })

  if (!client) {
    return fallbackEvaluation(input.currentCode, input.transcript ?? '')
  }

  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? 'claude-3-5-sonnet-20240620',
    max_tokens: 1200,
    temperature: 0.2,
    system: prompt,
    messages: [{ role: 'user', content: 'Return the JSON only.' }],
  })

  const text = response.content
    .map((block) => ('text' in block ? block.text : ''))
    .join('')
    .trim()

  return parseEvaluation(text) ?? fallbackEvaluation(input.currentCode, input.transcript ?? '')
}

export async function generateProblemResponse(input: { title: string; difficulty: string; tags: string[] }) {
  const client = getAnthropicClient()
  const prompt = buildProblemPrompt(input)

  if (!client) {
    return fallbackProblem(input)
  }

  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? 'claude-3-5-sonnet-20240620',
    max_tokens: 1200,
    temperature: 0.5,
    system: prompt,
    messages: [{ role: 'user', content: 'Return JSON only.' }],
  })

  const text = response.content
    .map((block) => ('text' in block ? block.text : ''))
    .join('')
    .trim()

  return parseProblem(text) ?? fallbackProblem(input)
}

function buildFallbackChatResponse(message: string, currentCode: string, language: string) {
  const lowerMessage = message.toLowerCase()
  const hasLoop = /\b(for|while|map|reduce|forEach)\b/.test(currentCode)
  const hasTests = /\b(test|expect|assert|case)\b/i.test(currentCode)

  if (lowerMessage.includes('hint')) {
    return `For this ${language} solution, define the invariant first and walk through one small input before changing the code.`
  }

  if (lowerMessage.includes('edge')) {
    return `Check empty input, a single item, repeated values, already-valid input, and the largest expected input size. ${hasTests ? 'You already have some test structure, so add the smallest failing case next.' : 'Add the simplest failing case first.'}`
  }

  if (lowerMessage.includes('review') || lowerMessage.includes('improve')) {
    return `Quick review: the overall structure is readable. ${hasLoop ? 'Pay close attention to whether the loop updates state in the right order.' : 'Consider making the core iteration explicit so complexity is easier to reason about.'} I would ask the candidate to explain time and space complexity next.`
  }

  return `I would clarify the target behavior, walk one example, and validate the implementation with a focused edge case.`
}

function buildFallbackReview(currentCode: string, language: string) {
  const length = currentCode.length
  const recommendation = length > 400 ? 'HIRE' : 'NO_HIRE'

  return JSON.stringify({
    strengths: ['Readable structure', `Uses ${language} consistently`],
    issues: ['Edge-case coverage could be deeper'],
    suggestions: ['Add more focused tests', 'Explain complexity tradeoffs'],
    recommendation,
  })
}

function fallbackEvaluation(currentCode: string, transcript: string): GeneratedEvaluation {
  const base = Math.min(100, Math.max(40, Math.round(currentCode.length / 20)))
  const transcriptBonus = transcript.length > 120 ? 10 : 0
  const score = Math.min(100, base + transcriptBonus)

  return {
    scores: {
      problem_understanding: score,
      algorithm: score,
      code_quality: score,
      communication: Math.max(40, score - 10),
      edge_cases: Math.max(40, score - 5),
      time_complexity: Math.max(40, score - 8),
    },
    feedback: 'Fallback evaluation generated because ANTHROPIC_API_KEY is missing.',
    strengths: ['Clear implementation intent'],
    weaknesses: ['No live model output available'],
    recommendation: score >= 80 ? 'STRONG_HIRE' : score >= 65 ? 'HIRE' : 'NO_HIRE',
    ai_model: 'fallback',
  }
}

function fallbackProblem(input: { title: string; difficulty: string; tags: string[] }) {
  return {
    title: input.title,
    description: `Implement a solution for ${input.title}.`,
    difficulty: input.difficulty,
    tags: input.tags,
    starter_code: {
      js: '// TODO',
      ts: '// TODO',
      python: '# TODO',
      java: '// TODO',
      cpp: '// TODO',
      go: '// TODO',
    },
    test_cases: [
      { input: '[]', expected_output: '[]' },
      { input: '[1,2,3]', expected_output: 'custom' },
    ],
  }
}

function parseJson<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    try {
      return JSON.parse(match[0]) as T
    } catch {
      return null
    }
  }
}

function parseEvaluation(text: string): GeneratedEvaluation | null {
  return parseJson<GeneratedEvaluation>(text)
}

function parseProblem(text: string) {
  return parseJson<ReturnType<typeof fallbackProblem>>(text)
}
