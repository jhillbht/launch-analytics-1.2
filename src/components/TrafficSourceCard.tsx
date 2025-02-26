interface TrafficSourceCardProps {
  source: string;
  cvr: string;
  revenue: string;
  sessions: string;
  trend: number;
  isTopPerformer?: boolean;
  isHighestRevenue?: boolean;
}

export function TrafficSourceCard({ 
  source, 
  cvr, 
  revenue, 
  sessions, 
  trend,
  isTopPerformer,
  isHighestRevenue
}: TrafficSourceCardProps) {
  return (
    <div className="bg-navy-800/50 p-6 rounded-xl border border-slate-700/30 transition-all duration-300 hover:bg-navy-800/70">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">{source}</span>
          {isTopPerformer && (
            <span className="text-amber-500">👑</span>
          )}
        </div>
        <span className={`text-sm font-medium ${
          trend >= 0 
            ? 'text-emerald-500' 
            : 'text-rose-500'
        }`}>
          {trend >= 0 ? '↗' : '↘'} {Math.abs(trend)}%
        </span>
      </div>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-semibold text-white">
          {cvr}%
        </span>
        <span className="text-sm text-slate-400">CVR</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-slate-400 text-sm mb-1">Revenue</div>
          <div className={`font-medium ${
            isHighestRevenue 
              ? 'text-emerald-500' 
              : 'text-white'
          }`}>
            ${revenue}
          </div>
        </div>
        <div>
          <div className="text-slate-400 text-sm mb-1">Sessions</div>
          <div className="text-white font-medium">{sessions}</div>
        </div>
      </div>
    </div>
  );
}