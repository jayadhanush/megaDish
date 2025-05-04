
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John D.",
      role: "Home Owner",
      content: "I recently had Mega Dish install a complete satellite system and home theatre setup. The quality of both the products and installation service was exceptional. The technicians were professional and knowledgeable.",
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Sarah M.",
      role: "Business Owner",
      content: "We upgraded our office security with Mega Dish's CCTV system. The team helped select the right equipment for our needs and provided excellent training. Their after-sales support has been outstanding.",
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Michael R.",
      role: "IT Manager",
      content: "As an IT professional, I'm particular about the equipment we use. Mega Dish provided us with high-performance monitors and storage servers that met our strict requirements at competitive prices.",
      rating: 4,
      image: "/placeholder.svg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">What Our Customers Say</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. See what our satisfied customers have to say about our products and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full"
            >
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'fill-yellow-400' : 'stroke-yellow-400 fill-none'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <blockquote className="flex-1">
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </blockquote>
              
              <div className="flex items-center mt-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
