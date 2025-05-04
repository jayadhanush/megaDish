
import api from './api';
import { CartItem, Order } from '../types';

export interface OrderCreateData {
  items: CartItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

export const orderService = {
  createOrder: async (orderData: OrderCreateData): Promise<Order> => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  
  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  
  getMyOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/myorders');
    return response.data;
  },
  
  updateOrderToPaid: async (id: string, paymentResult: any): Promise<Order> => {
    const response = await api.put(`/orders/${id}/pay`, paymentResult);
    return response.data;
  }
};
