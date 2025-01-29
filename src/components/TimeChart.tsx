import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface TimeChartProps {
  data: {
    currentPeriod: Array<{ time: string; value: number }>;
    previousPeriod: Array<{ time: string; value: number }>;
  };
  selectedMetric?: string;
  title?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e2738] p-3 rounded-lg border border-gray-700/50 shadow-xl">
        <p className="text-gray-400 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-300">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TimeChart({ data, selectedMetric, title }: TimeChartProps) {
  // Transform data for chart
  const chartData = data.currentPeriod.map((point, index) => ({
    time: point.time,
    current: point.value,
    previous: data.previousPeriod[index].value,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="previousGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(148, 163, 184, 0.1)"
          vertical={false}
        />
        
        <XAxis
          dataKey="time"
          tick={{ fill: '#94a3b8' }}
          stroke="#334155"
          tickLine={false}
        />
        
        <YAxis
          tick={{ fill: '#94a3b8' }}
          stroke="#334155"
          tickLine={false}
          axisLine={false}
        />
        
        <Tooltip content={<CustomTooltip />} />
        
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => (
            <span className="text-gray-400">
              {value === 'current' ? 'Current Period' : 'Previous Period'}
            </span>
          )}
        />
        
        <Line
          type="monotone"
          dataKey="current"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
          name="current"
          animationDuration={1000}
          fill="url(#currentGradient)"
        />
        
        <Line
          type="monotone"
          dataKey="previous"
          stroke="#6366f1"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
          name="previous"
          animationDuration={1000}
          fill="url(#previousGradient)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}