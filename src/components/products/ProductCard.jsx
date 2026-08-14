import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import { useProducts } from '../../context/ProductContext';

const ProductCard = ({ product, onDelete }) => {
  const { loading } = useProducts();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FiStar key={i} className="fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <FiStar className="text-gray-300" />
            <FiStar className="absolute top-0 left-0 fill-yellow-400 text-yellow-400 clip-half" />
          </div>
        );
      } else {
        stars.push(<FiStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/200'}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200';
          }}
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <Link
            to={`/products/${product.id}`}
            className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <FiEye className="text-blue-600 dark:text-blue-400" />
          </Link>
          <Link
            to={`/edit-product/${product.id}`}
            className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <FiEdit className="text-green-600 dark:text-green-400" />
          </Link>
          <button
            onClick={() => onDelete(product.id)}
            disabled={loading}
            className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <FiTrash2 className="text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
            {product.name}
          </h3>
          <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">
            {product.category}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              Stock: {product.stock}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating || 0)}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              ({product.rating?.toFixed(1) || 'N/A'})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;