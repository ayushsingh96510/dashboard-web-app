import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import ProductForm from '../components/products/ProductForm';
import { useProducts } from '../context/ProductContext';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const handleSubmit = async (data) => {
    const result = await addProduct(data);
    if (result.success) {
      alert('Product added successfully!');
      navigate('/products');
    } else {
      alert('Failed to add product: ' + result.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <FiPlus className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Add New Product
        </h1>
      </div>
      <div className="max-w-4xl">
        <ProductForm onSubmit={handleSubmit} submitLabel="Add Product" />
      </div>
    </div>
  );
};

export default AddProduct;