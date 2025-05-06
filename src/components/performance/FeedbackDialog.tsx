
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type FeedbackFormData = {
  to: {
    name: string;
    position: string;
  };
  content: string;
  category: 'praise' | 'improvement' | 'suggestion';
};

type FeedbackDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (feedback: FeedbackFormData) => void;
};

export function FeedbackDialog({ open, onOpenChange, onSubmit }: FeedbackDialogProps) {
  const [formData, setFormData] = useState<FeedbackFormData>({
    to: {
      name: '',
      position: ''
    },
    content: '',
    category: 'praise'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'name' || name === 'position') {
      setFormData(prev => ({
        ...prev,
        to: {
          ...prev.to,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value as 'praise' | 'improvement' | 'suggestion'
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.to.name.trim() === '' || formData.content.trim() === '') return;
    onSubmit(formData);
    setFormData({
      to: { name: '', position: '' },
      content: '',
      category: 'praise'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Give Feedback</DialogTitle>
          <DialogDescription>
            Provide constructive feedback to your colleagues to help them improve.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Recipient Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.to.name}
                onChange={handleChange}
                placeholder="Enter recipient's name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Recipient Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.to.position}
                onChange={handleChange}
                placeholder="Enter recipient's job position"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Feedback Category</Label>
              <RadioGroup 
                value={formData.category} 
                onValueChange={handleCategoryChange} 
                className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="praise" id="praise" />
                  <Label htmlFor="praise">Praise</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="improvement" id="improvement" />
                  <Label htmlFor="improvement">Improvement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suggestion" id="suggestion" />
                  <Label htmlFor="suggestion">Suggestion</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Feedback</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your feedback here..."
                rows={5}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Feedback</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
