
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Plus, Edit, Trash } from 'lucide-react';

export function CompanyLocationsTab() {
  // Mock location data
  const locations = [
    { id: 1, name: "Headquarters", address: "123 Business Ave, Suite 100, San Francisco, CA 94107", employees: 45, primary: true },
    { id: 2, name: "East Coast Office", address: "456 Commerce St, New York, NY 10001", employees: 28, primary: false },
    { id: 3, name: "Remote Hub", address: "789 Tech Blvd, Austin, TX 78701", employees: 17, primary: false }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Company Locations</h2>
        <Button>
          <Plus size={16} className="mr-2" />
          Add Location
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      {location.name}
                    </div>
                  </TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>{location.employees}</TableCell>
                  <TableCell>
                    {location.primary ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        Primary
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        Branch
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button variant="outline" size="sm" disabled={location.primary}>
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Location Map</CardTitle>
          <CardDescription>Geographic view of all company locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border h-[300px] rounded-md bg-muted/20 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin size={24} className="mx-auto mb-2" />
              <p>Map view would appear here</p>
              <p className="text-sm">(Google Maps integration)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
