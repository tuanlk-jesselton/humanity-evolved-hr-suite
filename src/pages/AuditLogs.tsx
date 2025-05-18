import { MainLayout } from '@/components/layout/MainLayout';
import { RequireRole } from '@/components/auth/RequireRole';

export default function AuditLogs() {
  return (
    <RequireRole allowedRoles={['Super Admin']}>
      <MainLayout>
        <h1 className="text-3xl font-bold mb-6">Audit Logs</h1>
        <p>View all system activity logs. (Super Admin only)</p>
        {/* TODO: Add audit log table/list here */}
      </MainLayout>
    </RequireRole>
  );
}
