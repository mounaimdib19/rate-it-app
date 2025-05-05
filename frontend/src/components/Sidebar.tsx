import { Link, useLocation } from 'react-router-dom';
import { FaChartBar, FaComments, FaUsers, FaStore, FaCog, FaFlag, FaBuilding } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: FaChartBar, text: 'Dashboard' },
    { path: '/admin/reviews', icon: FaComments, text: 'Reviews' },
    { path: '/admin/reviewreports', icon: FaFlag, text: 'Reports' },
    { path: '/admin/users', icon: FaUsers, text: 'Users' },
    { path: '/admin/businesses', icon: FaStore, text: 'Businesses' },
    { path: '/admin/company-requests', icon: FaBuilding, text: 'Company Requests' },
  ];

  return (
    <div className="bg-[#d32323] text-white w-64 min-h-screen flex flex-col py-7 px-2">
      <div className="flex items-center justify-center space-x-2 px-4 mb-6">
        <span className="text-2xl font-extrabold">Admin Panel</span>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              (location.pathname === item.path || 
               (item.path === '/admin' && location.pathname === '/admin/'))
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

export default Sidebar;