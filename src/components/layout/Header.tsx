
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { AuthMenu } from '@/components/auth/AuthMenu';

export function Header() {
  return (
    <header className="border-b border-border h-16 flex items-center justify-between px-4 bg-background">
      <div className="flex items-center gap-3 w-full max-w-md">
        <Search size={18} className="text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search employees, payrolls, etc..." 
          className="border-0 focus-visible:ring-0 bg-muted/30 text-sm" 
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <ThemeToggle />
        <AuthMenu role="Super Admin" username="Admin User" />
      </div>
    </header>
  );
}
