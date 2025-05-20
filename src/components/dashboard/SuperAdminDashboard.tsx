
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
  Server,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Loader2,
  AlertOctagon
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
import { useQuery } from '@tanstack/react-query';
import { dashboardApi, type PlatformStat, type Company, type SystemAlert } from '../../api/dashboard';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

// Skeleton loaders
const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-4 w-32" />
    </CardContent>
  </Card>
);

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-12 w-full" />
    ))}
  </div>
);

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return <Badge variant="default">Active</Badge>;
    case 'inactive':
      return <Badge variant="secondary">Inactive</Badge>;
    case 'trial':
      return <Badge variant="outline">Trial</Badge>;
    case 'overdue':
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getAlertIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'success':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default:
      return <AlertOctagon className="h-4 w-4 text-blue-500" />;
  }
};

function SuperAdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch data using React Query with error handling
  const { data: platformStats, isLoading: isLoadingStats, error: statsError } = useQuery<PlatformStat[]>({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardApi.getPlatformStats,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: companies, isLoading: isLoadingCompanies, error: companiesError } = useQuery<Company[]>({
    queryKey: ['dashboard', 'companies'],
    queryFn: dashboardApi.getCompanies,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: systemAlerts, isLoading: isLoadingAlerts, error: alertsError } = useQuery<SystemAlert[]>({
    queryKey: ['dashboard', 'alerts'],
    queryFn: dashboardApi.getSystemAlerts,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Handle errors
  const hasError = statsError || companiesError || alertsError;
  if (hasError) {
    console.error('Dashboard errors:', { statsError, companiesError, alertsError });
  }

  if (isLoadingStats || isLoadingCompanies || isLoadingAlerts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (statsError || companiesError || alertsError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error loading dashboard data</h2>
          <p className="text-muted-foreground">
            {statsError?.message || companiesError?.message || alertsError?.message}
          </p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Administration</h1>
        <p className="text-muted-foreground">
          Manage the HR Monster platform
        </p>
      </div>

      {/* Platform Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoadingStats ? (
          // Show skeleton loaders while loading
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : statsError ? (
          // Show error message if stats failed to load
          <div className="col-span-4 p-4 text-center text-destructive">
            <AlertCircle className="mx-auto h-6 w-6 mb-2" />
            <p>Failed to load platform statistics. Please try again later.</p>
          </div>
        ) : (
          // Show actual stats
          platformStats?.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">
                  {stat.title === 'Total Companies' && <Building className="h-4 w-4" />}
                  {stat.title === 'Active Users' && <Users className="h-4 w-4" />}
                  {stat.title === 'Active Subscriptions' && <BarChart3 className="h-4 w-4" />}
                  {stat.title === 'Monthly Revenue' && <TrendingUp className="h-4 w-4" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))
        )}
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

        <TabsContent value="companies" className="space-y-4">
          {isLoadingCompanies ? (
            <TableSkeleton rows={5} />
          ) : companiesError ? (
            <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4 text-center text-destructive">
              <AlertCircle className="mx-auto h-6 w-6 mb-2" />
              <p>Failed to load companies. Please try again later.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies?.length ? (
                    companies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{getStatusBadge('active')}</TableCell>
                        <TableCell>Premium</TableCell>
                        <TableCell>24/50</TableCell>
                        <TableCell>{formatDistanceToNow(new Date(company.created_at), { addSuffix: true })}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No companies found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="system" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent system events and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAlerts ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                  ))}
                </div>
              ) : alertsError ? (
                <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4 text-center text-destructive">
                  <AlertCircle className="mx-auto h-6 w-6 mb-2" />
                  <p>Failed to load system alerts. Please try again later.</p>
                </div>
              ) : systemAlerts?.length ? (
                <div className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start p-4 border rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{alert.type}</h4>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No system alerts at this time.
                </div>
              )}
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

export default SuperAdminDashboard;
