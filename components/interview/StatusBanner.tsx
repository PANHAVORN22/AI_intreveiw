import { CheckCircle } from 'lucide-react';

interface StatusBannerProps {
  connected: boolean;
  latency?: string;
}

export function StatusBanner({ connected, latency = '0ms' }: StatusBannerProps) {
  return (
    <div className="border-b border-ai-border bg-ai-card-bg px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-sm font-medium text-ai-text-secondary">
            {connected ? 'WebSocket Connected' : 'Disconnected'}
          </span>
        </div>
        {connected && latency && (
          <span className="text-xs text-ai-text-muted">Low latency • {latency}</span>
        )}
      </div>
    </div>
  );
}
