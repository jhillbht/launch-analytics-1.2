interface ChartBarProps {
  height: number;
  label: string;
  isActive?: boolean;
}

export function ChartBar({ height, label, isActive = false }: ChartBarProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`w-8 rounded-t ${isActive ? 'bg-blue-500' : 'bg-gray-700'}`}
        style={{ height: `${height}%` }}
      />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}