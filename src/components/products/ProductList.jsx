import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import Pagination from './Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiPackage, FiAlertCircle } from 'react-icons/fi';

const ProductList = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      await deleteProduct(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center">
          <FiAlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <p className="text-red-600 dark:text-red-400 text-lg font-medium">{error}</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Make sure json-server is running: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">npx json-server --watch db.json --port 5000</code>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <SearchBar />
        <FilterDropdown />
      </div>

      {/* Products Grid */}
      {loading && products.length === 0 ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <FiPackage className="w-16 h-16 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">No products found</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-lg">
              <LoadingSpinner size="md" />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <Pagination />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;