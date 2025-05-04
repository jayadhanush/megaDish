
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { Star } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-brand-accent transition">{product.name}</h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? 'fill-yellow-400' : 'stroke-yellow-400 fill-none'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm ml-2">({product.numReviews} reviews)</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">₹{product.price.toFixed(2)}</span>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => addToCart(product, 1)}
            disabled={product.countInStock === 0}
          >
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
}
