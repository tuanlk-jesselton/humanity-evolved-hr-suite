
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Plus, Trash } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface OnboardingTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TaskItem {
  id: string;
  title: string;
  description: string;
  assigneeRole: string;
  daysFromStart: number;
}

export function OnboardingTemplateDialog({ open, onOpenChange }: OnboardingTemplateDialogProps) {
  const [templateName, setTemplateName] = useState('');
  const [templateType, setTemplateType] = useState('onboarding');
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: '1',
      title: 'Create company email account',
      description: 'Set up email, add to appropriate groups',
      assigneeRole: 'IT Department',
      daysFromStart: -3
    },
    {
      id: '2',
      title: 'Prepare workstation',
      description: 'Set up desk, computer, and necessary equipment',
      assigneeRole: 'IT Department',
      daysFromStart: -2
    }
  ]);

  const handleAddTask = () => {
    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: '',
      description: '',
      assigneeRole: '',
      daysFromStart: 0
    };
    setTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleTaskChange = (id: string, field: keyof TaskItem, value: string | number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, [field]: value };
      }
      return task;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!templateName.trim()) {
      toast.error("Template name is required");
      return;
    }
    
    if (tasks.length === 0) {
      toast.error("At least one task is required");
      return;
    }
    
    // Validate all tasks have titles
    for (const task of tasks) {
      if (!task.title.trim()) {
        toast.error("All tasks must have titles");
        return;
      }
    }
    
    toast.success("Template saved successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create {templateType === 'onboarding' ? 'Onboarding' : 'Offboarding'} Template</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input 
                id="templateName" 
                placeholder="e.g., Standard New Hire Onboarding" 
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Template Type</Label>
              <Tabs value={templateType} onValueChange={setTemplateType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
                  <TabsTrigger value="offboarding">Offboarding</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Tasks</Label>
                <Button type="button" onClick={handleAddTask} size="sm" variant="outline">
                  <Plus size={14} className="mr-1" /> Add Task
                </Button>
              </div>
              
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <Label className="text-sm">Task {tasks.indexOf(task) + 1}</Label>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveTask(task.id)}
                      className="h-8 w-8 p-0 text-muted-foreground"
                    >
                      <X size={14} />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`title-${task.id}`} className="text-xs">Task Title</Label>
                    <Input 
                      id={`title-${task.id}`} 
                      placeholder="Task title"
                      value={task.title}
                      onChange={(e) => handleTaskChange(task.id, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`description-${task.id}`} className="text-xs">Description</Label>
                    <Textarea 
                      id={`description-${task.id}`} 
                      placeholder="Task description"
                      value={task.description}
                      onChange={(e) => handleTaskChange(task.id, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor={`assignee-${task.id}`} className="text-xs">Assign To</Label>
                      <Input 
                        id={`assignee-${task.id}`} 
                        placeholder="e.g., HR Department"
                        value={task.assigneeRole}
                        onChange={(e) => handleTaskChange(task.id, 'assigneeRole', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`days-${task.id}`} className="text-xs">
                        {templateType === 'onboarding' ? 'Days from start date' : 'Days from exit date'}
                      </Label>
                      <Input 
                        id={`days-${task.id}`} 
                        type="number"
                        placeholder="0"
                        value={task.daysFromStart}
                        onChange={(e) => handleTaskChange(task.id, 'daysFromStart', parseInt(e.target.value) || 0)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Negative values = days before, positive = days after
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {tasks.length === 0 && (
                <div className="border rounded-md p-6 text-center text-muted-foreground">
                  <p>No tasks added yet</p>
                  <Button 
                    type="button" 
                    onClick={handleAddTask} 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                  >
                    <Plus size={14} className="mr-1" /> Add Your First Task
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
