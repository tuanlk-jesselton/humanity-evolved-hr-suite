
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PayrollRunsTable } from './PayrollRunsTable';
import { EmployeePayrollTable } from './EmployeePayrollTable';

// Sample data
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

export function PayrollTabs() {
  return (
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
            <PayrollRunsTable payrollRuns={payrollRuns} />
          </TabsContent>
          <TabsContent value="employee-payroll">
            <EmployeePayrollTable employeePayroll={employeePayroll} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
