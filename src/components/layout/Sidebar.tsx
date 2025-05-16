
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  LayoutDashboard, 
  Banknote, 
  Calendar, 
  Clock, 
  FileText, 
  Award, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  UserPlus,
  PiggyBank,
  Bell,
  Building,
  CreditCard,
  Shield,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/common/Logo';

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
};

const NavItem = ({ to, icon: Icon, label, isCollapsed, isActive }: NavItemProps) => {
  return (
    <Link to={to}>
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start gap-3 font-normal",
          isCollapsed ? "justify-center px-2" : "px-4",
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon size={20} />
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

const NavSection = ({ 
  title, 
  items, 
  isCollapsed 
}: { 
  title: string; 
  items: { to: string; icon: React.ElementType; label: string }[];
  isCollapsed: boolean;
}) => {
  const location = useLocation();
  
  return (
    <div className="mb-6">
      {!isCollapsed && (
        <div className="mb-2 px-4 text-xs uppercase tracking-wider text-sidebar-foreground/60">
          {title}
        </div>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            isActive={location.pathname === item.to}
          />
        ))}
      </div>
    </div>
  );
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { userRole, userEmail } = useAuth();
  const location = useLocation();
  
  // Get dashboard route based on user role
  const getDashboardRoute = () => {
    switch (userRole) {
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
  
  // Main navigation items
  const mainNavItems = [
    { to: getDashboardRoute(), icon: LayoutDashboard, label: "Dashboard" },
    { to: "/employees", icon: Users, label: "People" },
    { to: "/payroll", icon: Banknote, label: "Payroll" },
    { to: "/benefits", icon: PiggyBank, label: "Benefits" },
    { to: "/time-tracking", icon: Clock, label: "Time Tracking" },
    { to: "/leave", icon: Calendar, label: "Time Off" }
  ];

  // Secondary navigation items
  const secondaryNavItems = [
    { to: "/claims", icon: FileText, label: "Expenses" },
    { to: "/documents", icon: FileText, label: "Documents" },
    { to: "/reports", icon: TrendingUp, label: "Reports" },
    { to: "/compliance", icon: Shield, label: "Compliance" },
    { to: "/company", icon: Building, label: "Company" },
    { to: "/settings", icon: Settings, label: "Settings" }
  ];
  
  // Super Admin specific items
  const superAdminItems = [
    { to: "/super-admin", icon: Shield, label: "Platform Admin" },
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar h-screen border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="font-semibold text-lg text-sidebar-primary">
            <Logo size="medium" />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("text-sidebar-foreground", collapsed ? "mx-auto" : "")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {userRole === 'Super Admin' && (
          <NavSection title="Super Admin" items={superAdminItems} isCollapsed={collapsed} />
        )}
        <NavSection title="Main" items={mainNavItems} isCollapsed={collapsed} />
        <NavSection title="Administration" items={secondaryNavItems} isCollapsed={collapsed} />
      </div>
      
      <div className="border-t border-sidebar-border p-4">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-white font-semibold">
              {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">{userRole || 'User'}</p>
              <p className="text-xs text-sidebar-foreground/60">{userEmail || 'user@example.com'}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
