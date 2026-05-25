import { UpcomingInterviews } from '@/components/dashboard/UpcomingInterviews';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { PerformanceTrends } from '@/components/dashboard/PerformanceTrends';

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-ai-text-primary mb-2">Dashboard</h1>
        <p className="text-ai-text-muted">Welcome back! Here&apos;s your interview activity overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Total Interviews</p>
          <p className="text-3xl font-bold text-ai-text-primary">247</p>
          <p className="text-xs text-green-400 mt-2">+12 this month</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Average Score</p>
          <p className="text-3xl font-bold text-ai-text-primary">82</p>
          <p className="text-xs text-green-400 mt-2">+4 vs last month</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Completion Rate</p>
          <p className="text-3xl font-bold text-ai-text-primary">92%</p>
          <p className="text-xs text-green-400 mt-2">+3% vs last month</p>
        </div>
        <div className="bg-ai-card-bg border border-ai-border rounded-lg p-6">
          <p className="text-ai-text-muted text-sm mb-2">Active Candidates</p>
          <p className="text-3xl font-bold text-ai-text-primary">48</p>
          <p className="text-xs text-green-400 mt-2">+8 this week</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UpcomingInterviews />
        <RecentActivity />
      </div>

      {/* Full Width Chart */}
      <PerformanceTrends />
    </div>
  );
}
