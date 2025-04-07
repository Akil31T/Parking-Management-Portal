import React from 'react';

const AppDownload = () => {
  return (
    <div className="py-16 px-4 lg:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Download the app</h2>
          <p className="text-gray-600 mb-8">
            Finding car parks, book and manage your parking from anywhere, in advance or on demand.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-80 transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on App Store" className="h-12" />
            </a>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="App Screenshot" 
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;