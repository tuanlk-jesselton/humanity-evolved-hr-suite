
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Heart, Users } from 'lucide-react';

export function HealthBenefitsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Health Plan Overview</CardTitle>
          <CardDescription>Your current medical, dental, and vision coverage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-primary mb-1">Medical</h3>
                  <p className="text-sm text-muted-foreground">Premium PPO Plan</p>
                </div>
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Coverage</span>
                  <span className="font-medium">Family</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Monthly Premium</span>
                  <span className="font-medium">$350.00</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Deductible</span>
                  <span className="font-medium">$1,000</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-primary mb-1">Dental</h3>
                  <p className="text-sm text-muted-foreground">Standard Dental Plan</p>
                </div>
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Coverage</span>
                  <span className="font-medium">Family</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Monthly Premium</span>
                  <span className="font-medium">$45.00</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Annual Maximum</span>
                  <span className="font-medium">$2,000</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-primary mb-1">Vision</h3>
                  <p className="text-sm text-muted-foreground">Enhanced Vision Plan</p>
                </div>
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Coverage</span>
                  <span className="font-medium">Employee + Spouse</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Monthly Premium</span>
                  <span className="font-medium">$25.00</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Exam Copay</span>
                  <span className="font-medium">$10</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline">Update Coverage</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Covered Dependents</CardTitle>
          <CardDescription>Family members included in your health plans</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Medical</TableHead>
                <TableHead>Dental</TableHead>
                <TableHead>Vision</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Emma Chen</TableCell>
                <TableCell>Spouse</TableCell>
                <TableCell>Jan 15, 1985</TableCell>
                <TableCell><span className="text-green-500">✓</span></TableCell>
                <TableCell><span className="text-green-500">✓</span></TableCell>
                <TableCell><span className="text-green-500">✓</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lucas Chen</TableCell>
                <TableCell>Child</TableCell>
                <TableCell>Mar 22, 2015</TableCell>
                <TableCell><span className="text-green-500">✓</span></TableCell>
                <TableCell><span className="text-green-500">✓</span></TableCell>
                <TableCell><span className="text-red-500">✗</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sophia Chen</TableCell>
                <TableCell>Child</TableCell>
                <TableCell>Sep 10, 2017</TableCell>
                <TableCell><span className="text-green-500">✓</span></TableCell>
                <TableCell><span className="text-green-500">✓</span></TableCell>
                <TableCell><span className="text-red-500">✗</span></TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
              <Users size={16} className="mr-2" />
              Add Dependent
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
