import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User } from '../types';
import { toast } from '../components/ui/use-toast';
import { productService } from '../services/productService';
import { authService } from '../services/authService';
import { orderService } from '../services/orderService';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
  
      if (token && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
  
          // Optionally verify the token by fetching the user profile
          const userData = await authService.getProfile();
          setUser(userData);
        } catch (error) {
          console.error('Error verifying token:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
  
      setIsLoading(false);
    };
  
    initializeAuth();
  }, []);
  // Load products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error: any) {
        toast({
          title: 'Error loading products',
          description: error.message || 'Could not load products',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage', error);
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

// filepath: e:\mega-dish-shop-online\src\context\StoreContext.tsx
useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
    setIsAuthenticated(true);
  }
}, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user } = await authService.login(email, password);
      console.log('User logged in:', user);
      setUser(user);
      setIsAuthenticated(true);
      toast({
        title: 'Login successful',
        description: `Welcome back, ${user.name}!`,
      });
     
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.response?.data?.message || 'Invalid email or password',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully',
      });
      localStorage.removeItem('cart');
    } catch (error: any) {
      console.error('Logout error', error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user } = await authService.register(name, email, password);
      setUser(user);
      setIsAuthenticated(true);
      toast({
        title: 'Registration successful',
        description: `Welcome, ${name}!`,
      });
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.response?.data?.message || 'Could not register user',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Check for saved user on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
          
          // Verify token validity by fetching user profile
          const userData = await authService.getProfile();
          setUser(userData);
        } catch (e) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Cart functions below are keeping the same functionality
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity,
          },
        ];
      }
    });

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart`,
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast({
      title: "Removed from cart",
      description: "Item removed from your cart",
    });
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    products,
    cart,
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
