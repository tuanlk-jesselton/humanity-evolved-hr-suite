
import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { WelcomeOnboarding } from '@/components/dashboard/WelcomeOnboarding';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const Index = () => {
  const employeeData = [
    { name: 'Jan', count: 240 },
    { name: 'Feb', count: 245 },
    { name: 'Mar', count: 255 },
    { name: 'Apr', count: 260 },
    { name: 'May', count: 287 },
  ];

  const departmentData = [
    { name: 'IT', value: 87 },
    { name: 'Sales', value: 65 },
    { name: 'Marketing', value: 43 },
    { name: 'HR', value: 22 },
    { name: 'Finance', value: 35 },
    { name: 'Operations', value: 35 },
  ];

  const COLORS = ['#8B5CF6', '#F97316', '#0EA5E9', '#10B981', '#EF4444', '#A855F7'];

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
        <WelcomeOnboarding />
        
        <DashboardStats />
        
        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Employee Growth</CardTitle>
                    <CardDescription>Employee count over time</CardDescription>
                  </div>
                  <Tabs defaultValue="monthly">
                    <TabsList>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={employeeData}
                      margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sarah Chen</p>
                      <p className="text-sm text-muted-foreground">Frontend Developer</p>
                    </div>
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">James Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Product Manager</p>
                    </div>
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Emily Johnson</p>
                      <p className="text-sm text-muted-foreground">UX Designer</p>
                    </div>
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={departmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <RecentActivity />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
