import React from 'react';
import { Link } from 'react-router-dom';
import { Car, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">UseMyParking</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;