'use client';

interface CodeReviewProps {
  original: string;
  optimized: string;
  insights: Array<{
    severity: 'critical' | 'minor' | 'info';
    line: number;
    message: string;
    suggestion: string;
  }>;
  sentiment: {
    engagement: string;
    clarity: string;
    problemSolving: string;
  };
}

const severityColors = {
  critical: 'bg-red-500/20 border-red-500/30 text-red-300',
  minor: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
  info: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
};

export function CodeReview({ original, optimized, insights, sentiment }: CodeReviewProps) {
  return (
    <div className="rounded-lg border border-ai-border bg-ai-card-bg p-6">
      <h3 className="text-lg font-semibold text-ai-text-primary mb-4">AI Code Review</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold text-ai-text-muted mb-2">Original Approach</p>
          <div className="bg-ai-code-bg p-3 rounded-lg border border-ai-border h-32 overflow-auto">
            <pre className="text-xs font-mono text-ai-text-primary whitespace-pre-wrap break-words">
              {original}
            </pre>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-ai-text-muted mb-2">Optimized Solution</p>
          <div className="bg-ai-code-bg p-3 rounded-lg border border-ai-border h-32 overflow-auto">
            <pre className="text-xs font-mono text-ai-text-primary whitespace-pre-wrap break-words">
              {optimized}
            </pre>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold text-ai-text-muted mb-3">Insights</p>
        <div className="space-y-2">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`rounded-md border p-3 text-sm ${severityColors[insight.severity]}`}
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="font-semibold mb-1">{insight.message}</p>
                  <p className="text-xs opacity-90">{insight.suggestion}</p>
                </div>
                <span className="text-xs font-semibold flex-shrink-0">Line {insight.line}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {Object.entries(sentiment).map(([key, value]) => (
          <div key={key} className="bg-ai-border rounded-lg p-3">
            <p className="text-xs text-ai-text-muted font-semibold capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className="text-sm font-semibold text-ai-text-primary">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
