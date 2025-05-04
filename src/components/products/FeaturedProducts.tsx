
import { ProductCard } from './ProductCard';
import { useFeaturedProducts } from '@/hooks/useProducts';

export function FeaturedProducts() {
  const { products, loading, error } = useFeaturedProducts();

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
            <p className="mt-4 text-gray-600">Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
            <p className="mt-4 text-red-500">Error loading featured products</p>
          </div>
        </div>
      </section>
    );
  }

  // if (products.length === 0) {
  //   return (
  //     <section className="py-12 bg-gray-50">
  //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="text-center mb-12">
  //           <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
  //           <p className="mt-4 text-gray-600">No featured products available at the moment.</p>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover our selection of high-quality satellite systems, TVs, security cameras, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
