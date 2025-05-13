
import { MainLayout } from '@/components/layout/MainLayout';
import { OrgChart } from '@/components/employees/OrgChart';

export default function OrgChartPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Organizational Chart</h1>
          <p className="text-muted-foreground">
            View the company's organizational structure and hierarchy.
          </p>
        </div>
        
        <OrgChart className="w-full" />
      </div>
    </MainLayout>
  );
}
