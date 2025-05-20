export type UserRole = 'Super Admin' | 'Company Admin' | 'Manager' | 'Employee';

export interface User {
  id: number;
  email: string;
  full_name?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  roles: string[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  userEmail: string | null;
  userId: number | null;
  user: User | null;
  login: (email: string, password: string) => Promise<{ 
    success: boolean; 
    error?: string; 
    userRole?: string; 
    user?: User 
  }>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  loading: boolean;
  isLoggingIn: boolean;
}
