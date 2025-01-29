import React, { useState } from 'react';
import MetricCard from './components/MetricCard';
import TimeChart from './components/TimeChart';
import LandingPageTable from './components/LandingPageTable';
import './styles/theme.css';

// Sample data generation for the time series chart
const generateTimeData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const hour = (now.getHours() - 23 + i + 24) % 24;
    return {
      time: `${hour}:00`,
      current: Math.floor(Math.random() * 1000) + 500,
      previous: Math.floor(Math.random() * 1000) + 500,
    };
  });
};

// Sample data for our metrics and tables
const timeData = generateTimeData();

const landingPages = [
  {
    url: '/checkout/success',
    revenue: 37587.6,
    views: 2156,
    entries: 464,
    bounce: 31.7,
    cvr: 4.5,
  },
  {
    url: '/products',
    revenue: 0,
    views: 1229,
    entries: 831,
    bounce: 12.5,
    cvr: 3.9,
  },
  {
    url: '/product/details',
    revenue: 0,
    views: 3308,
    entries: 406,
    bounce: 20.4,
    cvr: 2.2,
  },
  {
    url: '/start',
    revenue: 0,
    views: 2675,
    entries: 915,
    bounce: 16.8,
    cvr: 1.7,
  },
];

const metrics = [
  {
    title: 'Conversion Rate',
    value: '3.8',
    change: -9.9,
    isPercentage: true,
  },
  {
    title: 'Revenue',
    value: '23848',
    change: -14.1,
    isMonetary: true,
  },
  {
    title: 'Sessions',
    value: '55681',
    change: 8.9,
  },
  {
    title: 'Engagement',
    value: '30.3',
    change: 3.4,
    isPercentage: true,
  },
  {
    title: 'Bounce Rate',
    value: '31.7',
    change: -1.3,
    isPercentage: true,
  },
  {
    title: 'Avg Order',
    value: '148',
    change: 8.3,
    isMonetary: true,
  },
];

export default function App() {
  // State for period and source filters
  const [period] = useState('Today');
  const [source] = useState('All Traffic');

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Launch Analytics 🚀</h1>
            <p className="text-[var(--color-text-secondary)]">Track your key metrics and performance</p>
          </div>
          <div className="flex gap-4">
            <div className="metric-card px-4 py-2">
              <span className="text-sm text-[var(--color-text-secondary)]">Period: </span>
              <span className="font-medium">{period}</span>
            </div>
            <div className="metric-card px-4 py-2">
              <span className="text-sm text-[var(--color-text-secondary)]">Source: </span>
              <span className="font-medium">{source}</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              isMonetary={metric.isMonetary}
              isPercentage={metric.isPercentage}
            />
          ))}
        </div>

        {/* Time Series Chart */}
        <div className="mb-8">
          <TimeChart
            data={timeData}
            title="Traffic Overview"
            subtitle="Click on metrics to filter the chart"
          />
        </div>

        {/* Landing Pages Table */}
        <div>
          <LandingPageTable data={landingPages} />
        </div>
      </div>
    </div>
  );
}