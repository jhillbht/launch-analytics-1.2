interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    isPositive: boolean;
  };
  subtitle?: string;
}

export function MetricCard({ title, value, change, subtitle }: MetricCardProps) {
  return (
    <div className="bg-navy-800/50 p-6 rounded-xl border border-slate-700/30 transition-all duration-300 hover:bg-navy-800/70">
      <div className="flex justify-between items-start mb-3">
        <span className="text-slate-400 text-sm font-medium">{title}</span>
        <span className={`text-sm font-medium ${
          change.isPositive 
            ? 'text-emerald-500' 
            : 'text-rose-500'
        }`}>
          {change.value}
        </span>
      </div>
      <div className="text-3xl font-semibold text-white mb-1">
        {value}
      </div>
      {subtitle && (
        <div className="text-sm text-slate-500">
          {subtitle}
        </div>
      )}
    </div>
  );
}