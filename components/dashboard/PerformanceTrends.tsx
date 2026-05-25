'use client';

import { performanceTrends } from '@/lib/mock-data';
import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function PerformanceTrends() {
  return (
    <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-ai-cyan" />
        <h2 className="text-lg font-bold text-ai-text-primary">Performance Trends (30 Days)</h2>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={performanceTrends} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid #1F2937',
              borderRadius: '8px',
              color: '#ffffff',
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '16px',
            }}
          />
          <Line
            type="monotone"
            dataKey="avgScore"
            stroke="#6366F1"
            name="Avg Score"
            strokeWidth={2}
            dot={{ fill: '#6366F1', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="completionRate"
            stroke="#06B6D4"
            name="Completion Rate"
            strokeWidth={2}
            dot={{ fill: '#06B6D4', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="adoptionRate"
            stroke="#10B981"
            name="Adoption Rate"
            strokeWidth={2}
            dot={{ fill: '#10B981', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
