'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language: string;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  files?: Array<{ name: string; active: boolean }>;
}

export function CodeEditor({
  code,
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  files = [],
}: CodeEditorProps) {
  return (
    <div className="flex flex-col h-full border-l border-r border-ai-border">
      <div className="flex items-center justify-between border-b border-ai-border px-4 py-2 bg-ai-card-bg gap-2">
        <div className="flex items-center gap-2 flex-1">
          {files.length > 0 && (
            <div className="flex gap-2">
              {files.map((file) => (
                <button
                  key={file.name}
                  className={`text-xs px-3 py-1 rounded transition-colors ${
                    file.active
                      ? 'bg-ai-violet text-white'
                      : 'text-ai-text-muted hover:text-ai-text-secondary'
                  }`}
                >
                  {file.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 overflow-hidden bg-ai-code-bg">
        <pre className="h-full overflow-auto p-4 text-sm font-mono text-ai-text-primary">
          <code>{code}</code>
        </pre>
      </div>

      <div className="border-t border-ai-border bg-ai-card-bg px-4 py-3 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRun}
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          Run
        </Button>
        <Button
          size="sm"
          onClick={onSubmit}
          className="bg-ai-violet hover:bg-ai-violet/90 text-white"
        >
          Submit Solution
        </Button>
      </div>
    </div>
  );
}
