
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompanyProfileTab } from '@/components/company/CompanyProfileTab';
import { CompanyLocationsTab } from '@/components/company/CompanyLocationsTab';
import { CompanyPoliciesTab } from '@/components/company/CompanyPoliciesTab';

export default function Company() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Company</h1>
          <p className="text-muted-foreground">
            Manage company information, locations, and policies.
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="profile">Company Profile</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="pt-4">
            <CompanyProfileTab />
          </TabsContent>
          <TabsContent value="locations" className="pt-4">
            <CompanyLocationsTab />
          </TabsContent>
          <TabsContent value="policies" className="pt-4">
            <CompanyPoliciesTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
