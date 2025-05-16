
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'Super Admin' | 'Company Admin' | 'Manager' | 'Employee' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  userEmail: string | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated from localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole') as UserRole;
    const storedEmail = localStorage.getItem('userEmail');
    
    if (storedAuth === 'true' && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setUserEmail(storedEmail);
    }
  }, []);
  
  const login = (email: string, password: string, role: UserRole) => {
    // In a real app, this would validate credentials with an API
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email);
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role as string);
    localStorage.setItem('userEmail', email);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail(null);
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
  };
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userEmail,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
