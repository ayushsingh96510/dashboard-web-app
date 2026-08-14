import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiStar } from 'react-icons/fi';

const RecentProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">No products available</p>
      </div>
    );
  }

  // Get the 5 most recent products
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Products
        </h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {recentProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/50'}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50';
                  }}
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {product.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                      <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        {product.rating?.toFixed(1) || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to={`/products/${product.id}`}
                className="p-2 text-gray-400 hover:text-primary transition-colors"
              >
                <FiEye className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;