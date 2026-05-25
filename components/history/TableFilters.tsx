'use client';

import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TableFiltersProps {
  onExport: () => void;
  onStatusChange?: (status: string) => void;
  onDateChange?: (startDate: string, endDate: string) => void;
}

export function TableFilters({ onExport }: TableFiltersProps) {
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  return (
    <div className="space-y-4">
      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-xs font-semibold text-ai-text-secondary mb-2">From</label>
          <input
            type="date"
            defaultValue={thirtyDaysAgo}
            className="w-full px-3 py-2 bg-ai-card-bg border border-ai-border rounded-lg text-ai-text-primary text-sm focus:border-ai-violet outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ai-text-secondary mb-2">To</label>
          <input
            type="date"
            defaultValue={today}
            className="w-full px-3 py-2 bg-ai-card-bg border border-ai-border rounded-lg text-ai-text-primary text-sm focus:border-ai-violet outline-none transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs font-semibold text-ai-text-secondary mb-2">Status</label>
          <select className="w-full px-3 py-2 bg-ai-card-bg border border-ai-border rounded-lg text-ai-text-primary text-sm focus:border-ai-violet outline-none transition-colors">
            <option>All</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Failed</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-xs font-semibold text-ai-text-secondary mb-2">
            Difficulty
          </label>
          <select className="w-full px-3 py-2 bg-ai-card-bg border border-ai-border rounded-lg text-ai-text-primary text-sm focus:border-ai-violet outline-none transition-colors">
            <option>All Levels</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {/* Outcome Filter */}
        <div>
          <label className="block text-xs font-semibold text-ai-text-secondary mb-2">Outcome</label>
          <select className="w-full px-3 py-2 bg-ai-card-bg border border-ai-border rounded-lg text-ai-text-primary text-sm focus:border-ai-violet outline-none transition-colors">
            <option>All</option>
            <option>Passed</option>
            <option>Failed</option>
            <option>No Decision</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-ai-border text-ai-text-secondary hover:bg-ai-border/30 transition-colors text-sm font-medium">
          <Filter className="w-4 h-4" />
          Reset Filters
        </button>

        <Button onClick={onExport} className="bg-ai-violet hover:bg-ai-violet/90">
          <Download className="w-4 h-4 mr-2" />
          Export as CSV
        </Button>
      </div>
    </div>
  );
}
