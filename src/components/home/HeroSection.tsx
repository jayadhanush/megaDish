
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-brand-blue to-blue-900 text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Superior Satellite &amp; Entertainment Solutions
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-100">
              Discover premium satellite systems, TVs, and security solutions for your home and business needs. Cutting-edge technology, professional installation.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-blue">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <img
              src="/placeholder.svg"
              alt="Satellite Dish"
              className="max-w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
