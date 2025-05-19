
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import React from 'react';

interface RequireRoleProps {
  allowedRoles: string[];
  children: React.ReactNode;
  redirectTo?: string;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles, children, redirectTo }) => {
  const { userRole, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(userRole || '')) {
    return <Navigate to={redirectTo || '/'} replace />;
  }
  return <>{children}</>;
};
