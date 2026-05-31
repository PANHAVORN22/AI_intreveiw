import { notFound, redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { SessionWorkspace } from '@/components/interview/InterviewSessionWorkspace'
import type { ChatPanelMessage } from '@/components/interview/ChatPanel'

type CandidateInfo = {
  full_name: string
}

type ProblemInfo = {
  title: string
  description: string
  difficulty: string
}

type SessionRow = {
  id: string
  room_code: string | null
  status: string | null
  candidate_id: string
  interviewer_id: string | null
  problem_id: string | null
  started_at: string | null
  problems: ProblemInfo | ProblemInfo[] | null
  candidate: CandidateInfo | CandidateInfo[] | null
}

type MessageRow = {
  id: string
  role: string
  content: string
  created_at: string
}

type SubmissionRow = {
  code: string
  language: string
  stdout: string | null
  stderr: string | null
  execution_ms: number | null
  created_at: string
}

type RoomPageProps = {
  params: { roomCode: string }
}

const pickFirst = <T,>(value: T | T[] | null | undefined): T | null => {
  if (!value) return null
  return Array.isArray(value) ? value[0] ?? null : value
}

export default async function InterviewRoomPage({ params }: RoomPageProps) {
  const supabase = await createSupabaseServerClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    redirect('/login')
  }

  const { data: sessionData, error: sessionError } = await supabase
    .from('interview_sessions')
    .select('id, room_code, status, candidate_id, interviewer_id, problem_id, started_at, problems(title, description, difficulty), candidate:profiles!candidate_id(full_name)')
    .eq('room_code', params.roomCode)
    .single()

  if (sessionError || !sessionData) {
    notFound()
  }

  const session = sessionData as SessionRow
  const candidate = pickFirst(session.candidate)
  const problem = pickFirst(session.problems)

  const [{ data: messagesData }, { data: submissionsData }] = await Promise.all([
    supabase
      .from('messages')
      .select('id, role, content, created_at')
      .eq('session_id', session.id)
      .order('created_at', { ascending: true }),
    supabase
      .from('code_submissions')
      .select('code, language, stdout, stderr, execution_ms, created_at')
      .eq('session_id', session.id)
      .order('created_at', { ascending: false })
      .limit(10),
  ])
  const messages = ((messagesData ?? []) as MessageRow[]).map<ChatPanelMessage>((message) => ({
    id: message.id,
    type: message.role === 'assistant' ? 'ai' : 'candidate',
    content: message.content,
    timestamp: message.created_at,
  }))
  const submissions = (submissionsData ?? []) as SubmissionRow[]
  const latestSubmission = submissions[0]

  return (
    <SessionWorkspace
      sessionId={session.id}
      interviewCode={session.room_code}
      candidateName={candidate?.full_name ?? 'Candidate'}
      interviewType={problem?.title ?? 'Technical'}
      initialCode={latestSubmission?.code ?? ''}
      initialLanguage={latestSubmission?.language ?? 'typescript'}
      initialOutput={latestSubmission ? [latestSubmission.stdout, latestSubmission.stderr].filter(Boolean).join('\n') : ''}
      initialMessages={messages}
      files={[]}
      mode="candidate"
    />
  )
}
