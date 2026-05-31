import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewSessionForm } from '@/components/interview/NewInterviewSessionForm';

type CandidateRow = {
  id: string;
  full_name: string;
  // email removed: profiles table does not store email
};

export default async function NewInterviewerSessionPage() {
  const supabase = await createSupabaseServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    redirect('/login');
  }

  const { data: candidatesData } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('role', 'candidate')
    .order('created_at', { ascending: false })
    .limit(25);

  const candidates = (candidatesData ?? []) as CandidateRow[];

  return (
    <div className="p-8 space-y-8">
      <div>
        <Link href="/interviewer" className="text-sm text-ai-cyan hover:text-ai-violet">
          Back to dashboard
        </Link>
        <h1 className="text-3xl font-bold text-ai-text-primary mt-3">New Interview Session</h1>
        <p className="text-ai-text-muted">Create a live coding session for an existing or new candidate.</p>
      </div>

      <NewSessionForm candidates={candidates} interviewerId={userData.user.id} />
    </div>
  );
}
