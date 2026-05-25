'use client';

import { Copy, Eye } from 'lucide-react';

interface SnippetCardProps {
  id: string;
  language: string;
  title: string;
  views: number;
}

const languageColors: Record<string, { bg: string; text: string }> = {
  TypeScript: { bg: 'bg-blue-500/20', text: 'text-blue-300' },
  Python: { bg: 'bg-yellow-500/20', text: 'text-yellow-300' },
  JavaScript: { bg: 'bg-yellow-400/20', text: 'text-yellow-400' },
  Go: { bg: 'bg-cyan-500/20', text: 'text-cyan-300' },
  Java: { bg: 'bg-red-500/20', text: 'text-red-300' },
  Rust: { bg: 'bg-orange-500/20', text: 'text-orange-300' },
};

export function SnippetCard({
  id,
  language,
  title,
  views,
}: SnippetCardProps) {
  const colors = languageColors[language] || { bg: 'bg-gray-500/20', text: 'text-gray-300' };

  return (
    <div className="group bg-ai-card-bg border border-ai-border rounded-lg p-4 hover:border-ai-violet/50 transition-all duration-300 hover:shadow-lg hover:shadow-ai-violet/20 flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
          {language}
        </span>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Copy className="w-4 h-4 text-ai-text-muted hover:text-ai-violet" />
        </button>
      </div>

      <h3 className="font-medium text-ai-text-primary mb-3 line-clamp-2 flex-1 text-sm">
        {title}
      </h3>

      <div className="flex items-center gap-1 text-xs text-ai-text-muted">
        <Eye className="w-3 h-3" />
        <span>{views.toLocaleString()}</span>
      </div>
    </div>
  );
}
