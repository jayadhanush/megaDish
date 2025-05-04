
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Input } from '@/components/ui/input';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you are looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.countInStock) {
      setQuantity(value);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-6 flex items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'fill-yellow-400' : 'stroke-yellow-400 fill-none'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 ml-2">
                {product.rating.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>

            <div className="text-2xl font-bold text-gray-800 mb-4">
              ₹{product.price.toFixed(2)}
            </div>

            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Category: {product.category}</p>
              <p className="text-sm font-medium">
                Availability: 
                <span className={product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.countInStock > 0 ? ' In Stock' : ' Out of Stock'}
                </span>
              </p>
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center mb-6 space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity:
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.countInStock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20"
                />
              </div>
            )}

            <Button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className="w-full sm:w-auto"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
