
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { FeedbackDialog } from '@/components/performance/FeedbackDialog';

type Feedback = {
  id: string;
  type: 'received' | 'given';
  from: {
    name: string;
    position: string;
    avatar?: string;
  };
  to: {
    name: string;
    position: string;
    avatar?: string;
  };
  content: string;
  category: 'praise' | 'improvement' | 'suggestion';
  date: string;
};

const mockFeedback: Feedback[] = [
  {
    id: '1',
    type: 'received',
    from: {
      name: 'Alex Johnson',
      position: 'Engineering Manager',
      avatar: undefined
    },
    to: {
      name: 'Current User',
      position: 'Full Stack Developer',
    },
    content: 'Great job on the recent project delivery! Your attention to detail and ability to meet deadlines is impressive.',
    category: 'praise',
    date: '2025-05-25'
  },
  {
    id: '2',
    type: 'received',
    from: {
      name: 'Maria Rodriguez',
      position: 'Product Manager',
    },
    to: {
      name: 'Current User',
      position: 'Full Stack Developer',
    },
    content: 'Consider improving communication during sprint planning. Sometimes requirements aren\'t fully understood which leads to revisions later.',
    category: 'improvement',
    date: '2025-05-20'
  },
  {
    id: '3',
    type: 'given',
    from: {
      name: 'Current User',
      position: 'Full Stack Developer',
    },
    to: {
      name: 'David Wong',
      position: 'UI/UX Designer',
    },
    content: 'Your design work on the dashboard revamp was exceptional. The user flow improvements have already received positive feedback from clients.',
    category: 'praise',
    date: '2025-05-18'
  },
  {
    id: '4',
    type: 'given',
    from: {
      name: 'Current User',
      position: 'Full Stack Developer',
    },
    to: {
      name: 'Sarah Chen',
      position: 'Backend Developer',
    },
    content: 'I suggest we collaborate more closely on API design in future sprints to ensure better integration between frontend and backend systems.',
    category: 'suggestion',
    date: '2025-05-15'
  }
];

export function FeedbackTab() {
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);
  const [activeTab, setActiveTab] = useState('received');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredFeedback = feedback.filter(item => item.type === activeTab);

  const getCategoryBadgeClass = (category: Feedback['category']) => {
    switch (category) {
      case 'praise': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'improvement': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'suggestion': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleAddFeedback = (newFeedback: Omit<Feedback, 'id' | 'type' | 'from'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const currentUser = {
      name: 'Current User',
      position: 'Full Stack Developer',
    };

    setFeedback([...feedback, {
      id,
      type: 'given',
      from: currentUser,
      ...newFeedback,
      date: new Date().toISOString().split('T')[0]
    }]);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Feedback</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Give Feedback
        </Button>
      </div>
      
      <Tabs defaultValue="received" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="given">Given</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid gap-6 md:grid-cols-2">
        {filteredFeedback.length > 0 ? (
          filteredFeedback.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={activeTab === 'received' ? item.from.avatar : item.to.avatar} />
                      <AvatarFallback>
                        {activeTab === 'received' 
                          ? item.from.name.charAt(0) 
                          : item.to.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {activeTab === 'received' ? item.from.name : item.to.name}
                      </CardTitle>
                      <CardDescription>
                        {activeTab === 'received' ? item.from.position : item.to.position}
                      </CardDescription>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadgeClass(item.category)}`}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{item.content}</p>
              </CardContent>
              <CardFooter className="border-t pt-3 text-xs text-muted-foreground">
                {new Date(item.date).toLocaleDateString()}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-muted-foreground">
              {activeTab === 'received' 
                ? "You haven't received any feedback yet." 
                : "You haven't given any feedback yet."}
            </p>
          </div>
        )}
      </div>
      
      <FeedbackDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddFeedback}
      />
    </div>
  );
}
