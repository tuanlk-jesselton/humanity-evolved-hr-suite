
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Download, Users, Calendar, Banknote, Clock } from 'lucide-react';

export default function Reports() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Reports</h1>
            <p className="text-muted-foreground">
              Generate and analyze reports for HR, payroll, and workforce management.
            </p>
          </div>
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export Reports
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Employee Reports</CardTitle>
              </div>
              <CardDescription>
                Headcount, attrition, and demographics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">7 report templates</span>
                <Button variant="ghost" size="sm">
                  <TrendingUp size={16} className="mr-2" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-primary" />
                <CardTitle>Payroll Reports</CardTitle>
              </div>
              <CardDescription>
                Compensation, taxes, and compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">5 report templates</span>
                <Button variant="ghost" size="sm">
                  <TrendingUp size={16} className="mr-2" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Time Off Reports</CardTitle>
              </div>
              <CardDescription>
                Leave balances and utilization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">4 report templates</span>
                <Button variant="ghost" size="sm">
                  <TrendingUp size={16} className="mr-2" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Generated Reports</CardTitle>
              <CardDescription>Your most recent report activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium">Headcount Report</p>
                      <p className="text-xs text-muted-foreground">Generated on May 15, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download size={16} />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <Banknote size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium">April Payroll Summary</p>
                      <p className="text-xs text-muted-foreground">Generated on May 05, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download size={16} />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium">Leave Balances</p>
                      <p className="text-xs text-muted-foreground">Generated on May 01, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automatically generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium">Weekly Attendance Report</p>
                      <p className="text-xs text-muted-foreground">Every Monday at 9:00 AM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium">Monthly Payroll Summary</p>
                      <p className="text-xs text-muted-foreground">1st of every month at 8:00 AM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <Clock size={16} className="mr-2" />
                  Schedule New Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
