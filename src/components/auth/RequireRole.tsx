
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import React from 'react';

type UserRole = 'Super Admin' | 'Company Admin' | 'Manager' | 'Employee';

interface RequireRoleProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  redirectTo?: string;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles, children, redirectTo }) => {
  const { userRole, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(userRole as UserRole)) {
    return <Navigate to={redirectTo || '/'} replace />;
  }
  
  return <>{children}</>;
};
