import { z } from 'zod';

export const productSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  category: z.string()
    .min(1, 'Category is required'),
  
  price: z.number()
    .positive('Price must be positive')
    .max(999999.99, 'Price must be less than 1,000,000'),
  
  stock: z.number()
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .max(999999, 'Stock must be less than 1,000,000'),
  
  rating: z.number()
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating cannot exceed 5')
    .optional(),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  
  imageUrl: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
});

export const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Automotive',
];

export const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: '-name', label: 'Name (Z-A)' },
  { value: 'price', label: 'Price (Low-High)' },
  { value: '-price', label: 'Price (High-Low)' },
  { value: 'rating', label: 'Rating (Low-High)' },
  { value: '-rating', label: 'Rating (High-Low)' },
  { value: 'createdAt', label: 'Newest First' },
  { value: '-createdAt', label: 'Oldest First' },
];