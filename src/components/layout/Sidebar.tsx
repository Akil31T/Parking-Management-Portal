import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  CreditCard,
  TicketIcon,
  Settings
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admins', icon: Users, label: 'Admins' },
    { path: '/parking-areas', icon: Car, label: 'Parking Areas' },
    { path: '/drivers', icon: Users, label: 'Drivers' },
    { path: '/bookings', icon: Calendar, label: 'Bookings' },
    { path: '/transactions', icon: CreditCard, label: 'Transactions' },
    { path: '/support-tickets', icon: TicketIcon, label: 'Support Tickets' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;