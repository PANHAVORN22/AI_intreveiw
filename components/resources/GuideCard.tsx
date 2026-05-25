'use client';

import { BookOpen, Eye, Clock, ArrowRight } from 'lucide-react';

interface GuideCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  readTime: number;
  views: number;
}

export function GuideCard({
  id,
  title,
  author,
  description,
  readTime,
  views,
}: GuideCardProps) {
  return (
    <div className="group bg-ai-card-bg border border-ai-border rounded-lg p-6 hover:border-ai-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-ai-cyan/20 flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-ai-cyan/20 text-ai-cyan flex-shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-ai-text-primary mb-1 line-clamp-2">{title}</h3>
          <p className="text-xs text-ai-text-muted">{author}</p>
        </div>
      </div>

      <p className="text-sm text-ai-text-secondary mb-4 line-clamp-2 flex-1">{description}</p>

      <div className="flex items-center justify-between text-xs text-ai-text-muted mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{views.toLocaleString()} views</span>
          </div>
        </div>
      </div>

      <button className="flex items-center gap-2 text-sm font-medium text-ai-cyan hover:text-ai-cyan/80 transition-colors">
        Read Guide
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
