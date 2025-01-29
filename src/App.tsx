import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, ArrowRight } from 'lucide-react';

// Sample data - replace with your actual data
const data = [
  { month: 'Jan', users: 4000, engagementRate: 70 },
  { month: 'Feb', users: 4500, engagementRate: 75 },
  { month: 'Mar', users: 5000, engagementRate: 72 },
  { month: 'Apr', users: 4800, engagementRate: 78 },
  { month: 'May', users: 5500, engagementRate: 80 },
  { month: 'Jun', users: 6000, engagementRate: 82 },
];

const dailyVisits = [
  { day: 'Mon', visits: 2400 },
  { day: 'Tue', visits: 1398 },
  { day: 'Wed', visits: 9800 },
  { day: 'Thu', visits: 3908 },
  { day: 'Fri', visits: 4800 },
  { day: 'Sat', visits: 3800 },
  { day: 'Sun', visits: 4300 },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your key metrics and performance indicators</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value="12,345"
            change="+12.3%"
            isPositive={true}
            icon={<Users className="h-6 w-6" />}
          />
          <StatsCard
            title="Engagement Rate"
            value="78%"
            change="+5.2%"
            isPositive={true}
            icon={<ArrowRight className="h-6 w-6" />}
          />
          <StatsCard
            title="Bounce Rate"
            value="32%"
            change="-2.1%"
            isPositive={false}
            icon={<ArrowRight className="h-6 w-6" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Growth Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">User Growth</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#3B82F6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Visits Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Daily Visits</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyVisits}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visits" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ title, value, change, isPositive, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-4">
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 text-green-600" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-600" />
        )}
        <span className={`ml-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        <span className="text-gray-600 ml-2">vs last month</span>
      </div>
    </div>
  );
}