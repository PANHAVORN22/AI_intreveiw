'use client';

import { usePathname } from 'next/navigation';
import { SideNavBar } from '@/components/navigation/SideNavBar';
import { TopNavBar } from '@/components/navigation/TopNavBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  // Don't show navigation on auth pages
  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex h-screen w-screen bg-ai-dark-bg text-ai-text-primary">
      {/* SideNavBar */}
      <SideNavBar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col ml-60 pt-14">
        {/* TopNavBar */}
        <TopNavBar />

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
