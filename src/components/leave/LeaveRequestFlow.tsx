import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeaveRequestDialog } from '@/components/leave/LeaveRequestDialog';
import { LeaveApprovalDialog } from '@/components/leave/LeaveApprovalDialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Check, Clock, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Dummy data for leave requests
const myLeaveRequests = [
  { id: "1", type: "Annual Leave", startDate: "2023-08-15", endDate: "2023-08-19", days: 5, status: "Approved",
    requestDate: "2023-07-20", approvedBy: "Jane Smith", reason: "Family vacation", manager: "Jane Smith",
    employee: { name: "Sarah Chen", position: "Frontend Developer", avatar: "" } },
  { id: "2", type: "Sick Leave", startDate: "2023-09-05", endDate: "2023-09-05", days: 1, status: "Pending",
    requestDate: "2023-07-28", reason: "Doctor appointment", manager: "Jane Smith",
    employee: { name: "Sarah Chen", position: "Frontend Developer", avatar: "" } },
];

// Pending approvals for managers
const pendingApprovals = [
  { id: "3", type: "Annual Leave", startDate: "2023-08-10", endDate: "2023-08-12", days: 3, status: "Pending",
    requestDate: "2023-07-25", reason: "Personal event", manager: "Jane Smith",
    employee: { name: "David Kim", position: "Backend Developer", avatar: "" } },
  { id: "4", type: "Sick Leave", startDate: "2023-08-02", endDate: "2023-08-02", days: 1, status: "Pending",
    requestDate: "2023-07-28", reason: "Not feeling well", manager: "Jane Smith",
    employee: { name: "Emily Rodriguez", position: "QA Engineer", avatar: "" } },
];

// All leave requests for admin
const allLeaveRequests = [
  ...myLeaveRequests,
  ...pendingApprovals,
  { id: "5", type: "Annual Leave", startDate: "2023-08-20", endDate: "2023-08-24", days: 5, status: "Approved",
    requestDate: "2023-07-15", approvedBy: "Jane Smith", reason: "Vacation", manager: "Robert Wilson",
    employee: { name: "Michael Johnson", position: "UI Designer", avatar: "" } },
];

export function LeaveRequestFlow() {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<any>(null);
  const { userRole } = useAuth();
  
  const handleApproveLeave = (leaveId: string, comments: string) => {
    // In a real application, this would make an API call to approve the leave
    toast.success(`Leave request approved with comments: ${comments}`);
    // Update state to reflect approval
  };
  
  const handleRejectLeave = (leaveId: string, comments: string) => {
    // In a real application, this would make an API call to reject the leave
    toast.success(`Leave request rejected with comments: ${comments}`);
    // Update state to reflect rejection
  };
  
  const openApprovalDialog = (leaveRequest: any) => {
    setSelectedLeaveRequest(leaveRequest);
    setApprovalDialogOpen(true);
  };

  const handleLeaveSubmit = (leaveData: any) => {
    toast.success('Leave request submitted successfully');
    // In a real app, we would make an API call here
    console.log('Leave data submitted:', leaveData);
  };
  
  // Different view based on user role
  const showPendingApprovals = userRole === 'Manager' || userRole === 'Company Admin' || userRole === 'Super Admin';
  const showAllLeaves = userRole === 'Company Admin' || userRole === 'Super Admin';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">
            Request and manage time off
          </p>
        </div>
        <Button onClick={() => setRequestDialogOpen(true)}>
          <Calendar className="mr-2 h-4 w-4" />
          Request Leave
        </Button>
      </div>
      
      <Tabs defaultValue={showPendingApprovals ? "pending" : "my-requests"} className="w-full">
        <TabsList>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          {showPendingApprovals && (
            <TabsTrigger value="pending">
              Pending Approvals
              <Badge variant="secondary" className="ml-2">
                {pendingApprovals.length}
              </Badge>
            </TabsTrigger>
          )}
          {showAllLeaves && (
            <TabsTrigger value="all-leaves">All Leave Requests</TabsTrigger>
          )}
          <TabsTrigger value="calendar">Leave Calendar</TabsTrigger>
          <TabsTrigger value="balances">Leave Balances</TabsTrigger>
        </TabsList>
        
        {/* My Requests Tab */}
        <TabsContent value="my-requests" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>My Leave Requests</CardTitle>
              <CardDescription>View and manage your leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search leave requests..." 
                  className="w-full pl-8" 
                />
              </div>
              
              {myLeaveRequests.length === 0 ? (
                <p className="py-4 text-center text-muted-foreground">
                  You haven't made any leave requests yet
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myLeaveRequests.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">{leave.type}</TableCell>
                        <TableCell>{leave.startDate}</TableCell>
                        <TableCell>{leave.endDate}</TableCell>
                        <TableCell>{leave.days}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              leave.status === "Approved" ? "default" : 
                              leave.status === "Pending" ? "outline" : 
                              "secondary"
                            }
                          >
                            {leave.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={leave.status !== "Pending"}
                            onClick={() => toast.info("Feature coming soon")}
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pending Approvals Tab - For Managers and Above */}
        {showPendingApprovals && (
          <TabsContent value="pending" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pending Leave Approvals</CardTitle>
                <CardDescription>Review and approve team leave requests</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingApprovals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Check className="h-10 w-10 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No pending leave requests at this time.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date Range</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Requested</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingApprovals.map((leave) => (
                        <TableRow key={leave.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {leave.employee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{leave.employee.name}</p>
                                <p className="text-xs text-muted-foreground">{leave.employee.position}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{leave.type}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1 text-muted-foreground" />
                              {leave.startDate} to {leave.endDate}
                            </div>
                          </TableCell>
                          <TableCell>{leave.days}</TableCell>
                          <TableCell>{leave.requestDate}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openApprovalDialog(leave)}
                            >
                              Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {/* All Leave Requests Tab - For Admins Only */}
        {showAllLeaves && (
          <TabsContent value="all-leaves" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>All Leave Requests</CardTitle>
                <CardDescription>Company-wide leave management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full mb-6">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search all leave requests..." 
                    className="w-full pl-8" 
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Range</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allLeaveRequests.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {leave.employee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">{leave.employee.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{leave.type}</TableCell>
                        <TableCell>{leave.startDate} to {leave.endDate}</TableCell>
                        <TableCell>{leave.days}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              leave.status === "Approved" ? "default" : 
                              leave.status === "Pending" ? "outline" : 
                              leave.status === "Rejected" ? "destructive" :
                              "secondary"
                            }
                          >
                            {leave.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{leave.manager}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openApprovalDialog(leave)}
                              disabled={leave.status !== "Pending"}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500"
                              disabled={leave.status !== "Pending"}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Deny
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {/* Other Tabs */}
        <TabsContent value="calendar" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Calendar</CardTitle>
              <CardDescription>View scheduled leaves for team members</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <p className="py-4 text-center text-muted-foreground">
                Leave calendar would be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="balances" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balances</CardTitle>
              <CardDescription>View leave balances for team members</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-4 text-center text-muted-foreground">
                Leave balance information would be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      <LeaveRequestDialog 
        open={requestDialogOpen} 
        onOpenChange={setRequestDialogOpen}
        onSubmit={handleLeaveSubmit}
      />
      <LeaveApprovalDialog
        open={approvalDialogOpen}
        onOpenChange={setApprovalDialogOpen}
        leaveRequest={selectedLeaveRequest}
        onApprove={handleApproveLeave}
      />
    </div>
  );
}
