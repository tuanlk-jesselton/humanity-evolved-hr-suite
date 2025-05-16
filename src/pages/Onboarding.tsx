
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, PlusCircle, UserPlus, UserMinus, Calendar } from 'lucide-react';
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
import { OnboardingTasksDialog } from '@/components/onboarding/OnboardingTasksDialog';
import { OnboardingTemplateDialog } from '@/components/onboarding/OnboardingTemplateDialog';
import { Progress } from '@/components/ui/progress';

const onboardingEmployees = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    position: "Frontend Developer", 
    department: "Engineering",
    startDate: "2025-05-12", 
    progress: 8, 
    totalTasks: 12, 
    status: "In Progress" 
  },
  { 
    id: 2, 
    name: "Maria Garcia", 
    position: "UX Designer", 
    department: "Design",
    startDate: "2025-05-15", 
    progress: 5, 
    totalTasks: 12, 
    status: "In Progress" 
  },
  { 
    id: 3, 
    name: "Thomas Lee", 
    position: "Product Manager", 
    department: "Product", 
    startDate: "2025-05-20", 
    progress: 2, 
    totalTasks: 12, 
    status: "In Progress" 
  }
];

const offboardingEmployees = [
  { 
    id: 1, 
    name: "Robert Johnson", 
    position: "Sales Representative", 
    department: "Sales", 
    exitDate: "2025-05-30", 
    progress: 4, 
    totalTasks: 10, 
    status: "In Progress" 
  },
  { 
    id: 2, 
    name: "Sophia Smith", 
    position: "Marketing Specialist", 
    department: "Marketing", 
    exitDate: "2025-06-15", 
    progress: 2, 
    totalTasks: 10, 
    status: "In Progress" 
  }
];

export default function Onboarding() {
  const [activeTab, setActiveTab] = useState('onboarding');
  const [showNewEmployeeDialog, setShowNewEmployeeDialog] = useState(false);
  const [showTasksDialog, setShowTasksDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isOnboarding, setIsOnboarding] = useState(true);

  const handleViewTasks = (employee: any, isOnboardingProcess: boolean) => {
    setSelectedEmployee(employee);
    setIsOnboarding(isOnboardingProcess);
    setShowTasksDialog(true);
  };

  const handleCreateTemplate = () => {
    setShowTemplateDialog(true);
  };

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
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCreateTemplate}>
              <PlusCircle size={16} className="mr-2" />
              New Template
            </Button>
            <Button onClick={() => setShowNewEmployeeDialog(true)}>
              <UserPlus size={16} className="mr-2" />
              Add New Employee
            </Button>
          </div>
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
                  <div className="text-2xl font-bold">{onboardingEmployees.length}</div>
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
                      <TableHead>Department</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {onboardingEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.startDate}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{employee.progress}/{employee.totalTasks} tasks</span>
                              <span className="text-muted-foreground">
                                {Math.round((employee.progress / employee.totalTasks) * 100)}%
                              </span>
                            </div>
                            <Progress 
                              value={(employee.progress / employee.totalTasks) * 100} 
                              className="h-2" 
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{employee.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewTasks(employee, true)}
                          >
                            View Tasks
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
                  <div className="text-2xl font-bold">{offboardingEmployees.length}</div>
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
                      <TableHead>Department</TableHead>
                      <TableHead>Exit Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offboardingEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.exitDate}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{employee.progress}/{employee.totalTasks} tasks</span>
                              <span className="text-muted-foreground">
                                {Math.round((employee.progress / employee.totalTasks) * 100)}%
                              </span>
                            </div>
                            <Progress 
                              value={(employee.progress / employee.totalTasks) * 100} 
                              className="h-2" 
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{employee.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewTasks(employee, false)}
                          >
                            View Tasks
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
      
      <OnboardingTasksDialog 
        open={showTasksDialog}
        onOpenChange={setShowTasksDialog}
        employee={selectedEmployee}
        isOnboarding={isOnboarding}
      />
      
      <OnboardingTemplateDialog
        open={showTemplateDialog}
        onOpenChange={setShowTemplateDialog}
      />
    </MainLayout>
  );
}
