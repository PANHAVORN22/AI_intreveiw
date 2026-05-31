import type { CodeLanguage } from '@/types'

export function buildInterviewerPrompt(params: {
  problemTitle: string
  difficulty: string
  language: CodeLanguage | string
  elapsedMinutes: number
  currentCode: string
  candidateName?: string
  interviewType?: string
}): string {
  return `You are a senior software engineer conducting a technical session.
Problem: ${params.problemTitle} (${params.difficulty})
Session type: ${params.interviewType ?? 'Technical'}
Candidate: ${params.candidateName ?? 'Candidate'}
Language: ${params.language}
Time elapsed: ${params.elapsedMinutes} minutes
Candidate's current code:
\`\`\`${params.language}
${params.currentCode}
\`\`\`

Rules:
- Ask ONE focused question at a time
- Use Socratic questioning — guide, never give away answers
- After code submission, perform a detailed code review
- Evaluate: problem understanding, algorithm choice, code quality, communication, edge-case handling, time complexity awareness`
}

export function buildReviewPrompt(params: {
  problemTitle: string
  difficulty: string
  language: CodeLanguage | string
  currentCode: string
}): string {
  return `You are reviewing a technical session submission.
Problem: ${params.problemTitle} (${params.difficulty})
Language: ${params.language}

Code:
\`\`\`${params.language}
${params.currentCode}
\`\`\`

Return concise, structured feedback covering strengths, issues, suggestions, and overall recommendation.`
}

export function buildEvaluationPrompt(params: {
  problemTitle: string
  difficulty: string
  language: CodeLanguage | string
  currentCode: string
  transcript: string
}): string {
  return `You are scoring a completed technical session.
Problem: ${params.problemTitle} (${params.difficulty})
Language: ${params.language}

Candidate code:
\`\`\`${params.language}
${params.currentCode}
\`\`\`

Transcript:
${params.transcript}

Return JSON with keys: scores, feedback, strengths, weaknesses, recommendation, ai_model. Scores must include problem_understanding, algorithm, code_quality, communication, edge_cases, time_complexity with 0-100 integers.`
}

export function buildProblemPrompt(params: {
  title: string
  difficulty: string
  tags: string[]
}): string {
  return `Generate a coding session problem with this shape:
{
  "title": string,
  "description": string,
  "difficulty": "easy" | "medium" | "hard",
  "tags": string[],
  "starter_code": {"js": string, "ts": string, "python": string, "java": string, "cpp": string, "go": string},
  "test_cases": [{"input": string, "expected_output": string}]
}

Theme: ${params.title}
Difficulty: ${params.difficulty}
Tags: ${params.tags.join(', ')}
Return valid JSON only.`
}
