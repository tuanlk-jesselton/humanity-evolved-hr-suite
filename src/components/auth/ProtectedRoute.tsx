
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: Array<'Super Admin' | 'Company Admin' | 'Manager' | 'Employee'>;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  allowedRoles, 
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
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
  return <Outlet />;
}
