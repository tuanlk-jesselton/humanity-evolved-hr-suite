import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  CreditCard, 
  Globe, 
  Lock, 
  Settings as SettingsIcon, 
  UserCog, 
  Building, 
  ExternalLink,
  Check
} from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('subscription');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <Tabs defaultValue="subscription" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="subscription">
              <CreditCard size={16} className="mr-2" />
              <span className="hidden md:inline">Subscription</span>
            </TabsTrigger>
            <TabsTrigger value="company">
              <Building size={16} className="mr-2" />
              <span className="hidden md:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="users">
              <UserCog size={16} className="mr-2" />
              <span className="hidden md:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="localization">
              <Globe size={16} className="mr-2" />
              <span className="hidden md:inline">Localization</span>
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock size={16} className="mr-2" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscription" className="space-y-6 pt-4">
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
          </TabsContent>
          
          <TabsContent value="company" className="space-y-6 pt-4">
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
          </TabsContent>
          
          <TabsContent value="localization" className="space-y-6 pt-4">
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
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure advanced security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <Switch id="two-factor" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out after inactivity
                      </p>
                    </div>
                    <select className="flex h-10 w-40 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="120">2 hours</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="password-policy">Password Policy</Label>
                      <p className="text-sm text-muted-foreground">
                        Require strong passwords
                      </p>
                    </div>
                    <Switch id="password-policy" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-encryption">Data Encryption</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable end-to-end encryption for sensitive data
                      </p>
                    </div>
                    <Switch id="data-encryption" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="audit-logs">Audit Logs</Label>
                      <p className="text-sm text-muted-foreground">
                        Keep detailed audit logs of all system actions
                      </p>
                    </div>
                    <Switch id="audit-logs" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6 pt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Invite and manage users</CardDescription>
                </div>
                <Button>
                  <UserCog size={16} className="mr-2" />
                  Invite User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        JD
                      </div>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">john.doe@acmecorp.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary">Admin</Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        JS
                      </div>
                      <div>
                        <p className="font-medium">Jane Smith</p>
                        <p className="text-sm text-muted-foreground">jane.smith@acmecorp.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-secondary">HR Admin</Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        RJ
                      </div>
                      <div>
                        <p className="font-medium">Robert Johnson</p>
                        <p className="text-sm text-muted-foreground">robert.johnson@acmecorp.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-muted">Payroll Admin</Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>
                  Configure roles and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Admin</p>
                      <p className="text-sm text-muted-foreground">Full system access</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">HR Admin</p>
                      <p className="text-sm text-muted-foreground">Employee management, attendance, leave, performance</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payroll Admin</p>
                      <p className="text-sm text-muted-foreground">Payroll processing, claims approval</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Manager</p>
                      <p className="text-sm text-muted-foreground">Team management, approvals, reviews</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Employee</p>
                      <p className="text-sm text-muted-foreground">Self-service portal access</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
