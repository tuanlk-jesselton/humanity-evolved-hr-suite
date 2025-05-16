
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  Calendar, 
  Clock, 
  UserPlus, 
  Banknote,
  Search,
  Filter,
  Mail,
  Building
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

// Dummy data for pending actions
const pendingApprovals = [
  { id: 1, type: "Leave Request", employee: "Sarah Chen", department: "Engineering", submittedAt: "2023-07-15", status: "Pending" },
  { id: 2, type: "Expense Claim", employee: "Robert Wilson", department: "Finance", submittedAt: "2023-07-14", status: "Pending" },
  { id: 3, type: "Onboarding", employee: "Jessica Taylor", department: "HR", submittedAt: "2023-07-10", status: "In Progress" },
  { id: 4, type: "Leave Request", employee: "David Wong", department: "Engineering", submittedAt: "2023-07-09", status: "Pending" },
];

export function CompanyAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to Acme Inc company administration
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </div>
      
      <DashboardStats />
      
      <div className="grid gap-4 md:grid-cols-3">
        {/* Quick Actions Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Send Announcements
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Banknote className="mr-2 h-4 w-4" />
              Run Payroll
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Building className="mr-2 h-4 w-4" />
              Company Settings
            </Button>
          </CardContent>
        </Card>
        
        {/* Pending Approvals Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">{item.type}</div>
                    <div className="text-sm text-muted-foreground">{item.employee} - {item.department}</div>
                    <div className="text-xs text-muted-foreground">Submitted on {item.submittedAt}</div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{item.status}</Badge>
                    <Button size="sm">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="employees" className="w-full">
        <TabsList>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="leave">Time Off</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search employees..." 
                    className="w-full pl-8" 
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <UserPlus size={16} className="mr-2" />
                    Add Employee
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="py-4 text-center text-muted-foreground">
                Employee directory would be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leave" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Time Off Management</CardTitle>
              <CardDescription>Manage employee leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-4 text-center text-muted-foreground">
                Time off management dashboard would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payroll" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Dashboard</CardTitle>
              <CardDescription>Manage company payroll</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-4 text-center text-muted-foreground">
                Payroll dashboard would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Reports</CardTitle>
              <CardDescription>View and generate company reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-4 text-center text-muted-foreground">
                Reports dashboard would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
