'use client';

import { Eye, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const languageDistribution = [
  { name: 'TypeScript', value: 28, color: '#3B82F6' },
  { name: 'Python', value: 22, color: '#FBBF24' },
  { name: 'JavaScript', value: 18, color: '#FCD34D' },
  { name: 'Go', value: 15, color: '#06B6D4' },
  { name: 'Java', value: 12, color: '#EF4444' },
  { name: 'Rust', value: 5, color: '#F97316' },
];

const mostPopular = [
  { rank: 1, language: 'TypeScript', submissions: 342, percentage: 28 },
  { rank: 2, language: 'Python', submissions: 267, percentage: 22 },
  { rank: 3, language: 'JavaScript', submissions: 218, percentage: 18 },
  { rank: 4, language: 'Go', submissions: 182, percentage: 15 },
  { rank: 5, language: 'Java', submissions: 146, percentage: 12 },
];

const recentSubmissions = [
  { id: 1, name: 'Alex Johnson', language: 'TypeScript', time: '2h ago', status: 'passed' },
  { id: 2, name: 'Emma Rodriguez', language: 'Python', time: '4h ago', status: 'passed' },
  { id: 3, name: 'James Williams', language: 'Go', time: '6h ago', status: 'failed' },
  { id: 4, name: 'Jessica Martinez', language: 'JavaScript', time: '8h ago', status: 'passed' },
  { id: 5, name: 'David Kim', language: 'Java', time: '10h ago', status: 'passed' },
];

export function LanguageAnalytics() {
  return (
    <div className="w-80 bg-ai-card-bg border-l border-ai-border p-6 overflow-y-auto space-y-8">
      {/* Language Distribution Chart */}
      <div>
        <h3 className="text-lg font-bold text-ai-text-primary mb-4">Language Distribution</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={languageDistribution}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {languageDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Most Popular */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-ai-cyan" />
          <h3 className="text-lg font-bold text-ai-text-primary">Most Popular</h3>
        </div>
        <div className="space-y-3">
          {mostPopular.map((item) => (
            <div key={item.language} className="space-y-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-ai-text-primary">
                  #{item.rank} {item.language}
                </span>
                <span className="text-xs text-ai-text-muted">{item.submissions}</span>
              </div>
              <div className="w-full h-2 bg-ai-dark-bg rounded-full overflow-hidden">
                <div
                  className="h-full bg-ai-violet rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Submissions */}
      <div>
        <h3 className="text-lg font-bold text-ai-text-primary mb-4">Recent Submissions</h3>
        <div className="space-y-3">
          {recentSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="p-3 rounded-lg bg-ai-dark-bg border border-ai-border hover:border-ai-cyan/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-ai-text-primary">{submission.name}</p>
                  <p className="text-xs text-ai-text-muted mt-1">{submission.language}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    submission.status === 'passed'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {submission.status === 'passed' ? '✓' : '✗'}
                </span>
              </div>
              <p className="text-xs text-ai-text-muted">{submission.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Summary */}
      <div className="p-4 rounded-lg bg-ai-dark-bg border border-ai-border">
        <h3 className="text-sm font-bold text-ai-text-primary mb-3">Top Performer</h3>
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=TopCandidate"
            alt="Top Performer"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-ai-text-primary">Alex Johnson</p>
            <p className="text-xs text-ai-text-muted">22 submissions</p>
          </div>
        </div>
        <div className="text-xs text-ai-text-secondary space-y-2">
          <div className="flex justify-between">
            <span>Avg Score:</span>
            <span className="font-bold text-green-400">88/100</span>
          </div>
          <div className="flex justify-between">
            <span>Language:</span>
            <span className="text-ai-violet">TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  );
}
