
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Check, Calendar, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Compliance() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Compliance</h1>
            <p className="text-muted-foreground">
              Manage compliance tasks, deadlines, and regulatory requirements.
            </p>
          </div>
          <Button variant="outline">
            <Calendar size={16} className="mr-2" />
            Compliance Calendar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <CardTitle className="text-green-700 dark:text-green-300">In Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">12</p>
              <p className="text-xs text-green-600 dark:text-green-400">Requirements met</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-yellow-700 dark:text-yellow-300">Upcoming</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">3</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">Due this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <CardTitle className="text-red-700 dark:text-red-300">Attention Needed</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">1</p>
              <p className="text-xs text-red-600 dark:text-red-400">Requires immediate action</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Tasks</CardTitle>
            <CardDescription>Upcoming and pending compliance requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={16} className="text-red-500" />
                      <span>Q2 Tax Filing</span>
                    </div>
                  </TableCell>
                  <TableCell>Tax</TableCell>
                  <TableCell>Jun 30, 2023</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                      <span>Overdue</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">Complete Now</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-yellow-500" />
                      <span>Annual OSHA Report</span>
                    </div>
                  </TableCell>
                  <TableCell>Workplace Safety</TableCell>
                  <TableCell>Jul 15, 2023</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                      <span>Due Soon</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Start</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-yellow-500" />
                      <span>Employee Benefits Review</span>
                    </div>
                  </TableCell>
                  <TableCell>Benefits</TableCell>
                  <TableCell>Jul 31, 2023</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                      <span>Due Soon</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Start</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span>Data Privacy Audit</span>
                    </div>
                  </TableCell>
                  <TableCell>Data Protection</TableCell>
                  <TableCell>Aug 15, 2023</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span>On Track</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Documentation</CardTitle>
              <CardDescription>Required legal and regulatory documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">Privacy Policy</p>
                    <p className="text-xs text-muted-foreground">Updated Jan 2023</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-muted-foreground">Current</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">Employee Handbook</p>
                    <p className="text-xs text-muted-foreground">Updated Mar 2023</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-muted-foreground">Current</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">Business License</p>
                    <p className="text-xs text-muted-foreground">Expires Oct 2023</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                  <span className="text-sm text-muted-foreground">Renew Soon</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Compliance Resources</CardTitle>
              <CardDescription>Helpful guides and tools for staying compliant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Shield size={24} className="text-primary" />
                    <h3 className="font-medium">GDPR Checklist</h3>
                    <p className="text-xs text-muted-foreground">Data protection guide</p>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Shield size={24} className="text-primary" />
                    <h3 className="font-medium">Tax Calendar</h3>
                    <p className="text-xs text-muted-foreground">2023 filing deadlines</p>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Shield size={24} className="text-primary" />
                    <h3 className="font-medium">HR Compliance</h3>
                    <p className="text-xs text-muted-foreground">Best practices</p>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Shield size={24} className="text-primary" />
                    <h3 className="font-medium">Payroll Rules</h3>
                    <p className="text-xs text-muted-foreground">State guidelines</p>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
