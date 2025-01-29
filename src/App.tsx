import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import MetricCard from './components/MetricCard';
import TimeChart from './components/TimeChart';
import LandingPageTable from './components/LandingPageTable';
import DropdownSelect from './components/DropdownSelect';
import { useDemoData } from './hooks/useDemoData';
import './styles/theme.css';

// Options for the period and source dropdowns
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

// Sample landing page data
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

export default function App() {
  // Initialize demo data and state
  const { data, refreshData, generateTimeSeriesData } = useDemoData();
  const [period, setPeriod] = useState('today');
  const [source, setSource] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeMetric, setActiveMetric] = useState('conversion');

  // Handle refresh button click with animation
  const handleRefresh = async () => {
    setIsRefreshing(true);
    refreshData();
    // Add a slight delay for the refresh animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Generate time series data for the chart
  const timeData = generateTimeSeriesData(24);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2">
              Launch Analytics
              <span role="img" aria-label="rocket" className="text-2xl animate-pulse">🚀</span>
            </h1>
            <p className="text-gray-400">Track your key metrics and performance</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
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
                       flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-lg
                       hover:shadow-blue-500/25"
            >
              <RefreshCw
                size={16}
                className={`${isRefreshing ? 'animate-spin' : ''} 
                           transition-transform duration-300 ease-in-out`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Metrics Grid with Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard
            title="Conversion Rate"
            value={data.conversionRate.value.toString()}
            change={data.conversionRate.change}
            isPercentage
            onClick={() => setActiveMetric('conversion')}
          />
          <MetricCard
            title="Revenue"
            value={data.revenue.value.toString()}
            change={data.revenue.change}
            isMonetary
            onClick={() => setActiveMetric('revenue')}
          />
          <MetricCard
            title="Sessions"
            value={data.sessions.value.toString()}
            change={data.sessions.change}
            onClick={() => setActiveMetric('sessions')}
          />
          <MetricCard
            title="Engagement"
            value={data.engagement.value.toString()}
            change={data.engagement.change}
            isPercentage
            onClick={() => setActiveMetric('engagement')}
          />
          <MetricCard
            title="Bounce Rate"
            value={data.bounceRate.value.toString()}
            change={data.bounceRate.change}
            isPercentage
            onClick={() => setActiveMetric('bounce')}
          />
          <MetricCard
            title="Avg Order"
            value={data.avgOrder.value.toString()}
            change={data.avgOrder.change}
            isMonetary
            onClick={() => setActiveMetric('order')}
          />
        </div>

        {/* Interactive Chart Section */}
        <div className="bg-[#1e2738] rounded-xl p-6 mb-8 shadow-xl
                      transition-all duration-300 ease-out hover:shadow-2xl
                      hover:shadow-blue-500/10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Traffic Overview</h2>
            <p className="text-sm text-gray-400">Click on metrics above to filter the chart</p>
          </div>
          <div className="h-[400px]"> {/* Increased height for better visibility */}
            <TimeChart
              data={timeData}
              title="Traffic Overview"
              activeMetric={activeMetric}
            />
          </div>
        </div>

        {/* Landing Pages Section */}
        <div className="bg-[#1e2738] rounded-xl p-6 shadow-xl
                      transition-all duration-300 ease-out hover:shadow-2xl
                      hover:shadow-blue-500/10">
          <LandingPageTable data={landingPages} />
        </div>
      </div>
    </div>
  );
}