'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { SearchCommand } from './SearchCommand';

export function TopNavBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-ai-dark-bg border-b border-ai-border flex items-center justify-between px-6 z-50">
        {/* Left: Page Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold text-ai-text-primary">Dashboard</h1>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md mx-auto">
          <button
            onClick={() => setShowSearch(true)}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-ai-card-bg border border-ai-border text-ai-text-muted hover:border-ai-violet/50 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Search interviews, candidates...</span>
            <span className="ml-auto text-xs text-ai-text-muted">⌘K</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 ml-6">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-ai-card-bg transition-colors"
            >
              <Bell className="w-5 h-5 text-ai-text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {showNotifications && (
              <div className="absolute top-12 right-0 w-64 bg-ai-card-bg border border-ai-border rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-ai-text-primary mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="text-xs">
                      <p className="text-ai-text-primary font-medium">Interview in 2 hours</p>
                      <p className="text-ai-text-muted">Sarah Chen - Frontend</p>
                    </div>
                    <div className="text-xs">
                      <p className="text-ai-text-primary font-medium">New application received</p>
                      <p className="text-ai-text-muted">Jessica Martinez - Senior Engineer</p>
                    </div>
                    <div className="text-xs">
                      <p className="text-ai-text-primary font-medium">Resource updated</p>
                      <p className="text-ai-text-muted">Full-Stack Template v2.1</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-ai-card-bg transition-colors text-ai-text-secondary"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=interviewer"
                alt="User"
                className="w-6 h-6 rounded-full"
              />
              <ChevronDown className="w-4 h-4" />
            </button>

            {showUserMenu && (
              <div className="absolute top-12 right-0 w-56 bg-ai-card-bg border border-ai-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-ai-border">
                  <p className="text-sm font-semibold text-ai-text-primary">Alex Johnson</p>
                  <p className="text-xs text-ai-text-muted">alex.johnson@company.com</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-ai-text-secondary hover:bg-ai-border/50 rounded-lg transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-ai-text-secondary hover:bg-ai-border/50 rounded-lg transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {showSearch && <SearchCommand onClose={() => setShowSearch(false)} />}
    </>
  );
}
