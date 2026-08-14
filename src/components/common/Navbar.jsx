import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPackage, FiBarChart2, FiPlus, FiHome, FiTrendingUp } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: FiHome },
    { to: '/products', label: 'Products', icon: FiPackage },
    { to: '/analytics', label: 'Analytics', icon: FiTrendingUp },
    { to: '/add-product', label: 'Add Product', icon: FiPlus },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <FiPackage className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-800 dark:text-white hidden sm:inline">
                Inventory Dashboard
              </span>
            </Link>

            <div className="hidden md:flex space-x-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === to
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;