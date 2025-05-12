
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, LogOut, User, Settings, UserCog, Shield } from 'lucide-react';

interface AuthMenuProps {
  role?: 'Super Admin' | 'Company Admin' | 'Manager' | 'Admin' | 'Employee';
  username?: string;
}

export function AuthMenu({ role = 'Employee', username = 'Guest User' }: AuthMenuProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add logout logic
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    // Add login logic
  };

  return (
    <>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline">{username}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p>{username}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            {(role === 'Super Admin' || role === 'Company Admin') && (
              <DropdownMenuItem>
                <UserCog className="mr-2 h-4 w-4" />
                <span>User Management</span>
              </DropdownMenuItem>
            )}
            {role === 'Super Admin' && (
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={handleLogin} className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Button>
      )}
    </>
  );
}
