"use client";

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CodeEditor } from '@/components/interview/CodeEditor';
import { ChatPanel, type ChatPanelMessage } from '@/components/interview/ChatPanel';
import { MetricsTag } from '@/components/interview/MetricsTag';
import { StatusBanner } from '@/components/interview/StatusBanner';
import { TerminalOutput } from '@/components/interview/TerminalOutput';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type SessionWorkspaceProps = {
  sessionId?: string;
  interviewCode?: string | null;
  candidateName?: string;
  interviewType?: string;
  initialCode?: string;
  initialLanguage?: string;
  initialOutput?: string | null;
  initialMessages?: ChatPanelMessage[];
  files?: Array<{ name: string; active: boolean }>;
  mode?: 'candidate' | 'interviewer';
};

type ExecuteResponse = {
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  executionMs?: number;
  error?: string;
};

export function SessionWorkspace({
  sessionId,
  interviewCode,
  candidateName = 'Candidate',
  interviewType = 'Technical',
  initialCode = '',
  initialLanguage = 'typescript',
  initialOutput = '',
  initialMessages = [],
  files = [],
  mode = 'interviewer',
}: SessionWorkspaceProps) {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);
  const [messages, setMessages] = useState<ChatPanelMessage[]>(initialMessages);
  const [output, setOutput] = useState(initialOutput ?? '');
  const [isRunning, setIsRunning] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const roomLabel = useMemo(
    () => [interviewCode, candidateName, interviewType].filter(Boolean).join(' • '),
    [candidateName, interviewCode, interviewType],
  );

  const persistSubmission = async (result: ExecuteResponse) => {
    if (!sessionId) return;

    const supabase = createSupabaseBrowserClient();
    await supabase.from('code_submissions').insert({
      session_id: sessionId,
      language,
      code,
      stdout: result.stdout ?? '',
      stderr: result.stderr ?? '',
      exit_code: result.exitCode ?? 0,
      execution_ms: result.executionMs ?? 0,
    });
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running code...');

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const result = (await response.json()) as ExecuteResponse;
      const nextOutput = formatExecutionResult(result);

      setOutput(nextOutput);
      await persistSubmission(result);

      if (!response.ok || result.exitCode) {
        toast.error('Execution finished with errors.');
      } else {
        toast.success('Execution completed.');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown execution error';
      setOutput(`Execution failed: ${message}`);
      toast.error('Execution request failed.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-3.5rem)] flex-col bg-background text-foreground overflow-hidden">
      <StatusBanner connected latency={roomLabel || 'ready'} />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[28%] min-w-72 flex flex-col border-r border-ai-border bg-background">
              <ChatPanel
            messages={messages}
            setMessages={setMessages}
            sessionId={sessionId}
            code={code}
            language={language}
            candidateName={candidateName}
            interviewType={interviewType}
            isSending={isSending}
          />
        </div>

        <div className="w-[47%] min-w-0">
          <CodeEditor
            code={code}
            language={language}
            onCodeChange={setCode}
            onLanguageChange={setLanguage}
            onRun={handleRun}
            onSubmit={handleRun}
            isRunning={isRunning}
            files={files}
          />
        </div>

        <div className="w-[25%] min-w-64 flex flex-col border-l border-ai-border bg-background">
          <TerminalOutput output={output} isRunning={isRunning} />

          <div className="flex-1 border-t border-ai-border bg-ai-card-bg p-4 overflow-auto">
            <p className="text-xs font-semibold text-ai-text-muted mb-3">Live Feedback</p>
            <div className="rounded-lg border border-dashed border-ai-border p-4 text-sm text-ai-text-muted">
              Live metrics will appear once the session produces scoring data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatExecutionResult(result: ExecuteResponse) {
  const lines = [
    result.stdout?.trim(),
    result.stderr?.trim(),
    typeof result.exitCode === 'number' ? `Exit code: ${result.exitCode}` : null,
    typeof result.executionMs === 'number' ? `Execution time: ${result.executionMs}ms` : null,
    result.error ? `Error: ${result.error}` : null,
  ].filter(Boolean);

  return lines.length > 0 ? lines.join('\n') : 'Execution completed with no output.';
}
