
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Download, PlayCircle } from 'lucide-react';
import { PayrollSummaryCards } from '@/components/payroll/PayrollSummaryCards';
import { PayrollTabs } from '@/components/payroll/PayrollTabs';

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

        <PayrollSummaryCards />
        <PayrollTabs />
      </div>
    </MainLayout>
  );
};

export default Payroll;
