'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

type UpcomingInterview = {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  interviewType: string;
  scheduledTime: string | Date;
  difficulty: number;
  estimatedDuration: number;
};

interface UpcomingInterviewsProps {
  interviews?: UpcomingInterview[];
  initialNow?: number;
}

// Backwards-compatible: export new name `UpcomingSessions`.
export function UpcomingSessions({ interviews = [], initialNow }: UpcomingInterviewsProps) {
  const [nowMs, setNowMs] = useState<number | null>(
    typeof initialNow === 'number' ? initialNow : null,
  );

  useEffect(() => {
    setNowMs(Date.now());
    const id = window.setInterval(() => setNowMs(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const getTimeRemaining = (scheduledTime: string | Date) => {
    if (nowMs === null) return '...';

    const scheduledMs =
      typeof scheduledTime === 'string'
        ? new Date(scheduledTime).getTime()
        : scheduledTime.getTime();

    if (!Number.isFinite(scheduledMs)) return 'Starting soon';

    const diff = scheduledMs - nowMs;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `in ${hours}h ${minutes}m`;
    if (minutes > 0) return `in ${minutes}m`;
    return 'Starting soon';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Frontend':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Backend':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Full-Stack':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6 h-80 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-ai-violet" />
        <h2 className="text-lg font-bold text-ai-text-primary">Upcoming Sessions</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {interviews.map((interview) => (
          <div key={interview.id} className="p-3 rounded-lg bg-ai-dark-bg border border-ai-border hover:border-ai-violet/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={interview.candidateAvatar}
                  alt={interview.candidateName}
                  className="w-7 h-7 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-ai-text-primary">{interview.candidateName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-1 rounded border ${getTypeColor(
                        interview.interviewType
                      )}`}
                    >
                      {interview.interviewType}
                    </span>
                    <span className="text-xs text-ai-text-muted">
                      {'⭐'.repeat(interview.difficulty)}
                    </span>
                  </div>
                </div>
              </div>
              <Button asChild size="sm" className="bg-ai-violet hover:bg-ai-violet/90">
                <Link href={`/interviewer/sessions/${interview.id}`} aria-label={`Open ${interview.candidateName} session`}>
                  <Play className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-ai-text-muted">
              <Clock className="w-3 h-3" />
              <span>{getTimeRemaining(interview.scheduledTime)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
