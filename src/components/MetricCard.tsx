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
    <div className="bg-navy-900 p-4 rounded-lg transition-all duration-300 hover:bg-navy-900/80 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{title}</span>
        <span className={`text-sm transition-all duration-300 ${
          change.isPositive 
            ? 'text-green-500 group-hover:text-green-400' 
            : 'text-red-500 group-hover:text-red-400'
        }`}>
          {change.isPositive ? '↑' : '↓'} {change.value}
        </span>
      </div>
      <div className="text-2xl font-bold text-white mb-1 transition-transform duration-300 group-hover:scale-105">
        {value}
      </div>
      {subtitle && (
        <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
          {subtitle}
        </div>
      )}
    </div>
  );
}