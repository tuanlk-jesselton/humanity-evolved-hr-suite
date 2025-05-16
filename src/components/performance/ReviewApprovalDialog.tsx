
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, MessageSquare, Clock, CheckCheck, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ReviewApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: any;
  onApprove: (reviewId: string, feedback: string, rating?: number) => void;
  onReject: (reviewId: string, feedback: string) => void;
}

export function ReviewApprovalDialog({ 
  open, 
  onOpenChange, 
  review, 
  onApprove, 
  onReject 
}: ReviewApprovalDialogProps) {
  const [feedback, setFeedback] = useState('');
  const [activeTab, setActiveTab] = useState('review');
  const [rating, setRating] = useState(review.rating || 0);
  
  if (!review) return null;
  
  const handleApprove = () => {
    onApprove(review.id, feedback, rating);
    setFeedback('');
  };
  
  const handleReject = () => {
    onReject(review.id, feedback);
    setFeedback('');
  };
  
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Performance Review</span>
            <Badge variant={
              review.status === 'draft' ? 'secondary' : 
              review.status === 'pending' ? 'warning' : 
              review.status === 'completed' ? 'default' : 'destructive'
            }>
              {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
            </Badge>
          </DialogTitle>
          <div className="flex flex-col text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>
                <span className="font-medium">{review.employee}</span> • {review.position}
              </span>
              <span>
                Department: <span className="font-medium">{review.department}</span>
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span>
                Reviewer: <span className="font-medium">{review.reviewerName}</span>
              </span>
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                Due: {new Date(review.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="review" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="review">
              <FileText size={14} className="mr-1" />
              Review Content
            </TabsTrigger>
            <TabsTrigger value="approval">
              <CheckCheck size={14} className="mr-1" />
              Approval Action
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="review" className="space-y-4 pt-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Performance Assessment</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Goals Achievement</h4>
                    <p>The employee has successfully completed 8 out of 10 assigned goals for the period, demonstrating consistent progress and dedication to their responsibilities.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Technical Skills</h4>
                    <p>Demonstrates strong proficiency in required technical skills. Has shown improvement in system architecture knowledge and problem-solving abilities.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Communication</h4>
                    <p>Communicates effectively with team members and stakeholders. Documentation is thorough and clear. Could improve on proactive updates about project status.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Teamwork</h4>
                    <p>Collaborates well with team members, provides support when needed, and contributes positively to team dynamics and morale.</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Overall Rating</h4>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{rating.toFixed(1)}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'} focus:outline-none`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Summary</h4>
                  <p>Overall, the employee has shown consistent performance and growth in their role. They have successfully met expectations and contributed positively to team outcomes.</p>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Development Plan</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Complete advanced certification in relevant technology</li>
                    <li>Take on mentorship of a junior team member</li>
                    <li>Work on improving project management skills</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              onClick={() => setActiveTab('approval')} 
              className="w-full"
            >
              Continue to Approval
            </Button>
          </TabsContent>
          
          <TabsContent value="approval" className="space-y-4 pt-4">
            <div className="space-y-3">
              <Label htmlFor="feedback" className="flex items-center">
                <MessageSquare size={14} className="mr-1" />
                <span>Feedback & Comments</span>
              </Label>
              <Textarea 
                id="feedback" 
                placeholder="Add your feedback or comments about this performance review"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Your feedback will be shared with both the employee and reviewer
              </p>
            </div>
            
            <div className="border rounded-md p-4 bg-secondary/20">
              <h4 className="font-medium flex items-center mb-2">
                <Clock size={14} className="mr-1" />
                Approval Timeline
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Review Created</span>
                  <span className="font-medium">{new Date(review.lastUpdated).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between">
                  <span>Submitted for Approval</span>
                  <span className="font-medium">May 28, 2025</span>
                </li>
                <li className="flex justify-between text-muted-foreground">
                  <span>Approved/Rejected</span>
                  <span>Pending</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <Button 
                onClick={handleApprove} 
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <CheckCheck size={16} className="mr-2" />
                Approve Review
              </Button>
              <Button 
                variant="outline" 
                onClick={handleReject}
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                <X size={16} className="mr-2" />
                Reject & Send Back for Revisions
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
