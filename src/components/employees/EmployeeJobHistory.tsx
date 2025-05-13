
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Briefcase } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmployeeJobHistoryProps {
  employeeId?: string;
}

// Mock job history data
const employeeJobHistory = {
  "EMP-001": [
    { id: 1, position: "Frontend Developer", department: "Engineering", startDate: "2022-03-15", endDate: null, manager: "John Smith" },
    { id: 2, position: "Junior Developer", department: "Engineering", startDate: "2021-01-10", endDate: "2022-03-14", manager: "Jane Doe" },
  ],
  "EMP-002": [
    { id: 3, position: "Product Manager", department: "Product", startDate: "2021-06-22", endDate: null, manager: "Alice Johnson" },
    { id: 4, position: "Product Specialist", department: "Sales", startDate: "2020-01-15", endDate: "2021-06-21", manager: "Robert Brown" },
  ]
};

export function EmployeeJobHistory({ employeeId = "EMP-001" }: EmployeeJobHistoryProps) {
  const [jobHistory, setJobHistory] = useState(
    employeeJobHistory[employeeId as keyof typeof employeeJobHistory] || []
  );
  const [newJob, setNewJob] = useState({
    position: "",
    department: "",
    startDate: "",
    endDate: "",
    manager: ""
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddJobHistory = () => {
    // In a real app, this would save the data via an API
    const newJobEntry = {
      id: Date.now(),
      ...newJob,
      endDate: newJob.endDate || null
    };
    
    setJobHistory([newJobEntry, ...jobHistory]);
    setDialogOpen(false);
    setNewJob({
      position: "",
      department: "",
      startDate: "",
      endDate: "",
      manager: ""
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Job History</h2>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" />
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Job History</DialogTitle>
              <DialogDescription>
                Add a new position to this employee's job history.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="position">Position</Label>
                <Input 
                  id="position" 
                  name="position"
                  value={newJob.position}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Input 
                  id="department" 
                  name="department"
                  value={newJob.department}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    name="startDate"
                    type="date"
                    value={newJob.startDate}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate">End Date (if applicable)</Label>
                  <Input 
                    id="endDate" 
                    name="endDate"
                    type="date"
                    value={newJob.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="manager">Manager</Label>
                <Input 
                  id="manager" 
                  name="manager"
                  value={newJob.manager}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddJobHistory}>Add Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        {jobHistory.map((job) => (
          <Card key={job.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{job.position}</h3>
                    <div className="text-sm text-muted-foreground">
                      {job.startDate} - {job.endDate || 'Present'}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {job.department} • Manager: {job.manager}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {jobHistory.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No job history entries found.
          </div>
        )}
      </div>
    </div>
  );
}
