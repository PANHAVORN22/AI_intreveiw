import { z } from 'zod'

export const SessionStatus = z.enum(['pending', 'active', 'completed', 'cancelled'])

export const sessionCreateSchema = z.object({
  candidate_id: z.string().uuid(),
  interviewer_id: z.string().uuid().nullable().optional(),
  problem_id: z.string().uuid().nullable().optional(),
  status: SessionStatus.optional(),
  room_code: z.string().min(1),
  started_at: z.string().optional().nullable(),
  ended_at: z.string().optional().nullable(),
})

export const sessionUpdateSchema = z.object({
  interviewer_id: z.string().uuid().nullable().optional(),
  problem_id: z.string().uuid().nullable().optional(),
  status: SessionStatus.optional(),
  room_code: z.string().min(1).optional(),
  started_at: z.string().optional().nullable(),
  ended_at: z.string().optional().nullable(),
})

export const messageCreateSchema = z.object({
  session_id: z.string().uuid(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1),
  token_count: z.number().int().nullable().optional(),
})

export const evaluationSchema = z.object({
  session_id: z.string().uuid(),
  score: z.number().int().min(0).max(100).nullable().optional(),
  scores: z.any().optional(),
  status: z.string().optional(),
  interviewer_name: z.string().optional(),
  outcome: z.enum(['passed', 'failed', 'no_decision']).optional(),
  summary: z.string().optional(),
  feedback: z.string().optional(),
  strengths: z.array(z.string()).optional(),
  weaknesses: z.array(z.string()).optional(),
  recommendation: z.enum(['STRONG_HIRE', 'HIRE', 'NO_HIRE']).optional(),
  ai_model: z.string().optional(),
})

export const profilePatchSchema = z.object({
  full_name: z.string().optional(),
  avatar_url: z.string().url().optional(),
  title: z.string().optional(),
  company_name: z.string().optional(),
  role: z.enum(['candidate', 'interviewer', 'admin']).optional(),
})
