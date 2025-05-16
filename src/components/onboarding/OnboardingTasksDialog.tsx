
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, XCircle, UserRound, FileText, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

interface OnboardingTasksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: any;
  isOnboarding: boolean;
}

// Sample onboarding tasks
const onboardingTasks = [
  { id: 1, title: "Create company email account", status: "completed", assignee: "IT Department", dueDate: "2025-05-08" },
  { id: 2, title: "Prepare workstation", status: "completed", assignee: "IT Department", dueDate: "2025-05-09" },
  { id: 3, title: "Add to company systems", status: "completed", assignee: "HR Department", dueDate: "2025-05-10" },
  { id: 4, title: "Schedule orientation session", status: "completed", assignee: "HR Department", dueDate: "2025-05-11" },
  { id: 5, title: "Send welcome package", status: "completed", assignee: "Office Manager", dueDate: "2025-05-12" },
  { id: 6, title: "First day orientation", status: "completed", assignee: "HR Department", dueDate: "2025-05-12" },
  { id: 7, title: "Department introduction", status: "completed", assignee: "Department Manager", dueDate: "2025-05-12" },
  { id: 8, title: "IT systems training", status: "completed", assignee: "IT Department", dueDate: "2025-05-13" },
  { id: 9, title: "First project assignment", status: "pending", assignee: "Department Manager", dueDate: "2025-05-18" },
  { id: 10, title: "First week check-in", status: "pending", assignee: "HR Department", dueDate: "2025-05-19" },
  { id: 11, title: "30-day goals setting", status: "upcoming", assignee: "Department Manager", dueDate: "2025-06-12" },
  { id: 12, title: "Benefits enrollment", status: "upcoming", assignee: "HR Department", dueDate: "2025-06-12" },
];

// Sample offboarding tasks
const offboardingTasks = [
  { id: 1, title: "Exit interview scheduling", status: "completed", assignee: "HR Department", dueDate: "2025-05-15" },
  { id: 2, title: "Company property return checklist", status: "completed", assignee: "Office Manager", dueDate: "2025-05-18" },
  { id: 3, title: "Revoke system access", status: "completed", assignee: "IT Department", dueDate: "2025-05-29" },
  { id: 4, title: "Knowledge transfer sessions", status: "completed", assignee: "Department Manager", dueDate: "2025-05-25" },
  { id: 5, title: "Final paycheck processing", status: "pending", assignee: "Finance Department", dueDate: "2025-06-01" },
  { id: 6, title: "Benefits transition information", status: "pending", assignee: "HR Department", dueDate: "2025-06-05" },
  { id: 7, title: "Exit interview", status: "upcoming", assignee: "HR Department", dueDate: "2025-05-29" },
  { id: 8, title: "Remove from company directory", status: "upcoming", assignee: "IT Department", dueDate: "2025-05-30" },
  { id: 9, title: "Send farewell announcement", status: "upcoming", assignee: "HR Department", dueDate: "2025-05-30" },
  { id: 10, title: "Close employment file", status: "upcoming", assignee: "HR Department", dueDate: "2025-06-06" },
];

export function OnboardingTasksDialog({ open, onOpenChange, employee, isOnboarding }: OnboardingTasksDialogProps) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (employee) {
      const relevantTasks = isOnboarding ? onboardingTasks : offboardingTasks;
      setTasks(relevantTasks);
      
      // Calculate completed percentage
      const completedTasks = relevantTasks.filter(task => task.status === "completed").length;
      setProgress(Math.round((completedTasks / relevantTasks.length) * 100));
    }
  }, [employee, isOnboarding]);

  const handleTaskStatusChange = (taskId: number, newStatus: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      
      // Update progress
      const completedTasks = updatedTasks.filter(task => task.status === "completed").length;
      setProgress(Math.round((completedTasks / updatedTasks.length) * 100));
      
      return updatedTasks;
    });
    
    const statusMessage = newStatus === "completed" 
      ? "Task marked as completed" 
      : newStatus === "pending" 
        ? "Task marked as in progress" 
        : "Task marked as upcoming";
    
    toast.success(statusMessage);
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isOnboarding ? "Onboarding Tasks" : "Offboarding Tasks"} - {employee.name}
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{employee.position}</span>
            •
            <span>{isOnboarding ? `Starts: ${employee.startDate}` : `Exits: ${employee.exitDate}`}</span>
          </div>
        </DialogHeader>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-4">
          <div className="font-medium flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" /> Completed Tasks
          </div>
          <div className="space-y-2">
            {tasks.filter(task => task.status === "completed").map(task => (
              <Card key={task.id} className="bg-green-50 border-green-200">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Assigned to: {task.assignee} • Due: {task.dueDate}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleTaskStatusChange(task.id, "pending")}
                    >
                      <Clock size={14} className="mr-1" />
                      Mark Pending
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="font-medium flex items-center gap-2 mt-6">
            <Clock size={16} className="text-amber-500" /> In Progress Tasks
          </div>
          <div className="space-y-2">
            {tasks.filter(task => task.status === "pending").map(task => (
              <Card key={task.id} className="bg-amber-50 border-amber-200">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Assigned to: {task.assignee} • Due: {task.dueDate}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleTaskStatusChange(task.id, "completed")}
                      className="border-green-500 text-green-500 hover:bg-green-50"
                    >
                      <CheckCheck size={14} className="mr-1" />
                      Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="font-medium flex items-center gap-2 mt-6">
            <FileText size={16} className="text-blue-500" /> Upcoming Tasks
          </div>
          <div className="space-y-2">
            {tasks.filter(task => task.status === "upcoming").map(task => (
              <Card key={task.id} className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Assigned to: {task.assignee} • Due: {task.dueDate}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleTaskStatusChange(task.id, "pending")}
                      className="border-amber-500 text-amber-500 hover:bg-amber-50"
                    >
                      <Clock size={14} className="mr-1" />
                      Start Task
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
