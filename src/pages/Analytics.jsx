import React, { useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import StatsCards from '../components/dashboard/StatsCards';
import CategoryChart from '../components/dashboard/CategoryChart';
import ProductTrendsChart from '../components/dashboard/ProductTrendsChart';
import RatingChart from '../components/dashboard/RatingChart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiTrendingUp } from 'react-icons/fi';

const Analytics = () => {
  const { products, loading, error, fetchProducts } = useProducts();

  // Calculate additional analytics
  const analytics = useMemo(() => {
    if (!products || products.length === 0) {
      return {
        topRated: [],
        mostStocked: [],
        totalValue: 0,
        averageStock: 0,
      };
    }

    const sortedByRating = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    const sortedByStock = [...products].sort((a, b) => b.stock - a.stock);
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const averageStock = products.reduce((sum, p) => sum + p.stock, 0) / products.length;

    return {
      topRated: sortedByRating.slice(0, 5),
      mostStocked: sortedByStock.slice(0, 5),
      totalValue,
      averageStock,
    };
  }, [products]);

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button
          onClick={() => fetchProducts(1)}
          className="mt-4 btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <FiTrendingUp className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
      </div>

      {/* Stats Cards */}
      <StatsCards products={products} />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <CategoryChart products={products} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductTrendsChart products={products} />
          <RatingChart products={products} />
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Rated Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Rated Products
          </h3>
          <div className="space-y-4">
            {analytics.topRated.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-yellow-500">⭐</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.rating?.toFixed(1) || 'N/A'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Stocked Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Most Stocked Products
          </h3>
          <div className="space-y-4">
            {analytics.mostStocked.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {product.stock} units
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Inventory Value
          </h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            ₹{analytics.totalValue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Average Stock per Product
          </h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {analytics.averageStock.toFixed(1)} units
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;