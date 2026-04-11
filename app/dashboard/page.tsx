import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/db/prisma';

export default async function DashboardPage() {
  const [campaigns, leads, readyToCall, qualified, validated] = await Promise.all([
    prisma.campaign.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'ready_to_call' } }),
    prisma.lead.count({ where: { status: 'qualified' } }),
    prisma.lead.count({ where: { importStatus: 'validated' } })
  ]);

  const stats = [
    ['Anzahl Kampagnen', campaigns],
    ['Importierte Leads', leads],
    ['Validierte Leads', validated],
    ['Leads bereit zum Anruf', readyToCall],
    ['Qualifizierte Leads', qualified]
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(([label, value]) => (
          <Card key={label}>
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
