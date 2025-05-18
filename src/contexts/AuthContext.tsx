
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'Super Admin' | 'Company Admin' | 'Manager' | 'Employee';

interface AuthContextType {
  isAuthenticated: boolean;
  userRoles: UserRole[];
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import api from '@/api/axios';
import axios from '@/api/axios';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRoles = localStorage.getItem('userRoles');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedAuth === 'true' && storedRoles && storedEmail) {
      setIsAuthenticated(true);
      setUserRoles(JSON.parse(storedRoles));
      setUserEmail(storedEmail);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      // Giả sử backend trả về: { token, user, roles }
      const { token, user, roles } = response.data;
      setIsAuthenticated(true);
      setUserEmail(email);
      setUserRoles(roles);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRoles', JSON.stringify(roles));
      localStorage.setItem('userEmail', email);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      setIsAuthenticated(false);
      setUserRoles([]);
      setUserEmail(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRoles');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRoles([]);
    setUserEmail(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRoles');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRoles,
        userEmail,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Đảm bảo axios gửi token cho các request khác
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
