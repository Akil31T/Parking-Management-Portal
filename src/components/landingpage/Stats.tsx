import React from 'react';

const Stats = () => {
  return (
    <div className="py-16 px-4 lg:px-20 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">A <span className="text-emerald-500">greener</span> way to travel</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          In addition to stress-free parking spaces, we're promoting efficient use of existing space as well as a more environmentally sustainable way of living our cities.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-4xl font-bold text-emerald-500">+75,000</h3>
            <p className="text-sm text-gray-600 mt-2">Hours saved looking for parking by helping users through TrueParking app</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-emerald-500">355t</h3>
            <p className="text-sm text-gray-600 mt-2">CO2 emissions saved by booking a space and driving straight to the location</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-emerald-500">+56,000</h3>
            <p className="text-sm text-gray-600 mt-2">Users planned to date, affecting the carbon generated by 8.4 million miles of driving</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;