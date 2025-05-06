
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Banknote, ChevronDown, Download, FileText, PlayCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const payrollRuns = [
  {
    id: "PR-2025-05",
    period: "May 2025",
    employees: 287,
    totalAmount: "$427,850.00",
    status: "Draft",
    createdAt: "2025-05-01",
  },
  {
    id: "PR-2025-04",
    period: "April 2025",
    employees: 285,
    totalAmount: "$425,320.00",
    status: "Paid",
    createdAt: "2025-04-01",
  },
  {
    id: "PR-2025-03",
    period: "March 2025",
    employees: 280,
    totalAmount: "$418,750.00",
    status: "Paid",
    createdAt: "2025-03-01",
  },
  {
    id: "PR-2025-02",
    period: "February 2025",
    employees: 275,
    totalAmount: "$412,300.00",
    status: "Paid",
    createdAt: "2025-02-01",
  },
  {
    id: "PR-2025-01",
    period: "January 2025",
    employees: 270,
    totalAmount: "$405,800.00",
    status: "Paid",
    createdAt: "2025-01-01",
  },
];

const employeePayroll = [
  {
    id: "EMP-001",
    name: "Sarah Chen",
    position: "Frontend Developer",
    basicSalary: "$5,500.00",
    allowances: "$800.00",
    deductions: "$750.00",
    netPay: "$5,550.00",
  },
  {
    id: "EMP-002",
    name: "James Rodriguez",
    position: "Product Manager",
    basicSalary: "$7,000.00",
    allowances: "$1,200.00",
    deductions: "$950.00",
    netPay: "$7,250.00",
  },
  {
    id: "EMP-003",
    name: "Emily Johnson",
    position: "UX Designer",
    basicSalary: "$5,800.00",
    allowances: "$700.00",
    deductions: "$780.00",
    netPay: "$5,720.00",
  },
  {
    id: "EMP-004",
    name: "Michael Wong",
    position: "Backend Developer",
    basicSalary: "$5,800.00",
    allowances: "$800.00",
    deductions: "$750.00",
    netPay: "$5,850.00",
  },
  {
    id: "EMP-006",
    name: "David Chen",
    position: "Finance Director",
    basicSalary: "$8,500.00",
    allowances: "$1,500.00",
    deductions: "$1,200.00",
    netPay: "$8,800.00",
  },
];

const Payroll = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Payroll</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export
            </Button>
            <Button>
              <PlayCircle size={16} className="mr-2" />
              Run Payroll
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
              <Banknote size={18} className="text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$427,850.00</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">+$2,530.00</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
              <Banknote size={18} className="text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$6,250.00</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">+$120.00</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
              <Banknote size={18} className="text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$87,350.00</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">-$1,200.00</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payroll Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="payroll-runs">
              <TabsList className="mb-6">
                <TabsTrigger value="payroll-runs">Payroll Runs</TabsTrigger>
                <TabsTrigger value="employee-payroll">Employee Payroll</TabsTrigger>
              </TabsList>
              <TabsContent value="payroll-runs">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollRuns.map((run) => (
                      <TableRow key={run.id}>
                        <TableCell className="font-medium">{run.id}</TableCell>
                        <TableCell>{run.period}</TableCell>
                        <TableCell>{run.employees}</TableCell>
                        <TableCell>{run.totalAmount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={run.status === "Draft" ? "outline" : "default"}
                          >
                            {run.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{run.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <FileText size={16} className="mr-2" />
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="employee-payroll">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Allowances</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeePayroll.map((emp) => (
                      <TableRow key={emp.id}>
                        <TableCell className="font-medium">{emp.name}</TableCell>
                        <TableCell>{emp.position}</TableCell>
                        <TableCell>{emp.basicSalary}</TableCell>
                        <TableCell>{emp.allowances}</TableCell>
                        <TableCell>{emp.deductions}</TableCell>
                        <TableCell className="font-medium">{emp.netPay}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <span>Actions</span>
                                <ChevronDown size={16} className="ml-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Payslip</DropdownMenuItem>
                              <DropdownMenuItem>Edit Salary</DropdownMenuItem>
                              <DropdownMenuItem>Adjust Allowances</DropdownMenuItem>
                              <DropdownMenuItem>Manage Deductions</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

export default Payroll;
