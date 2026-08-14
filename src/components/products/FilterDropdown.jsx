import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { useProducts } from '../../context/ProductContext';
import { categories, sortOptions } from '../../utils/validationSchemas';

const FilterDropdown = () => {
  const { filters, setFilters } = useProducts();

  const handleCategoryChange = (e) => {
    setFilters({ category: e.target.value });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value.startsWith('-')) {
      setFilters({ sortBy: value.substring(1), sortOrder: 'desc' });
    } else {
      setFilters({ sortBy: value, sortOrder: 'asc' });
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = filters.category || filters.search;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center space-x-2">
        <FiFilter className="text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filters:
        </span>
      </div>

      {/* Category Filter */}
      <select
        value={filters.category}
        onChange={handleCategoryChange}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Sort Filter */}
      <select
        value={filters.sortOrder === 'desc' ? `-${filters.sortBy}` : filters.sortBy}
        onChange={handleSortChange}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            Sort: {option.label}
          </option>
        ))}
      </select>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center space-x-1 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <FiX className="w-4 h-4" />
          <span>Clear Filters</span>
        </button>
      )}
    </div>
  );
};

export default FilterDropdown;