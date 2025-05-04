
import { Layout } from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">About MEGA DISH ANTENNA SATELLITE SYSTEM</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Established in 1999, MEGA DISH ANTENNA SATELLITE SYSTEM has grown to become one of the region's most trusted suppliers of electronic equipment and satellite systems. Our business was officially registered in 2017, but our journey began much earlier with a simple mission: to provide high-quality satellite equipment with exceptional customer service.
            </p>
            <p className="text-gray-700 mb-6">
              As technology evolved, so did we. Today, we offer a comprehensive range of products including dish antennas, DVD players, home theaters, and more - all while maintaining our core values of quality, reliability, and customer satisfaction.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Business</h2>
            <p className="text-gray-700 mb-4">
              Located in Erode, Tamil Nadu, we pride ourselves on our extensive industry expertise and commitment to customer service.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Business Details:</h3>
                <ul className="list-disc list-inside text-gray-700 pl-4 space-y-1">
                  <li>GSTIN: 33AAHFM0966E1ZH</li>
                  <li>Year of Establishment: 1999</li>
                  <li>PAN: AAHFM0966E</li>
                  <li>Business Type: Regular</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Business Owners:</h3>
                <ul className="list-disc list-inside text-gray-700 pl-4 space-y-1">
                  <li>SONGAPPAN RAMESH</li>
                  <li>CHANDRASEKARAN SELVI</li>
                  <li>MUTHUSAMYGOUNDER MOHANRAJ</li>
                  <li>PALANISAMY SURYAKUMAR</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Principal Place of Business:</h3>
                <p className="text-gray-700">G-6, NA, METTUR ROAD, ERODE, Erode, Tamil Nadu, 638011</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Expertise</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Satellite Systems</h3>
                <p className="text-gray-700">
                  We specialize in dish antennas and satellite systems, ensuring you get crystal-clear reception and reliable service for all your entertainment needs.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Home Entertainment</h3>
                <p className="text-gray-700">
                  From DVD players to complete home theater systems, we offer a range of products to enhance your audio-visual experience at home.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Expert Installation</h3>
                <p className="text-gray-700">
                  Our team provides professional installation services, ensuring that your equipment is set up correctly for optimal performance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Customer Support</h3>
                <p className="text-gray-700">
                  We're committed to customer satisfaction with reliable after-sales service and support for all the products we offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
