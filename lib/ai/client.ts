import Anthropic from '@anthropic-ai/sdk'

export function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return null
  }

  return new Anthropic({ apiKey })
}

export function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY ?? null
}

export function getGeminiModel() {
  return normalizeGeminiModelName(process.env.GEMINI_MODEL) ?? 'gemini-2.5-flash'
}

export function normalizeGeminiModelName(model?: string | null) {
  if (!model) return null
  return model.replace(/^models\//i, '')
}
export function getGeminiBearerToken() {
  return process.env.GEMINI_BEARER_TOKEN ?? null
}

export async function findCompatibleGeminiModel() {
  try {
    const apiKey = getGeminiApiKey()
    const bearer = getGeminiBearerToken()

    const url = 'https://generativelanguage.googleapis.com/v1/models'
    const res = await fetch(bearer ? url : `${url}?key=${encodeURIComponent(apiKey ?? '')}`, {
      method: 'GET',
      headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
    })

    if (!res.ok) {
      console.error('Failed to list Gemini models', await res.text().catch(() => ''))
      return null
    }

    const data = (await res.json()) as { models?: Array<{ name?: string; supportedGenerationMethods?: string[] }> }

    const models = data.models ?? []

    // Prefer models that include 'gemini' and support generateContent
    const candidate = models.find((m) => {
      const name = normalizeGeminiModelName(m.name) ?? ''
      const supports = (m.supportedGenerationMethods ?? []).map((s) => s.toLowerCase())
      return name.toLowerCase().includes('gemini') && supports.includes('generatecontent')
    })

    if (candidate?.name) return normalizeGeminiModelName(candidate.name)

    // Fallback: return first model that mentions 'gemini' or any available model
    const anyGemini = models.find((m) => (normalizeGeminiModelName(m.name) ?? '').toLowerCase().includes('gemini'))
    if (anyGemini?.name) return normalizeGeminiModelName(anyGemini.name)

    return normalizeGeminiModelName(models[0]?.name ?? null)
  } catch (err) {
    console.error('Error listing Gemini models', err)
    return null
  }
}
