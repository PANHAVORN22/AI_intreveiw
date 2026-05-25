'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface ResourceFilterProps {
  onTabChange: (tab: string) => void;
  currentTab: string;
}

export function ResourceFilter({ onTabChange, currentTab }: ResourceFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['All', 'Templates', 'Guides', 'Code Snippets'];
  const difficulties = ['All Levels', 'Easy', 'Medium', 'Hard'];
  const languages = ['All', 'TypeScript', 'Python', 'JavaScript', 'Go', 'Java'];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3 w-4 h-4 text-ai-text-muted" />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-ai-card-bg border border-ai-border rounded-lg text-ai-text-primary placeholder-ai-text-muted focus:border-ai-violet outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-ai-text-muted hover:text-ai-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-ai-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              currentTab === tab
                ? 'border-ai-violet text-ai-violet'
                : 'border-transparent text-ai-text-muted hover:text-ai-text-secondary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Groups */}
      <div className="space-y-4">
        {/* Difficulty */}
        <div>
          <h4 className="text-xs font-semibold text-ai-text-secondary mb-3 uppercase tracking-wider">
            Difficulty
          </h4>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <label
                key={difficulty}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  defaultChecked={difficulty === 'All Levels'}
                  className="w-4 h-4 rounded border border-ai-border bg-ai-card-bg checked:bg-ai-violet cursor-pointer"
                />
                <span className="text-sm text-ai-text-secondary group-hover:text-ai-text-primary transition-colors">
                  {difficulty}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h4 className="text-xs font-semibold text-ai-text-secondary mb-3 uppercase tracking-wider">
            Language
          </h4>
          <div className="space-y-2">
            {languages.map((language) => (
              <label
                key={language}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  defaultChecked={language === 'All'}
                  className="w-4 h-4 rounded border border-ai-border bg-ai-card-bg checked:bg-ai-violet cursor-pointer"
                />
                <span className="text-sm text-ai-text-secondary group-hover:text-ai-text-primary transition-colors">
                  {language}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
