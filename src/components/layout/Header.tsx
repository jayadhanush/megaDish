
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { Button } from "@/components/ui/button";
  import { useStore } from "@/context/StoreContext";
  import { ShoppingCart, User, Menu, X } from "lucide-react";
  import { Badge } from "@/components/ui/badge";

  export function Header() {
    const { isAuthenticated, user, logout, getTotalItems } = useStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const totalItems = getTotalItems();

    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-brand-blue">MegaDish</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-500" />
              ) : (
                <Menu className="h-6 w-6 text-gray-500" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-600 hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Cart */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-2 bg-brand-accent text-white rounded-full text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative ml-3">
                  <div className="flex space-x-2 items-center">
                    <Link
                      to={user?.isAdmin ? "/admin" : "/profile"}
                      className="text-sm font-medium text-gray-600 hover:text-brand-accent"
                    >
                      {user?.name}
                    </Link>
                    <Button variant="ghost" size="sm" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="sm">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white pb-4 px-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-600 hover:text-brand-accent px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-600 hover:text-brand-accent px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-brand-accent px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-brand-accent px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 text-gray-600 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart ({totalItems})</span>
                </Link>
              </div>
              {isAuthenticated ? (
                <>
                  <Link
                    to={user?.isAdmin ? "/admin" : "/profile"}
                    className="text-gray-600 hover:text-brand-accent px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {user?.name}
                  </Link>
                  <Button variant="ghost" onClick={logout} className="justify-start">
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/register"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full justify-start">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    );
  }
