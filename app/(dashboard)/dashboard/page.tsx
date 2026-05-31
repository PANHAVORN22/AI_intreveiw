import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function DashboardRedirectPage() {
  const supabase = await createSupabaseServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    redirect('/login');
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single();

  const role = profileError ? 'candidate' : profileData?.role ?? 'candidate';

  if (role === 'admin') {
    redirect('/dashboard/admin');
  }

  if (role === 'interviewer') {
    redirect('/dashboard/interviewer');
  }

  redirect('/candidate');
}
