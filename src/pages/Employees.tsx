
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, Filter, Download, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const employees = [
  {
    id: "EMP-001",
    name: "Sarah Chen",
    email: "sarah.chen@humanity.hr",
    position: "Frontend Developer",
    department: "Engineering",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    id: "EMP-002",
    name: "James Rodriguez",
    email: "james.rodriguez@humanity.hr",
    position: "Product Manager",
    department: "Product",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "EMP-003",
    name: "Emily Johnson",
    email: "emily.johnson@humanity.hr",
    position: "UX Designer",
    department: "Design",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: "EMP-004",
    name: "Michael Wong",
    email: "michael.wong@humanity.hr",
    position: "Backend Developer",
    department: "Engineering",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    id: "EMP-005",
    name: "Lisa Taylor",
    email: "lisa.taylor@humanity.hr",
    position: "HR Manager",
    department: "Human Resources",
    status: "On Leave",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    id: "EMP-006",
    name: "David Chen",
    email: "david.chen@humanity.hr",
    position: "Finance Director",
    department: "Finance",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    id: "EMP-007",
    name: "Anna Smith",
    email: "anna.smith@humanity.hr",
    position: "Marketing Specialist",
    department: "Marketing",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/81.jpg",
  },
  {
    id: "EMP-008",
    name: "Robert Johnson",
    email: "robert.johnson@humanity.hr",
    position: "Sales Representative",
    department: "Sales",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
  },
];

const Employees = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
          <Button>
            <UserPlus size={16} className="mr-2" />
            Add Employee
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === "Active" ? "default" :
                          employee.status === "On Leave" ? "outline" : "secondary"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Manage Leave</DropdownMenuItem>
                          <DropdownMenuItem>View Payroll</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Employees;
