
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Receipt, CreditCard, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ExpenseApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: any;
  onApprove: (expenseId: string, comments: string) => void;
  onReject: (expenseId: string, comments: string) => void;
}

export function ExpenseApprovalDialog({ 
  open, 
  onOpenChange, 
  expense, 
  onApprove,
  onReject 
}: ExpenseApprovalDialogProps) {
  const [comments, setComments] = useState('');
  
  if (!expense) return null;
  
  const handleApprove = () => {
    onApprove(expense.id, comments);
    setComments('');
    onOpenChange(false);
    toast.success('Expense approved successfully');
  };
  
  const handleReject = () => {
    if (!comments) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    
    onReject(expense.id, comments);
    setComments('');
    onOpenChange(false);
    toast.success('Expense rejected');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Expense Claim Review</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={expense.employee?.avatar} />
              <AvatarFallback>
                {expense.employee?.name?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{expense.employee?.name}</h3>
              <p className="text-sm text-muted-foreground">{expense.employee?.position}</p>
            </div>
            <div className="ml-auto text-right">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar size={14} />
                <span>Submitted {expense.submittedDate}</span>
              </div>
              <Badge variant="outline" className="mt-1">{expense.status}</Badge>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{expense.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium flex items-center">
                    <DollarSign size={14} className="mr-1" />
                    {typeof expense.amount === 'number' ? expense.amount.toFixed(2) : expense.amount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <div className="flex items-center gap-1 font-medium">
                    <Calendar size={14} />
                    <span>{expense.date}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <div className="flex items-center gap-1 font-medium">
                    <CreditCard size={14} />
                    <span>{expense.paymentMethod}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p>{expense.description}</p>
              </div>
              
              {expense.receipt && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Receipt</p>
                  <div className="border rounded-md p-2 flex items-center gap-2 bg-muted/30">
                    <Receipt size={20} />
                    <span className="text-sm">receipt.jpg</span>
                    <Button variant="ghost" size="sm" className="ml-auto">View</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <Label htmlFor="comments" className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span>{comments ? 'Your Comments' : 'Add Comments (required for rejection)'}</span>
            </Label>
            <Textarea 
              id="comments" 
              placeholder="Add comments regarding this expense claim"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleReject}>
            Reject
          </Button>
          <Button type="button" className="bg-green-500 hover:bg-green-600" onClick={handleApprove}>
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
