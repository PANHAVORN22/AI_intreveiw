'use client';

import { Eye, Share2, Trash2 } from 'lucide-react';

interface EvaluationRowProps {
  id: string;
  candidate: { name: string; avatar: string };
  interviewId: string;
  date: Date;
  type: string;
  duration: number;
  score: number;
  status: string;
  interviewer: string;
  outcome: string;
}

export function EvaluationRow({
  id,
  candidate,
  interviewId,
  date,
  type,
  duration,
  score,
  status,
  interviewer,
  outcome,
}: EvaluationRowProps) {
  const typeColors = {
    Frontend: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Backend: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Full-Stack': 'bg-green-500/20 text-green-300 border-green-500/30',
    'System Design': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  };

  const statusColors = {
    Completed: 'bg-green-500/20 text-green-300',
    'In Progress': 'bg-blue-500/20 text-blue-300',
    Failed: 'bg-red-500/20 text-red-300',
  };

  const outcomeColors = {
    Passed: 'text-green-400',
    Failed: 'text-red-400',
    'No Decision': 'text-yellow-400',
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-500/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <tr className="border-b border-ai-border hover:bg-ai-border/30 transition-colors">
      {/* Candidate */}
      <td className="px-6 py-4 text-sm">
        <div className="flex items-center gap-3">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-ai-text-primary font-medium">{candidate.name}</span>
        </div>
      </td>

      {/* Session ID */}
      <td className="px-6 py-4 text-sm">
        <code className="text-ai-text-secondary font-mono">{interviewId}</code>
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-sm text-ai-text-secondary">{formatDate(date)}</td>

      {/* Type */}
      <td className="px-6 py-4 text-sm">
        <span
          className={`inline-block px-3 py-1 rounded border text-xs font-medium ${
            typeColors[type as keyof typeof typeColors] || 'bg-gray-500/20 text-gray-300'
          }`}
        >
          {type}
        </span>
      </td>

      {/* Duration */}
      <td className="px-6 py-4 text-sm text-ai-text-secondary">{duration}m</td>

      {/* Score */}
      <td className="px-6 py-4 text-sm">
        <span className={`px-3 py-1 rounded font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-sm">
        <span
          className={`inline-block px-3 py-1 rounded text-xs font-medium ${
            statusColors[status as keyof typeof statusColors] || 'bg-gray-500/20 text-gray-300'
          }`}
        >
          {status}
        </span>
      </td>

      {/* Interviewer */}
      <td className="px-6 py-4 text-sm text-ai-text-secondary">{interviewer}</td>

      {/* Outcome */}
      <td className="px-6 py-4 text-sm">
        <span className={`font-semibold ${outcomeColors[outcome as keyof typeof outcomeColors]}`}>
          {outcome}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-sm">
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-ai-border transition-colors text-ai-text-muted hover:text-ai-cyan">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-ai-border transition-colors text-ai-text-muted hover:text-ai-violet">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-ai-border transition-colors text-ai-text-muted hover:text-red-400">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
