
import { CreditCard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function SubscriptionTab() {
  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the Business Plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold">Business Plan</p>
              <p className="text-sm text-muted-foreground">Up to 300 employees</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$499 / month</p>
              <p className="text-sm text-muted-foreground">Billed annually</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <p className="font-medium">Employee Usage</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">287</p>
                  <p className="text-muted-foreground">/ 300</p>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <p className="font-medium">Storage Usage</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">3.2 GB</p>
                  <p className="text-muted-foreground">/ 10 GB</p>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <p className="font-medium">Billing Cycle</p>
                </div>
                <div>
                  <p>May 10, 2025 - May 9, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <Button variant="outline">View Invoice History</Button>
          <Button>
            Upgrade Plan
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Update your billing details and address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-muted rounded-md p-2">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 04/2026</p>
              </div>
            </div>
            <Button variant="ghost">Edit</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Add Payment Method</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
