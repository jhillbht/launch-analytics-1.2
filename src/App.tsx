import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import MetricCard from './components/MetricCard';
import TimeChart from './components/TimeChart';
import LandingPageTable from './components/LandingPageTable';
import DropdownSelect from './components/DropdownSelect';
import { useDemoData } from './hooks/useDemoData';
import './styles/theme.css';

const periodOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: '7days' },
  { label: 'Last 30 days', value: '30days' },
];

const sourceOptions = [
  { label: 'All Traffic', value: 'all' },
  { label: 'Organic Search', value: 'organic' },
  { label: 'Direct', value: 'direct' },
  { label: 'Social', value: 'social' },
];

const trafficSources = [
  { name: 'Retargeting', cvr: 1.9, revenue: 8558, sessions: 50797, change: 4.7 },
  { name: 'Organic Search', cvr: 3.2, revenue: 14343, sessions: 3519, change: -14.6 },
  { name: 'Email', cvr: 3.5, revenue: 6956, sessions: 6812, change: 7.5 },
  { name: 'Organic Social', cvr: 1.7, revenue: 7914, sessions: 2322, change: -9.5 },
  { name: 'Paid Search', cvr: 2.6, revenue: 11732, sessions: 3295, change: -6.5 },
  { name: 'Paid Social', cvr: 2.2, revenue: 10159, sessions: 1166, change: -0.8 },
];

export default function App() {
  const { data, refreshData, generateTimeSeriesData } = useDemoData();
  const [period, setPeriod] = useState('today');
  const [source, setSource] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [timeData, setTimeData] = useState(generateTimeSeriesData(24));

  // Handle refresh animation and data update
  const handleRefresh = async () => {
    setIsRefreshing(true);
    refreshData();
    setTimeData(generateTimeSeriesData(24));
    
    // Simulate loading state for smooth animation
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsRefreshing(false);
  };

  // Auto-refresh effect for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2">
              Launch Analytics
              <span role="img" aria-label="rocket" className="animate-pulse">🚀</span>
            </h1>
            <p className="text-gray-400">Track your key metrics and performance</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <DropdownSelect
              label="Period"
              options={periodOptions}
              value={period}
              onChange={setPeriod}
            />
            <DropdownSelect
              label="Source"
              options={sourceOptions}
              value={source}
              onChange={setSource}
            />
            <button
              onClick={handleRefresh}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded-lg
                       flex items-center gap-2 transition-all duration-200 active:scale-95
                       shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              disabled={isRefreshing}
            >
              <RefreshCw
                size={16}
                className={`transition-all duration-500 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard
            title="Conversion Rate"
            value={data.conversionRate.value.toString()}
            change={data.conversionRate.change}
            isPercentage
            onClick={() => setSelectedMetric('conversion')}
          />
          <MetricCard
            title="Revenue"
            value={data.revenue.value.toString()}
            change={data.revenue.change}
            isMonetary
            onClick={() => setSelectedMetric('revenue')}
          />
          <MetricCard
            title="Sessions"
            value={data.sessions.value.toString()}
            change={data.sessions.change}
            onClick={() => setSelectedMetric('sessions')}
          />
          <MetricCard
            title="Engagement"
            value={data.engagement.value.toString()}
            change={data.engagement.change}
            isPercentage
            onClick={() => setSelectedMetric('engagement')}
          />
          <MetricCard
            title="Bounce Rate"
            value={data.bounceRate.value.toString()}
            change={data.bounceRate.change}
            isPercentage
            onClick={() => setSelectedMetric('bounce')}
          />
          <MetricCard
            title="Avg Order"
            value={data.avgOrder.value.toString()}
            change={data.avgOrder.change}
            isMonetary
            onClick={() => setSelectedMetric('order')}
          />
        </div>

        {/* Traffic Overview Chart */}
        <div className="bg-[#1e2738] rounded-xl p-6 mb-8 shadow-lg">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Traffic Overview</h2>
            <p className="text-sm text-gray-400">Click on metrics above to filter the chart</p>
          </div>
          <div className="h-[400px]">
            <TimeChart
              data={timeData}
              title="Traffic Overview"
              selectedMetric={selectedMetric}
            />
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-[#1e2738] rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-lg font-semibold mb-6">CVR by Traffic Source</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trafficSources.map((source) => (
              <div key={source.name} className="bg-[#151f32] rounded-lg p-4 hover:bg-[#1a2438] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-sm text-gray-400">{source.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-semibold">{source.cvr}%</span>
                      <span className="text-sm">CVR</span>
                    </div>
                  </div>
                  <div className={`text-sm ${source.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {source.change >= 0 ? '+' : ''}{source.change}%
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div>Revenue: ${source.revenue.toLocaleString()}</div>
                  <div>Sessions: {source.sessions.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Landing Pages Table */}
        <div className="bg-[#1e2738] rounded-xl shadow-lg">
          <LandingPageTable data={[
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
          ]} />
        </div>
      </div>
    </div>
  );
}