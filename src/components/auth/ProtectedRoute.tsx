
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

type UserRole = 'Super Admin' | 'Company Admin' | 'Manager' | 'Employee';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
  children?: ReactNode;
}

export function ProtectedRoute({ 
  allowedRoles, 
  redirectTo = '/login',
  children
}: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has an allowed role
  const hasAllowedRole = allowedRoles.includes(userRole as UserRole);

  if (!hasAllowedRole) {
    // Redirect based on user's role
    switch(userRole) {
      case 'Super Admin':
        return <Navigate to="/super-admin" replace />;
      case 'Company Admin':
        return <Navigate to="/company-admin" replace />;
      case 'Manager':
        return <Navigate to="/manager-dashboard" replace />;
      case 'Employee':
        return <Navigate to="/employee-dashboard" replace />;
      default:
        return <Navigate to={redirectTo} replace />;
    }
  }

  // User is authenticated and has an allowed role
  return children ? <>{children}</> : <Outlet />;
}
