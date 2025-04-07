import React from 'react';
import { Search, MapPin } from 'lucide-react';
import TooltipGuarantee from '../TooltipGuarantee';

const Hero = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-20 py-12 bg-gray-50">
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Find and book parking</h1>
        <p className="text-xl text-gray-600 mb-6">in seconds</p>
        
        <div className="flex items-center gap-2 mb-4">
        {/* ✓  <TooltipGuarantee /> */}

          <span className="text-sm text-gray-600">✓ Space availability guarantee</span>
          <span className="text-sm text-gray-600">✓ Satisfaction guarantee</span>
          <span className="text-sm text-gray-600">✓ Swift & trusted brand</span>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b pb-4">
              <MapPin className="text-emerald-500" />
              <input 
                type="text" 
                placeholder="Where would you like to park?"
                className="w-full outline-none"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="date" 
                className="w-full p-2 border rounded"
              />
              <input 
                type="time" 
                className="w-full p-2 border rounded"
              />
            </div>
            <button className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition">
              Search the best parking deals
            </button>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center">
        <img 
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Parking" 
          className="rounded-lg shadow-xl max-w-md w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;