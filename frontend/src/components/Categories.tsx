import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, ShoppingBag, Sparkles, Target, Scissors, Car, Home, MoreHorizontal } from 'lucide-react';

export const Categories: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Restaurants', icon: <Utensils className="w-8 h-8" /> },
    { name: 'Shopping', icon: <ShoppingBag className="w-8 h-8" /> },
    { name: 'Nightlife', icon: <Sparkles className="w-8 h-8" /> },
    { name: 'Active Life', icon: <Target className="w-8 h-8" /> },
    { name: 'Beauty & Spas', icon: <Scissors className="w-8 h-8" /> },
    { name: 'Automotive', icon: <Car className="w-8 h-8" /> },
    { name: 'Home Services', icon: <Home className="w-8 h-8" /> },
    { name: 'More', icon: <MoreHorizontal className="w-8 h-8" /> }
  ];

  const handleCategoryClick = (categoryName: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('category', categoryName);
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Popular Categories
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="group relative overflow-hidden rounded-2xl bg-white hover:bg-red-50 transition-all duration-300 p-8 border border-gray-100 hover:border-red-200 hover:shadow-xl cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-xl bg-red-50 group-hover:bg-white transition-colors duration-300">
                  <div className="text-red-500">{category.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;