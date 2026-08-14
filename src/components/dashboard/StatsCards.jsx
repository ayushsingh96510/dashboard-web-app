import React from 'react';
import { 
  FiPackage, 
  FiTag, 
  FiDollarSign, 
  FiTrendingUp,
  FiAlertCircle
} from 'react-icons/fi';


import { BiRupee } from 'react-icons/bi'; // Bootstrap variant

const StatsCards = ({ products }) => {
  const calculateStats = () => {
    if (!products || products.length === 0) {
      return {
        totalProducts: 0,
        totalCategories: 0,
        averagePrice: 0,
        totalStockValue: 0,
        lowStockItems: 0,
      };
    }

    const categories = new Set(products.map(p => p.category));
    const totalProducts = products.length;
    const totalCategories = categories.size;
    const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
    const averagePrice = totalPrice / totalProducts;
    const totalStockValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const lowStockItems = products.filter(p => p.stock < 10).length;

    return {
      totalProducts,
      totalCategories,
      averagePrice,
      totalStockValue,
      lowStockItems,
    };
  };

  const stats = calculateStats();

  const cards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FiPackage,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total Categories',
      value: stats.totalCategories,
      icon: FiTag,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Average Price',
      value: `₹${stats.averagePrice.toFixed(2)}`,
      icon: BiRupee, // Using the Bootstrap variant for average price
      color: 'bg-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Stock Value',
      value: `₹${stats.totalStockValue.toFixed(2)}`,
      icon: FiTrendingUp,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockItems,
      icon: FiAlertCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.textColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;