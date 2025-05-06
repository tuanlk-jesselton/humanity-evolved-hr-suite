
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface NewEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewEmployeeDialog({ open, onOpenChange }: NewEmployeeDialogProps) {
  const [employeeType, setEmployeeType] = useState('new-hire');
  const [selectedTemplate, setSelectedTemplate] = useState('standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('New employee onboarding process initiated.');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Employee for Onboarding</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input id="firstName" placeholder="John" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input id="lastName" placeholder="Doe" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" placeholder="john.doe@company.com" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input id="position" placeholder="Software Developer" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Select defaultValue="engineering">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input id="startDate" type="date" className="col-span-3" required />
            </div>
            
            <Separator className="my-2" />
            
            <div className="space-y-2">
              <Label>Employee Type</Label>
              <RadioGroup defaultValue="new-hire" value={employeeType} onValueChange={setEmployeeType} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new-hire" id="new-hire" />
                  <Label htmlFor="new-hire">New Hire</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer">Internal Transfer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rehire" id="rehire" />
                  <Label htmlFor="rehire">Rehire</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Onboarding Template</Label>
              <Select defaultValue="standard" value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Onboarding</SelectItem>
                  <SelectItem value="remote">Remote Employee</SelectItem>
                  <SelectItem value="executive">Executive Onboarding</SelectItem>
                  <SelectItem value="intern">Intern Onboarding</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Start Onboarding</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
