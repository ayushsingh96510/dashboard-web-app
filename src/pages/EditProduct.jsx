import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import ProductForm from '../components/products/ProductForm';
import { useProducts } from '../context/ProductContext';
import { productService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProduct } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getById(id);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

const handleSubmit = async (data) => {
  console.log("HANDLE SUBMIT CALLED");
  console.log(data);

  const result = await updateProduct(id, data);

  console.log(result);

  if (result.success) {
    alert("Product updated successfully!");
    navigate(`/products/${id}`);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">{error || 'Product not found'}</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <FiEdit className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Product
        </h1>
      </div>
      <div className="max-w-4xl">
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          submitLabel="Update Product"
        />
      </div>
    </div>
  );
};

export default EditProduct;