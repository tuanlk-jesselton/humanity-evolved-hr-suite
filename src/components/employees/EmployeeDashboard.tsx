
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddEmployeeDialog } from '@/components/employees/AddEmployeeDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, FileDown, FileUp, Filter, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const dummyEmployees = [
  { id: 1, name: "Sarah Chen", email: "schen@example.com", department: "Engineering", role: "Frontend Developer", status: "Active" },
  { id: 2, name: "Michael Johnson", email: "mjohnson@example.com", department: "Marketing", role: "Marketing Manager", status: "Active" },
  { id: 3, name: "Emily Rodriguez", email: "erodriguez@example.com", department: "Sales", role: "Sales Executive", status: "Active" },
  { id: 4, name: "David Kim", email: "dkim@example.com", department: "Engineering", role: "Backend Developer", status: "On Leave" },
  { id: 5, name: "Jessica Taylor", email: "jtaylor@example.com", department: "HR", role: "HR Specialist", status: "Active" },
  { id: 6, name: "Robert Wilson", email: "rwilson@example.com", department: "Finance", role: "Financial Analyst", status: "Inactive" },
];

export function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">People Management</h1>
          <p className="text-muted-foreground">
            Manage employees and organization structure
          </p>
        </div>
        <AddEmployeeDialog />
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Employees</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="offboarding">Offboarding</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
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
                  <Button variant="outline" size="sm">
                    <FileDown size={16} className="mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileUp size={16} className="mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Link to={`/employees/${employee.id}`} className="font-medium text-primary hover:underline">
                          {employee.name}
                        </Link>
                      </TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>
                        <Badge variant={employee.status === 'Active' ? 'default' : 
                            employee.status === 'On Leave' ? 'warning' : 'secondary'}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <div className="flex items-center gap-1">
              <div className="text-sm text-muted-foreground">Page 1 of 1</div>
            </div>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Employees</CardTitle>
              <CardDescription>Currently active employees at your company</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table as above but filtered for active employees */}
              <p className="py-4 text-center text-muted-foreground">
                Showing active employees only
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="onboarding" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Employees</CardTitle>
              <CardDescription>Employees in the onboarding process</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <UserPlus size={48} className="text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-4">No employees currently in onboarding</p>
              <Button>
                <UserPlus size={16} className="mr-2" />
                Add Employee
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="offboarding" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Offboarding Employees</CardTitle>
              <CardDescription>Employees in the offboarding process</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-4 text-center text-muted-foreground">
                No employees currently in offboarding
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
