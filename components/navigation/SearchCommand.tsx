'use client';

import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchCommandProps {
  onClose: () => void;
}

export function SearchCommand({ onClose }: SearchCommandProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([
        {
          type: 'recent',
          label: 'Recent Sessions',
          items: [
            { id: 1, title: 'Alex Johnson - Frontend', href: '/analytics/dashboard' },
            { id: 2, title: 'Emma Rodriguez - Backend', href: '/analytics/dashboard' },
          ],
        },
      ]);
      return;
    }

    // Mock search results
    const searchResults = [
      {
        type: 'sessions',
        label: 'Sessions',
        items: [
          { id: 1, title: 'Sarah Chen - Frontend Session', href: '/interview/room' },
          { id: 2, title: 'Marcus Williams - Backend Session', href: '/interview/room' },
        ],
      },
      {
        type: 'candidates',
        label: 'Candidates',
        items: [
          { id: 3, title: 'Alex Johnson', href: '/candidates' },
          { id: 4, title: 'Emma Rodriguez', href: '/candidates' },
        ],
      },
      {
        type: 'resources',
        label: 'Resources',
        items: [
          { id: 5, title: 'Full-Stack Mastery Template', href: '/resources/library' },
          { id: 6, title: 'System Design Guide', href: '/resources/library' },
        ],
      },
    ];

    setResults(searchResults);
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl bg-ai-card-bg border border-ai-border rounded-lg shadow-xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-ai-border">
          <Search className="w-5 h-5 text-ai-text-muted" />
            <input
            autoFocus
            type="text"
            placeholder="Search sessions, candidates, resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-ai-text-primary placeholder-ai-text-muted outline-none text-sm"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-ai-border rounded transition-colors"
          >
            <X className="w-5 h-5 text-ai-text-muted" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-ai-text-muted text-sm">
              No results found
            </div>
          ) : (
            results.map((group) => (
              <div key={group.type} className="border-b border-ai-border last:border-b-0">
                <div className="px-4 py-3 text-xs font-semibold text-ai-text-muted uppercase tracking-wider">
                  {group.label}
                </div>
                {group.items.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      window.location.href = item.href;
                      onClose();
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-ai-text-primary hover:bg-ai-border/30 transition-colors"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-ai-border flex items-center justify-between text-xs text-ai-text-muted">
          <span>Press ESC to close</span>
          <span>Enter to select</span>
        </div>
      </div>
    </div>
  );
}
