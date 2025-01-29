import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  period?: string;
  isMonetary?: boolean;
  isPercentage?: boolean;
  onClick?: () => void;
}

export default function MetricCard({
  title,
  value,
  change,
  period = 'vs Yesterday',
  isMonetary = false,
  isPercentage = false,
  onClick,
}: MetricCardProps) {
  const formattedValue = isMonetary ? `$${value}` : isPercentage ? `${value}%` : value;
  const isPositive = change > 0;
  const changeText = `${isPositive ? '+' : ''}${change}%`;

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden bg-[#1e2738] rounded-xl p-4 
                transition-all duration-300 ease-out
                hover:translate-y-[-2px] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)]
                active:translate-y-[0px] active:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]
                group cursor-pointer
                before:content-[''] before:absolute before:inset-0 
                before:bg-gradient-to-r before:from-blue-500/5 before:to-purple-500/5 
                before:opacity-0 before:transition-opacity before:duration-300
                hover:before:opacity-100"
    >
      <div className="relative z-10">
        <h3 className="text-sm font-medium text-gray-400 mb-4 transition-colors group-hover:text-gray-300">
          {title}
        </h3>
        <div className="flex flex-col">
          <span className="text-2xl font-bold mb-2 text-white transition-transform duration-300 group-hover:scale-105">
            {formattedValue}
          </span>
          <div className="flex items-center">
            <span 
              className={`flex items-center gap-1 ${
                isPositive ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {isPositive ? (
                <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              )}
              {changeText}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              {period}
            </span>
          </div>
        </div>
      </div>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Edge lighting effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}