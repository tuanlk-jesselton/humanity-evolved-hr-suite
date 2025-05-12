
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CompanyTab() {
  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Update your company details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Acme Corporation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration-number">Registration Number</Label>
              <Input id="registration-number" defaultValue="AC123456789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-address">Address</Label>
              <Input id="company-address" defaultValue="123 Business Avenue" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-city">City</Label>
              <Input id="company-city" defaultValue="San Francisco" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-state">State/Province</Label>
              <Input id="company-state" defaultValue="California" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-postal">Postal Code</Label>
              <Input id="company-postal" defaultValue="94105" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-country">Country</Label>
              <Input id="company-country" defaultValue="United States" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Phone Number</Label>
              <Input id="company-phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company-website">Website</Label>
              <Input id="company-website" defaultValue="https://acmecorp.com" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
