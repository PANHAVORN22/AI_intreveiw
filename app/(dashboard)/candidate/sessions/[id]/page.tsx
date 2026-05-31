import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { EvaluationScores, SessionStatus } from '@/types';

type ProblemRow = {
  title: string;
  description: string;
  difficulty: string;
};

type EvaluationRow = {
  scores: EvaluationScores | null;
  recommendation: string | null;
  feedback: string | null;
  strengths: string[] | null;
  weaknesses: string[] | null;
  created_at: string;
};

type SessionRow = {
  id: string;
  status: string | null;
  room_code: string | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
  problems: ProblemRow | ProblemRow[] | null;
  evaluations: EvaluationRow | EvaluationRow[] | null;
};

type SessionSummaryProps = {
  params: { id: string };
};

const normalizeStatus = (status: string | null): SessionStatus => {
  if (status === 'active' || status === 'completed' || status === 'cancelled') {
    return status;
  }
  return 'pending';
};

const pickFirst = <T,>(value: T | T[] | null | undefined): T | null => {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
};

const formatDateTime = (value: string | null) => {
  if (!value) return '—';
  return new Date(value).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default async function CandidateSessionSummary({ params }: SessionSummaryProps) {
  const supabase = await createSupabaseServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    redirect('/login');
  }

  const { data: sessionData, error: sessionError } = await supabase
    .from('interview_sessions')
    .select('id, status, room_code, started_at, ended_at, created_at, problems(title, description, difficulty), evaluations(scores, recommendation, feedback, strengths, weaknesses, created_at)')
    .eq('id', params.id)
    .eq('candidate_id', userData.user.id)
    .single();

  if (sessionError || !sessionData) {
    notFound();
  }

  const session = sessionData as SessionRow;
  const problem = pickFirst(session.problems);
  const evaluation = pickFirst(session.evaluations);
  const status = normalizeStatus(session.status);

  const scoreEntries = evaluation?.scores
    ? Object.entries(evaluation.scores)
    : [];

  return (
    <div className="p-8 space-y-8">
      <div>
        <Link href="/candidate" className="text-sm text-ai-cyan hover:text-ai-violet">
          ← Back to sessions
        </Link>
        <h1 className="text-3xl font-bold text-ai-text-primary mt-3">Session Summary</h1>
        <p className="text-ai-text-muted">Review the session details and evaluation feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-ai-text-primary mb-3">Problem</h2>
            <p className="text-sm text-ai-text-muted mb-2">{problem?.difficulty ?? 'unknown'}</p>
            <h3 className="text-xl font-semibold text-ai-text-primary mb-4">{problem?.title ?? 'Untitled problem'}</h3>
            <p className="text-sm text-ai-text-secondary whitespace-pre-wrap">
              {problem?.description ?? 'Problem description not available.'}
            </p>
          </div>

          <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-ai-text-primary mb-4">Evaluation</h2>
            {evaluation ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {scoreEntries.map(([key, value]) => (
                    <div key={key} className="rounded-lg border border-ai-border p-3">
                      <p className="text-xs text-ai-text-muted capitalize">{key.replace(/_/g, ' ')}</p>
                      <p className="text-lg font-semibold text-ai-text-primary">{value}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-ai-text-muted mb-1">Recommendation</p>
                  <p className="text-sm text-ai-text-primary">{evaluation.recommendation ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-ai-text-muted mb-1">Feedback</p>
                  <p className="text-sm text-ai-text-secondary">{evaluation.feedback ?? 'No feedback yet.'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-ai-text-muted mb-1">Strengths</p>
                    <ul className="text-sm text-ai-text-secondary list-disc pl-4">
                      {(evaluation.strengths ?? ['—']).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-ai-text-muted mb-1">Weaknesses</p>
                    <ul className="text-sm text-ai-text-secondary list-disc pl-4">
                      {(evaluation.weaknesses ?? ['—']).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-ai-text-muted">No evaluation available for this session.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-ai-text-primary mb-4">Session Details</h2>
            <div className="space-y-3 text-sm text-ai-text-secondary">
              <div>
                <p className="text-xs text-ai-text-muted">Status</p>
                <p className="capitalize text-ai-text-primary">{status}</p>
              </div>
              <div>
                <p className="text-xs text-ai-text-muted">Room Code</p>
                <p className="text-ai-text-primary">{session.room_code ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-ai-text-muted">Started</p>
                <p className="text-ai-text-primary">{formatDateTime(session.started_at)}</p>
              </div>
              <div>
                <p className="text-xs text-ai-text-muted">Ended</p>
                <p className="text-ai-text-primary">{formatDateTime(session.ended_at)}</p>
              </div>
              <div>
                <p className="text-xs text-ai-text-muted">Created</p>
                <p className="text-ai-text-primary">{formatDateTime(session.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
