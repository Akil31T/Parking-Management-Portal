import React from 'react';
import { Search, Clock, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-emerald-500" />,
      title: "Search from anywhere",
      description: "Book your find parking no matter where you are."
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-500" />,
      title: "Book in advance or on demand",
      description: "Pre-book your space or book it when you arrive."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
      title: "Park with confidence",
      description: "Manage your parking spaces from anywhere."
    }
  ];

  return (
    <div className="py-16 px-4 lg:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold mb-12 text-center">Getting started</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;