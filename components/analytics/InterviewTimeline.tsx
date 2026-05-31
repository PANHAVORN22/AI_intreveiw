import { AlertCircle, CheckCircle, MessageCircle, FileText, Code, LogIn } from 'lucide-react';

interface TimelineEvent {
  time: string;
  event: string;
  type: 'info' | 'success' | 'warning' | 'error';
  icon: string;
}

interface InterviewTimelineProps {
  events: TimelineEvent[];
}

const iconMap: Record<string, React.ReactNode> = {
  'log-in': <LogIn className="h-5 w-5" />,
  'file-text': <FileText className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  'alert-circle': <AlertCircle className="h-5 w-5" />,
  'check-circle': <CheckCircle className="h-5 w-5" />,
  'message-circle': <MessageCircle className="h-5 w-5" />,
};

const typeColors = {
  info: 'bg-blue-500/20 text-blue-400',
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-yellow-500/20 text-yellow-400',
  error: 'bg-red-500/20 text-red-400',
};

export function SessionTimeline({ events }: InterviewTimelineProps) {
  return (
    <div className="rounded-lg border border-ai-border bg-ai-card-bg p-6">
      <h3 className="text-lg font-semibold text-ai-text-primary mb-6">Session Timeline</h3>
      <div className="space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className={`p-2 rounded-lg ${typeColors[event.type]}`}>
                {iconMap[event.icon] || <FileText className="h-5 w-5" />}
              </div>
              {idx < events.length - 1 && (
                <div className="w-0.5 h-8 bg-ai-border" />
              )}
            </div>
            <div className="pt-2">
              <p className="text-xs font-semibold text-ai-text-muted">{event.time}</p>
              <p className="text-sm text-ai-text-primary">{event.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
