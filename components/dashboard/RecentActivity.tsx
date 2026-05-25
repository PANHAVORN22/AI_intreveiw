'use client';

import { activityFeed } from '@/lib/mock-data';
import { Activity } from 'lucide-react';
import {
  CheckCircle,
  UserPlus,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'check-circle': CheckCircle,
  'user-plus': UserPlus,
  'refresh-cw': RefreshCw,
  'message-circle': MessageCircle,
};

export function RecentActivity() {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6 h-80 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-ai-cyan" />
        <h2 className="text-lg font-bold text-ai-text-primary">Recent Activity</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {activityFeed.map((activity) => {
          const IconComponent = iconMap[activity.icon] || Activity;
          return (
            <div key={activity.id} className="flex gap-3 p-3 rounded-lg bg-ai-dark-bg border border-ai-border hover:border-ai-cyan/50 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <IconComponent className="w-5 h-5 text-ai-cyan" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ai-text-primary">{activity.title}</p>
                <p className="text-xs text-ai-text-muted truncate">{activity.description}</p>
                <span className="text-xs text-ai-text-muted mt-1 block">{formatTime(activity.timestamp)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
