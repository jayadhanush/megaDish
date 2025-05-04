
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { paymentService } from '@/services/paymentService';

// Load Stripe outside of component render to avoid recreating the Stripe object
// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

interface PaymentFormProps {
  amount: number;
  orderId: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, orderId, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Create a payment intent when the component mounts
    const createIntent = async () => {
      try {
        const response = await paymentService.createPaymentIntent({
          amount,
          currency: 'usd',
          orderId
        });
        setClientSecret(response.clientSecret);
      } catch (err) {
        console.error('Error creating payment intent:', err);
        onError('Failed to initialize payment. Please try again.');
      }
    };

    createIntent();
  }, [amount, orderId, onError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement
        }
      });

      if (error) {
        setError(`Payment failed: ${error.message}`);
        onError(error.message || 'Payment processing failed');
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive"
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Call backend to update order status
        await paymentService.confirmPayment(paymentIntent.id, orderId);
        
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully!"
        });
        
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An unexpected error occurred. Please try again.');
      onError('An unexpected error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-md bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || processing || !clientSecret}
      >
        {processing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </Button>
    </form>
  );
};

interface StripePaymentProps {
  amount: number; // Amount in cents
  orderId: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

export const StripePayment: React.FC<StripePaymentProps> = ({ amount, orderId, onSuccess, onError }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Information</h3>
      
      <Elements stripe={stripePromise}>
        <PaymentForm 
          amount={amount} 
          orderId={orderId} 
          onSuccess={onSuccess} 
          onError={onError} 
        />
      </Elements>
      
      <div className="text-xs text-gray-500 mt-4">
        <p>Test Card Number: 4242 4242 4242 4242</p>
        <p>Exp: Any future date (MM/YY)</p>
        <p>CVC: Any 3 digits</p>
      </div>
    </div>
  );
};
