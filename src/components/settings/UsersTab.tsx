
import { UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function UsersTab() {
  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Invite and manage users</CardDescription>
          </div>
          <Button>
            <UserCog size={16} className="mr-2" />
            Invite User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  JD
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">john.doe@acmecorp.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">Admin</Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  JS
                </div>
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-sm text-muted-foreground">jane.smith@acmecorp.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-secondary">HR Admin</Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  RJ
                </div>
                <div>
                  <p className="font-medium">Robert Johnson</p>
                  <p className="text-sm text-muted-foreground">robert.johnson@acmecorp.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-muted">Payroll Admin</Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Configure roles and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Admin</p>
                <p className="text-sm text-muted-foreground">Full system access</p>
              </div>
              <Button variant="outline" size="sm">Edit Permissions</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">HR Admin</p>
                <p className="text-sm text-muted-foreground">Employee management, attendance, leave, performance</p>
              </div>
              <Button variant="outline" size="sm">Edit Permissions</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payroll Admin</p>
                <p className="text-sm text-muted-foreground">Payroll processing, claims approval</p>
              </div>
              <Button variant="outline" size="sm">Edit Permissions</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Manager</p>
                <p className="text-sm text-muted-foreground">Team management, approvals, reviews</p>
              </div>
              <Button variant="outline" size="sm">Edit Permissions</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Employee</p>
                <p className="text-sm text-muted-foreground">Self-service portal access</p>
              </div>
              <Button variant="outline" size="sm">Edit Permissions</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
