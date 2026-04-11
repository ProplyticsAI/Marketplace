import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: { import: true, callAttempts: true }
  });
  if (!lead) return NextResponse.json({ message: 'not_found' }, { status: 404 });
  return NextResponse.json(lead);
}
