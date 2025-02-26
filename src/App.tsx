import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { TimeSeriesChart } from './components/TimeSeriesChart';
import { TrafficSourceCard } from './components/TrafficSourceCard';
import { LandingPagesTable } from './components/LandingPagesTable';
import { usePeriod } from './contexts/PeriodContext';
import { useSource } from './contexts/SourceContext';
import { useDataRefresh } from './hooks/useDataRefresh';
import { generateMetrics, seededRandom } from './utils/dataGenerator';

function App() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { period } = usePeriod();
  const { source } = useSource();

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  useDataRefresh(handleRefresh);

  // Generate data based on current period and source
  const { metrics, timeSeriesData, landingPages } = generateMetrics(period, source);

  // Traffic source data with relative performance calculations
  const trafficSources = [
    { source: 'Retargeting', cvr: '3.9', revenue: '31,518', sessions: '17,914', trend: 10.5 },
    { source: 'Organic Search', cvr: '2.6', revenue: '21,828', sessions: '2,691', trend: -8.7 },
    { source: 'Email', cvr: '3.6', revenue: '13,579', sessions: '4,631', trend: 13.2 },
    { source: 'Organic Social', cvr: '2.6', revenue: '12,979', sessions: '1,328', trend: 10.9 },
    { source: 'Paid Search', cvr: '2.4', revenue: '5,546', sessions: '2,825', trend: -5.9 },
    { source: 'Paid Social', cvr: '2.1', revenue: '11,543', sessions: '4,283', trend: 7.1 }
  ].map(data => {
    const sourceRandom = seededRandom(`${period}-${data.source}`);
    return {
      ...data,
      cvr: (parseFloat(data.cvr) * (0.8 + sourceRandom() * 0.4)).toFixed(1),
      revenue: Math.floor(parseInt(data.revenue.replace(',', '')) * (0.8 + sourceRandom() * 0.4)).toLocaleString(),
      sessions: Math.floor(parseInt(data.sessions.replace(',', '')) * (0.8 + sourceRandom() * 0.4)).toLocaleString(),
      trend: (data.trend * (0.8 + sourceRandom() * 0.4)).toFixed(1)
    };
  });

  // Find top performer and highest revenue
  const topPerformer = trafficSources.reduce((max, current) => 
    parseFloat(current.cvr) > parseFloat(max.cvr) ? current : max
  , trafficSources[0]);

  const highestRevenue = trafficSources.reduce((max, current) => 
    parseInt(current.revenue.replace(',', '')) > parseInt(max.revenue.replace(',', '')) ? current : max
  , trafficSources[0]);

  return (
    <div className="min-h-screen bg-navy-900">
      <Header onRefresh={handleRefresh} isRefreshing={isRefreshing} />
      
      <main className="container mx-auto px-6 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Time Series Chart */}
        <div className="mb-8">
          <TimeSeriesChart data={timeSeriesData} />
        </div>

        {/* Traffic Sources Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">CVR by Traffic Source</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trafficSources.map((source, index) => (
              <TrafficSourceCard
                key={index}
                {...source}
                isTopPerformer={source.source === topPerformer.source}
                isHighestRevenue={source.source === highestRevenue.source}
              />
            ))}
          </div>
        </div>

        {/* Landing Pages Table */}
        <LandingPagesTable pages={landingPages} />
      </main>
    </div>
  );
}

export default App;