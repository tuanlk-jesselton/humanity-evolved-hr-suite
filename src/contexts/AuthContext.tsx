
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from '@/api/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { User, LoginResponse, AuthContextType } from '../types/auth';

// Types are now imported from '@/types/auth'



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const navigate = useNavigate();

  // Initialize axios with token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    // Clean up on unmount
    return () => {
      delete axios.defaults.headers.common['Authorization'];
    };
  }, []);

  // Save tokens to localStorage
  const saveAuthData = useCallback((accessToken: string, refreshToken: string) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }, []);

  // Clear auth data from localStorage
  const clearAuthData = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserRole('');
    setUserEmail(null);
    setUserId(null);
    setUser(null);
    clearAuthData();
    
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userFullName');
    
    delete axios.defaults.headers.common['Authorization'];
    
    navigate('/login');
    
    toast.success('You have been logged out.');
  }, [clearAuthData, navigate]);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!token) {
      return false;
    }
    
    try {
      // Set the token for this request
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Try to get the current user
      const response = await axios.get('/auth/me');
      if (response.data) {
        setIsAuthenticated(true);
        setUserRole(response.data.roles?.[0] || '');
        setUserEmail(response.data.email);
        setUserId(response.data.id);
        setUser(response.data);
        return true;
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      
      // If the token is expired, try to refresh it
      if (axiosError.response?.status === 401 && refreshToken) {
        try {
          const refreshResponse = await axios.post('/auth/refresh-token', { refreshToken });
          
          if (refreshResponse.data.accessToken) {
            saveAuthData(refreshResponse.data.accessToken, refreshResponse.data.refreshToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`;
            
            // Retry the original request
            const retryResponse = await axios.get('/auth/me');
            if (retryResponse.data) {
              setIsAuthenticated(true);
              setUserRole(retryResponse.data.roles?.[0] || '');
              setUserEmail(retryResponse.data.email);
              setUserId(retryResponse.data.id);
              setUser(retryResponse.data);
              return true;
            }
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          logout();
        }
      } else {
        console.error('Auth check failed:', error);
        logout();
      }
    }
    
    return false;
  }, [logout, saveAuthData]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoggingIn(true);
      setLoading(true);
      const response = await axios.post<{
        token: string;
        user: { id: number; email: string; fullName: string | null };
        roles: string[];
      }>('/auth/login', { email, password });
  
      if (response.data.token) {
        const userRole = response.data.roles[0] || '';
        
        // Save all data to localStorage first
        saveAuthData(response.data.token, response.data.token);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userEmail', response.data.user.email);
        localStorage.setItem('userId', response.data.user.id.toString());
        if (response.data.user.fullName) {
          localStorage.setItem('userFullName', response.data.user.fullName);
        }
        
        // Then update state
        setIsAuthenticated(true);
        setUserRole(userRole);
        setUserEmail(response.data.user.email);
        setUserId(response.data.user.id);
        setUser(response.data.user);
  
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  
        return { 
          success: true, 
          userRole: userRole,
          user: response.data.user
        };
      }
  
      return { success: false, error: 'No token received' };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      console.error('Login error:', error);
      const errorMessage = axiosError.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
      setIsLoggingIn(false);
    }
  }, [saveAuthData]);

  useEffect(() => {
    console.log('AuthProvider mounted, checking authentication status...');
    let isMounted = true;
    
    const verifyAuth = async () => {
      try {
        const isAuth = await checkAuth();
        if (isMounted) {
          console.log('Authentication check complete, isAuthenticated:', isAuth);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error during authentication check:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

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
        loading,
        isLoggingIn
      }}
    >
      {!loading ? children : (
        <div className="flex items-center justify-center min-h-screen">
          <div>Loading...</div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

// AuthProvider handles token management and authentication state

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
