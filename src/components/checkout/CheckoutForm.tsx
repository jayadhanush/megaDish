
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentSummary } from '@/components/checkout/PaymentSummary';
import { StripePayment } from '@/components/checkout/StripePayment';
import { orderService, OrderCreateData } from '@/services/orderService';
import { useStore } from '@/context/StoreContext';

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, clearCart } = useStore();
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [orderId, setOrderId] = useState<string>('');
  
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = cartTotal > 100 ? 0 : 10;
  const taxPrice = parseFloat((cartTotal * 0.15).toFixed(2));
  const totalPrice = cartTotal + shippingPrice + taxPrice;
  
  const handleShippingInfoSubmit = (data: typeof shippingInfo) => {
    setShippingInfo(data);
    setStep(2);
  };
  
  const handleCreateOrder = async () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const orderData: OrderCreateData = {
        items: cart,
        shippingAddress: shippingInfo,
        paymentMethod
      };
      
      const order = await orderService.createOrder(orderData);
      setOrderId(order.id);
      
      toast({
        title: "Order Created",
        description: "Your order has been created successfully. Please complete the payment."
      });
      
      setStep(3);
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Order Failed",
        description: "Failed to create order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      // Order is updated on the backend when payment is confirmed
      toast({
        title: "Order Completed",
        description: "Your order has been placed successfully!"
      });
      
      clearCart();
      navigate('/order-success', { state: { orderId } });
    } catch (error) {
      console.error('Error finalizing order:', error);
      toast({
        title: "Error",
        description: "There was an issue finalizing your order.",
        variant: "destructive"
      });
    }
  };
  
  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive"
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-6">
            {step === 1 && (
              <ShippingForm 
                initialValues={shippingInfo}
                onSubmit={handleShippingInfoSubmit}
              />
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Review & Confirm</h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
                    <p>{shippingInfo.country}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="stripe"
                        name="paymentMethod"
                        value="stripe"
                        checked={paymentMethod === 'stripe'}
                        onChange={() => setPaymentMethod('stripe')}
                        className="form-radio"
                      />
                      <label htmlFor="stripe">Credit Card (Stripe)</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <StripePayment
                amount={Math.round(totalPrice * 100)}
                orderId={orderId}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between px-6 py-4 border-t">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
                disabled={loading || step === 3}
              >
                Back
              </Button>
            )}
            
            {step < 3 && (
              <Button 
                onClick={step === 1 ? () => {} : handleCreateOrder}
                disabled={loading || (step === 1 && !shippingInfo.address)}
                className={step === 1 ? 'hidden' : ''}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <div className="md:col-span-1">
        <PaymentSummary
          cartItems={cart}
          subtotal={cartTotal}
          shipping={shippingPrice}
          tax={taxPrice}
          total={totalPrice}
        />
      </div>
    </div>
  );
};
