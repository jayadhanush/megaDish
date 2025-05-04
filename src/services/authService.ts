
import api from './api';
import { User } from '../types';

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/users/login', { email, password });
    
    // Store token and user info
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('User logged in: in authService',localStorage.getItem('user'));
    }
    
    return response.data;
  },
  
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/users/register', { name, email, password });
    
    // Store token and user info
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getProfile: async (): Promise<User> => {
    const response = await api.get('/users/profile');
    return response.data;
  }
};
