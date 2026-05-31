'use client';

import { useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  type: 'ai' | 'candidate';
  content: string;
  timestamp: Date | string;
  isTyping?: boolean;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col gap-4 overflow-y-auto px-4 py-4"
      style={{ maxHeight: 'calc(100% - 60px)' }}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-xs rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
              message.type === 'ai'
                ? 'bg-ai-card-bg text-ai-text-primary border border-ai-border hover:border-ai-violet/50'
                : 'bg-ai-violet text-white shadow-lg shadow-ai-violet/20'
            }`}
          >
            {message.isTyping ? (
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            ) : (
              message.content
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
