"use client";

import { useState, useEffect } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { EvaluationRow } from '@/components/history/EvaluationRow';
import { TableFilters } from '@/components/history/TableFilters';
import { Clock } from 'lucide-react';

export default function EvaluationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  type CandidateRecord = {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };

  type InterviewRecord = {
    id: string;
    interview_code: string | null;
    interview_type: string | null;
    duration_minutes: number | null;
    scheduled_at: string | null;
    candidate: CandidateRecord | CandidateRecord[] | null;
  };

  type EvaluationRecord = {
    id: string;
    score: number | null;
    status: string | null;
    interviewer_name: string | null;
    outcome: string | null;
    created_at: string;
    session_id?: string | null;
    session: InterviewRecord | InterviewRecord[] | null;
  };

  type EvaluationRowData = {
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
  };

  const [evaluations, setEvaluations] = useState<EvaluationRowData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let mounted = true;

    const fetchEvaluations = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('evaluations')
        .select(`id, score, status, interviewer_name, outcome, created_at, session:session_id(id, room_code, started_at, candidate: candidate_id(id, full_name, avatar_url))`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load evaluations', error);
        setIsLoading(false);
        return;
      }

      if (!mounted) return;

      const rows = (data || []) as EvaluationRecord[];
      const normalized = rows.map((ev) => {
        const session = Array.isArray(ev.session) ? ev.session[0] : ev.session;
        const candidate = Array.isArray(session?.candidate) ? session?.candidate[0] : session?.candidate;
        const candidateName = candidate?.full_name || 'Unknown';
        return {
          id: ev.id,
          candidate: {
            name: candidateName,
            avatar:
              candidate?.avatar_url ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(candidateName || ev.id)}`,
          },
          interviewId: session?.id || ev.session_id || '',
          date: new Date(ev.created_at),
          type: session?.room_code ? 'Live Session' : 'Unknown',
          duration: 60,
          score: ev.score ?? 0,
          status: ev.status ? (ev.status.charAt(0).toUpperCase() + ev.status.slice(1)) : 'Completed',
          interviewer: ev.interviewer_name || '',
          outcome: ev.outcome ? (ev.outcome.charAt(0).toUpperCase() + ev.outcome.slice(1)) : 'No Decision',
        };
      });

      setEvaluations(normalized);
      setIsLoading(false);
    };

    fetchEvaluations();

    return () => { mounted = false };
  }, []);

  const totalPages = Math.ceil(evaluations.length / rowsPerPage);
  const paginatedData = evaluations.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleExport = () => {
    // Mock export function
    const csv = [
      ['Candidate', 'Interview ID', 'Date', 'Type', 'Duration', 'Score', 'Status', 'Interviewer', 'Outcome'],
      ...evaluations.map((evaluation) => [
        evaluation.candidate.name,
        evaluation.interviewId,
        new Date(evaluation.date).toLocaleDateString(),
        evaluation.type,
        evaluation.duration,
        evaluation.score,
        evaluation.status,
        evaluation.interviewer,
        evaluation.outcome,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'evaluations.csv';
    a.click();
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-ai-violet/20 text-ai-violet">
            <Clock className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-ai-text-primary">Evaluation History</h1>
        </div>
        <p className="text-ai-text-muted">
          View and manage all interview evaluations. Filter, sort, and export data as needed.
        </p>
      </div>

      {/* Filters */}
      <TableFilters onExport={handleExport} />

      {/* Table */}
      <div className="bg-ai-card-bg border border-ai-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ai-dark-bg border-b border-ai-border">
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Interview ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Interviewer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Outcome
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-ai-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((evaluation) => (
                <EvaluationRow key={evaluation.id} {...evaluation} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-ai-border flex items-center justify-between">
          <div className="text-sm text-ai-text-muted">
            Showing {(currentPage - 1) * rowsPerPage + 1} to{' '}
            {Math.min(currentPage * rowsPerPage, evaluations.length)} of{' '}
            {evaluations.length} evaluations
          </div>

          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                // Handle rows per page change
              }}
              className="px-3 py-2 bg-ai-dark-bg border border-ai-border rounded-lg text-ai-text-secondary text-sm focus:border-ai-violet outline-none transition-colors"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>

            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-ai-border rounded-lg text-ai-text-secondary hover:bg-ai-border/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded text-sm transition-colors ${
                      currentPage === pageNum
                        ? 'bg-ai-violet text-white'
                        : 'border border-ai-border text-ai-text-secondary hover:bg-ai-border/30'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-ai-border rounded-lg text-ai-text-secondary hover:bg-ai-border/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
