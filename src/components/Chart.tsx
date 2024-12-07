interface ChartProps {
  title: string;
  children: React.ReactNode;
}

export function Chart({ title, children }: ChartProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-gray-400 text-sm mb-4">{title}</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {children}
      </div>
    </div>
  );
}