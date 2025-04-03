import React from 'react';
import { BarChart, Users, Car, CreditCard } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,234',
      icon: BarChart,
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: '567',
      icon: Users,
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Available Spots',
      value: '89',
      icon: Car,
      change: '-5.1%',
      changeType: 'negative'
    },
    {
      title: 'Revenue',
      value: '$12,345',
      icon: CreditCard,
      change: '+15.3%',
      changeType: 'positive'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-8 w-8 text-blue-600" />
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h2>
          <p className="text-gray-500">Booking chart will be implemented here</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <p className="text-gray-500">Revenue chart will be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;