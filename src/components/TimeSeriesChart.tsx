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
    <div className="bg-navy-900 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            tick={{ fill: '#6b7280' }}
          />
          <YAxis 
            stroke="#6b7280"
            tick={{ fill: '#6b7280' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1f2b',
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="current" 
            stroke="#60a5fa" 
            strokeWidth={2}
            dot={{ fill: '#60a5fa', r: 4 }}
            activeDot={{ r: 6, fill: '#60a5fa' }}
          />
          <Line 
            type="monotone" 
            dataKey="previous" 
            stroke="#818cf8" 
            strokeWidth={2}
            dot={{ fill: '#818cf8', r: 4 }}
            activeDot={{ r: 6, fill: '#818cf8' }}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
          <span className="text-gray-400">Current Period</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-400 rounded-full mr-2"></div>
          <span className="text-gray-400">Previous Period</span>
        </div>
      </div>
    </div>
  );
}