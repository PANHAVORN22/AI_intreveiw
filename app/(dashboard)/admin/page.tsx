import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type CountResult = {
  count: number | null;
  error: string | null;
};

const readCount = async (query: Promise<{ count: number | null; error: { message: string } | null }>): Promise<CountResult> => {
  const { count, error } = await query;
  return { count, error: error ? error.message : null };
};

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    redirect('/login');
  }

  const [users, sessions, evaluations, problems] = await Promise.all([
    readCount(supabase.from('profiles').select('id', { count: 'exact', head: true })),
    readCount(supabase.from('interview_sessions').select('id', { count: 'exact', head: true })),
    readCount(supabase.from('evaluations').select('id', { count: 'exact', head: true })),
    readCount(supabase.from('problems').select('id', { count: 'exact', head: true })),
  ]);

  const errors = [users.error, sessions.error, evaluations.error, problems.error].filter(
    (value): value is string => Boolean(value),
  );

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ai-text-primary mb-2">Admin Overview</h1>
        <p className="text-ai-text-muted">System-wide metrics and health signals.</p>
      </div>

      {errors.length > 0 && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          Unable to load some metrics. {errors[0]}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Users</p>
          <p className="text-3xl font-bold text-ai-text-primary">{users.count ?? 0}</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Interview Sessions</p>
          <p className="text-3xl font-bold text-ai-text-primary">{sessions.count ?? 0}</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Evaluations</p>
          <p className="text-3xl font-bold text-ai-text-primary">{evaluations.count ?? 0}</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Problems</p>
          <p className="text-3xl font-bold text-ai-text-primary">{problems.count ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
