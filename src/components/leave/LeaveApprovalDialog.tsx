
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Clock, MessageSquare } from 'lucide-react';
import { format, differenceInCalendarDays } from 'date-fns';

interface LeaveApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leaveRequest: any;
  onApprove: (leaveId: string, comments: string) => void;
}

export function LeaveApprovalDialog({ open, onOpenChange, leaveRequest, onApprove }: LeaveApprovalDialogProps) {
  const [comments, setComments] = useState('');
  
  if (!leaveRequest) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApprove(leaveRequest.id, comments);
    setComments('');
    onOpenChange(false);
  };
  
  const daysAgo = leaveRequest ? 
    differenceInCalendarDays(new Date(), new Date(leaveRequest.requestDate)) : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Leave Request Approval</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={leaveRequest.employee.avatar} />
                <AvatarFallback>
                  {leaveRequest.employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{leaveRequest.employee.name}</h3>
                <p className="text-sm text-muted-foreground">{leaveRequest.employee.position}</p>
              </div>
              <div className="ml-auto text-right">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock size={14} />
                  <span>Requested {daysAgo} {daysAgo === 1 ? 'day' : 'days'} ago</span>
                </div>
                <Badge variant="outline" className="mt-1">{leaveRequest.status}</Badge>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Leave Type</p>
                    <p className="font-medium">{leaveRequest.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{leaveRequest.days} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <div className="flex items-center gap-1 font-medium">
                      <CalendarIcon size={14} />
                      <span>{leaveRequest.startDate}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <div className="flex items-center gap-1 font-medium">
                      <CalendarIcon size={14} />
                      <span>{leaveRequest.endDate}</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Reason</p>
                  <p>{leaveRequest.reason}</p>
                </div>
                
                {leaveRequest.manager && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-1">Reporting Manager</p>
                    <p className="font-medium">{leaveRequest.manager}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              <Label htmlFor="comments" className="flex items-center gap-1">
                <MessageSquare size={14} />
                <span>Approval Comments</span>
              </Label>
              <Textarea 
                id="comments" 
                placeholder="Add optional comments for this leave approval"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Approve Leave
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
