
import { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';
import { Users, Calendar, Clock, FileText, CreditCard, Award, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompanyAdmin() {
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    document.title = 'Company Admin Dashboard';
  }, []);

  const stats = [
    { 
      title: 'Employees', 
      value: '143', 
      description: 'Total active employees',
      icon: <Users className="h-6 w-6 text-primary" />,
      link: '/employees'
    },
    { 
      title: 'Leave Requests', 
      value: '12', 
      description: 'Pending approvals',
      icon: <Calendar className="h-6 w-6 text-primary" />,
      link: '/leave'
    },
    { 
      title: 'Time Entries', 
      value: '98%', 
      description: 'Completion rate (this week)',
      icon: <Clock className="h-6 w-6 text-primary" />,
      link: '/time-tracking'
    },
    { 
      title: 'Claims', 
      value: '8', 
      description: 'Pending approvals',
      icon: <FileText className="h-6 w-6 text-primary" />,
      link: '/claims'
    }
  ];

  const quickAccess = [
    {
      title: 'Payroll',
      description: 'Run payroll and manage compensation',
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      link: '/payroll'
    },
    {
      title: 'Performance',
      description: 'Manage reviews and feedback',
      icon: <Award className="h-10 w-10 text-primary" />,
      link: '/performance'
    },
    {
      title: 'Reports',
      description: 'View HR analytics and insights',
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      link: '/reports'
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.full_name || 'Admin'}</h1>
          <p className="text-muted-foreground">Here's what's happening with your company today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Link to={stat.link} key={index}>
              <Card className="hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickAccess.map((item, index) => (
            <Link to={item.link} key={index}>
              <Card className="hover:shadow-md transition-all h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  {item.icon}
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent activity would go here */}
      </div>
    </MainLayout>
  );
}
