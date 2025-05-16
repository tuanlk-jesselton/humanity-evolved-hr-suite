
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Download, Upload, Search, Plus, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Documents() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Documents</h1>
            <p className="text-muted-foreground">
              Company and employee documents, forms, and templates.
            </p>
          </div>
          <Button>
            <Plus size={16} className="mr-2" />
            New Document
          </Button>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>
                  Browse and manage all company documents
                </CardDescription>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search documents..."
                    className="w-full md:w-[200px] pl-8"
                  />
                </div>
                <Button variant="outline">
                  <Upload size={16} className="mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Document Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      Employee Handbook.pdf
                    </div>
                  </TableCell>
                  <TableCell>Company Policies</TableCell>
                  <TableCell>May 15, 2023</TableCell>
                  <TableCell>2.4 MB</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      Offer Letter Template.docx
                    </div>
                  </TableCell>
                  <TableCell>HR Templates</TableCell>
                  <TableCell>Apr 22, 2023</TableCell>
                  <TableCell>150 KB</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      Health Insurance Policy.pdf
                    </div>
                  </TableCell>
                  <TableCell>Benefits</TableCell>
                  <TableCell>Mar 10, 2023</TableCell>
                  <TableCell>3.8 MB</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      401(k) Plan Summary.pdf
                    </div>
                  </TableCell>
                  <TableCell>Benefits</TableCell>
                  <TableCell>Feb 28, 2023</TableCell>
                  <TableCell>1.2 MB</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      Direct Deposit Form.pdf
                    </div>
                  </TableCell>
                  <TableCell>Payroll</TableCell>
                  <TableCell>Jan 15, 2023</TableCell>
                  <TableCell>500 KB</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Templates</CardTitle>
              <CardDescription>
                Standardized templates for HR processes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">Offer Letter</p>
                    <p className="text-xs text-muted-foreground">Last edited 2 months ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">Employment Contract</p>
                    <p className="text-xs text-muted-foreground">Last edited 4 months ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">Performance Review</p>
                    <p className="text-xs text-muted-foreground">Last edited 1 month ago</p>
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
              <CardTitle>Legal Documents</CardTitle>
              <CardDescription>
                Compliance and regulatory documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">Privacy Policy</p>
                    <p className="text-xs text-muted-foreground">Updated January 2023</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">Data Protection Policy</p>
                    <p className="text-xs text-muted-foreground">Updated March 2023</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  <div>
                    <p className="font-medium">GDPR Compliance</p>
                    <p className="text-xs text-muted-foreground">Updated December 2022</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
