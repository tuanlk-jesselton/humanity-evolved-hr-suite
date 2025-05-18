
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
  const { isAuthenticated, userRoles } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has at least one allowed role
  const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role));

  if (!hasAllowedRole) {
    // Redirect to the highest-priority dashboard based on user's roles
    if (userRoles.includes('Super Admin')) {
      return <Navigate to="/super-admin" replace />;
    }
    if (userRoles.includes('Company Admin')) {
      return <Navigate to="/company-admin" replace />;
    }
    if (userRoles.includes('Manager')) {
      return <Navigate to="/manager-dashboard" replace />;
    }
    if (userRoles.includes('Employee')) {
      return <Navigate to="/employee-dashboard" replace />;
    }
    return <Navigate to={redirectTo} replace />;
  }

  // User is authenticated and has an allowed role
  return children ? <>{children}</> : <Outlet />;
}
