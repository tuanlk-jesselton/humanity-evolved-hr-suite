
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Users, 
  Settings, 
  PlusCircle, 
  Search,
  TrendingUp,
  Shield,
  RefreshCcw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Dummy data for companies
const companies = [
  { id: 1, name: "Acme Inc", employees: 145, subscription: "Enterprise", status: "Active", createdAt: "2023-05-15" },
  { id: 2, name: "TechNova LLC", employees: 56, subscription: "Professional", status: "Active", createdAt: "2023-06-22" },
  { id: 3, name: "Global Solutions", employees: 310, subscription: "Enterprise", status: "Active", createdAt: "2023-04-10" },
  { id: 4, name: "Nexus Media", employees: 27, subscription: "Professional", status: "Trial", createdAt: "2023-07-01" },
  { id: 5, name: "DataCorp Systems", employees: 94, subscription: "Standard", status: "Inactive", createdAt: "2023-02-18" },
];

export function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage all companies on the platform
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>
      
      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building size={18} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+12</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users size={18} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,483</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+842</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <TrendingUp size={18} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">96.5%</span> active rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Status</CardTitle>
            <Shield size={18} className="text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Healthy</div>
            <p className="text-xs text-muted-foreground mt-1">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="companies" className="w-full">
        <TabsList>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="platform">Platform Settings</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="companies" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search companies..." 
                    className="w-full pl-8" 
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCcw size={16} className="mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.employees}</TableCell>
                      <TableCell>{company.subscription}</TableCell>
                      <TableCell>{company.createdAt}</TableCell>
                      <TableCell>
                        <Badge variant={
                          company.status === 'Active' ? 'default' : 
                          company.status === 'Trial' ? 'secondary' : 'outline'
                        }>
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscriptions" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Manage platform subscription plans and billing</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Subscription management content */}
              <p className="py-4">Subscription management dashboard would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="platform" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure global platform settings</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Platform settings content */}
              <p className="py-4">Platform settings dashboard would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>View system-wide audit logs and events</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Audit logs content */}
              <p className="py-4">Audit logs would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
