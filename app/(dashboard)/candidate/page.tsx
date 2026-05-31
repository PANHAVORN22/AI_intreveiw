import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ScoreRadar } from '@/components/dashboard/ScoreRadar';
import type { EvaluationScores, SessionStatus } from '@/types';

const emptyScores: EvaluationScores = {
  problem_understanding: 0,
  algorithm: 0,
  code_quality: 0,
  communication: 0,
  edge_cases: 0,
  time_complexity: 0,
};

type ProblemRow = {
  title: string;
  difficulty: string;
};

type EvaluationRow = {
  scores: EvaluationScores | null;
  recommendation: string | null;
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

type SessionRowView = {
  id: string;
  status: SessionStatus;
  roomCode: string | null;
  startedAt: string | null;
  endedAt: string | null;
  createdAt: string;
  problemTitle: string;
  difficulty: string;
  score: number | null;
  recommendation: string | null;
};

const statusStyles: Record<SessionStatus, string> = {
  pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  active: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-300 border-green-500/30',
  cancelled: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

const formatDate = (value: string | null) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const averageScore = (scores: EvaluationScores) => {
  const total =
    scores.problem_understanding +
    scores.algorithm +
    scores.code_quality +
    scores.communication +
    scores.edge_cases +
    scores.time_complexity;
  return Math.round(total / 6);
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

export default async function CandidateDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    redirect('/login');
  }

  const { data: sessionsData, error: sessionsError } = await supabase
    .from('interview_sessions')
    .select('id, status, room_code, started_at, ended_at, created_at, problems(title, difficulty), evaluations(scores, recommendation, created_at)')
    .eq('candidate_id', userData.user.id)
    .order('created_at', { ascending: false });

  const sessions = (sessionsError || !sessionsData ? [] : sessionsData) as SessionRow[];

  const sessionViews: SessionRowView[] = sessions.map((session) => {
    const problem = pickFirst(session.problems);
    const evaluation = pickFirst(session.evaluations);
    const computedScore = evaluation?.scores ? averageScore(evaluation.scores) : null;

    return {
      id: session.id,
      status: normalizeStatus(session.status),
      roomCode: session.room_code,
      startedAt: session.started_at,
      endedAt: session.ended_at,
      createdAt: session.created_at,
      problemTitle: problem?.title ?? 'Untitled problem',
      difficulty: problem?.difficulty ?? 'unknown',
      score: computedScore,
      recommendation: evaluation?.recommendation ?? null,
    };
  });

  const evaluationEntries = sessions
    .map((session) => pickFirst(session.evaluations))
    .filter((evaluation): evaluation is EvaluationRow => Boolean(evaluation));

  const latestEvaluation = evaluationEntries.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  })[0];

  const latestScores = latestEvaluation?.scores ?? emptyScores;

  const avgScore =
    evaluationEntries.length > 0
      ? Math.round(
          evaluationEntries
            .map((evaluation) => (evaluation.scores ? averageScore(evaluation.scores) : 0))
            .reduce((total, value) => total + value, 0) / evaluationEntries.length,
        )
      : 0;

  const lastSessionDate = formatDate(sessionViews[0]?.endedAt || sessionViews[0]?.createdAt || null);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ai-text-primary mb-2">Your Sessions Dashboard</h1>
        <p className="text-ai-text-muted">Track your sessions and evaluation results.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Total Sessions</p>
          <p className="text-3xl font-bold text-ai-text-primary">{sessionViews.length}</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Average Score</p>
          <p className="text-3xl font-bold text-ai-text-primary">{avgScore}</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Last Session</p>
          <p className="text-3xl font-bold text-ai-text-primary">{lastSessionDate}</p>
        </div>
      </div>

      <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-ai-text-primary mb-4">Latest Evaluation</h2>
        {latestEvaluation ? (
          <ScoreRadar scores={latestScores} />
        ) : (
          <p className="text-ai-text-muted">No evaluations yet.</p>
        )}
      </div>

      <div className="bg-ai-card-bg border border-ai-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-ai-border">
          <h2 className="text-lg font-semibold text-ai-text-primary">Past Sessions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ai-dark-bg border-b border-ai-border">
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Problem
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Recommendation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sessionViews.map((session) => (
                <tr key={session.id} className="border-b border-ai-border hover:bg-ai-border/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-ai-text-primary">
                    <div className="font-semibold">{session.problemTitle}</div>
                    <div className="text-xs text-ai-text-muted capitalize">{session.difficulty}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded border text-xs font-medium ${statusStyles[session.status]}`}
                    >
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-ai-text-secondary">
                    {formatDate(session.endedAt || session.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-ai-text-primary">
                    {session.score ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-ai-text-secondary">
                    {session.recommendation ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/candidate/sessions/${session.id}`} className="text-ai-cyan hover:text-ai-violet">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {sessionViews.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-ai-text-muted">
                    No sessions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
