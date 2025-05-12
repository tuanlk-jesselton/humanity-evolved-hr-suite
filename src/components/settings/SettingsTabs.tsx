
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscriptionTab } from './SubscriptionTab';
import { CompanyTab } from './CompanyTab';
import { UsersTab } from './UsersTab';
import { LocalizationTab } from './LocalizationTab';
import { SecurityTab } from './SecurityTab';
import { CreditCard, Globe, Lock, Settings as SettingsIcon, UserCog, Building } from 'lucide-react';

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('subscription');

  return (
    <Tabs defaultValue="subscription" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5 w-full md:w-auto">
        <TabsTrigger value="subscription">
          <CreditCard size={16} className="mr-2" />
          <span className="hidden md:inline">Subscription</span>
        </TabsTrigger>
        <TabsTrigger value="company">
          <Building size={16} className="mr-2" />
          <span className="hidden md:inline">Company</span>
        </TabsTrigger>
        <TabsTrigger value="users">
          <UserCog size={16} className="mr-2" />
          <span className="hidden md:inline">Users</span>
        </TabsTrigger>
        <TabsTrigger value="localization">
          <Globe size={16} className="mr-2" />
          <span className="hidden md:inline">Localization</span>
        </TabsTrigger>
        <TabsTrigger value="security">
          <Lock size={16} className="mr-2" />
          <span className="hidden md:inline">Security</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="subscription">
        <SubscriptionTab />
      </TabsContent>
      
      <TabsContent value="company">
        <CompanyTab />
      </TabsContent>
      
      <TabsContent value="users">
        <UsersTab />
      </TabsContent>
      
      <TabsContent value="localization">
        <LocalizationTab />
      </TabsContent>
      
      <TabsContent value="security">
        <SecurityTab />
      </TabsContent>
    </Tabs>
  );
}
