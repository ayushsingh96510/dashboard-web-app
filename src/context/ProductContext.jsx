import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { productService } from '../services/api';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const initialFilters = {
  search: '',
  category: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export const ProductProvider = ({ children }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFiltersState] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
    totalPages: 0,
  });

  const fetchProducts = useCallback(async (page = pagination.currentPage, options = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // json-server v1 uses _per_page (not _limit), _sort with - prefix for desc (not _order),
      // and returns { data, items, pages, ... } when paginated instead of a plain array.
      const params = {};

      if (!options.fetchAll) {
        params._page = page;
        params._per_page = pagination.itemsPerPage;
      }

      if (filters.sortBy) {
        params._sort = filters.sortOrder === 'desc'
          ? `-${filters.sortBy}`
          : filters.sortBy;
      }

      if (filters.search?.trim()) {
        params['name:contains'] = filters.search.trim();
      }

      if (filters.category) {
        params.category = filters.category;
      }

      const response = await productService.getAll(params);

      const responseData = response.data;
      let productsList = [];
      let totalItems = 0;

      if (Array.isArray(responseData)) {
        productsList = responseData;
        totalItems = responseData.length;
      } else if (responseData?.data) {
        productsList = responseData.data;
        totalItems = responseData.items ?? responseData.data.length;
      }

      setProducts(productsList);
      setPagination(prev => {
        const nextPage = options.fetchAll ? 1 : page;
        const nextTotalPages = options.fetchAll
          ? 1
          : Math.ceil(totalItems / prev.itemsPerPage) || 1;

        if (
          prev.currentPage === nextPage &&
          prev.totalItems === totalItems &&
          prev.totalPages === nextTotalPages
        ) {
          return prev;
        }

        return {
          ...prev,
          currentPage: nextPage,
          totalItems,
          totalPages: nextTotalPages,
        };
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please make sure json-server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.itemsPerPage]);

  const addProduct = async (productData) => {
    try {
      setLoading(true);
      const response = await productService.create({
        ...productData,
        createdAt: new Date().toISOString(),
      });
      setProducts(prev => [response.data, ...prev]);
      setPagination(prev => ({
        ...prev,
        totalItems: prev.totalItems + 1,
        totalPages: Math.ceil((prev.totalItems + 1) / prev.itemsPerPage),
      }));
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

const updateProduct = async (id, productData) => {
  console.log("UPDATE PRODUCT CALLED");
  console.log(id);
  console.log(productData);
  try {
    setLoading(true);

    console.log("ID:", id);
    console.log("DATA:", productData);

    const response = await productService.update(id, {
   id,
   ...productData
});

    console.log("RESPONSE:", response.data);

    setProducts(prev =>
      prev.map(product =>
        String(product.id) === String(id)
          ? response.data
          : product
      )
    );

    return { success: true, data: response.data };
  } catch (err) {
    console.error(err);
  }
};

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await productService.delete(id);
      setProducts(prev => prev.filter(product => product.id !== id));
      setPagination(prev => ({
        ...prev,
        totalItems: prev.totalItems - 1,
        totalPages: Math.ceil((prev.totalItems - 1) / prev.itemsPerPage),
      }));
      return { success: true };
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const setFilters = useCallback((newFilters) => {
    setFiltersState(prev => {
      const next = { ...prev, ...newFilters };
      const hasChanges = Object.keys(newFilters).some((key) => prev[key] !== next[key]);
      return hasChanges ? next : prev;
    });
    setPagination(prev => (prev.currentPage === 1 ? prev : { ...prev, currentPage: 1 }));
  }, []);

  const setPage = useCallback((page) => {
    setPagination(prev => {
      if (page < 1 || page > prev.totalPages || page === prev.currentPage) {
        return prev;
      }
      return { ...prev, currentPage: page };
    });
  }, []);

  // Fetch products when filters, page, or route changes
  useEffect(() => {
    const isOverviewPage = location.pathname === '/' || location.pathname === '/analytics';
    fetchProducts(pagination.currentPage, { fetchAll: isOverviewPage });
  }, [filters, pagination.currentPage, fetchProducts, location.pathname]);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      filters,
      pagination,
      fetchProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      setFilters,
      setPage,
    }),
    [
      products,
      loading,
      error,
      filters,
      pagination,
      fetchProducts,
      setFilters,
      setPage,
    ]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};