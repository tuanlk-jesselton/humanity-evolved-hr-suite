
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building,
  Users,
  Settings,
  Shield,
  PlusCircle,
  BarChart3,
  TrendingUp,
  Globe,
  Bell,
  Database,
  Server
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';

// Dummy data for platform statistics
const platformStats = [
  { title: "Total Companies", value: "24", change: "+3", changeType: "positive" },
  { title: "Total Users", value: "1,257", change: "+42", changeType: "positive" },
  { title: "Active Subscriptions", value: "22", change: "+1", changeType: "positive" },
  { title: "System Health", value: "99.8%", change: "+0.2%", changeType: "positive" }
];

// Dummy data for companies
const companies = [
  { id: 1, name: "TechCorp Inc.", employees: 253, subscription: "Enterprise", status: "Active" },
  { id: 2, name: "Global Marketing Ltd.", employees: 87, subscription: "Professional", status: "Active" },
  { id: 3, name: "Innovative Solutions", employees: 124, subscription: "Professional", status: "Active" },
  { id: 4, name: "Startup Ventures", employees: 32, subscription: "Basic", status: "Trial" },
  { id: 5, name: "Creative Agency", employees: 45, subscription: "Professional", status: "Overdue" },
];

// Dummy data for system alerts
const systemAlerts = [
  { id: 1, type: "Database", message: "Database backup completed successfully", level: "info", time: "2 hours ago" },
  { id: 2, type: "Security", message: "Failed login attempts detected from IP 192.168.1.245", level: "warning", time: "4 hours ago" },
  { id: 3, type: "Performance", message: "API response time increased by 15%", level: "warning", time: "1 day ago" },
  { id: 4, type: "System", message: "Scheduled maintenance completed", level: "info", time: "2 days ago" },
];

export function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Administration</h1>
        <p className="text-muted-foreground">
          Manage the HumanityHR platform
        </p>
      </div>
      
      {/* Platform Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {index === 0 ? <Building className="h-4 w-4 text-muted-foreground" /> :
               index === 1 ? <Users className="h-4 w-4 text-muted-foreground" /> :
               index === 2 ? <TrendingUp className="h-4 w-4 text-muted-foreground" /> :
               <Server className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-xs flex items-center ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'positive' ? 
                  <TrendingUp className="h-3 w-3 mr-1" /> : 
                  <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                }
                {stat.change} last 30 days
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
          <Building className="h-6 w-6" />
          <span>Add Company</span>
        </Button>
        
        <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
          <Settings className="h-6 w-6" />
          <span>Platform Settings</span>
        </Button>
        
        <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
          <Database className="h-6 w-6" />
          <span>Database Management</span>
        </Button>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="companies" className="w-full">
        <TabsList>
          <TabsTrigger value="companies">
            <Building className="h-4 w-4 mr-2" />
            Companies
          </TabsTrigger>
          <TabsTrigger value="system">
            <Shield className="h-4 w-4 mr-2" />
            System Status
          </TabsTrigger>
          <TabsTrigger value="subscriptions">
            <Globe className="h-4 w-4 mr-2" />
            Subscriptions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="companies" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Companies</CardTitle>
                <CardDescription>Manage all companies on the platform</CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Company
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.employees}</TableCell>
                      <TableCell>{company.subscription}</TableCell>
                      <TableCell>
                        <Badge variant={
                          company.status === 'Active' ? 'default' :
                          company.status === 'Trial' ? 'secondary' : 'destructive'
                        }>
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent system events and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium">{alert.type}</div>
                      <div className="text-sm text-muted-foreground">{alert.message}</div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                    </div>
                    <div>
                      <Badge variant={alert.level === 'warning' ? 'destructive' : 'secondary'}>
                        {alert.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Resources</CardTitle>
              <CardDescription>Server and system resource usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">CPU Usage</span>
                    <span className="text-sm text-muted-foreground">35%</span>
                  </div>
                  <Progress value={35} className="h-2 mt-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Memory Usage</span>
                    <span className="text-sm text-muted-foreground">62%</span>
                  </div>
                  <Progress value={62} className="h-2 mt-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Database Space</span>
                    <span className="text-sm text-muted-foreground">48%</span>
                  </div>
                  <Progress value={48} className="h-2 mt-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Storage Usage</span>
                    <span className="text-sm text-muted-foreground">53%</span>
                  </div>
                  <Progress value={53} className="h-2 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscriptions" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Statistics</CardTitle>
              <CardDescription>Overview of platform subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="text-sm font-medium mb-1">Basic Plans</div>
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-xs text-muted-foreground mt-1">$499/mo total</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="text-sm font-medium mb-1">Professional Plans</div>
                      <div className="text-2xl font-bold">14</div>
                      <div className="text-xs text-muted-foreground mt-1">$4,199/mo total</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="text-sm font-medium mb-1">Enterprise Plans</div>
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground mt-1">$5,997/mo total</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Monthly Recurring Revenue</h3>
                  <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Chart Placeholder</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
