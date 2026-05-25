'use client';

import { Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  languages: string[];
  rating: number;
  difficulty: string;
  thumbnail: string;
}

export function TemplateCard({
  id,
  title,
  description,
  languages,
  rating,
  difficulty,
  thumbnail,
}: TemplateCardProps) {
  const difficultyColor = {
    Easy: 'text-green-400',
    Medium: 'text-yellow-400',
    Hard: 'text-red-400',
  }[difficulty] || 'text-gray-400';

  return (
    <div className="group relative bg-ai-card-bg border border-ai-border rounded-lg overflow-hidden hover:border-ai-violet/50 transition-all duration-300 hover:shadow-lg hover:shadow-ai-violet/20 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="h-40 bg-gradient-to-br from-ai-violet/20 to-ai-cyan/20 relative overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button size="sm" className="bg-ai-violet hover:bg-ai-violet/90">
            <Play className="w-4 h-4 mr-1" />
            Start
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-ai-text-primary mb-2 line-clamp-2">{title}</h3>
        <p className="text-xs text-ai-text-muted mb-4 line-clamp-2">{description}</p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs mb-3">
          <span className={`font-semibold ${difficultyColor}`}>{difficulty}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-ai-text-secondary">{rating}</span>
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-2">
          {languages.slice(0, 2).map((lang) => (
            <span
              key={lang}
              className="text-xs px-2 py-1 rounded bg-ai-violet/20 text-ai-violet"
            >
              {lang}
            </span>
          ))}
          {languages.length > 2 && (
            <span className="text-xs px-2 py-1 text-ai-text-muted">+{languages.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
}
