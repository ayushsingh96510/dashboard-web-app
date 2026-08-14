import React from 'react';
import { useProducts } from '../context/ProductContext';
import StatsCards from '../components/dashboard/StatsCards';
import CategoryChart from '../components/dashboard/CategoryChart';
import RecentProducts from '../components/dashboard/RecentProducts';
import ProductTrendsChart from '../components/dashboard/ProductTrendsChart';
import RatingChart from '../components/dashboard/RatingChart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiBarChart2 } from 'react-icons/fi';

const Dashboard = () => {
  const { products, loading, error, fetchProducts } = useProducts();

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
        <FiBarChart2 className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <StatsCards products={products} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6">
        <CategoryChart products={products} />
        <ProductTrendsChart products={products} />
      </div>

      {/* Rating Chart and Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RatingChart products={products} />
        <RecentProducts products={products} />
      </div>
    </div>
  );
};

export default Dashboard;