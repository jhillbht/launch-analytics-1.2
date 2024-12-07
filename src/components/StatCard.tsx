interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export function StatCard({ title, value, change, isPositive }: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <div className="text-2xl font-bold text-white">{value}</div>
        {change && (
          <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{change}
          </div>
        )}
      </div>
    </div>
  );
}