
import { useState } from 'react';
import { Search, FileText, Clock, CheckCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Review = {
  id: string;
  employee: string;
  reviewerName: string;
  position: string;
  department: string;
  type: string;
  status: 'draft' | 'pending' | 'completed';
  dueDate: string;
  lastUpdated: string;
  rating?: number;
};

const mockReviews: Review[] = [
  {
    id: '1',
    employee: 'Sarah Johnson',
    reviewerName: 'Michael Chen',
    position: 'Senior Developer',
    department: 'Engineering',
    type: 'Quarterly Performance Review',
    status: 'pending',
    dueDate: '2025-06-15',
    lastUpdated: '2025-05-28',
  },
  {
    id: '2',
    employee: 'David Wong',
    reviewerName: 'Ana Rodriguez',
    position: 'Marketing Specialist',
    department: 'Marketing',
    type: 'Annual Review',
    status: 'draft',
    dueDate: '2025-07-01',
    lastUpdated: '2025-05-20',
  },
  {
    id: '3',
    employee: 'Emma Parker',
    reviewerName: 'James Wilson',
    position: 'Customer Success Manager',
    department: 'Customer Support',
    type: 'Quarterly Performance Review',
    status: 'completed',
    dueDate: '2025-05-30',
    lastUpdated: '2025-05-29',
    rating: 4.2,
  },
  {
    id: '4',
    employee: 'Alex Nguyen',
    reviewerName: 'Sarah Johnson',
    position: 'UX Designer',
    department: 'Design',
    type: 'Mid-Year Review',
    status: 'pending',
    dueDate: '2025-06-20',
    lastUpdated: '2025-05-25',
  }
];

export function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       review.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeStatus === 'all') return matchesSearch;
    return matchesSearch && review.status === activeStatus;
  });

  const getStatusIcon = (status: Review['status']) => {
    switch (status) {
      case 'draft': return <FileText size={16} className="mr-1" />;
      case 'pending': return <Clock size={16} className="mr-1" />;
      case 'completed': return <CheckCircle size={16} className="mr-1" />;
      default: return null;
    }
  };

  const getStatusBadgeVariant = (status: Review['status']) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'pending': return 'warning';
      case 'completed': return 'default'; // primary
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Performance Reviews</h2>
        <Button>
          <Plus className="h-4 w-4 mr-1" /> Create Review
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs defaultValue="all" value={activeStatus} onValueChange={setActiveStatus} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <Card key={review.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{review.employee}</CardTitle>
                  <Badge variant={getStatusBadgeVariant(review.status)} className="flex items-center">
                    {getStatusIcon(review.status)}
                    {review.status === 'draft' ? 'Draft' : 
                     review.status === 'pending' ? 'Pending' : 'Completed'}
                  </Badge>
                </div>
                <CardDescription className="flex flex-col space-y-1">
                  <span>{review.position} • {review.department}</span>
                  <span className="text-xs">Reviewer: {review.reviewerName}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p><span className="text-muted-foreground">Review Type:</span> {review.type}</p>
                  <p><span className="text-muted-foreground">Due Date:</span> {new Date(review.dueDate).toLocaleDateString()}</p>
                  {review.rating && (
                    <p className="flex items-center mt-1">
                      <span className="text-muted-foreground">Rating:</span>
                      <span className="ml-1 font-medium">{review.rating.toFixed(1)}</span>
                      <span className="flex ml-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-lg ${i < Math.round(review.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                        ))}
                      </span>
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Updated: {new Date(review.lastUpdated).toLocaleDateString()}
                </div>
                <Button variant="outline" size="sm">
                  {review.status === 'completed' ? 'View' : 'Edit'} Review
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-muted-foreground">No reviews match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
