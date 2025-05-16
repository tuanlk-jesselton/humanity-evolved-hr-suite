
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  Calendar, 
  Clock,
  ThumbsUp,
  Award,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LeaveApprovalDialog } from '@/components/leave/LeaveApprovalDialog';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

// Dummy team data
const teamMembers = [
  { id: 1, name: "Sarah Chen", role: "Frontend Developer", avatar: "", status: "Working" },
  { id: 2, name: "David Wong", role: "Backend Developer", avatar: "", status: "On Leave" },
  { id: 3, name: "Michael Johnson", role: "UI/UX Designer", avatar: "", status: "Working" },
  { id: 4, name: "Emily Rodriguez", role: "QA Engineer", avatar: "", status: "Working" },
];

// Dummy pending approvals
const pendingApprovals = [
  { id: 1, type: "Leave", employee: { name: "David Wong", role: "Backend Developer", avatar: "" }, 
    requestDate: "2023-07-12", startDate: "2023-08-01", endDate: "2023-08-05", days: 5, reason: "Family vacation", 
    type: "Annual Leave", status: "Pending", manager: "Jane Smith" },
  { id: 2, type: "Expense", employee: { name: "Emily Rodriguez", role: "QA Engineer", avatar: "" },
    amount: 175.50, date: "2023-07-10", category: "Office Supplies", description: "Ergonomic keyboard and mouse", status: "Pending" },
  { id: 3, type: "Performance Review", employee: { name: "Sarah Chen", role: "Frontend Developer", avatar: "" },
    period: "Q2 2023", dueDate: "2023-07-20", status: "Draft" },
];

export function ManagerDashboard() {
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  
  const handleApproveLeave = (leaveId: string, comments: string) => {
    console.log(`Approved leave ${leaveId} with comments: ${comments}`);
    // In a real app, this would make an API call to update leave status
  };
  
  const openLeaveDialog = (leave: any) => {
    setSelectedLeave(leave);
    setLeaveDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your team and review requests
        </p>
      </div>
      
      {/* Team Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Direct reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting your review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Team member on leave</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <Progress value={92} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>My Team</CardTitle>
          <CardDescription>Members reporting to you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map(member => (
              <div key={member.id} className="flex flex-col items-center text-center p-4 border rounded-lg">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <Badge 
                  variant={member.status === "Working" ? "default" : "secondary"}
                  className="mt-2"
                >
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Approvals Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="timeoff">Time Off Calendar</TabsTrigger>
          <TabsTrigger value="performance">Performance Reviews</TabsTrigger>
          <TabsTrigger value="history">Approval History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Items Needing Your Approval</CardTitle>
              <CardDescription>Review and take action on pending requests</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <ThumbsUp className="h-10 w-10 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No pending approvals at this time.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {item.employee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{item.employee.name}</p>
                              <p className="text-xs text-muted-foreground">{item.employee.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.type === 'Leave' && (
                            <div>
                              <p className="text-sm">{item.startDate} to {item.endDate}</p>
                              <p className="text-xs text-muted-foreground">{item.days} days</p>
                            </div>
                          )}
                          {item.type === 'Expense' && (
                            <div>
                              <p className="text-sm">${item.amount.toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                            </div>
                          )}
                          {item.type === 'Performance Review' && (
                            <div>
                              <p className="text-sm">{item.period}</p>
                              <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => item.type === 'Leave' && openLeaveDialog(item)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                            >
                              <XCircle className="h-4 w-4 mr-1 text-red-500" />
                              Decline
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeoff" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Time Off Calendar</CardTitle>
              <CardDescription>View your team's upcoming time off</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-4 text-center text-muted-foreground">
                Calendar view of team leave would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Reviews</CardTitle>
              <CardDescription>Schedule and manage performance reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-4 text-center text-muted-foreground">
                Performance review management would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval History</CardTitle>
              <CardDescription>View your past approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-4 text-center text-muted-foreground">
                Approval history would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Leave Approval Dialog */}
      <LeaveApprovalDialog
        open={leaveDialogOpen}
        onOpenChange={setLeaveDialogOpen}
        leaveRequest={selectedLeave}
        onApprove={handleApproveLeave}
      />
    </div>
  );
}
