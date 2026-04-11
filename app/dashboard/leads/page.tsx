import { prisma } from '@/lib/db/prisma';
import { LeadTable } from '@/components/leads/lead-table';

export default async function LeadsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const q = String(searchParams.q ?? '');
  const status = String(searchParams.status ?? '');
  const page = Number(searchParams.page ?? 1);
  const take = 20;

  const where = {
    AND: [
      q ? { OR: [{ firstName: { contains: q, mode: 'insensitive' as const } }, { lastName: { contains: q, mode: 'insensitive' as const } }, { phone: { contains: q } }] } : {},
      status ? { status } : {}
    ]
  };

  const leads = await prisma.lead.findMany({ where, take, skip: (page - 1) * take, orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Leads</h2>
      <LeadTable leads={leads} />
    </div>
  );
}
