
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function LocalizationTab() {
  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Localization Settings</CardTitle>
          <CardDescription>
            Configure language, currency, and time format preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">Default Language</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="en">English</option>
                <option value="vi">Vietnamese</option>
                <option value="th">Thai</option>
                <option value="my">Malay</option>
                <option value="id">Indonesian</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="USD">USD ($)</option>
                <option value="VND">VND (₫)</option>
                <option value="THB">THB (฿)</option>
                <option value="MYR">MYR (RM)</option>
                <option value="SGD">SGD (S$)</option>
                <option value="CNY">CNY (¥)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-format">Time Format</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="12h">12-hour (AM/PM)</option>
                <option value="24h">24-hour</option>
              </select>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Country-specific Tax Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <p className="font-medium">Singapore</p>
                  <p className="text-sm text-muted-foreground">CPF, CDAC, SINDA, ECF, MBMF</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure <ExternalLink size={14} className="ml-1" />
                </Button>
              </div>
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <p className="font-medium">Malaysia</p>
                  <p className="text-sm text-muted-foreground">EPF, SOCSO, EIS, PCB, HRDF</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure <ExternalLink size={14} className="ml-1" />
                </Button>
              </div>
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <p className="font-medium">Vietnam</p>
                  <p className="text-sm text-muted-foreground">Social Insurance, Health Insurance, PIT</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure <ExternalLink size={14} className="ml-1" />
                </Button>
              </div>
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
