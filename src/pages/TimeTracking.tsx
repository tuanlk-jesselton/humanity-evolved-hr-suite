
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileText, Download } from 'lucide-react';
import { TimeTrackingDashboard } from '@/components/time-tracking/TimeTrackingDashboard';
import { TimesheetManager } from '@/components/time-tracking/TimesheetManager';

export default function TimeTracking() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Time Tracking</h1>
            <p className="text-muted-foreground">
              Track work hours, manage timesheets, and view attendance reports.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export
            </Button>
            <Button>
              <Clock size={16} className="mr-2" />
              Clock In/Out
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="pt-4">
            <TimeTrackingDashboard />
          </TabsContent>
          <TabsContent value="timesheets" className="pt-4">
            <TimesheetManager />
          </TabsContent>
          <TabsContent value="reports" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Time Tracking Reports</CardTitle>
                <CardDescription>Generate and download attendance reports.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select report type and date range to generate detailed attendance reports.
                </p>
                {/* Report generation UI would go here in a real implementation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 hover:shadow-md transition-all cursor-pointer border-primary/20">
                    <div className="flex flex-col items-center gap-2">
                      <Clock size={24} className="text-primary" />
                      <h3 className="font-medium">Hours Summary</h3>
                    </div>
                  </Card>
                  <Card className="p-4 hover:shadow-md transition-all cursor-pointer border-primary/20">
                    <div className="flex flex-col items-center gap-2">
                      <Calendar size={24} className="text-primary" />
                      <h3 className="font-medium">Attendance Report</h3>
                    </div>
                  </Card>
                  <Card className="p-4 hover:shadow-md transition-all cursor-pointer border-primary/20">
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={24} className="text-primary" />
                      <h3 className="font-medium">Overtime Analysis</h3>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
