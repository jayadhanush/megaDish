
import api from './api';

export interface PaymentIntentData {
  amount: number;
  currency: string;
  orderId: string;
}

export const paymentService = {
  // Create a payment intent using Stripe
  createPaymentIntent: async (paymentData: PaymentIntentData) => {
    try {
      const response = await api.post('/payments/create-intent', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  },

  // Confirm payment success
  confirmPayment: async (paymentIntentId: string, orderId: string) => {
    try {
      const response = await api.post('/payments/confirm', { 
        paymentIntentId, 
        orderId 
      });
      return response.data;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  }
};
