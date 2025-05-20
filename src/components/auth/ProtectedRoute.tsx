
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

type UserRole = 'Super Admin' | 'Company Admin' | 'Manager' | 'Employee';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
  children?: ReactNode;
}

// Helper function to get the dashboard route based on user role
const getDashboardRoute = (role: string): string => {
  switch(role) {
    case 'Super Admin':
      return '/super-admin';
    case 'Company Admin':
      return '/company-admin';
    case 'Manager':
      return '/manager-dashboard';
    case 'Employee':
      return '/employee-dashboard';
    default:
      return '/';
  }
};

export function ProtectedRoute({ 
  allowedRoles, 
  redirectTo = '/login',
  children
}: ProtectedRouteProps) {
  const { isAuthenticated, userRole, loading, isLoggingIn } = useAuth();

  // Show loading state if auth is still being checked or user is logging in
  if (loading || isLoggingIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has an allowed role
  const hasAllowedRole = allowedRoles.includes(userRole as UserRole);

  // If user doesn't have an allowed role, redirect to their dashboard
  if (!hasAllowedRole) {
    const redirectPath = getDashboardRoute(userRole);
    return <Navigate to={redirectPath} replace />;
  }

  // User is authenticated and has an allowed role
  return children ? <>{children}</> : <Outlet />;
}
