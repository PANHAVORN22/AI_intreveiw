'use client';

import { Copy, Star } from 'lucide-react';
import { useState } from 'react';

interface CodePreviewProps {
  id: string;
  language: string;
  title: string;
  code: string;
  views: number;
}

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500/20 text-blue-300',
  Python: 'bg-yellow-500/20 text-yellow-300',
  JavaScript: 'bg-yellow-400/20 text-yellow-400',
  Go: 'bg-cyan-500/20 text-cyan-300',
  Java: 'bg-red-500/20 text-red-300',
  Rust: 'bg-orange-500/20 text-orange-300',
};

export function CodePreview({
  id,
  language,
  title,
  code,
  views,
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-ai-card-bg border border-ai-border rounded-lg overflow-hidden hover:border-ai-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-ai-cyan/20 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-ai-border bg-ai-dark-bg">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded ${languageColors[language] || 'bg-gray-500/20 text-gray-300'}`}>
            {language}
          </span>
          <span className="text-sm text-ai-text-primary font-medium truncate">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-ai-border transition-colors opacity-0 group-hover:opacity-100"
          title="Copy code"
        >
          <Copy className="w-4 h-4 text-ai-text-muted hover:text-ai-violet" />
        </button>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto bg-ai-code-bg p-4 font-mono text-sm text-ai-text-primary whitespace-pre-wrap break-words">
        {code}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-ai-border bg-ai-dark-bg flex items-center justify-between text-xs">
        <div className="text-ai-text-muted">{views.toLocaleString()} views</div>
        <button className="text-ai-text-muted hover:text-yellow-400 transition-colors">
          <Star className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
