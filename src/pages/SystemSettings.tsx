import { MainLayout } from '@/components/layout/MainLayout';
import { RequireRole } from '@/components/auth/RequireRole';

export default function SystemSettings() {
  return (
    <RequireRole allowedRoles={['Super Admin']}>
      <MainLayout>
        <h1 className="text-3xl font-bold mb-6">System Settings</h1>
        <p>Manage global system settings. (Super Admin only)</p>
        {/* TODO: Add system settings form/table here */}
      </MainLayout>
    </RequireRole>
  );
}
