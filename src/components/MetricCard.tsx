import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  period?: string;
  isMonetary?: boolean;
  isPercentage?: boolean;
}

export default function MetricCard({
  title,
  value,
  change,
  period = 'vs Yesterday',
  isMonetary = false,
  isPercentage = false,
}: MetricCardProps) {
  const formattedValue = isMonetary ? `$${value}` : isPercentage ? `${value}%` : value;
  const isPositive = change > 0;
  const changeText = `${isPositive ? '+' : ''}${change}%`;

  return (
    <div className="metric-card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">
          {title}
        </h3>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold mb-2">{formattedValue}</span>
        <div className="flex items-center">
          <span className={`flex items-center ${isPositive ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
            {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            {changeText}
          </span>
          <span className="ml-2 text-sm text-[var(--color-text-secondary)]">
            {period}
          </span>
        </div>
      </div>
    </div>
  );
}