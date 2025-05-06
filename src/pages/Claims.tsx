
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Search, Filter, Calendar, Download, MoreHorizontal, Receipt } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Sample data for claims
const claimsData = [
  {
    id: "CLM-001",
    title: "Client Meeting Lunch",
    category: "Meals",
    amount: 58.75,
    date: "2025-05-01",
    status: "Approved",
  },
  {
    id: "CLM-002",
    title: "Office Supplies",
    category: "Office",
    amount: 124.50,
    date: "2025-04-28",
    status: "Pending",
  },
  {
    id: "CLM-003",
    title: "Uber to Client Office",
    category: "Transportation",
    amount: 32.20,
    date: "2025-04-25",
    status: "Approved",
  },
  {
    id: "CLM-004",
    title: "Conference Registration",
    category: "Professional Development",
    amount: 499.99,
    date: "2025-04-20",
    status: "Rejected",
  },
  {
    id: "CLM-005",
    title: "Team Dinner",
    category: "Meals",
    amount: 215.80,
    date: "2025-04-15",
    status: "Approved",
  },
  {
    id: "CLM-006",
    title: "Software Subscription",
    category: "Software",
    amount: 49.99,
    date: "2025-04-10",
    status: "Pending",
  }
];

const Claims = () => {
  const [isNewClaimOpen, setIsNewClaimOpen] = useState(false);
  const [claimTitle, setClaimTitle] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimCategory, setClaimCategory] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const [claimDate, setClaimDate] = useState('');

  const handleSubmitClaim = () => {
    // Here we would normally submit to an API
    console.log("Claim submitted:", {
      title: claimTitle,
      amount: claimAmount,
      category: claimCategory,
      description: claimDescription,
      date: claimDate
    });
    
    // Reset form and close dialog
    setClaimTitle('');
    setClaimAmount('');
    setClaimCategory('');
    setClaimDescription('');
    setClaimDate('');
    setIsNewClaimOpen(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Claims & Expenses</h1>
          <Dialog open={isNewClaimOpen} onOpenChange={setIsNewClaimOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-2" />
                New Claim
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Submit New Expense Claim</DialogTitle>
                <DialogDescription>
                  Enter the details of your expense claim. Required fields are marked with an asterisk.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="claim-title" className="text-right">
                    Title *
                  </Label>
                  <Input
                    id="claim-title"
                    className="col-span-3"
                    value={claimTitle}
                    onChange={(e) => setClaimTitle(e.target.value)}
                    placeholder="e.g., Client Meeting Lunch"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="claim-amount" className="text-right">
                    Amount *
                  </Label>
                  <div className="col-span-3 flex">
                    <span className="flex h-10 w-8 items-center justify-center rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="claim-amount"
                      className="rounded-l-none"
                      value={claimAmount}
                      onChange={(e) => setClaimAmount(e.target.value)}
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="claim-category" className="text-right">
                    Category *
                  </Label>
                  <Select value={claimCategory} onValueChange={setClaimCategory}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meals">Meals</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                      <SelectItem value="office">Office Supplies</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="professional">Professional Development</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="claim-date" className="text-right">
                    Date *
                  </Label>
                  <Input
                    id="claim-date"
                    className="col-span-3"
                    value={claimDate}
                    onChange={(e) => setClaimDate(e.target.value)}
                    type="date"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="claim-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="claim-description"
                    className="col-span-3"
                    value={claimDescription}
                    onChange={(e) => setClaimDescription(e.target.value)}
                    placeholder="Additional details about your expense..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="claim-receipt" className="text-right">
                    Receipt
                  </Label>
                  <div className="col-span-3">
                    <Input id="claim-receipt" type="file" className="cursor-pointer" />
                    <p className="text-sm text-muted-foreground mt-1">Upload a receipt or invoice (PDF, JPG, PNG)</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewClaimOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSubmitClaim}>
                  Submit Claim
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search claims..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>

        <Card>
          <CardHeader className="px-6">
            <CardTitle>Expense Claims</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="px-6">
              <TabsList>
                <TabsTrigger value="all">All Claims</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claimsData.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Receipt size={16} />
                            <span>{claim.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{claim.category}</TableCell>
                        <TableCell>{claim.date}</TableCell>
                        <TableCell>${claim.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              claim.status === "Approved" ? "default" :
                              claim.status === "Pending" ? "outline" : "destructive"
                            }
                          >
                            {claim.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                              {claim.status === "Pending" && (
                                <DropdownMenuItem>Edit Claim</DropdownMenuItem>
                              )}
                              {claim.status === "Pending" && (
                                <DropdownMenuItem className="text-destructive">
                                  Cancel Claim
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="pending" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claimsData.filter(claim => claim.status === "Pending").map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Receipt size={16} />
                            <span>{claim.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{claim.category}</TableCell>
                        <TableCell>{claim.date}</TableCell>
                        <TableCell>${claim.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {claim.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                              <DropdownMenuItem>Edit Claim</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Cancel Claim
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="approved" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claimsData.filter(claim => claim.status === "Approved").map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Receipt size={16} />
                            <span>{claim.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{claim.category}</TableCell>
                        <TableCell>{claim.date}</TableCell>
                        <TableCell>${claim.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="default">
                            {claim.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="rejected" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claimsData.filter(claim => claim.status === "Rejected").map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Receipt size={16} />
                            <span>{claim.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{claim.category}</TableCell>
                        <TableCell>{claim.date}</TableCell>
                        <TableCell>${claim.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">
                            {claim.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                              <DropdownMenuItem>Resubmit</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Claims;
