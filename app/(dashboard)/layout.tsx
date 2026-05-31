import { createSupabaseServerClient } from '@/lib/supabase/server'
import { SideNavBar } from '@/components/navigation/SideNavBar'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import type { Profile, UserRole } from '@/types'

type ProfileSummary = Pick<Profile, 'full_name' | 'avatar_url' | 'role'>

type DashboardLayoutProps = {
  children: React.ReactNode
}

const fallbackAvatar = (name: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = await createSupabaseServerClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()
  const user = userError ? null : userData.user

  let profile: ProfileSummary | null = null

  if (user) {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, avatar_url, role')
      .eq('id', user.id)
      .single()

    if (!profileError && profileData) {
      profile = profileData as ProfileSummary
    }
  }

  const displayName = profile?.full_name ?? user?.email?.split('@')[0] ?? 'User'
  const displayRole: UserRole = profile?.role ?? 'candidate'
  const displayAvatar = profile?.avatar_url ?? fallbackAvatar(displayName)

  return (
    <div className="flex h-screen w-screen bg-ai-dark-bg text-ai-text-primary">
      <SideNavBar role={displayRole} userName={displayName} avatarUrl={displayAvatar} />
      <main className="flex-1 flex flex-col ml-60 pt-14">
        <TopNavBar />
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  )
}
