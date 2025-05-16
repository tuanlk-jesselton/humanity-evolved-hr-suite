
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Users, FileText, Banknote, Clock } from 'lucide-react';

export function WelcomeOnboarding() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const tasks = [
    {
      id: 'add-employees',
      title: 'Add employees',
      icon: Users,
      description: 'Add your team members to get started',
      link: '/employees'
    },
    {
      id: 'set-policies',
      title: 'Set up company policies',
      icon: FileText,
      description: 'Configure time off, benefits and other policies',
      link: '/company'
    },
    {
      id: 'setup-payroll',
      title: 'Set up payroll',
      icon: Banknote,
      description: 'Configure your payroll settings',
      link: '/payroll'
    },
    {
      id: 'tracking',
      title: 'Enable time tracking',
      icon: Clock,
      description: 'Start tracking work hours for your team',
      link: '/time-tracking'
    }
  ];

  const handleTaskClick = (taskId: string) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Welcome to HumanityHR!</CardTitle>
        <CardDescription>Complete these tasks to set up your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                completedTasks.includes(task.id) ? 'bg-primary/10 border-primary/20' : 'bg-card border-input'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  completedTasks.includes(task.id) ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {completedTasks.includes(task.id) ? 
                    <Check size={16} /> : 
                    <task.icon size={16} />
                  }
                </div>
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
              </div>
              <Button 
                variant={completedTasks.includes(task.id) ? "outline" : "default"} 
                size="sm"
                asChild
                onClick={() => handleTaskClick(task.id)}
              >
                <a href={task.link}>
                  {completedTasks.includes(task.id) ? 'View' : 'Start'}
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className="w-full bg-muted rounded-full h-2 mb-1">
            <div 
              className="bg-primary rounded-full h-2" 
              style={{ width: `${(completedTasks.length / tasks.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground">
            {completedTasks.length} of {tasks.length} tasks completed
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
