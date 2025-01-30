import { Overview } from '@/components/overview';
import TrafficSourceMetrics from '@/components/TrafficSourceMetrics';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Overview />
      <TrafficSourceMetrics />
      {/* Main content goes here under the <Overview /> component */}
    </div>
  );
}
