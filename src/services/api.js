import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - make sure json-server is running');
    } else if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network error - make sure json-server is running on port 5000');
      console.error('Error details:', error.message);
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const productService = {
  getAll: (params) => {
    console.log('Making GET request to /products with params:', params);
    return api.get('/products', { params });
  },
  getById: (id) => {
    console.log(`Making GET request to /products/${id}`);
    return api.get(`/products/${id}`);
  },
  create: (data) => {
    console.log('Making POST request to /products with data:', data);
    return api.post('/products', data);
  },
update: (id, data) => {
  console.log("API UPDATE CALLED");

  return api.put(`/products/${id}`, data);
},
  delete: (id) => {
    console.log(`Making DELETE request to /products/${id}`);
    return api.delete(`/products/${id}`);
  },
};

export default api;