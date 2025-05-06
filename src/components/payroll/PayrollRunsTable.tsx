
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PayrollRun {
  id: string;
  period: string;
  employees: number;
  totalAmount: string;
  status: string;
  createdAt: string;
}

interface PayrollRunsTableProps {
  payrollRuns: PayrollRun[];
}

export function PayrollRunsTable({ payrollRuns }: PayrollRunsTableProps) {
  return (
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
  );
}
