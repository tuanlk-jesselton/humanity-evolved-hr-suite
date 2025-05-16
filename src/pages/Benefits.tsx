
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiggyBank, Heart, Shield, Plus } from 'lucide-react';
import { HealthBenefitsTab } from '@/components/benefits/HealthBenefitsTab';
import { RetirementBenefitsTab } from '@/components/benefits/RetirementBenefitsTab';

export default function Benefits() {
  const [activeTab, setActiveTab] = useState('health');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Benefits</h1>
            <p className="text-muted-foreground">
              Manage health insurance, retirement plans, and other benefits.
            </p>
          </div>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Benefits
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-blue-700 dark:text-blue-300">Health Benefits</CardTitle>
              </div>
              <CardDescription>Medical, dental & vision</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                Premium Plan Active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-purple-700 dark:text-purple-300">Retirement</CardTitle>
              </div>
              <CardDescription>401(k) & savings plans</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                5% Contribution
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <CardTitle className="text-green-700 dark:text-green-300">Insurance</CardTitle>
              </div>
              <CardDescription>Life & disability</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                Basic Coverage Active
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="health" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="retirement">Retirement</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>
          <TabsContent value="health" className="pt-4">
            <HealthBenefitsTab />
          </TabsContent>
          <TabsContent value="retirement" className="pt-4">
            <RetirementBenefitsTab />
          </TabsContent>
          <TabsContent value="insurance" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Insurance Benefits</CardTitle>
                <CardDescription>Life and disability insurance plans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your current insurance plans and coverage details will appear here.
                </p>
                {/* Insurance benefits info would go here in a real implementation */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
