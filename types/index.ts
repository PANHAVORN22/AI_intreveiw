export type UserRole = 'candidate' | 'interviewer' | 'admin'

export type CodeLanguage = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go'

export type ProblemDifficulty = 'easy' | 'medium' | 'hard'

export type SessionStatus = 'pending' | 'active' | 'completed' | 'cancelled'

export type MessageRole = 'user' | 'assistant' | 'system'

export type Recommendation = 'STRONG_HIRE' | 'HIRE' | 'NO_HIRE'

export type ProblemStarterCode = {
  js?: string
  ts?: string
  python?: string
  java?: string
  cpp?: string
  go?: string
}

export type ProblemTestCase = {
  input: string
  expected_output: string
}

export type EvaluationScores = {
  problem_understanding: number
  algorithm: number
  code_quality: number
  communication: number
  edge_cases: number
  time_complexity: number
}

export interface Profile {
  id: string
  full_name: string | null
  email: string | null
  avatar_url: string | null
  role: UserRole | null
  created_at: string
}

export interface Problem {
  id: string
  title: string
  description: string
  difficulty: ProblemDifficulty
  tags: string[] | null
  starter_code: ProblemStarterCode | null
  test_cases: ProblemTestCase[] | null
  created_by: string | null
  created_at: string
}

export interface Session {
  id: string
  candidate_id: string
  interviewer_id: string | null
  problem_id: string | null
  status: SessionStatus
  room_code: string | null
  started_at: string | null
  ended_at: string | null
  created_at: string
}

export interface Message {
  id: string
  session_id: string
  role: MessageRole
  content: string
  token_count: number | null
  created_at: string
}

export interface CodeSubmission {
  id: string
  session_id: string
  language: string
  code: string
  stdout: string | null
  stderr: string | null
  exit_code: number | null
  execution_ms: number | null
  created_at: string
}

export interface Evaluation {
  id: string
  session_id: string
  scores: EvaluationScores | null
  feedback: string | null
  strengths: string[] | null
  weaknesses: string[] | null
  recommendation: Recommendation | null
  ai_model: string | null
  created_at: string
}

export type SessionWithProblem = Session & {
  problems: Problem | null
}
