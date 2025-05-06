
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, PlusCircle, UserPlus, UserMinus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TaskList } from '@/components/onboarding/TaskList';
import { NewEmployeeDialog } from '@/components/onboarding/NewEmployeeDialog';

export default function Onboarding() {
  const [activeTab, setActiveTab] = useState('onboarding');
  const [showNewEmployeeDialog, setShowNewEmployeeDialog] = useState(false);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Transitions</h1>
            <p className="text-muted-foreground">
              Manage employee onboarding and offboarding processes
            </p>
          </div>
          <Button onClick={() => setShowNewEmployeeDialog(true)}>
            <UserPlus size={16} className="mr-2" />
            Add New Employee
          </Button>
        </div>
        
        <Tabs defaultValue="onboarding" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="onboarding">
              <UserPlus size={16} className="mr-2" />
              Onboarding
            </TabsTrigger>
            <TabsTrigger value="offboarding">
              <UserMinus size={16} className="mr-2" />
              Offboarding
            </TabsTrigger>
          </TabsList>
          <TabsContent value="onboarding" className="pt-4">
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Employees currently onboarding
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Successfully onboarded
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12 days</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Average onboarding period
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Onboarding Processes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Alex Johnson</TableCell>
                      <TableCell>Frontend Developer</TableCell>
                      <TableCell>2025-05-12</TableCell>
                      <TableCell>8/12 tasks</TableCell>
                      <TableCell>
                        <Badge variant="outline">In Progress</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Tasks</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Maria Garcia</TableCell>
                      <TableCell>UX Designer</TableCell>
                      <TableCell>2025-05-15</TableCell>
                      <TableCell>5/12 tasks</TableCell>
                      <TableCell>
                        <Badge variant="outline">In Progress</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Tasks</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Thomas Lee</TableCell>
                      <TableCell>Product Manager</TableCell>
                      <TableCell>2025-05-20</TableCell>
                      <TableCell>2/12 tasks</TableCell>
                      <TableCell>
                        <Badge variant="outline">In Progress</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Tasks</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="offboarding" className="pt-4">
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Employees currently offboarding
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Successfully offboarded
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15 days</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Average offboarding period
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Offboarding Processes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Exit Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Robert Johnson</TableCell>
                      <TableCell>Sales Representative</TableCell>
                      <TableCell>2025-05-30</TableCell>
                      <TableCell>4/10 tasks</TableCell>
                      <TableCell>
                        <Badge variant="outline">In Progress</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Tasks</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sophia Smith</TableCell>
                      <TableCell>Marketing Specialist</TableCell>
                      <TableCell>2025-06-15</TableCell>
                      <TableCell>2/10 tasks</TableCell>
                      <TableCell>
                        <Badge variant="outline">In Progress</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Tasks</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <NewEmployeeDialog 
        open={showNewEmployeeDialog} 
        onOpenChange={setShowNewEmployeeDialog} 
      />
    </MainLayout>
  );
}
