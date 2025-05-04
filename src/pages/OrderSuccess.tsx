
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { cart } = useStore();
  
  // Redirect if someone accesses this page directly without placing an order
  useEffect(() => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  }, [cart, navigate]);

  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
  const orderDate = new Date().toLocaleDateString();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Successful!</h1>
          
          <p className="text-gray-600 text-lg mb-6">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order Number:</span>
              <span>{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{orderDate}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8">
            We've sent a confirmation email with all the details of your order. 
            You will receive another notification when your order ships.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/products">
              <Button variant="outline" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/profile">
              <Button className="w-full sm:w-auto">
                View Order Status
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
