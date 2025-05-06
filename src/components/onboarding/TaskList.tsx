
import { CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TaskStatus = 'completed' | 'pending' | 'upcoming';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate?: string;
  assignee: string;
}

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {task.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-amber-500" />
                )}
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">Assigned to: {task.assignee}</p>
                </div>
              </div>
              <div className="text-right">
                {task.dueDate && (
                  <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                )}
                <Badge 
                  variant={
                    task.status === 'completed' ? 'default' : 
                    task.status === 'pending' ? 'outline' : 'secondary'
                  }
                >
                  {task.status === 'completed' ? 'Completed' : 
                   task.status === 'pending' ? 'In Progress' : 'Upcoming'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Need to import Badge
import { Badge } from "@/components/ui/badge";
