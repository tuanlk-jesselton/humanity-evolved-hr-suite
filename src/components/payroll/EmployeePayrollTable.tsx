
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface EmployeePayroll {
  id: string;
  name: string;
  position: string;
  basicSalary: string;
  allowances: string;
  deductions: string;
  netPay: string;
}

interface EmployeePayrollTableProps {
  employeePayroll: EmployeePayroll[];
}

export function EmployeePayrollTable({ employeePayroll }: EmployeePayrollTableProps) {
  return (
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
  );
}
