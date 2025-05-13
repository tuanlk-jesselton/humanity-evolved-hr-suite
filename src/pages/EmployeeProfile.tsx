
import { MainLayout } from '@/components/layout/MainLayout';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmployeeInfo } from '@/components/employees/EmployeeInfo';
import { EmployeeDocuments } from '@/components/employees/EmployeeDocuments';
import { EmployeeJobHistory } from '@/components/employees/EmployeeJobHistory';
import { EmployeeCustomFields } from '@/components/employees/EmployeeCustomFields';

export default function EmployeeProfile() {
  const { id } = useParams();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Employee Profile</h1>
          <p className="text-muted-foreground">
            View and manage employee information.
          </p>
        </div>
        
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Personal Info</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="history">Job History</TabsTrigger>
            <TabsTrigger value="custom">Custom Fields</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="space-y-4 pt-4">
            <EmployeeInfo employeeId={id} />
          </TabsContent>
          <TabsContent value="documents" className="space-y-4 pt-4">
            <EmployeeDocuments employeeId={id} />
          </TabsContent>
          <TabsContent value="history" className="space-y-4 pt-4">
            <EmployeeJobHistory employeeId={id} />
          </TabsContent>
          <TabsContent value="custom" className="space-y-4 pt-4">
            <EmployeeCustomFields employeeId={id} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
