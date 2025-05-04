
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export function CategorySection() {
  const categories: Category[] = [
    {
      id: 'satellite-systems',
      name: 'Satellite Systems',
      image: '/placeholder.svg',
      description: 'High-quality satellite dishes and receivers for crystal-clear TV viewing.',
    },
    {
      id: 'tvs',
      name: 'Televisions',
      image: '/placeholder.svg',
      description: 'Smart TVs and LED displays with superior picture quality.',
    },
    {
      id: 'security',
      name: 'Security Systems',
      image: '/placeholder.svg',
      description: 'Advanced CCTV and wireless security solutions for home and business.',
    },
    {
      id: 'monitors',
      name: 'Computer Monitors',
      image: '/placeholder.svg',
      description: 'High-resolution monitors for work and gaming.',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Product Categories</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Browse our range of electronic products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              to={`/products?category=${category.id}`}
              key={category.id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-accent transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
