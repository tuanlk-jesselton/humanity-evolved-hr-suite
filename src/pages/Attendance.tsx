
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
import { Clock, UserCheck, Calendar, Filter, Clock1, Clock3, LogIn } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const todayAttendance = [
  {
    id: "ATT-001",
    employee: {
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      position: "Frontend Developer",
    },
    clockIn: "08:42 AM",
    clockOut: "--",
    workingHours: "--",
    status: "Present",
  },
  {
    id: "ATT-002",
    employee: {
      name: "James Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      position: "Product Manager",
    },
    clockIn: "08:15 AM",
    clockOut: "--",
    workingHours: "--",
    status: "Present",
  },
  {
    id: "ATT-003",
    employee: {
      name: "Emily Johnson",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      position: "UX Designer",
    },
    clockIn: "08:30 AM",
    clockOut: "--",
    workingHours: "--",
    status: "Present",
  },
  {
    id: "ATT-004",
    employee: {
      name: "Michael Wong",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      position: "Backend Developer",
    },
    clockIn: "09:05 AM",
    clockOut: "--",
    workingHours: "--",
    status: "Present",
  },
  {
    id: "ATT-005",
    employee: {
      name: "Lisa Taylor",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      position: "HR Manager",
    },
    status: "On Leave",
    clockIn: "--",
    clockOut: "--",
    workingHours: "--",
  },
];

const attendanceHistory = [
  {
    id: "ATT-101",
    employee: {
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      position: "Frontend Developer",
    },
    date: "2025-05-05",
    clockIn: "08:42 AM",
    clockOut: "05:30 PM",
    workingHours: "8:48",
    status: "Present",
  },
  {
    id: "ATT-102",
    employee: {
      name: "James Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      position: "Product Manager",
    },
    date: "2025-05-05",
    clockIn: "08:15 AM",
    clockOut: "06:25 PM",
    workingHours: "10:10",
    status: "Present",
  },
  {
    id: "ATT-103",
    employee: {
      name: "Emily Johnson",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      position: "UX Designer",
    },
    date: "2025-05-05",
    clockIn: "08:30 AM",
    clockOut: "05:45 PM",
    workingHours: "9:15",
    status: "Present",
  },
  {
    id: "ATT-104",
    employee: {
      name: "Michael Wong",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      position: "Backend Developer",
    },
    date: "2025-05-05",
    clockIn: "09:05 AM",
    clockOut: "06:10 PM",
    workingHours: "9:05",
    status: "Present",
  },
];

const Attendance = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
          <Button>
            <LogIn size={16} className="mr-2" />
            Clock In
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <UserCheck size={18} className="text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">267</div>
              <div className="mt-1 flex items-center space-x-2">
                <Progress value={93} className="h-2" />
                <span className="text-xs text-muted-foreground">93%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
              <Calendar size={18} className="text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <div className="mt-1 flex items-center space-x-2">
                <Progress value={4} className="h-2" />
                <span className="text-xs text-muted-foreground">4%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
              <Clock size={18} className="text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="mt-1 flex items-center space-x-2">
                <Progress value={3} className="h-2" />
                <span className="text-xs text-muted-foreground">3%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList className="mb-6">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="today">
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
                      <TableHead>Clock In</TableHead>
                      <TableHead>Clock Out</TableHead>
                      <TableHead>Working Hours</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAttendance.map((attendance) => (
                      <TableRow key={attendance.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={attendance.employee.avatar} />
                              <AvatarFallback>
                                {attendance.employee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{attendance.employee.name}</p>
                              <p className="text-sm text-muted-foreground">{attendance.employee.position}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{attendance.clockIn}</TableCell>
                        <TableCell>{attendance.clockOut}</TableCell>
                        <TableCell>{attendance.workingHours}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              attendance.status === "Present" ? "default" :
                              attendance.status === "On Leave" ? "outline" : "destructive"
                            }
                          >
                            {attendance.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {attendance.status === "Present" && attendance.clockOut === "--" && (
                            <Button variant="outline" size="sm">
                              <Clock1 size={14} className="mr-2" />
                              Clock Out
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="history">
                <div className="flex justify-end mb-4">
                  <Button variant="outline" size="sm">
                    <Calendar size={16} className="mr-2" />
                    Select Date
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Clock In</TableHead>
                      <TableHead>Clock Out</TableHead>
                      <TableHead>Working Hours</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceHistory.map((attendance) => (
                      <TableRow key={attendance.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={attendance.employee.avatar} />
                              <AvatarFallback>
                                {attendance.employee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{attendance.employee.name}</p>
                              <p className="text-sm text-muted-foreground">{attendance.employee.position}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{attendance.date}</TableCell>
                        <TableCell>{attendance.clockIn}</TableCell>
                        <TableCell>{attendance.clockOut}</TableCell>
                        <TableCell>{attendance.workingHours}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              attendance.status === "Present" ? "default" :
                              attendance.status === "On Leave" ? "outline" : "destructive"
                            }
                          >
                            {attendance.status}
                          </Badge>
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

export default Attendance;
