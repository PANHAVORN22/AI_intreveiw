'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Calendar,
  Users,
  BookOpen,
  Code2,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Interviews', href: '/interview/room', icon: Calendar },
  { label: 'Candidates', href: '/candidates', icon: Users },
  { label: 'Resources', href: '/resources/library', icon: BookOpen },
  { label: 'Code Library', href: '/resources/code-library', icon: Code2 },
  { label: 'History', href: '/history/evaluations', icon: Clock },
];

const secondaryItems = [
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Documentation', href: '/docs', icon: HelpCircle },
];

export function SideNavBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard' && pathname === '/') return true;
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-ai-card-bg border-r border-ai-border flex flex-col pt-20 z-40">
      {/* Logo/Branding */}
      <div className="px-6 py-4 border-b border-ai-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-ai-violet flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-ai-text-primary">InterviewAI</span>
        </Link>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-2 ${
                active
                  ? 'bg-ai-violet/10 text-ai-violet border-l-ai-violet'
                  : 'text-ai-text-secondary border-l-transparent hover:bg-ai-border/30'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Secondary Navigation */}
      <div className="px-4 py-4 border-t border-ai-border space-y-1">
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-2 ${
                active
                  ? 'bg-ai-violet/10 text-ai-violet border-l-ai-violet'
                  : 'text-ai-text-secondary border-l-transparent hover:bg-ai-border/30'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* User Section */}
      <div className="px-4 py-4 border-t border-ai-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-ai-border/30 transition-colors cursor-pointer">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=interviewer"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ai-text-primary truncate">You</p>
            <p className="text-xs text-ai-text-muted">Interviewer</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-ai-text-secondary hover:bg-ai-border/30 transition-colors mt-2">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
