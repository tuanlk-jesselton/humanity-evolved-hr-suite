
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'Super Admin' | 'Company Admin' | 'Manager' | 'Employee';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  userEmail: string | null;
  userId: number | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import axios from '@/api/axios';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    const storedEmail = localStorage.getItem('userEmail');
    const storedUserId = localStorage.getItem('userId');
    
    if (storedAuth === 'true' && storedRole && storedEmail) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setUserEmail(storedEmail);
      setUserId(storedUserId ? parseInt(storedUserId) : null);
      
      // Set the authorization header for all subsequent requests
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
  }, []);

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
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', primaryRole);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('token', token);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return response.data;
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole('');
      setUserEmail(null);
      setUserId(null);
      
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      
      delete axios.defaults.headers.common['Authorization'];
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setUserEmail(null);
    setUserId(null);
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userEmail,
        userId,
        login,
        logout
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
