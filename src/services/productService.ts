
import api from './api';
import { Product } from '../types';
import { products as sampleProducts } from '../data/products';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products/');   
      console.log('Fetched products from API:', response.data);
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch products from API, using sample data', error);
      return sampleProducts;
    }
  },
  
  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch product from API, using sample data', error);
      const product = sampleProducts.find(p => p.id === id);
      if (product) return product;
      throw new Error('Product not found');
    }
  },
  
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products/featured');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch featured products from API, using sample data', error);
      return sampleProducts.filter(p => p.featured);
    }
  },
  
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch products by category from API, using sample data', error);
      return sampleProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
  },
  
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/search?query=${query}`);
      return response.data;
    } catch (error) {
      console.warn('Failed to search products from API, using sample data', error);
      return sampleProducts.filter(
        p => p.name.toLowerCase().includes(query.toLowerCase()) || 
             p.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  },
  
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch categories from API, using sample data', error);
      // Extract unique categories from sample products
      return Array.from(new Set(sampleProducts.map(p => p.category)));
    }
  },

  createProductReview: async (productId: string, rating: number, comment: string): Promise<any> => {
    try {
      const response = await api.post(`/products/${productId}/reviews`, { rating, comment });
      return response.data;
    } catch (error) {
      console.warn('Failed to create product review', error);
      throw error;
    }
  }
};
