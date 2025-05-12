
import { MainLayout } from '@/components/layout/MainLayout';
import { SettingsTabs } from '@/components/settings/SettingsTabs';

export default function Settings() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <SettingsTabs />
      </div>
    </MainLayout>
  );
}
