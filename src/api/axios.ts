
import axios from "axios";

// Set default API URL based on environment
// For development, it will use localhost:3000
// For production deployment, use a deployed backend URL
const API_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname.includes('lovable.app') 
    ? 'https://your-deployed-backend-url.com/api' // Replace with your deployed backend URL
    : 'http://localhost:3000/api');

console.log('API URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor to include auth token if it exists
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

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log detailed error information for debugging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Handle specific error cases if needed
    if (error.response?.status === 401) {
      // Unauthorized - could redirect to login or refresh token
      console.log('Session expired or unauthorized');
    }
    
    return Promise.reject(error);
  }
);

export default api;
