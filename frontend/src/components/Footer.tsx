import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';


export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent mb-6">
              ServiceFinder
            </h3>
            <p className="text-gray-400 mb-6">
              Connecting you with trusted local services and professionals in your area.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">For Businesses</h4>
            <ul className="space-y-3">
              <li><a href="../../auth/CompanyRegistration.tsx" className="hover:text-red-500 transition-colors">Business Login</a></li>
    <li><Link to="/register/company" className="hover:text-red-500 transition-colors">Add a Business</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">About</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {year} ServiceFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};