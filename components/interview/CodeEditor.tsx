"use client";

import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, Play } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language: string;
  onCodeChange: (code: string) => void;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning?: boolean;
  files?: Array<{ name: string; active: boolean }>;
}

export function CodeEditor({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onRun,
  onSubmit,
  isRunning = false,
  files = [],
}: CodeEditorProps) {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const monacoLanguage =
    language === 'ts' ? 'typescript' : language === 'js' ? 'javascript' : language;

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

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
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 overflow-hidden bg-ai-code-bg">
        <Editor
          value={code}
          language={monacoLanguage}
          theme="vs-dark"
          onChange={(value) => {
            if (debounceTimer.current) {
              clearTimeout(debounceTimer.current);
            }

            debounceTimer.current = setTimeout(() => {
              onCodeChange(value ?? '');
            }, 400);
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Geist Mono, monospace',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            tabSize: 2,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      <div className="border-t border-ai-border bg-ai-card-bg px-4 py-3 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRun}
          disabled={isRunning}
          className="gap-2"
        >
          {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {isRunning ? 'Running' : 'Run'}
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
