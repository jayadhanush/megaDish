import { Layout } from '@/components/layout/Layout';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

        {/* Centered and Wider Get In Touch Box */}
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-brand-accent mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Our Location</h3>
                    <p className="text-gray-600">
                      No 61& 61A, G6, Ajantha International Building<br />
                      Opposite Abirami Theatre<br />
                      Erode - 638011
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-brand-accent mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Phone Number</h3>
                    <p className="text-gray-600">076678 84878</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-brand-accent mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Email Address</h3>
                    <p className="text-gray-600">info@megadish.com</p>
                    <p className="text-gray-600">megadisherode11@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-brand-accent mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-gray-200 w-full h-96 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.8522141268845!2d77.71665707505022!3d11.345503188839993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f39d47a746d%3A0x53354e4630000000!2sMega%20Dish%20Antenna%20and%20Satelite%20Systems!5e0!3m2!1sen!2sin!4v1746369391901!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
