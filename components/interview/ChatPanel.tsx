"use client";

import { useMemo, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { ChatHistory } from './ChatHistory';

export type ChatPanelMessage = {
  id: string;
  type: 'ai' | 'candidate';
  content: string;
  timestamp: Date | string;
  isTyping?: boolean;
};

type ChatPanelProps = {
  messages: ChatPanelMessage[];
  setMessages: Dispatch<SetStateAction<ChatPanelMessage[]>>;
  sessionId?: string;
  code: string;
  language: string;
  candidateName?: string;
  interviewType?: string;
  isSending?: boolean;
};

export function ChatPanel({
  messages,
  setMessages,
  sessionId,
  code,
  language,
  candidateName,
  interviewType,
  isSending = false,
}: ChatPanelProps) {
  const [draft, setDraft] = useState('');
  const [streaming, setStreaming] = useState(false);
  const canSend = useMemo(() => draft.trim().length > 0 && !isSending && !streaming, [draft, isSending, streaming]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || isSending || streaming) return;

    setDraft('');
    const userMessage: ChatPanelMessage = {
      id: crypto.randomUUID(),
      type: 'candidate',
      content,
      timestamp: new Date(),
    };
    const typingMessageId = crypto.randomUUID();

    setMessages((current) => [
      ...current,
      userMessage,
      {
        id: typingMessageId,
        type: 'ai',
        content: '',
        timestamp: new Date(),
        isTyping: true,
      },
    ]);

    setStreaming(true);

    try {
      const conversation = [...messages, userMessage];

      if (sessionId) {
        const supabase = createSupabaseBrowserClient();
        await supabase.from('messages').insert({
          session_id: sessionId,
          role: 'user',
          content,
        });
      }

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          currentCode: code,
          language,
          message: content,
          messages: conversation,
          context: {
            candidateName,
            interviewType,
          },
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to start AI stream.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantContent += decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((message) =>
            message.id === typingMessageId
              ? { ...message, content: assistantContent, isTyping: true }
              : message,
          ),
        );
      }

      assistantContent += decoder.decode();

      setMessages((current) =>
        current.map((message) =>
          message.id === typingMessageId
            ? { ...message, content: assistantContent.trim(), isTyping: false, timestamp: new Date() }
            : message,
        ),
      );

      if (sessionId) {
        const supabase = createSupabaseBrowserClient();
        await supabase.from('messages').insert({
          session_id: sessionId,
          role: 'assistant',
          content: assistantContent.trim(),
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'AI chat request failed.';
      setMessages((current) =>
        current.map((message) =>
          message.id === typingMessageId
            ? { ...message, content: errorMessage, isTyping: false, timestamp: new Date() }
            : message,
        ),
      );
      toast.error(errorMessage);
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <ChatHistory messages={messages} />
      <form onSubmit={handleSubmit} className="border-t border-ai-border bg-ai-card-bg p-3 flex gap-2">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask for a hint, edge case, or review..."
          className="flex-1 bg-ai-border text-ai-text-primary border-ai-border"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!canSend}
          className="bg-ai-violet hover:bg-ai-violet/90 text-white"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
