'use client';

import { useState } from 'react';
import { StatusBanner } from '@/components/interview/StatusBanner';
import { ChatHistory } from '@/components/interview/ChatHistory';
import { CodeEditor } from '@/components/interview/CodeEditor';
import { TerminalOutput } from '@/components/interview/TerminalOutput';
import { MetricsTag } from '@/components/interview/MetricsTag';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { interviewData } from '@/lib/mock-data';
import { Send } from 'lucide-react';

export default function InterviewRoom() {
  const [code, setCode] = useState(interviewData.currentCode);
  const [language, setLanguage] = useState(interviewData.language);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <StatusBanner
        connected={interviewData.connectionStatus.connected}
        latency={interviewData.connectionStatus.latency}
      />

      <div className="flex flex-1 overflow-hidden gap-0">
        {/* Left Pane: Chat */}
        <div className="w-1/4 flex flex-col border-r border-ai-border bg-background">
          <ChatHistory messages={interviewData.chatMessages} />
          <div className="border-t border-ai-border bg-ai-card-bg p-3 flex gap-2">
            <Input
              placeholder="Type a message..."
              className="flex-1 bg-ai-border text-ai-text-primary border-ai-border"
            />
            <Button
              size="icon"
              className="bg-ai-violet hover:bg-ai-violet/90 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Center Pane: Code Editor */}
        <div className="w-2/4">
          <CodeEditor
            code={code}
            language={language}
            onLanguageChange={setLanguage}
            onRun={() => console.log('Run code')}
            onSubmit={() => console.log('Submit solution')}
            files={interviewData.codeFiles}
          />
        </div>

        {/* Right Pane: Terminal & Metrics */}
        <div className="w-1/4 flex flex-col border-l border-ai-border bg-background">
          <TerminalOutput output={interviewData.terminalOutput} />

          <div className="flex-1 border-t border-ai-border bg-ai-card-bg p-4 overflow-auto">
            <p className="text-xs font-semibold text-ai-text-muted mb-3">Real-time Feedback</p>
            <div className="space-y-2">
              {interviewData.metrics.map((metric, idx) => (
                <MetricsTag
                  key={idx}
                  label={metric.label}
                  value={metric.value}
                  badge={metric.badge as 'good' | 'excellent'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
