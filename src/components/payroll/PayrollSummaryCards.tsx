
import { Banknote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PayrollSummaryCards() {
  return (
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
  );
}
