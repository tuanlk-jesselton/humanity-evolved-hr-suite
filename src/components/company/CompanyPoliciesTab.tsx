
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Plus, Download, Edit } from 'lucide-react';

export function CompanyPoliciesTab() {
  // Mock policy data
  const policies = [
    { id: 1, name: "Employee Handbook", description: "Company-wide policies and procedures", lastUpdated: "Jan 15, 2023", status: "Active" },
    { id: 2, name: "COVID-19 Safety Policy", description: "Workplace safety guidelines during pandemic", lastUpdated: "Mar 22, 2023", status: "Active" },
    { id: 3, name: "Remote Work Policy", description: "Guidelines for employees working remotely", lastUpdated: "Feb 10, 2023", status: "Active" },
    { id: 4, name: "Data Protection Policy", description: "Rules for handling sensitive information", lastUpdated: "Apr 05, 2023", status: "Active" },
    { id: 5, name: "Business Travel Policy", description: "Guidelines for business-related travel", lastUpdated: "Dec 12, 2022", status: "Under Review" }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Company Policies</h2>
        <Button>
          <Plus size={16} className="mr-2" />
          Create Policy
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      {policy.name}
                    </div>
                  </TableCell>
                  <TableCell>{policy.description}</TableCell>
                  <TableCell>{policy.lastUpdated}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      policy.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {policy.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Download size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Policy Templates</CardTitle>
            <CardDescription>Ready-to-use templates for common policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                <div>
                  <p className="font-medium">Attendance Policy</p>
                  <p className="text-xs text-muted-foreground">Standard template</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download size={16} />
              </Button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                <div>
                  <p className="font-medium">Code of Conduct</p>
                  <p className="text-xs text-muted-foreground">Standard template</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download size={16} />
              </Button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                <div>
                  <p className="font-medium">Anti-Harassment Policy</p>
                  <p className="text-xs text-muted-foreground">Standard template</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Policy Updates</CardTitle>
            <CardDescription>Latest changes to company policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">COVID-19 Safety Policy</p>
                  <span className="text-xs text-muted-foreground">Mar 22, 2023</span>
                </div>
                <p className="text-sm text-muted-foreground">Updated office capacity guidelines and mask requirements.</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Data Protection Policy</p>
                  <span className="text-xs text-muted-foreground">Apr 05, 2023</span>
                </div>
                <p className="text-sm text-muted-foreground">Added new section on handling customer data in compliance with GDPR.</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Remote Work Policy</p>
                  <span className="text-xs text-muted-foreground">Feb 10, 2023</span>
                </div>
                <p className="text-sm text-muted-foreground">Expanded eligible positions and updated equipment provisions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
