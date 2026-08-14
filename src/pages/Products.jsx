import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductList from '../components/products/ProductList';
import { FiBox } from 'react-icons/fi';

const Products = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <FiBox className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>
      </div>
      <ProductList />
    </div>
  );
};

export default Products;