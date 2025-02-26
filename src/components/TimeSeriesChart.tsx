import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface TimeSeriesChartProps {
  data: Array<{
    time: string;
    current: number;
    previous: number;
  }>;
}

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  return (
    <div className="bg-navy-800/50 p-6 rounded-xl border border-slate-700/30">
      <h2 className="text-xl font-semibold text-white mb-6">Traffic Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
          <XAxis 
            dataKey="time" 
            stroke="#64748B"
            tick={{ fill: '#64748B' }}
            axisLine={{ stroke: '#334155', opacity: 0.2 }}
          />
          <YAxis 
            stroke="#64748B"
            tick={{ fill: '#64748B' }}
            axisLine={{ stroke: '#334155', opacity: 0.2 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="current" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: '#3B82F6' }}
          />
          <Line 
            type="monotone" 
            dataKey="previous" 
            stroke="#6366F1" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: '#6366F1' }}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-6 space-x-8">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-slate-400">Current Period</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
          <span className="text-slate-400">Previous Period</span>
        </div>
      </div>
    </div>
  );
}