
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'Super Admin' | 'Company Admin' | 'Manager' | 'Employee';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;  // Changed from userRoles to userRole
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import api from '@/api/axios';
import axios from '@/api/axios';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');  // Changed from userRoles to userRole
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');  // Changed from userRoles to userRole
    const storedEmail = localStorage.getItem('userEmail');
    if (storedAuth === 'true' && storedRole && storedEmail) {
      setIsAuthenticated(true);
      setUserRole(storedRole);  // Changed from setUserRoles to setUserRole
      setUserEmail(storedEmail);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      // Assuming backend returns: { token, user, role }
      const { token, user, role } = response.data;
      setIsAuthenticated(true);
      setUserEmail(email);
      setUserRole(role);  // Changed from setUserRoles to setUserRole
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', role);  // Changed from userRoles to userRole
      localStorage.setItem('userEmail', email);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole('');  // Changed from setUserRoles to setUserRole
      setUserEmail(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');  // Changed from userRoles to userRole
      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');  // Changed from setUserRoles to setUserRole
    setUserEmail(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');  // Changed from userRoles to userRole
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,  // Changed from userRoles to userRole
        userEmail,
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
