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
    time: string;
    current: number;
    previous: number;
  }[];
  title: string;
  subtitle?: string;
}

export default function TimeChart({ data, title, subtitle }: TimeChartProps) {
  return (
    <div className="metric-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
        )}
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--chart-grid)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card-background)',
                border: '1px solid var(--card-border)',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'var(--color-text-primary)' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="current"
              stroke="var(--chart-line-current)"
              dot={{ stroke: 'var(--chart-line-current)', fill: 'var(--chart-line-current)' }}
              name="Current Period"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="var(--chart-line-previous)"
              dot={{ stroke: 'var(--chart-line-previous)', fill: 'var(--chart-line-previous)' }}
              name="Previous Period"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}