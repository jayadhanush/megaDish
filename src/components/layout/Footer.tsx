
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MEGA DISH ANTENNA SATELLITE SYSTEM</h3>
            <p className="text-gray-300 mb-4">
              Your trusted provider of dish antennas, satellite systems, home theaters and more since 1999.
            </p>
            <p className="text-gray-300 mb-1">GSTIN: 33AAHFM0966E1ZH</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="text-gray-300 not-italic">
              <p>No 61& 61A, G6, Ajantha International Building</p>
              <p>Opposite Abirami Theatre, Erode - 638011</p>
              <p className="mt-2">Email: info@megadish.com</p>
              <p>Phone: 076678 84878</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} MEGA DISH ANTENNA SATELLITE SYSTEM. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-300 text-sm hover:text-white">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-300 text-sm hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
