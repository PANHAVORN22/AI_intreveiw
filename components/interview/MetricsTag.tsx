interface MetricsTagProps {
  label: string;
  value: string;
  badge?: 'good' | 'excellent' | 'warning' | 'critical';
}

const badgeColors = {
  good: 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10',
  excellent: 'bg-green-500/20 text-green-300 border-green-500/30 hover:border-green-500/60 hover:shadow-lg hover:shadow-green-500/10',
  warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-500/10',
  critical: 'bg-red-500/20 text-red-300 border-red-500/30 hover:border-red-500/60 hover:shadow-lg hover:shadow-red-500/10',
};

export function MetricsTag({ label, value, badge = 'good' }: MetricsTagProps) {
  return (
    <div className={`rounded-md border px-3 py-2 transition-all duration-200 ${badgeColors[badge]}`}>
      <p className="text-xs font-medium text-ai-text-muted">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
