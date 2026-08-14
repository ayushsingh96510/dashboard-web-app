import React, { useEffect,useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, categories } from '../../utils/validationSchemas';
import { useProducts } from '../../context/ProductContext';

const ProductForm = ({ initialData, onSubmit, submitLabel = 'Add Product' }) => {
  const { loading } = useProducts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      price: '',
      stock: '',
      rating: '',
      description: '',
      imageUrl: '',
    },
  });

  const initialized = useRef(false);

  console.log('WATCH:', watch());

  useEffect(() => {
    if (initialData && !initialized.current) {
      reset({
        name: initialData.name || '',
        category: initialData.category || '',
        price: initialData.price,
        stock: initialData.stock,
        rating: initialData.rating,
        description: initialData.description || '',
        imageUrl: initialData.imageUrl || '',
      });

      initialized.current = true;
    }
  }, [initialData, reset]);

  const onFormSubmit = async (data) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      rating: data.rating ? parseFloat(data.rating) : undefined,
    };
    await onSubmit(formattedData);
    if (!initialData) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Name *
          </label>
          <input
            {...register('name')}
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category *
          </label>
          <select
            {...register('category')}
            className={`input-field ${errors.category ? 'border-red-500' : ''}`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price (₹) *
          </label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            step="0.01"
            className={`input-field ${errors.price ? 'border-red-500' : ''}`}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Stock *
          </label>
          <input
            {...register('stock', { valueAsNumber: true })}
            type="number"
            className={`input-field ${errors.stock ? 'border-red-500' : ''}`}
            placeholder="0"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.stock.message}
            </p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rating (0-5)
          </label>
          <input
            {...register('rating', { valueAsNumber: true })}
            type="number"
            step="0.1"
            min="0"
            max="5"
            className={`input-field ${errors.rating ? 'border-red-500' : ''}`}
            placeholder="4.5"
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.rating.message}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Image URL
          </label>
          <input
            {...register('imageUrl')}
            className={`input-field ${errors.imageUrl ? 'border-red-500' : ''}`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.imageUrl && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.imageUrl.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description *
        </label>
        <textarea
          {...register('description')}
          rows="4"
          className={`input-field ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Enter product description (minimum 10 characters)"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-8 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
