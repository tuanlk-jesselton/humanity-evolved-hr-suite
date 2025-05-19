
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/api/axios';
import { toast } from 'sonner';

type UserRole = 'Super Admin' | 'Company Admin' | 'Manager' | 'Employee';

interface User {
  id: number;
  email: string;
  full_name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  userEmail: string | null;
  userId: number | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    try {
      // Check if user is authenticated from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        return false;
      }
      
      // Set the authorization header for all subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Verify token with backend (if needed)
      // const response = await axios.get('/auth/verify-token');
      
      const storedRole = localStorage.getItem('userRole');
      const storedEmail = localStorage.getItem('userEmail');
      const storedUserId = localStorage.getItem('userId');
      
      if (storedRole && storedEmail && storedUserId) {
        setIsAuthenticated(true);
        setUserRole(storedRole);
        setUserEmail(storedEmail);
        setUserId(parseInt(storedUserId));
        setUser({
          id: parseInt(storedUserId),
          email: storedEmail,
          full_name: localStorage.getItem('userFullName') || undefined,
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Auth verification error:', error);
      logout();
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      
      // Assuming backend returns: { token, user, roles }
      const { token, user, roles } = response.data;
      
      // Get the first role (most important one)
      const primaryRole = Array.isArray(roles) && roles.length > 0 ? roles[0] : 'Employee';
      
      setIsAuthenticated(true);
      setUserEmail(user.email);
      setUserRole(primaryRole);
      setUserId(user.id);
      setUser(user);
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', primaryRole);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('token', token);
      
      if (user.full_name) {
        localStorage.setItem('userFullName', user.full_name);
      }
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return response.data;
    } catch (error: any) {
      setIsAuthenticated(false);
      setUserRole('');
      setUserEmail(null);
      setUserId(null);
      setUser(null);
      
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('userFullName');
      
      delete axios.defaults.headers.common['Authorization'];
      
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setUserEmail(null);
    setUserId(null);
    setUser(null);
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userFullName');
    
    delete axios.defaults.headers.common['Authorization'];
    
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userEmail,
        userId,
        user,
        login,
        logout,
        checkAuth,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Ensure axios sends the token for other requests
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
