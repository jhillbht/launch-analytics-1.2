import React from 'react';
import { TrafficSourceMetrics } from '../TrafficSourceMetrics';
import { MetricCard } from '../MetricCard';
import { TimeChart } from '../TimeChart';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Overview Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Users"
          value={152342}
          change={12.5}
          timeframe="Last 30 days"
        />
        <MetricCard
          title="Revenue"
          value={287650}
          change={8.2}
          timeframe="Last 30 days"
        />
        <MetricCard
          title="Conversion Rate"
          value={3.8}
          change={-2.1}
          timeframe="Last 30 days"
        />
      </section>

      {/* Time Series Section */}
      <section className="bg-gray-900 rounded-lg p-4">
        <TimeChart />
      </section>

      {/* Traffic Analysis Section */}
      <section className="bg-gray-900 rounded-lg">
        <TrafficSourceMetrics />
      </section>
    </div>
  );
};

export default Dashboard;