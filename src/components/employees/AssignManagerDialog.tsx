
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface AssignManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: number | null;
}

// Dummy data for potential managers
const potentialManagers = [
  { id: 1, name: "Sarah Chen", role: "Frontend Developer" },
  { id: 2, name: "Jessica Taylor", role: "HR Specialist" },
  { id: 3, name: "Robert Wilson", role: "Financial Analyst" },
  { id: 4, name: "David Wong", role: "Engineering Manager" }
];

export function AssignManagerDialog({ open, onOpenChange, employeeId }: AssignManagerDialogProps) {
  const [selectedManagerId, setSelectedManagerId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedManagerId) {
      toast.error("Please select a manager");
      return;
    }
    
    // Here would go the API call to update the employee's manager
    toast.success(`Manager assigned successfully!`);
    setSelectedManagerId("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Manager</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="manager">Select Manager</Label>
              <Select 
                value={selectedManagerId} 
                onValueChange={setSelectedManagerId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a manager" />
                </SelectTrigger>
                <SelectContent>
                  {potentialManagers.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id.toString()}>
                      {manager.name} ({manager.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Assign Manager</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
