
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Save, Edit } from 'lucide-react';

// Mock data - in a real app this would come from an API
const employeeData = {
  "EMP-001": {
    name: "Sarah Chen",
    email: "sarah.chen@humanity.hr",
    position: "Frontend Developer",
    department: "Engineering",
    status: "Active",
    joinDate: "2022-03-15",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94105",
    emergencyContact: "John Chen (Husband) - +1 (555) 987-6543",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  "EMP-002": {
    name: "James Rodriguez",
    email: "james.rodriguez@humanity.hr",
    position: "Product Manager",
    department: "Product",
    status: "Active",
    joinDate: "2021-06-22",
    phone: "+1 (555) 234-5678",
    address: "456 Market St, San Francisco, CA 94105",
    emergencyContact: "Maria Rodriguez (Wife) - +1 (555) 876-5432",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  }
};

interface EmployeeInfoProps {
  employeeId?: string;
}

export function EmployeeInfo({ employeeId = "EMP-001" }: EmployeeInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const employee = employeeData[employeeId as keyof typeof employeeData] || employeeData["EMP-001"];
  const [formData, setFormData] = useState({ ...employee });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // In a real app, this would update the data via an API
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback>
                {employee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{employee.name}</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{employee.position}</span>
                <span>•</span>
                <span>{employee.department}</span>
              </div>
              <Badge className="mt-1">{employee.status}</Badge>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <Save size={16} /> : <Edit size={16} />}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  value={formData.phone} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="joinDate">Join Date</Label>
                <Input 
                  id="joinDate" 
                  name="joinDate"
                  type="date"
                  value={formData.joinDate} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address"
                  value={formData.address} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input 
                  id="emergencyContact" 
                  name="emergencyContact"
                  value={formData.emergencyContact} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="pt-6 flex justify-end">
                {isEditing && (
                  <Button onClick={handleSave}>Save Changes</Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
