import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Mic, User2, BarChart3 } from 'lucide-react';

const data = [
  { name: 'Jan', Users: 4000, 'Call Volume': 2400, 'User Retention': 2400 },
  { name: 'Feb', Users: 3000, 'Call Volume': 1398, 'User Retention': 2210 },
  { name: 'Mar', Users: 2000, 'Call Volume': 9800, 'User Retention': 2290 },
  { name: 'Apr', Users: 2780, 'Call Volume': 3908, 'User Retention': 2000 },
  { name: 'May', Users: 1890, 'Call Volume': 4800, 'User Retention': 2181 },
  { name: 'Jun', Users: 2390, 'Call Volume': 3800, 'User Retention': 2500 },
  { name: 'Jul', Users: 3490, 'Call Volume': 4300, 'User Retention': 2100 },
];

const metrics = [
  { 
    title: "Total Users", 
    value: "1.2M", 
    change: "+12% from last month",
    icon: <User2 className="h-5 w-5 text-blue-500" />,
    bgColor: "bg-blue-50"
  },
  { 
    title: "Call Volume", 
    value: "32.5K",
    change: "+8% from last month",
    icon: <Mic className="h-5 w-5 text-purple-500" />,
    bgColor: "bg-purple-50"
  },
  { 
    title: "User Retention", 
    value: "89%",
    change: "+3% from last month",
    icon: <BarChart3 className="h-5 w-5 text-green-500" />,
    bgColor: "bg-green-50"
  }
];

export default function App() {
  const [activeMetric, setActiveMetric] = useState('Users');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-gray-900">Launch Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Monitor your key metrics and performance</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setActiveMetric(metric.title.replace('Total ', ''))}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${metric.bgColor}`}>
                    {metric.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {metric.title}
                      </dt>
                      <dd>
                        <div className="text-lg font-semibold text-gray-900">
                          {metric.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-600">
                    {metric.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Analytics Overview</h2>
            <p className="text-sm text-gray-500">Click on metrics above to filter the chart</p>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {activeMetric === 'Users' && (
                  <Line type="monotone" dataKey="Users" stroke="#3B82F6" strokeWidth={2} />
                )}
                {activeMetric === 'Call Volume' && (
                  <Line type="monotone" dataKey="Call Volume" stroke="#8B5CF6" strokeWidth={2} />
                )}
                {activeMetric === 'User Retention' && (
                  <Line type="monotone" dataKey="User Retention" stroke="#10B981" strokeWidth={2} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}