
import { useState, useEffect } from 'react';
import { Product } from '../types';
import { productService } from '../services/productService';
import { toast } from '@/components/ui/use-toast';

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data: Product[];
        
        if (category && category !== 'all') {
          data = await productService.getProductsByCategory(category);
        } else {
          data = await productService.getProducts();
        }
        
        // Map MongoDB _id to id property for frontend compatibility
        const processedData = data.map(product => ({
          ...product,
          id: product._id || product.id
        }));
        
        setProducts(processedData);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
        toast({
          title: 'Error',
          description: 'Failed to load products. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category]);
  
  return { products, loading, error };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getFeaturedProducts();
        
        // Map MongoDB _id to id property for frontend compatibility
        const processedData = data.map(product => ({
          ...product,
          id: product._id || product.id
        }));
        
        setProducts(processedData);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch featured products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);
  
  return { products, loading, error };
}

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        
        // Map MongoDB _id to id property for frontend compatibility
        const processedProduct = {
          ...data,
          id: data._id || data.id
        };
        
        setProduct(processedProduct);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product details');
        toast({
          title: 'Error',
          description: 'Failed to load product details. The product may not exist.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  return { product, loading, error };
}

// Add a hook to get all categories
export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await productService.getCategories();
        setCategories(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  return { categories, loading, error };
}
