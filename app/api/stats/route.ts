import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  const data = {
    campaigns: await prisma.campaign.count(),
    importedLeads: await prisma.lead.count(),
    validatedLeads: await prisma.lead.count({ where: { importStatus: 'validated' } }),
    readyToCall: await prisma.lead.count({ where: { status: 'ready_to_call' } }),
    qualified: await prisma.lead.count({ where: { status: 'qualified' } })
  };

  return NextResponse.json(data);
}
