
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Mail, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function AddEmployeeDialog() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('manual');
  const { toast } = useToast();
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    department: '',
    startDate: '',
    salary: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddEmployee = () => {
    // In a real app, this would make an API call
    toast({
      title: "Employee added",
      description: `${employeeData.firstName} ${employeeData.lastName} has been added successfully.`,
    });
    setOpen(false);
    // Reset form
    setEmployeeData({
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      department: '',
      startDate: '',
      salary: '',
    });
  };
  
  const handleInviteEmployees = () => {
    toast({
      title: "Invitations sent",
      description: "Email invitations have been sent to the employees.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus size={16} className="mr-2" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            Add a new employee to your organization.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="manual" value={tab} onValueChange={setTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="invite">Send Invite</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" name="firstName" value={employeeData.firstName} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" name="lastName" value={employeeData.lastName} onChange={handleInputChange} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={employeeData.email} onChange={handleInputChange} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" name="jobTitle" value={employeeData.jobTitle} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <select
                  id="department"
                  name="department"
                  value={employeeData.department}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select department...</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" value={employeeData.startDate} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Annual Salary</Label>
                <Input id="salary" name="salary" type="number" value={employeeData.salary} onChange={handleInputChange} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="invite" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <Mail size={18} className="mr-2 text-muted-foreground" />
                  <h3 className="font-medium">Email Invitation</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Send email invitations to your employees. They'll receive instructions to set up their accounts.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inviteEmails">Email Addresses</Label>
                <Input
                  id="inviteEmails"
                  placeholder="Enter email addresses separated by commas"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  For example: john@example.com, sarah@example.com
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Custom Message (Optional)</Label>
                <textarea
                  id="message"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Add a personal message to the invitation emails"
                ></textarea>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bulk" className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Upload size={18} className="mr-2 text-muted-foreground" />
                <h3 className="font-medium">Bulk Upload</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload a CSV file with employee information. Download our template to ensure proper formatting.
              </p>
            </div>
            
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 border-muted-foreground/25 hover:bg-muted/30">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload size={24} className="mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    CSV files only (MAX. 100 employees)
                  </p>
                </div>
                <input id="file-upload" type="file" accept=".csv" className="hidden" />
              </label>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                Download Template
              </Button>
              <Button variant="outline" size="sm" disabled>
                Upload File
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {tab === 'manual' && (
            <Button onClick={handleAddEmployee}>
              Add Employee
            </Button>
          )}
          {tab === 'invite' && (
            <Button onClick={handleInviteEmployees}>
              Send Invitations
            </Button>
          )}
          {tab === 'bulk' && (
            <Button disabled>
              Process Upload
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
