'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
        <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-ai-text-muted" />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-9 py-2 bg-ai-dark-bg/40 border border-ai-border rounded-lg text-ai-text-primary placeholder-ai-text-muted focus:border-ai-violet outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-ai-text-muted hover:text-ai-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`rounded-md px-3 py-2 text-xs font-medium transition-colors border ${
              currentTab === tab
                ? 'border-ai-violet/50 bg-ai-violet/15 text-ai-text-primary'
                : 'border-ai-border bg-ai-dark-bg/20 text-ai-text-muted hover:text-ai-text-secondary'
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
              <div key={difficulty} className="flex items-center gap-3 group">
                <Checkbox
                  id={`difficulty-${difficulty.replace(/\s+/g, '-').toLowerCase()}`}
                  defaultChecked={difficulty === 'All Levels'}
                  className="shadow-none"
                />
                <Label
                  htmlFor={`difficulty-${difficulty.replace(/\s+/g, '-').toLowerCase()}`}
                  className="cursor-pointer font-normal text-ai-text-secondary group-hover:text-ai-text-primary transition-colors"
                >
                  {difficulty}
                </Label>
              </div>
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
              <div key={language} className="flex items-center gap-3 group">
                <Checkbox
                  id={`language-${language.replace(/\s+/g, '-').toLowerCase()}`}
                  defaultChecked={language === 'All'}
                  className="shadow-none"
                />
                <Label
                  htmlFor={`language-${language.replace(/\s+/g, '-').toLowerCase()}`}
                  className="cursor-pointer font-normal text-ai-text-secondary group-hover:text-ai-text-primary transition-colors"
                >
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
