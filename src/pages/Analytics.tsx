
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Filter, BarChart3, Calendar, Users, Banknote, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('hr');

  const attendanceData = [
    { month: 'Jan', onTime: 92, late: 8 },
    { month: 'Feb', onTime: 95, late: 5 },
    { month: 'Mar', onTime: 90, late: 10 },
    { month: 'Apr', onTime: 93, late: 7 },
    { month: 'May', onTime: 97, late: 3 },
  ];

  const headcountData = [
    { month: 'Jan', count: 240 },
    { month: 'Feb', count: 245 },
    { month: 'Mar', count: 255 },
    { month: 'Apr', count: 260 },
    { month: 'May', count: 287 },
  ];

  const attritionData = [
    { month: 'Jan', rate: 2.1 },
    { month: 'Feb', rate: 1.8 },
    { month: 'Mar', rate: 2.2 },
    { month: 'Apr', rate: 1.5 },
    { month: 'May', rate: 1.2 },
  ];

  const salaryDistribution = [
    { range: '$0-$3k', value: 15 },
    { range: '$3k-$5k', value: 35 },
    { range: '$5k-$8k', value: 25 },
    { range: '$8k-$12k', value: 15 },
    { range: '$12k+', value: 10 },
  ];

  const leaveData = [
    { month: 'Jan', approved: 45, rejected: 5, pending: 8 },
    { month: 'Feb', approved: 52, rejected: 3, pending: 12 },
    { month: 'Mar', approved: 48, rejected: 7, pending: 5 },
    { month: 'Apr', approved: 55, rejected: 4, pending: 10 },
    { month: 'May', approved: 60, rejected: 2, pending: 15 },
  ];

  const COLORS = ['#8B5CF6', '#F97316', '#0EA5E9', '#10B981', '#EF4444'];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Analytics & Reporting</h1>
            <p className="text-muted-foreground">
              Visualize HR metrics and generate reports
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="grid grid-cols-2 items-center gap-1.5">
            <Select defaultValue="2025">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-departments">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-departments">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="hr" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="hr">
              <Users size={16} className="mr-2" />
              HR Metrics
            </TabsTrigger>
            <TabsTrigger value="payroll">
              <Banknote size={16} className="mr-2" />
              Payroll
            </TabsTrigger>
            <TabsTrigger value="attendance">
              <Clock size={16} className="mr-2" />
              Attendance & Leave
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="hr" className="pt-4">
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Employees</CardTitle>
                  <Users size={18} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">287</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 font-medium">+27</span> from six months ago
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Attrition Rate</CardTitle>
                  <BarChart3 size={18} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 font-medium">-0.9%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
                  <Calendar size={18} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-amber-500 font-medium">+3</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Headcount Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={headcountData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Attrition Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={attritionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="rate" 
                          stroke="#EF4444" 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Salary Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salaryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {salaryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payroll" className="pt-4">
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
                  <Banknote size={18} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$427,850</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 font-medium">+$2,530</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
                  <Banknote size={18} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$6,250</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 font-medium">+$120</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Bonus Payments</CardTitle>
                  <Banknote size={18} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$35,500</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 font-medium">+$12,300</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* More payroll charts would go here */}
          </TabsContent>
          
          <TabsContent value="attendance" className="pt-4">
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="onTime" stackId="a" fill="#10B981" />
                        <Bar dataKey="late" stackId="a" fill="#F97316" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Leave Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={leaveData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="approved" stackId="a" fill="#10B981" />
                        <Bar dataKey="rejected" stackId="a" fill="#EF4444" />
                        <Bar dataKey="pending" stackId="a" fill="#F97316" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* More attendance charts would go here */}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
