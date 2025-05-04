
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/context/StoreContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart } = useStore();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    }
    
    // Redirect to cart if cart is empty
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [user, cart, navigate]);

  if (!user || cart.length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <CheckoutForm />
      </div>
    </Layout>
  );
};

export default Checkout;
