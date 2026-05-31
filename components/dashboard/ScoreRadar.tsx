'use client';

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { EvaluationScores } from '@/types';

const DEFAULT_MAX = 100;

type ScoreRadarProps = {
  scores: EvaluationScores;
  height?: number;
};

export function ScoreRadar({ scores, height = 260 }: ScoreRadarProps) {
  const data = [
    { label: 'Understanding', value: scores.problem_understanding },
    { label: 'Algorithm', value: scores.algorithm },
    { label: 'Code Quality', value: scores.code_quality },
    { label: 'Communication', value: scores.communication },
    { label: 'Edge Cases', value: scores.edge_cases },
    { label: 'Complexity', value: scores.time_complexity },
  ];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data}>
        <PolarGrid stroke="#1F2937" />
        <PolarAngleAxis dataKey="label" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
        <PolarRadiusAxis domain={[0, DEFAULT_MAX]} tick={{ fill: '#6B7280', fontSize: 10 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: '8px',
            color: '#ffffff',
          }}
        />
        <Radar dataKey="value" stroke="#6366F1" fill="#6366F1" fillOpacity={0.25} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
