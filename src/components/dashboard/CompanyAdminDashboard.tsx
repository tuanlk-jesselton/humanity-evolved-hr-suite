
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Banknote,
  Calendar,
  Clock,
  FileText,
  UserPlus,
  LayoutDashboard,
  ChevronRight,
  TrendingUp,
  Bell,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

// Dummy data for company statistics
const companyStats = [
  { title: "Total Employees", value: "48", change: "+3", changeType: "positive" },
  { title: "Leave Requests", value: "8", change: "+2", changeType: "positive" },
  { title: "Expense Claims", value: "12", change: "-5", changeType: "negative" },
  { title: "Open Positions", value: "4", change: "+1", changeType: "positive" }
];

// Dummy data for recent activities
const recentActivities = [
  { id: 1, type: "User Joined", message: "Sarah Chen joined Engineering team", time: "2 hours ago" },
  { id: 2, type: "Leave Request", message: "Michael Johnson requested annual leave", time: "4 hours ago" },
  { id: 3, type: "Payroll", message: "May 2025 payroll has been processed", time: "1 day ago" },
  { id: 4, type: "Expense", message: "5 new expense claims require approval", time: "2 days ago" }
];

// Dummy data for approaching deadlines
const approachingDeadlines = [
  { id: 1, title: "Complete May payroll processing", date: "May 28, 2025", priority: "High" },
  { id: 2, title: "Q2 tax filing", date: "June 15, 2025", priority: "Medium" },
  { id: 3, title: "Renewal of health insurance policy", date: "June 30, 2025", priority: "High" },
];

export function CompanyAdminDashboard() {
  const { userEmail } = useAuth();
  
  // Extract company name from email domain
  const companyName = userEmail ? userEmail.split('@')[1]?.split('.')[0] || 'Your Company' : 'Your Company';
  const displayCompanyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage HR operations for {displayCompanyName}
        </p>
      </div>
      
      {/* Company Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {companyStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {index === 0 ? <Users className="h-4 w-4 text-muted-foreground" /> :
               index === 1 ? <Calendar className="h-4 w-4 text-muted-foreground" /> :
               index === 2 ? <FileText className="h-4 w-4 text-muted-foreground" /> :
               <UserPlus className="h-4 w-4 text-muted-foreground" />}
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
      
      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="justify-between h-auto p-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-3" />
              <span>People Management</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="justify-between h-auto p-4">
            <div className="flex items-center">
              <Banknote className="h-5 w-5 mr-3" />
              <span>Run Payroll</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="justify-between h-auto p-4">
            <div className="flex items-center">
              <UserPlus className="h-5 w-5 mr-3" />
              <span>Add Employee</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="justify-between h-auto p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3" />
              <span>Time Management</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="justify-between h-auto p-4">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-3" />
              <span>Reports</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="justify-between h-auto p-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-3" />
              <span>Documents</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activities">
            <Bell className="h-4 w-4 mr-2" />
            Recent Activities
          </TabsTrigger>
          <TabsTrigger value="payroll">
            <DollarSign className="h-4 w-4 mr-2" />
            Payroll
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Employee Distribution</CardTitle>
                <CardDescription>Breakdown by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Engineering</span>
                      <span className="text-sm text-muted-foreground">42%</span>
                    </div>
                    <Progress value={42} className="h-2 mt-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Marketing</span>
                      <span className="text-sm text-muted-foreground">18%</span>
                    </div>
                    <Progress value={18} className="h-2 mt-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Sales</span>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                    <Progress value={25} className="h-2 mt-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">HR & Admin</span>
                      <span className="text-sm text-muted-foreground">10%</span>
                    </div>
                    <Progress value={10} className="h-2 mt-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Finance</span>
                      <span className="text-sm text-muted-foreground">5%</span>
                    </div>
                    <Progress value={5} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Approaching Deadlines</CardTitle>
                <CardDescription>Important dates and tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approachingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <div className="font-medium">{deadline.title}</div>
                        <div className="text-sm text-muted-foreground">{deadline.date}</div>
                      </div>
                      <Badge variant={deadline.priority === 'High' ? 'destructive' : 'outline'}>
                        {deadline.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activities" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium">{activity.type}</div>
                      <div className="text-sm text-muted-foreground">{activity.message}</div>
                      <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                    </div>
                    <div>
                      <Badge variant="secondary">{activity.type.split(' ')[0]}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payroll" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>May 2025 Payroll</CardTitle>
                <CardDescription>Processing period: May 1 - 31, 2025</CardDescription>
              </div>
              <Button>Run Payroll</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="text-sm font-medium mb-1">Total Payroll</div>
                      <div className="text-3xl font-bold">$178,500.00</div>
                      <div className="text-xs text-muted-foreground mt-1">48 employees</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="text-sm font-medium mb-1">Tax Withholdings</div>
                      <div className="text-3xl font-bold">$45,325.75</div>
                      <div className="text-xs text-muted-foreground mt-1">Federal & State</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <div className="text-sm font-medium mb-1">Benefit Deductions</div>
                      <div className="text-3xl font-bold">$15,430.00</div>
                      <div className="text-xs text-muted-foreground mt-1">Health & Retirement</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-4">Payroll Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">Payroll Processing</span>
                        <div className="text-sm text-muted-foreground">May 28, 2025</div>
                      </div>
                      <Badge>Upcoming</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">Bank Transfer</span>
                        <div className="text-sm text-muted-foreground">May 29, 2025</div>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">Employee Payment Date</span>
                        <div className="text-sm text-muted-foreground">June 1, 2025</div>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
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
