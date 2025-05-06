
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GoalsTab } from '@/components/performance/GoalsTab';
import { ReviewsTab } from '@/components/performance/ReviewsTab';
import { FeedbackTab } from '@/components/performance/FeedbackTab';

export default function Performance() {
  const [activeTab, setActiveTab] = useState('goals');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Performance Management</h1>
          <p className="text-muted-foreground">
            Track goals, manage reviews, and provide feedback to your team members.
          </p>
        </div>
        
        <Tabs defaultValue="goals" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="goals">Goals & OKRs</TabsTrigger>
            <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="goals" className="pt-4">
            <GoalsTab />
          </TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <ReviewsTab />
          </TabsContent>
          <TabsContent value="feedback" className="pt-4">
            <FeedbackTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
