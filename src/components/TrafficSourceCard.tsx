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
    <div className="bg-navy-900 p-4 rounded-lg transition-all duration-300 hover:bg-navy-900/80 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{source}</span>
          {isTopPerformer && (
            <span className="text-yellow-500 animate-bounce-subtle">👑</span>
          )}
        </div>
        <span className={`text-sm transition-colors duration-300 ${
          trend >= 0 
            ? 'text-green-500 group-hover:text-green-400' 
            : 'text-red-500 group-hover:text-red-400'
        }`}>
          {trend >= 0 ? '↗' : '↘'} {Math.abs(trend)}%
        </span>
      </div>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-white transition-transform duration-300 group-hover:scale-105">
          {cvr}%
        </span>
        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">CVR</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-gray-400 text-sm mb-1 group-hover:text-gray-300 transition-colors duration-300">Revenue</div>
          <div className={`font-medium transition-all duration-300 ${
            isHighestRevenue 
              ? 'text-green-400 group-hover:text-green-300' 
              : 'text-white group-hover:text-gray-100'
          }`}>
            ${revenue}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-sm mb-1 group-hover:text-gray-300 transition-colors duration-300">Sessions</div>
          <div className="text-white font-medium group-hover:text-gray-100 transition-colors duration-300">{sessions}</div>
        </div>
      </div>
    </div>
  );
}