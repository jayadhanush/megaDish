
import axios from 'axios';

// Determine if we're in a preview/production environment or local development
const isDevelopment = window.location.hostname === 'localhost';

// Use environment variable for API URL or fallback to a default
const API_URL ='http://localhost:5000/api'; // This is an example URL - use your actual deployed API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle token expiration
    if (response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if token expired
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
