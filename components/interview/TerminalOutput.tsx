'use client';

import { useEffect, useRef } from 'react';

interface TerminalOutputProps {
  output: string;
  title?: string;
  isRunning?: boolean;
}

export function TerminalOutput({ output, title = 'Terminal Output', isRunning = false }: TerminalOutputProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="flex flex-col h-1/2 border-t border-ai-border">
      <div className="border-b border-ai-border px-4 py-2 bg-ai-card-bg">
        <p className="text-xs font-semibold text-ai-text-secondary">
          {title}
          {isRunning ? ' • running' : ''}
        </p>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto bg-ai-code-bg px-4 py-3 font-mono text-xs text-green-400"
      >
        <pre className="whitespace-pre-wrap break-words">{output || 'No output yet. Run the code to see results here.'}</pre>
      </div>
    </div>
  );
}
