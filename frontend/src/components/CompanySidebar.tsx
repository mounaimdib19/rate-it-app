// File: src/components/CompanySidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { FaChartBar, FaComments, FaUser } from 'react-icons/fa';

const CompanySidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/company', icon: FaChartBar, text: 'Dashboard' },
    { path: '/company/reviews', icon: FaComments, text: 'Reviews' },
    { path: '/company/profile', icon: FaUser, text: 'Profile' },
  ];

  return (
    <div className="bg-[#d32323] text-white w-64 min-h-screen flex flex-col py-7 px-2">
      <div className="flex items-center justify-center space-x-2 px-4 mb-6">
        <span className="text-2xl font-extrabold">Company Portal</span>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              location.pathname === item.path
                ? 'bg-white text-[#d32323]'
                : 'text-white hover:bg-[#c41e1e]'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default CompanySidebar;