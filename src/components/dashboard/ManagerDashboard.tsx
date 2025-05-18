
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Calendar,
  Clock,
  FileText,
  BarChart3,
  Check,
  AlertCircle,
  CheckCircle2,
  XCircle,
  UserCheck,
  CalendarClock,
  ClipboardList,
  Trophy
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Dummy data for team statistics
const teamStats = [
  { title: "Team Members", value: "12", icon: Users },
  { title: "Leave Requests", value: "3", icon: Calendar },
  { title: "Pending Approvals", value: "7", icon: Clock },
  { title: "Team Performance", value: "92%", icon: BarChart3 }
];

// Dummy data for team members
const teamMembers = [
  { id: 1, name: "Sarah Chen", role: "Frontend Developer", status: "Present", avatar: "SC" },
  { id: 2, name: "Michael Johnson", role: "UI/UX Designer", status: "On Leave", avatar: "MJ" },
  { id: 3, name: "Emily Rodriguez", role: "Backend Developer", status: "Present", avatar: "ER" },
  { id: 4, name: "David Kim", role: "QA Engineer", status: "Late", avatar: "DK" },
  { id: 5, name: "Jessica Taylor", role: "Product Manager", status: "Present", avatar: "JT" },
];

// Dummy data for pending approvals
const pendingApprovals = [
  { id: 1, type: "Leave", employee: "Michael Johnson", details: "Annual Leave: Jun 15-18", submitted: "2 days ago" },
  { id: 2, type: "Expense", employee: "Emily Rodriguez", details: "Client meeting: $125.50", submitted: "1 day ago" },
  { id: 3, type: "Timesheet", employee: "David Kim", details: "Week of May 15: 42 hours", submitted: "3 hours ago" },
  { id: 4, type: "Overtime", employee: "Sarah Chen", details: "May 16: 3 extra hours", submitted: "5 hours ago" },
];

// Dummy data for upcoming team leaves
const upcomingLeaves = [
  { id: 1, employee: "Michael Johnson", type: "Annual Leave", period: "Jun 15-18, 2025", status: "Approved" },
  { id: 2, employee: "Jessica Taylor", type: "Personal Leave", period: "Jun 22, 2025", status: "Pending" },
];

export function ManagerDashboard() {
  const { userEmail } = useAuth();
  
  // Extract name from email
  const managerName = userEmail ? userEmail.split('@')[0].split('.')[0] : 'Manager';
  const displayName = managerName.charAt(0).toUpperCase() + managerName.slice(1);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {displayName}
        </p>
      </div>
      
      {/* Team Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {teamStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
          <UserCheck className="h-6 w-6" />
          <span>Approve Requests</span>
        </Button>
        
        <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
          <CalendarClock className="h-6 w-6" />
          <span>Manage Timesheets</span>
        </Button>
        
        <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2" variant="outline">
          <Trophy className="h-6 w-6" />
          <span>Set Team Goals</span>
        </Button>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="team" className="w-full">
        <TabsList>
          <TabsTrigger value="team">
            <Users className="h-4 w-4 mr-2" />
            My Team
          </TabsTrigger>
          <TabsTrigger value="approvals">
            <ClipboardList className="h-4 w-4 mr-2" />
            Pending Approvals
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Team Schedule
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="team" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your direct reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                            {member.avatar}
                          </div>
                          <div className="font-medium">{member.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <Badge variant={
                          member.status === "Present" ? "default" :
                          member.status === "On Leave" ? "outline" : "secondary"
                        }>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approvals" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Requests awaiting your response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{item.employee}</div>
                      <div className="text-sm text-muted-foreground">{item.details}</div>
                      <div className="text-xs text-muted-foreground mt-1">Submitted {item.submitted}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0" >
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Schedule</CardTitle>
              <CardDescription>Upcoming leaves and absences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Upcoming Team Leaves</h3>
                  {upcomingLeaves.length === 0 ? (
                    <p className="text-muted-foreground">No upcoming leaves</p>
                  ) : (
                    <div className="space-y-4">
                      {upcomingLeaves.map((leave) => (
                        <div key={leave.id} className="flex justify-between items-center border-b pb-4">
                          <div>
                            <div className="font-medium">{leave.employee}</div>
                            <div className="text-sm text-muted-foreground">
                              {leave.type}: {leave.period}
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
                
                <div>
                  <h3 className="font-medium mb-4">Today's Attendance</h3>
                  <div className="grid gap-4 grid-cols-3">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-500 mb-2" />
                        <div className="text-sm font-medium">Present</div>
                        <div className="text-xl font-bold">9</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-500 mb-2" />
                        <div className="text-sm font-medium">On Leave</div>
                        <div className="text-xl font-bold">2</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <XCircle className="h-6 w-6 text-red-500 mb-2" />
                        <div className="text-sm font-medium">Absent</div>
                        <div className="text-xl font-bold">1</div>
                      </CardContent>
                    </Card>
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
