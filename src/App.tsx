import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { TimeSeriesChart } from './components/TimeSeriesChart';
import { TrafficSourceCard } from './components/TrafficSourceCard';
import { LandingPagesTable } from './components/LandingPagesTable';
import { usePeriod } from './contexts/PeriodContext';
import { useSource } from './contexts/SourceContext';
import { useDataRefresh } from './hooks/useDataRefresh';

// Sample time series data
const timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  current: Math.floor(Math.random() * 1000) + 400,
  previous: Math.floor(Math.random() * 1000) + 400,
}));

// Sample landing pages data
const landingPagesData = [
  {
    url: '/checkout/success',
    revenue: 47058,
    cvr: 5.6,
    keyEvents: 297539,
    bounce: 18.5,
    sessions: 3960
  },
  {
    url: '/products',
    revenue: 0,
    cvr: 6.0,
    keyEvents: 295181,
    bounce: 14.8,
    sessions: 2902
  },
  {
    url: '/product/details',
    revenue: 0,
    cvr: 3.4,
    keyEvents: 288612,
    bounce: 39.5,
    sessions: 3982
  },
  {
    url: '/cart',
    revenue: 0,
    cvr: 2.7,
    keyEvents: 277509,
    bounce: 21.9,
    sessions: 2928
  }
];

function App() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { period } = usePeriod();
  const { source } = useSource();

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  useDataRefresh(handleRefresh);

  return (
    <div className="min-h-screen bg-navy-900">
      <Header onRefresh={handleRefresh} isRefreshing={isRefreshing} />
      
      <main className="container mx-auto px-6 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <MetricCard
            title="Conversion Rate"
            value="2.9%"
            change={{ value: "-2.2%", isPositive: false }}
            subtitle="vs Yesterday"
          />
          <MetricCard
            title="Revenue"
            value="$44,380"
            change={{ value: "+10.7%", isPositive: true }}
            subtitle="vs Yesterday"
          />
          <MetricCard
            title="Sessions"
            value="63,657"
            change={{ value: "-9.5%", isPositive: false }}
            subtitle="vs Yesterday"
          />
          <MetricCard
            title="Engagement"
            value="41.7%"
            change={{ value: "-4.2%", isPositive: false }}
            subtitle="vs Yesterday"
          />
          <MetricCard
            title="Bounce Rate"
            value="20.7%"
            change={{ value: "+3.1%", isPositive: true }}
            subtitle="vs Yesterday"
          />
          <MetricCard
            title="Avg Order"
            value="$140"
            change={{ value: "+1.8%", isPositive: true }}
            subtitle="vs Yesterday"
          />
        </div>

        {/* Time Series Chart */}
        <div className="mb-8">
          <TimeSeriesChart data={timeSeriesData} />
        </div>

        {/* Traffic Sources Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">CVR by Traffic Source</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TrafficSourceCard
              source="Retargeting"
              cvr="3.9"
              revenue="31,518"
              sessions="17,914"
              trend={-10.5}
              isTopPerformer={true}
              isHighestRevenue={true}
            />
            <TrafficSourceCard
              source="Organic Search"
              cvr="2.6"
              revenue="21,828"
              sessions="2,691"
              trend={-8.7}
            />
            <TrafficSourceCard
              source="Email"
              cvr="3.6"
              revenue="13,579"
              sessions="4,631"
              trend={13.2}
            />
            <TrafficSourceCard
              source="Organic Social"
              cvr="2.6"
              revenue="12,979"
              sessions="1,328"
              trend={10.9}
            />
            <TrafficSourceCard
              source="Paid Search"
              cvr="2.4"
              revenue="5,546"
              sessions="2,825"
              trend={-5.9}
            />
            <TrafficSourceCard
              source="Paid Social"
              cvr="2.1"
              revenue="11,543"
              sessions="4,283"
              trend={7.1}
            />
          </div>
        </div>

        {/* Landing Pages Table */}
        <LandingPagesTable pages={landingPagesData} />
      </main>
    </div>
  );
}

export default App;