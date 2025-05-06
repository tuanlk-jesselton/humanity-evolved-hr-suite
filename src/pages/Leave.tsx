
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
import { Calendar as CalendarIcon, CheckCircle, Clock, CalendarPlus, XCircle, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const pendingLeaves = [
  {
    id: "LEA-001",
    employee: {
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      position: "Frontend Developer",
    },
    type: "Annual Leave",
    startDate: "2025-05-10",
    endDate: "2025-05-15",
    days: 5,
    status: "Pending",
    requestDate: "2025-05-02",
  },
  {
    id: "LEA-002",
    employee: {
      name: "Michael Wong",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      position: "Backend Developer",
    },
    type: "Sick Leave",
    startDate: "2025-05-08",
    endDate: "2025-05-09",
    days: 2,
    status: "Pending",
    requestDate: "2025-05-03",
  },
  {
    id: "LEA-003",
    employee: {
      name: "Emily Johnson",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      position: "UX Designer",
    },
    type: "Annual Leave",
    startDate: "2025-05-20",
    endDate: "2025-05-24",
    days: 5,
    status: "Pending",
    requestDate: "2025-05-04",
  },
];

const approvedLeaves = [
  {
    id: "LEA-004",
    employee: {
      name: "James Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      position: "Product Manager",
    },
    type: "Annual Leave",
    startDate: "2025-05-05",
    endDate: "2025-05-07",
    days: 3,
    status: "Approved",
    requestDate: "2025-04-28",
  },
  {
    id: "LEA-005",
    employee: {
      name: "Anna Smith",
      avatar: "https://randomuser.me/api/portraits/women/81.jpg",
      position: "Marketing Specialist",
    },
    type: "Medical Leave",
    startDate: "2025-05-12",
    endDate: "2025-05-14",
    days: 3,
    status: "Approved",
    requestDate: "2025-04-30",
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
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
          <Button>
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
              <div className="text-2xl font-bold">24</div>
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
              <div className="text-2xl font-bold">35</div>
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
            <Tabs defaultValue="pending">
              <TabsList className="mb-6">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="balances">Leave Balances</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending">
                <div className="flex justify-end mb-4">
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </Button>
                </div>
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
                    {pendingLeaves.map((leave) => (
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
                            <Button variant="outline" size="sm" className="border-green-500 text-green-500 hover:bg-green-50">
                              <CheckCircle size={14} className="mr-2" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50">
                              <XCircle size={14} className="mr-2" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedLeaves.map((leave) => (
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
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Leave;
