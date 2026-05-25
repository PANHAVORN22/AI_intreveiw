'use client';

import { useState } from 'react';
import { codeSnippets } from '@/lib/mock-data';
import { CodePreview } from '@/components/code-library/CodePreview';
import { LanguageAnalytics } from '@/components/code-library/LanguageAnalytics';
import { Code2 } from 'lucide-react';

export default function CodeLibraryPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const languages = ['All', ...new Set(codeSnippets.map((s) => s.language))];

  const filteredSnippets =
    selectedLanguage === 'All'
      ? codeSnippets
      : codeSnippets.filter((s) => s.language === selectedLanguage);

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-ai-violet/20 text-ai-violet">
                <Code2 className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold text-ai-text-primary">Code Library</h1>
            </div>
            <p className="text-ai-text-muted">
              Browse solution implementations across multiple programming languages.
            </p>
          </div>

          {/* Language Filter Tabs */}
          <div className="border-b border-ai-border">
            <div className="flex gap-4 overflow-x-auto">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    selectedLanguage === lang
                      ? 'border-ai-violet text-ai-violet'
                      : 'border-transparent text-ai-text-muted hover:text-ai-text-secondary'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Code Previews Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSnippets.map((snippet) => (
              <CodePreview key={snippet.id} {...snippet} />
            ))}
          </div>

          {filteredSnippets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-ai-text-muted">No code snippets found for the selected language.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Analytics */}
      <LanguageAnalytics />
    </div>
  );
}
