import { notFound, redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { SessionWorkspace } from '@/components/interview/InterviewSessionWorkspace';
import { interviewData as mockInterview } from '@/lib/mock-data';
import type { ChatPanelMessage } from '@/components/interview/ChatPanel';

type CandidateInfo = {
  full_name: string;
};

type InterviewRow = {
  id: string;
  interview_code: string | null;
  interview_type: string;
  language: string | null;
  candidate: CandidateInfo | CandidateInfo[] | null;
};

type MessageRow = {
  id: string;
  sender_role: string;
  content: string;
  is_typing: boolean | null;
  created_at: string;
};

type SubmissionRow = {
  file_name: string;
  language: string;
  source_code: string;
  test_output: string | null;
  created_at: string;
};

type SessionPageProps = {
  params: { id: string };
};

const pickFirst = <T,>(value: T | T[] | null | undefined): T | null => {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
};

export default async function InterviewerSessionPage({ params }: SessionPageProps) {
  const supabase = await createSupabaseServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    redirect('/login');
  }

  const [{ data: interviewData, error: interviewError }, { data: messagesData }, { data: submissionsData }] =
    await Promise.all([
      supabase
        .from('interview_sessions')
        .select('id, room_code, started_at, candidate:profiles(full_name)')
        .eq('id', params.id)
        .single(),
      supabase
        .from('messages')
        .select('id, role as sender_role, content, is_typing, created_at')
        .eq('session_id', params.id)
        .order('created_at', { ascending: true }),
      supabase
        .from('code_submissions')
        .select('file_name, language, source_code, test_output, created_at')
        .eq('session_id', params.id)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

  if (interviewError || !interviewData) {
    notFound();
  }

  const interview = interviewData as any;
  const candidate = pickFirst(interview.candidate);
  const submissions = (submissionsData ?? []) as SubmissionRow[];
  const latestSubmission = submissions[0];
  const messages = ((messagesData ?? []) as MessageRow[]).map<ChatPanelMessage>((message) => ({
    id: message.id,
    type: message.sender_role === 'candidate' ? 'candidate' : 'ai',
    content: message.content,
    timestamp: message.created_at,
    isTyping: message.is_typing ?? false,
  }));
  const fallbackMessages = (mockInterview.chatMessages as ChatPanelMessage[]).map((message) => ({
    ...message,
    timestamp:
      message.timestamp instanceof Date ? message.timestamp.toISOString() : message.timestamp,
  }));

  return (
    <SessionWorkspace
      sessionId={interview.id}
        interviewCode={interview.room_code}
        candidateName={candidate?.full_name ?? 'Candidate'}
        interviewType={null}
      initialCode={latestSubmission?.source_code ?? mockInterview.currentCode}
      initialLanguage={latestSubmission?.language ?? interview.language ?? mockInterview.language}
      initialOutput={latestSubmission?.test_output ?? ''}
      initialMessages={messages.length > 0 ? messages : fallbackMessages}
      files={
        submissions.length > 0
          ? submissions.map((submission, index) => ({ name: submission.file_name, active: index === 0 }))
          : mockInterview.codeFiles
      }
      mode="interviewer"
    />
  );
}
