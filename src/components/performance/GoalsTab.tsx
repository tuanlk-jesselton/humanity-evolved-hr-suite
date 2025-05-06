
import { useState } from 'react';
import { Plus, Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { NewGoalDialog } from '@/components/performance/NewGoalDialog';

type Goal = {
  id: string;
  title: string;
  description: string;
  type: 'objective' | 'key-result';
  progress: number;
  dueDate: string;
  status: 'not-started' | 'in-progress' | 'completed';
};

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Improve employee retention by 15%',
    description: 'Implement programs and initiatives to reduce employee turnover rate',
    type: 'objective',
    progress: 75,
    dueDate: '2025-12-31',
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'Launch employee wellness program',
    description: 'Develop and implement a comprehensive wellness program for all staff',
    type: 'key-result',
    progress: 40,
    dueDate: '2025-06-30',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Complete leadership training for all managers',
    description: 'Ensure all management staff completes the leadership certification',
    type: 'key-result',
    progress: 100,
    dueDate: '2025-03-15',
    status: 'completed'
  }
];

export function GoalsTab() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGoal = (newGoal: Omit<Goal, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setGoals([...goals, { ...newGoal, id }]);
    setIsDialogOpen(false);
  };

  const getStatusBadgeVariant = (status: Goal['status']) => {
    switch (status) {
      case 'not-started': return 'secondary';
      case 'in-progress': return 'warning';
      case 'completed': return 'default'; // Default is primary
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Goals & OKRs</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add Goal
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover-scale">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant={goal.type === 'objective' ? 'default' : 'secondary'}>
                  {goal.type === 'objective' ? 'Objective' : 'Key Result'}
                </Badge>
                <Badge variant={getStatusBadgeVariant(goal.status)}>
                  {goal.status === 'not-started' ? 'Not Started' : 
                   goal.status === 'in-progress' ? 'In Progress' : 'Completed'}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-3">{goal.title}</CardTitle>
              <CardDescription className="text-sm line-clamp-2">
                {goal.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Due: {new Date(goal.dueDate).toLocaleDateString()}
              </span>
              <Button variant="outline" size="sm">Update</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <NewGoalDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onAddGoal={handleAddGoal} 
      />
    </div>
  );
}
