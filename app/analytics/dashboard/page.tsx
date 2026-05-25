'use client';

import { SkillMatrix } from '@/components/analytics/SkillMatrix';
import { InterviewTimeline } from '@/components/analytics/InterviewTimeline';
import { CodeReview } from '@/components/analytics/CodeReview';
import { Button } from '@/components/ui/button';
import { analyticsData } from '@/lib/mock-data';
import { Download, Share2 } from 'lucide-react';
import Image from 'next/image';

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-ai-card-bg border border-ai-border">
              <Image
                src={analyticsData.candidateProfile.avatar}
                alt={analyticsData.candidateProfile.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ai-text-primary">
                {analyticsData.candidateProfile.name}
              </h1>
              <p className="text-sm text-ai-text-muted">
                ID: {analyticsData.candidateProfile.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-ai-text-muted mb-1">Overall Score</p>
              <div
                className="text-4xl font-bold rounded-lg p-4 text-white"
                style={{
                  backgroundColor:
                    analyticsData.candidateProfile.score >= 80
                      ? '#10B981'
                      : analyticsData.candidateProfile.score >= 60
                        ? '#F59E0B'
                        : '#EF4444',
                }}
              >
                {analyticsData.candidateProfile.score}
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
        <SkillMatrix skills={analyticsData.skillMatrix} />
        <InterviewTimeline events={analyticsData.timeline} />
        <div className="col-span-3">
          <CodeReview
            original={analyticsData.codeReview.original}
            optimized={analyticsData.codeReview.optimized}
            insights={analyticsData.codeReview.insights}
            sentiment={analyticsData.codeReview.sentiment}
          />
        </div>
      </div>
    </div>
  );
}
