
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, CheckCircle, Clock, CalendarPlus, XCircle, Filter, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { LeaveRequestDialog } from '@/components/leave/LeaveRequestDialog';
import { LeaveApprovalDialog } from '@/components/leave/LeaveApprovalDialog';

const pendingLeaves = [
  {
    id: "LEA-001",
    employee: {
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      position: "Frontend Developer",
      email: "schen@example.com"
    },
    type: "Annual Leave",
    startDate: "2025-05-10",
    endDate: "2025-05-15",
    days: 5,
    status: "Pending",
    requestDate: "2025-05-02",
    reason: "Family vacation",
    manager: "David Wong"
  },
  {
    id: "LEA-002",
    employee: {
      name: "Michael Wong",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      position: "Backend Developer",
      email: "mwong@example.com"
    },
    type: "Sick Leave",
    startDate: "2025-05-08",
    endDate: "2025-05-09",
    days: 2,
    status: "Pending",
    requestDate: "2025-05-03",
    reason: "Medical appointment",
    manager: "Sarah Chen"
  },
  {
    id: "LEA-003",
    employee: {
      name: "Emily Johnson",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      position: "UX Designer",
      email: "ejohnson@example.com"
    },
    type: "Annual Leave",
    startDate: "2025-05-20",
    endDate: "2025-05-24",
    days: 5,
    status: "Pending",
    requestDate: "2025-05-04",
    reason: "Personal time",
    manager: "Robert Wilson"
  },
];

const approvedLeaves = [
  {
    id: "LEA-004",
    employee: {
      name: "James Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      position: "Product Manager",
      email: "jrodriguez@example.com"
    },
    type: "Annual Leave",
    startDate: "2025-05-05",
    endDate: "2025-05-07",
    days: 3,
    status: "Approved",
    requestDate: "2025-04-28",
    reason: "Family event",
    approvedBy: "Jessica Taylor",
    approvalDate: "2025-04-29"
  },
  {
    id: "LEA-005",
    employee: {
      name: "Anna Smith",
      avatar: "https://randomuser.me/api/portraits/women/81.jpg",
      position: "Marketing Specialist",
      email: "asmith@example.com"
    },
    type: "Medical Leave",
    startDate: "2025-05-12",
    endDate: "2025-05-14",
    days: 3,
    status: "Approved",
    requestDate: "2025-04-30",
    reason: "Medical procedure",
    approvedBy: "Robert Wilson",
    approvalDate: "2025-05-01"
  },
];

const leaveBalances = [
  {
    employee: "Sarah Chen",
    annualLeave: { used: 5, total: 21 },
    sickLeave: { used: 2, total: 14 },
    parentalLeave: { used: 0, total: 7 },
  },
  {
    employee: "James Rodriguez",
    annualLeave: { used: 8, total: 21 },
    sickLeave: { used: 3, total: 14 },
    parentalLeave: { used: 0, total: 7 },
  },
  {
    employee: "Emily Johnson",
    annualLeave: { used: 4, total: 21 },
    sickLeave: { used: 1, total: 14 },
    parentalLeave: { used: 0, total: 7 },
  },
  {
    employee: "Michael Wong",
    annualLeave: { used: 9, total: 21 },
    sickLeave: { used: 4, total: 14 },
    parentalLeave: { used: 0, total: 7 },
  },
  {
    employee: "Lisa Taylor",
    annualLeave: { used: 12, total: 21 },
    sickLeave: { used: 2, total: 14 },
    parentalLeave: { used: 5, total: 7 },
  },
];

const Leave = () => {
  const [showLeaveRequestDialog, setShowLeaveRequestDialog] = useState(false);
  const [showLeaveApprovalDialog, setShowLeaveApprovalDialog] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [leaveRequests, setLeaveRequests] = useState(pendingLeaves);
  const [approvedRequests, setApprovedRequests] = useState(approvedLeaves);
  const [activeTab, setActiveTab] = useState('pending');
  
  const handleApproveLeave = (leaveId: string) => {
    const leaveToApprove = leaveRequests.find(leave => leave.id === leaveId);
    if (leaveToApprove) {
      setSelectedLeave(leaveToApprove);
      setShowLeaveApprovalDialog(true);
    }
  };
  
  const handleRejectLeave = (leaveId: string) => {
    // Find the leave request
    const leave = leaveRequests.find(l => l.id === leaveId);
    if (!leave) return;
    
    // Remove from pending
    setLeaveRequests(prev => prev.filter(l => l.id !== leaveId));
    
    // Add to rejected (could add to another list if needed)
    toast.success(`Leave request for ${leave.employee.name} has been rejected`);
  };
  
  const finalizeLeaveApproval = (leaveId: string, comments: string) => {
    // Find the leave request
    const leaveIndex = leaveRequests.findIndex(l => l.id === leaveId);
    if (leaveIndex === -1) return;
    
    const approvedLeave = {
      ...leaveRequests[leaveIndex],
      status: "Approved",
      approvedBy: "Current User", // In a real app, this would be the logged-in user
      approvalDate: new Date().toISOString().split('T')[0],
      approvalComments: comments
    };
    
    // Remove from pending
    setLeaveRequests(prev => prev.filter(l => l.id !== leaveId));
    
    // Add to approved
    setApprovedRequests(prev => [approvedLeave, ...prev]);
    
    toast.success(`Leave request for ${approvedLeave.employee.name} has been approved`);
  };
  
  const submitNewLeaveRequest = (leaveData: any) => {
    const newLeave = {
      id: `LEA-${Math.floor(Math.random() * 1000)}`,
      employee: {
        name: "Current User", // In a real app, this would be the logged-in user
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        position: "Software Engineer",
        email: "user@example.com"
      },
      type: leaveData.leaveType,
      startDate: leaveData.startDate,
      endDate: leaveData.endDate,
      days: leaveData.days,
      status: "Pending",
      requestDate: new Date().toISOString().split('T')[0],
      reason: leaveData.reason,
      manager: "David Wong" // In a real app, this would be the user's manager
    };
    
    setLeaveRequests(prev => [newLeave, ...prev]);
    toast.success("Leave request submitted successfully");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
          <Button onClick={() => setShowLeaveRequestDialog(true)}>
            <CalendarPlus size={16} className="mr-2" />
            Apply Leave
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock size={18} className="text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveRequests.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-orange-500 font-medium">+5</span> since yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
              <CheckCircle size={18} className="text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedRequests.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">+8</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejected This Month</CardTitle>
              <XCircle size={18} className="text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-red-500 font-medium">+2</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Leave Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="balances">Leave Balances</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending">
                <div className="flex justify-end mb-4">
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </Button>
                </div>
                {leaveRequests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Leave Type</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveRequests.map((leave) => (
                        <TableRow key={leave.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={leave.employee.avatar} />
                                <AvatarFallback>
                                  {leave.employee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{leave.employee.name}</p>
                                <p className="text-sm text-muted-foreground">{leave.employee.position}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{leave.type}</TableCell>
                          <TableCell>{leave.startDate}</TableCell>
                          <TableCell>{leave.endDate}</TableCell>
                          <TableCell>{leave.days}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{leave.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-green-500 text-green-500 hover:bg-green-50"
                                onClick={() => handleApproveLeave(leave.id)}
                              >
                                <CheckCircle size={14} className="mr-2" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-red-500 text-red-500 hover:bg-red-50"
                                onClick={() => handleRejectLeave(leave.id)}
                              >
                                <XCircle size={14} className="mr-2" />
                                Reject
                              </Button>
                              <Button variant="ghost" size="sm">
                                <FileText size={14} className="mr-2" />
                                Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No pending leave requests</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="approved">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Approved By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedRequests.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={leave.employee.avatar} />
                              <AvatarFallback>
                                {leave.employee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{leave.employee.name}</p>
                              <p className="text-sm text-muted-foreground">{leave.employee.position}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{leave.type}</TableCell>
                        <TableCell>{leave.startDate}</TableCell>
                        <TableCell>{leave.endDate}</TableCell>
                        <TableCell>{leave.days}</TableCell>
                        <TableCell>
                          <Badge variant="default">{leave.status}</Badge>
                        </TableCell>
                        <TableCell>{leave.approvedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="balances">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Annual Leave</TableHead>
                      <TableHead>Sick Leave</TableHead>
                      <TableHead>Parental Leave</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveBalances.map((balance, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{balance.employee}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{balance.annualLeave.used} / {balance.annualLeave.total} days</span>
                              <span className="text-muted-foreground">
                                {Math.round(balance.annualLeave.used / balance.annualLeave.total * 100)}%
                              </span>
                            </div>
                            <Progress 
                              value={balance.annualLeave.used / balance.annualLeave.total * 100} 
                              className="h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{balance.sickLeave.used} / {balance.sickLeave.total} days</span>
                              <span className="text-muted-foreground">
                                {Math.round(balance.sickLeave.used / balance.sickLeave.total * 100)}%
                              </span>
                            </div>
                            <Progress 
                              value={balance.sickLeave.used / balance.sickLeave.total * 100} 
                              className="h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{balance.parentalLeave.used} / {balance.parentalLeave.total} days</span>
                              <span className="text-muted-foreground">
                                {Math.round(balance.parentalLeave.used / balance.parentalLeave.total * 100)}%
                              </span>
                            </div>
                            <Progress 
                              value={balance.parentalLeave.used / balance.parentalLeave.total * 100} 
                              className="h-2"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="calendar">
                <div className="flex justify-center py-10">
                  <div className="text-center">
                    <CalendarIcon size={48} className="mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Leave Calendar</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Calendar view of all approved and pending leave
                    </p>
                    <Button className="mt-4">View Full Calendar</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <LeaveRequestDialog
        open={showLeaveRequestDialog}
        onOpenChange={setShowLeaveRequestDialog}
        onSubmit={submitNewLeaveRequest}
      />
      
      <LeaveApprovalDialog
        open={showLeaveApprovalDialog}
        onOpenChange={setShowLeaveApprovalDialog}
        leaveRequest={selectedLeave}
        onApprove={finalizeLeaveApproval}
      />
    </MainLayout>
  );
};

export default Leave;
