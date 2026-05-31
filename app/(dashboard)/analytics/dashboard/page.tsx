'use client';

import { SkillMatrix } from '@/components/analytics/SkillMatrix';
import { SessionTimeline } from '@/components/analytics/InterviewTimeline';
import { CodeReview } from '@/components/analytics/CodeReview';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import Image from 'next/image';

type TimelineEvent = {
  time: string;
  event: string;
  type: 'info' | 'success' | 'warning' | 'error';
  icon: string;
};

type CodeReviewInsight = {
  severity: 'critical' | 'minor' | 'info';
  line: number;
  message: string;
  suggestion: string;
};

type CodeReviewSentiment = {
  engagement: string;
  clarity: string;
  problemSolving: string;
};

export default function AnalyticsDashboard() {
  const timeline: TimelineEvent[] = [];
  const insights: CodeReviewInsight[] = [];
  const sentiment: CodeReviewSentiment = {
    engagement: 'No data yet',
    clarity: 'No data yet',
    problemSolving: 'No data yet',
  };

  const candidateProfile = {
    name: 'Candidate analytics unavailable',
    id: 'N/A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ai-interview',
    score: 0,
  };

  const skillMatrix = {
    dataStructures: 0,
    systemDesign: 0,
    codeQuality: 0,
    communication: 0,
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-ai-card-bg border border-ai-border">
              <Image
                src={candidateProfile.avatar}
                alt={candidateProfile.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ai-text-primary">
                {candidateProfile.name}
              </h1>
              <p className="text-sm text-ai-text-muted">
                ID: {candidateProfile.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-ai-text-muted mb-1">Overall Score</p>
              <div
                className="text-4xl font-bold rounded-lg p-4 text-white"
                style={{
                  backgroundColor: '#475569',
                }}
              >
                {candidateProfile.score}
              </div>
              <p className="text-xs text-ai-text-muted mt-2">/100</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-ai-violet hover:bg-ai-violet/90 text-white"
              >
                <Share2 className="h-4 w-4" />
                Share Report
              </Button>
            </div>
          </div>
        </div>

        <div className="h-px bg-ai-border" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        <SkillMatrix skills={skillMatrix} />
        <SessionTimeline events={timeline} />
        <div className="col-span-3">
          <CodeReview
            original={'No code review data yet.'}
            optimized={'No optimized solution available yet.'}
            insights={insights}
            sentiment={sentiment}
          />
        </div>
      </div>
    </div>
  );
}
