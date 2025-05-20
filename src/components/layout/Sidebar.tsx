
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Calendar, 
  Clock, 
  FileText, 
  Award, 
  Settings,
  CreditCard,
  Home
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSelector } from '@/store/hooks';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  active: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const { user } = useAppSelector(state => state.auth);
  const userRole = user?.roles?.[0] || '';
  
  // Get the first path segment for the active state
  const currentPath = location.pathname.split('/')[1];

  // Define navigation based on user role
  const navigation = {
    'Super Admin': [
      { href: '/super-admin', icon: <Home />, title: 'Dashboard' },
      { href: '/users', icon: <Users />, title: 'Users' },
      { href: '/companies', icon: <Briefcase />, title: 'Companies' },
      { href: '/system-settings', icon: <Settings />, title: 'System Settings' },
    ],
    'Company Admin': [
      { href: '/company-admin', icon: <Home />, title: 'Dashboard' },
      { href: '/employees', icon: <Users />, title: 'Employees' },
      { href: '/payroll', icon: <CreditCard />, title: 'Payroll' },
      { href: '/leave', icon: <Calendar />, title: 'Leave' },
      { href: '/time-tracking', icon: <Clock />, title: 'Time & Attendance' },
      { href: '/claims', icon: <FileText />, title: 'Claims' },
      { href: '/performance', icon: <Award />, title: 'Performance' },
      { href: '/reports', icon: <BarChart3 />, title: 'Reports' },
      { href: '/settings', icon: <Settings />, title: 'Settings' },
    ],
    'Manager': [
      { href: '/manager-dashboard', icon: <Home />, title: 'Dashboard' },
      { href: '/employees', icon: <Users />, title: 'My Team' },
      { href: '/leave', icon: <Calendar />, title: 'Leave Requests' },
      { href: '/time-tracking', icon: <Clock />, title: 'Time & Attendance' },
      { href: '/performance', icon: <Award />, title: 'Performance' },
    ],
    'Employee': [
      { href: '/employee-dashboard', icon: <Home />, title: 'Dashboard' },
      { href: '/leave', icon: <Calendar />, title: 'Leave' },
      { href: '/time-tracking', icon: <Clock />, title: 'Time' },
      { href: '/claims', icon: <FileText />, title: 'Claims' },
      { href: '/payslips', icon: <CreditCard />, title: 'Payslips' },
    ],
  };

  // Get navigation items based on user role
  const navItems = navigation[userRole as keyof typeof navigation] || navigation['Employee'];

  function SidebarItem({ href, icon, title, active }: SidebarItemProps) {
    return (
      <Link
        to={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-accent hover:text-accent-foreground",
          active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )}
      >
        <div className="w-6 h-6">{icon}</div>
        {title}
      </Link>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed z-20 h-full w-64 border-r bg-background transition-all duration-300">
      <ScrollArea className="h-full py-6">
        <div className="px-3 py-2">
          <h2 className="mb-6 px-4 text-lg font-semibold tracking-tight">
            {userRole}
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                active={`/${currentPath}` === item.href}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
