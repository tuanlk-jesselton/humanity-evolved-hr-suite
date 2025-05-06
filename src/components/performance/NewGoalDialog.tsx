
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Goal = {
  title: string;
  description: string;
  type: 'objective' | 'key-result';
  progress: number;
  dueDate: string;
  status: 'not-started' | 'in-progress' | 'completed';
};

type NewGoalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: Goal) => void;
};

export function NewGoalDialog({ open, onOpenChange, onAddGoal }: NewGoalDialogProps) {
  const [newGoal, setNewGoal] = useState<Goal>({
    title: '',
    description: '',
    type: 'objective',
    progress: 0,
    dueDate: new Date().toISOString().split('T')[0],
    status: 'not-started'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setNewGoal(prev => ({ 
      ...prev, 
      type: value as 'objective' | 'key-result' 
    }));
  };

  const handleStatusChange = (value: string) => {
    setNewGoal(prev => ({ 
      ...prev, 
      status: value as 'not-started' | 'in-progress' | 'completed',
      progress: value === 'completed' ? 100 : (value === 'in-progress' ? 50 : 0)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.title.trim() === '') return;
    onAddGoal(newGoal);
    setNewGoal({
      title: '',
      description: '',
      type: 'objective',
      progress: 0,
      dueDate: new Date().toISOString().split('T')[0],
      status: 'not-started'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
          <DialogDescription>
            Add a new goal or key result to track performance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                name="title"
                value={newGoal.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newGoal.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <RadioGroup 
                value={newGoal.type} 
                onValueChange={handleTypeChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="objective" id="objective" />
                  <Label htmlFor="objective">Objective</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="key-result" id="key-result" />
                  <Label htmlFor="key-result">Key Result</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup 
                value={newGoal.status} 
                onValueChange={handleStatusChange}
                className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-started" id="not-started" />
                  <Label htmlFor="not-started">Not Started</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-progress" id="in-progress" />
                  <Label htmlFor="in-progress">In Progress</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="completed" id="completed" />
                  <Label htmlFor="completed">Completed</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={newGoal.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Goal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
