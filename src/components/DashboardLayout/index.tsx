import React from 'react';
import { Activity, Users, DollarSign, TrendingUp } from 'lucide-react';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Monitor your key metrics and performance indicators
        </p>
      </header>

      <main className="space-y-8">
        {/* Overview Section */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Visitors"
            value={152342}
            previousValue={128976}
            icon={<Users className="h-4 w-4" />}
            trend={12}
          />
          <MetricCard
            title="Conversions"
            value={12876}
            previousValue={10234}
            icon={<Activity className="h-4 w-4" />}
            trend={8}
          />
          <MetricCard
            title="Revenue"
            value={287650}
            previousValue={245789}
            format={(v) => `$${v.toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4" />}
            trend={15}
          />
          <MetricCard
            title="Growth Rate"
            value={23.5}
            previousValue={18.2}
            format={(v) => `${v}%`}
            icon={<TrendingUp className="h-4 w-4" />}
            trend={5}
          />
        </section>

        {/* Charts Section */}
        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <TimeChart
                data={trafficData}
                height={350}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <TimeChart
                data={conversionData}
                height={350}
              />
            </CardContent>
          </Card>
        </section>

        {/* Traffic Analysis Section */}
        <TrafficSourceMetrics />
      </main>
    </div>
  );
};

export default DashboardLayout;