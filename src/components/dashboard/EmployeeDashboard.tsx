
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  FileText, 
  User,
  PlusCircle,
  Wallet,
  FileCheck,
  Bell,
  Check,
  CalendarClock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LeaveRequestDialog } from '@/components/leave/LeaveRequestDialog';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Dummy data for my upcoming time off
const upcomingTimeOff = [
  { id: 1, type: "Annual Leave", startDate: "2025-08-15", endDate: "2025-08-19", days: 5, status: "Approved" },
  { id: 2, type: "Sick Leave", startDate: "2025-09-05", endDate: "2025-09-05", days: 1, status: "Pending" },
];

// Dummy data for my recent paystubs
const recentPaystubs = [
  { id: 1, period: "July 1-31, 2025", date: "2025-08-01", amount: 4500.00 },
  { id: 2, period: "June 1-30, 2025", date: "2025-07-01", amount: 4500.00 },
  { id: 3, period: "May 1-31, 2025", date: "2025-06-01", amount: 4500.00 },
];

// Dummy data for notifications
const notifications = [
  { id: 1, type: "Leave Approved", message: "Your leave request for Aug 15-19 has been approved", time: "2 hours ago" },
  { id: 2, type: "Expense Submitted", message: "Your expense claim for $45.99 has been submitted", time: "1 day ago" },
  { id: 3, type: "Payslip Available", message: "Your July 2025 payslip is now available", time: "2 days ago" },
  { id: 4, type: "Review Scheduled", message: "Performance review scheduled for August 10", time: "3 days ago" },
];

export function EmployeeDashboard() {
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const { userEmail } = useAuth();
  
  const handleLeaveSubmit = (leaveData: any) => {
    toast.success('Leave request submitted successfully');
    // In a real app, this would make an API call
    console.log('Leave data submitted:', leaveData);
  };

  // Get first name from email address for greeting
  const firstName = userEmail ? userEmail.split('@')[0].split('.')[0] : 'Employee';
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {displayName}
        </p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Button 
          onClick={() => setLeaveDialogOpen(true)}
          className="h-auto py-4 flex flex-col items-center justify-center gap-2" 
          variant="outline"
        >
          <Calendar className="h-6 w-6" />
          <span>Request Time Off</span>
        </Button>
        
        <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
          <FileText className="h-6 w-6" />
          <span>Submit Expense</span>
        </Button>
        
        <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
          <Clock className="h-6 w-6" />
          <span>Clock In/Out</span>
        </Button>
        
        <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
          <User className="h-6 w-6" />
          <span>Update Profile</span>
        </Button>
      </div>
      
      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Time Off Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 days</div>
            <p className="text-xs text-muted-foreground">Annual leave remaining</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Payday</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jun 1, 2025</div>
            <p className="text-xs text-muted-foreground">15 days from now</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Items</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Onboarding</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="timeoff">
            <Calendar className="h-4 w-4 mr-2" />
            Time Off
          </TabsTrigger>
          <TabsTrigger value="pay">
            <Wallet className="h-4 w-4 mr-2" />
            Pay & Benefits
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <CalendarClock className="h-4 w-4 mr-2" />
            Attendance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Your latest updates</CardDescription>
              </div>
              <Button variant="outline" size="sm">Mark all as read</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium">{notification.type}</div>
                      <div className="text-sm text-muted-foreground">{notification.message}</div>
                      <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                    </div>
                    <div>
                      <Badge variant="secondary">{notification.type.split(' ')[0]}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeoff" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Time Off</CardTitle>
                <CardDescription>Manage your leave requests</CardDescription>
              </div>
              <Button onClick={() => setLeaveDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Request Leave
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Available Leave</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium mb-1">Annual Leave</div>
                        <div className="text-2xl font-bold">15 days</div>
                        <Progress value={75} className="h-2 mt-2" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium mb-1">Sick Leave</div>
                        <div className="text-2xl font-bold">10 days</div>
                        <Progress value={100} className="h-2 mt-2" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium mb-1">Personal Days</div>
                        <div className="text-2xl font-bold">3 days</div>
                        <Progress value={60} className="h-2 mt-2" />
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Upcoming Time Off</h3>
                  {upcomingTimeOff.length === 0 ? (
                    <p className="text-muted-foreground">No upcoming time off</p>
                  ) : (
                    <div className="space-y-4">
                      {upcomingTimeOff.map((leave) => (
                        <div key={leave.id} className="flex justify-between items-center border-b pb-4">
                          <div>
                            <div className="font-medium">{leave.type}</div>
                            <div className="text-sm text-muted-foreground">
                              {leave.startDate} to {leave.endDate}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {leave.days} day{leave.days > 1 ? 's' : ''}
                            </div>
                          </div>
                          <Badge variant={leave.status === 'Approved' ? 'default' : 'outline'}>
                            {leave.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pay" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pay & Benefits</CardTitle>
              <CardDescription>Your compensation and benefits information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Recent Paystubs</h3>
                  <div className="space-y-4">
                    {recentPaystubs.map((paystub) => (
                      <div key={paystub.id} className="flex justify-between items-center border-b pb-4">
                        <div>
                          <div className="font-medium">{paystub.period}</div>
                          <div className="text-sm text-muted-foreground">
                            Paid on {paystub.date}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${paystub.amount.toFixed(2)}</div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Track your work hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Clock className="h-6 w-6 mb-2" />
                    <span>Clock In</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Clock className="h-6 w-6 mb-2" />
                    <span>Clock Out</span>
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">Today's Timesheet</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <Badge>Clocked In</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Clock In:</span>
                    <span>09:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Clock Out:</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Hours Worked:</span>
                    <span>3h 25m</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <LeaveRequestDialog 
        open={leaveDialogOpen} 
        onOpenChange={setLeaveDialogOpen} 
        onSubmit={handleLeaveSubmit}
      />
    </div>
  );
}
