
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, updateCartItemQuantity, removeFromCart, getTotalPrice, getTotalItems, isAuthenticated } = useStore();
  const navigate = useNavigate();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  
  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartItemQuantity(id, quantity);
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 bg-gray-50 p-4 text-sm font-medium text-gray-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 sm:grid-cols-12 py-6 px-4 border-b border-gray-200 items-center"
                  >
                    {/* Product info */}
                    <div className="col-span-6 flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <Link
                          to={`/products/${item.id}`}
                          className="font-medium text-gray-800 hover:text-brand-accent"
                        >
                          {item.name}
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 p-0 h-auto mt-1"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          <span className="text-xs">Remove</span>
                        </Button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center mt-4 sm:mt-0">
                      <div className="sm:hidden text-sm text-gray-500 mb-1">Price:</div>
                      ₹{item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 text-center mt-4 sm:mt-0">
                      <div className="sm:hidden text-sm text-gray-500 mb-1">Quantity:</div>
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          className="h-8 w-12 text-center rounded-none border-x-0"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-center mt-4 sm:mt-0 font-semibold">
                      <div className="sm:hidden text-sm text-gray-500 mb-1">Total:</div>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({totalItems}):</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18% GST):</span>
                    <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>₹{(totalPrice * 1.18).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6" 
                  size="lg" 
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                <div className="mt-4 text-center">
                  <Link
                    to="/products"
                    className="text-sm text-brand-accent hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
