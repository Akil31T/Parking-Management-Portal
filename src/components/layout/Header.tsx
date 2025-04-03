import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out"); // Replace with actual logout logic
    setIsOpen(false);
    navigate("/");

  };
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">UseMyParking</span>
          </Link>

          <div className="flex items-center space-x-4 gap-4">
            <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center w-full bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Do you want to logout?
                  </h2>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      No
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Yes, Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;