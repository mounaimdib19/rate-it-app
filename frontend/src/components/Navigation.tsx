import React, { useState, useEffect } from 'react';
import { LogIn, Search, Bell } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            ServiceFinder
          </h1>

          <div className="flex-1 max-w-3xl mx-8">
            <div className="flex bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full px-6 py-3 rounded-l-full border-0 focus:ring-2 focus:ring-red-500 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                className="w-48 px-6 py-3 border-l border-gray-200 focus:ring-2 focus:ring-red-500 bg-transparent"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="px-8 py-3 bg-red-600 text-white rounded-r-full hover:bg-red-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-700 hover:text-red-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-gray-700 hover:text-red-600 transition-colors">
              <LogIn className="w-5 h-5" />
            </button>
            <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};