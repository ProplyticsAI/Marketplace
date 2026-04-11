import { Sidebar } from '@/components/layout/sidebar';
import { requireAuth } from '@/lib/auth/guard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  requireAuth();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
