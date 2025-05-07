
import api from './api';
import { Product, Order, User } from '../types';

export interface ProductCreateData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  countInStock: number;
  featured?: boolean;
}

export const adminService = {
  // Product management
  createProduct: async (productData: ProductCreateData): Promise<Product> => {
    const response = await api.post('/admin/products', productData);
    return response.data;
  },
  
  updateProduct: async (id: string, productData: Partial<ProductCreateData>): Promise<Product> => {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  },
  
  deleteProduct: async (id: string): Promise<{ success: boolean; message: string }> => {
    console.log("Deleting product with ID:", id); // Debugging line
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  },
  
  // User management
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  
  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },
  
  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },
  
  deleteUser: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },
  
  // Order management
  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get('/admin/orders');
    return response.data;
  },
  
  updateOrderStatus: async (id: string, statusData: { isDelivered: boolean }): Promise<Order> => {
    const response = await api.put(`/admin/orders/${id}/status`, statusData);
    return response.data;
  },
  
  // Analytics
  getAnalytics: async () => {
    const response = await api.get('/admin/analytics');
    return response.data;
  },

  getCategory: async () => {
    const categoryCount = {};
    const response = await api.get('/products/');
  
    response.data.forEach(product => {
      const category = product.category;
      if (category in categoryCount) {
        categoryCount[category]++;
      } else {
        categoryCount[category] = 1;
      }
    });
    const categoryArray = Object.entries(categoryCount).map(([category, count]) => ({
      name: category,
      value: count,
    }));
    return categoryArray;

  }
  
};
