import React, { useState } from 'react';
import { 
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Package,
  Download,
  Filter,
  RefreshCcw,
  ChevronDown
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const mockRevenueData = [
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 52000 },
  { month: 'Mar', value: 49000 },
  { month: 'Apr', value: 63000 },
  { month: 'May', value: 58000 },
  { month: 'Jun', value: 71000 },
];

const mockMetrics = [
  { name: 'Total Bookings', value: '123', change: '+12.5%', trend: 'up', icon: Calendar },
  { name: 'Active Customers', value: '567', change: '+5.2%', trend: 'up', icon: Users },
  { name: 'Revenue', value: '₹1,23,458', change: '+8.1%', trend: 'up', icon: DollarSign },
  { name: 'Package Sales', value: '156', change: '+15.3%', trend: 'up', icon: Package },
];

const mockTopDestinations = [
  { name: 'Maldives', bookings: 245, revenue: 612500 },
  { name: 'Dubai', bookings: 198, revenue: 495000 },
  { name: 'Singapore', bookings: 167, revenue: 417500 },
  { name: 'Bali', bookings: 156, revenue: 390000 },
  { name: 'Paris', bookings: 134, revenue: 335000 },
];

const ExportMenu = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Download className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Export Report</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <button
              onClick={() => {
                onExport('pdf');
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Export as PDF
            </button>
            <button
              onClick={() => {
                onExport('txt');
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Export as TXT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('This Month');

  const handleExport = (format) => {
    const data = {
      metrics: mockMetrics,
      revenue: mockRevenueData,
      destinations: mockTopDestinations
    };

    if (format === 'txt') {
      const text = `
Analytics Report
Generated on: ${new Date().toLocaleDateString()}

Key Metrics:
${mockMetrics.map(m => `${m.name}: ${m.value} (${m.change})`).join('\n')}

Revenue Overview:
${mockRevenueData.map(d => `${d.month}: $${d.value}`).join('\n')}

Top Destinations:
${mockTopDestinations.map(d => `${d.name}: ${d.bookings} bookings, $${d.revenue}`).join('\n')}
      `.trim();

      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics_report_${new Date().toISOString().split('T')[0]}.txt`;
      link.click();
    } else if (format === 'pdf') {
      console.log('Exporting as PDF:', data);
      alert('PDF export would be implemented with a PDF library in production');
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <ExportMenu onExport={handleExport} />
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <RefreshCcw className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white">
            {timeRange}
            <ChevronDown className="h-4 w-4 ml-2" />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {mockMetrics.map((metric) => (
            <div key={metric.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <metric.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {metric.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {metric.value}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                          <span className="ml-1">{metric.change}</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Revenue Overview</h2>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-500">Monthly Revenue</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Destinations */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Top Destinations</h2>
            <div className="space-y-4">
              {mockTopDestinations.map((destination, index) => (
                <div key={destination.name} className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-8">{index + 1}.</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{destination.name}</span>
                      <span className="text-sm text-gray-500">{destination.bookings} bookings</span>
                    </div>
                    <div className="mt-1 relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                        <div
                          className="bg-blue-500 rounded"
                          style={{ 
                            width: `${(destination.bookings / mockTopDestinations[0].bookings) * 100}%`,
                            transition: 'width 0.3s ease-in-out'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Satisfaction */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Satisfaction</h2>
            <div className="flex items-center justify-center h-48">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Conversion */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Conversion</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Website Visitors</span>
                  <span className="font-medium text-gray-900">15,234</span>
                </div>
                <div className="mt-2 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div className="bg-green-500 w-full"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Inquiries</span>
                  <span className="font-medium text-gray-900">3,845</span>
                </div>
                <div className="mt-2 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div className="bg-green-500 w-3/4"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Bookings</span>
                  <span className="font-medium text-gray-900">1,234</span>
                </div>
                <div className="mt-2 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div className="bg-green-500 w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            <div className="flow-root">
              <ul className="-mb-8">
                {[
                  { event: 'New booking', destination: 'Maldives', time: '5 minutes ago' },
                  { event: 'Booking confirmed', destination: 'Dubai', time: '1 hour ago' },
                  { event: 'Payment received', destination: 'Singapore', time: '2 hours ago' },
                ].map((activity, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index < 2 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5">
                          <div className="text-sm text-gray-500">
                            {activity.event} - {activity.destination}
                            <span className="font-medium text-gray-900 ml-2">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}