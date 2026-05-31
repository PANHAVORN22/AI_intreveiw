import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { UpcomingSessions } from '@/components/dashboard/UpcomingInterviews';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { PerformanceTrends } from '@/components/dashboard/PerformanceTrends';
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';

type CandidateInfo = {
  full_name: string;
  avatar_url: string | null;
};

type InterviewRow = {
  id: string;
  room_code?: string | null;
  started_at?: string | null;
  status?: string | null;
  problem?: { id?: string | null; title?: string | null; difficulty?: number | null } | null;
  candidate: CandidateInfo | CandidateInfo[] | null;
};

type InterviewTrendRow = {
  created_at: string;
  status: string;
};

type ActivityRow = {
  id: string;
  activity_type: string;
  title: string;
  description: string;
  created_at: string;
  icon: string | null;
};

type EvaluationRow = {
  created_at: string;
  score: number;
  interview: {
    status: string;
    scheduled_at: string | null;
  } | null;
};

function fallbackAvatar(name: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
}

export default async function InterviewerDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const initialNow = Date.now();

  const [
    interviewsResult,
    activitiesResult,
    evaluationsResult,
    interviewTrendResult,
    candidatesResult,
    completedInterviewsResult,
  ] =
    await Promise.all([
      supabase
        .from('interview_sessions')
        .select('id, room_code, started_at, status, problem:problems(id, title, difficulty), candidate:profiles(full_name, avatar_url)', {
          count: 'exact',
        })
        .order('created_at', { ascending: true })
        .limit(5),
      supabase
        .from('activity_feed')
        .select('id, activity_type, title, description, created_at, icon')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('evaluations')
        .select('created_at, score, session:interview_sessions(status, started_at)')
        .order('created_at', { ascending: false })
        .limit(90),
      supabase
        .from('interview_sessions')
        .select('created_at, status')
        .order('created_at', { ascending: false })
        .limit(90),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'candidate'),
      supabase.from('interview_sessions').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
    ]);

  const interviewsData = (interviewsResult.data ?? []) as InterviewRow[];
  const activitiesData = (activitiesResult.data ?? []) as ActivityRow[];
  const evaluationsData = (evaluationsResult.data ?? []) as EvaluationRow[];
  const interviewTrendData = (interviewTrendResult.data ?? []) as InterviewTrendRow[];

  const interviews = interviewsData.map((interview) => {
    const candidateObj = Array.isArray(interview.candidate) ? interview.candidate[0] : interview.candidate;
    return {
      id: interview.id,
      candidateName: candidateObj?.full_name ?? 'Unknown Candidate',
      candidateAvatar: candidateObj?.avatar_url ?? fallbackAvatar(candidateObj?.full_name ?? 'Candidate'),
      interviewType: interview.problem?.title ?? 'Live Interview',
      scheduledTime: interview.started_at ?? new Date().toISOString(),
      difficulty: interview.problem?.difficulty ?? 1,
      estimatedDuration: 60,
    };
  });

  const activities = activitiesData.map((activity) => ({
    id: activity.id,
    type: activity.activity_type,
    title: activity.title,
    description: activity.description,
    timestamp: activity.created_at,
    icon: activity.icon ?? 'activity',
  }));

  const avgScore =
    evaluationsData.length > 0
      ? Math.round(
          evaluationsData.reduce((total, evaluation) => total + evaluation.score, 0) /
            evaluationsData.length,
        )
      : 0;

  const completionRate =
    (completedInterviewsResult.count ?? 0) && (interviewsResult.count ?? 0)
      ? Math.round(((completedInterviewsResult.count ?? 0) / (interviewsResult.count ?? 0)) * 100)
      : 0;

  const trendBuckets = new Map<string, { scoreTotal: number; evaluationCount: number; interviewCount: number }>();
  const trendDates = Array.from({ length: 10 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (9 - index));
    return date.toISOString().slice(0, 10);
  });

  trendDates.forEach((date) => {
    trendBuckets.set(date, { scoreTotal: 0, evaluationCount: 0, interviewCount: 0 });
  });

  evaluationsData.forEach((evaluation) => {
    const dateKey = new Date(evaluation.created_at).toISOString().slice(0, 10);
    const bucket = trendBuckets.get(dateKey);

    if (bucket) {
      bucket.scoreTotal += evaluation.score;
      bucket.evaluationCount += 1;
    }
  });

  interviewTrendData.forEach((interview) => {
    const dateKey = new Date(interview.created_at).toISOString().slice(0, 10);
    const bucket = trendBuckets.get(dateKey);

    if (bucket) {
      bucket.interviewCount += 1;
    }
  });

  const maxInterviewCount = Math.max(...Array.from(trendBuckets.values()).map((bucket) => bucket.interviewCount), 1);

  const performanceTrends = trendDates.map((date) => {
    const bucket = trendBuckets.get(date)!;

    return {
      date: date.slice(5),
      avgScore: bucket.evaluationCount > 0 ? Math.round(bucket.scoreTotal / bucket.evaluationCount) : avgScore,
      completionRate,
      adoptionRate: Math.round((bucket.interviewCount / maxInterviewCount) * 100),
    };
  });

  const totalInterviews = interviewsResult.count ?? 0;
  const activeCandidates = candidatesResult.count ?? 0;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ai-text-primary mb-2">Dashboard</h1>
          <p className="text-ai-text-muted">Welcome back! Here&apos;s your interview activity overview.</p>
        </div>
        <Button asChild className="bg-ai-violet hover:bg-ai-violet/90 gap-2">
          <Link href="/interviewer/sessions/new">
            <CalendarPlus className="w-4 h-4" />
            New session
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Total Interviews</p>
          <p className="text-3xl font-bold text-ai-text-primary">{totalInterviews}</p>
          <p className="text-xs text-green-400 mt-2">Live from Supabase</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Average Score</p>
          <p className="text-3xl font-bold text-ai-text-primary">{avgScore}</p>
          <p className="text-xs text-green-400 mt-2">From recent evaluations</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Completion Rate</p>
          <p className="text-3xl font-bold text-ai-text-primary">{completionRate}%</p>
          <p className="text-xs text-green-400 mt-2">Completed interviews / total interviews</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Active Candidates</p>
          <p className="text-3xl font-bold text-ai-text-primary">{activeCandidates}</p>
          <p className="text-xs text-green-400 mt-2">Live from Supabase</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UpcomingSessions interviews={interviews} initialNow={initialNow} />
        <RecentActivity activities={activities} initialNow={initialNow} />
      </div>

      <PerformanceTrends data={performanceTrends} />
    </div>
  );
}
