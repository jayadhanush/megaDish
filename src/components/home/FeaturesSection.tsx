
import { Shield, Truck, Users, Clock } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-brand-accent" />,
      title: 'Quality Guarantee',
      description: 'All our products come with manufacturer warranty and quality assurance.',
    },
    {
      icon: <Truck className="w-12 h-12 text-brand-accent" />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping with real-time tracking.',
    },
    {
      icon: <Users className="w-12 h-12 text-brand-accent" />,
      title: 'Expert Support',
      description: '24/7 customer service and technical support by industry experts.',
    },
    {
      icon: <Clock className="w-12 h-12 text-brand-accent" />,
      title: 'Professional Installation',
      description: 'Optional professional installation services for all satellite systems.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose MegaDish</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We provide top-quality products and exceptional service to ensure complete customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
