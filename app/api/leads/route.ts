import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q');
  const status = url.searchParams.get('status');
  const page = Number(url.searchParams.get('page') ?? '1');
  const take = Number(url.searchParams.get('take') ?? '20');

  const where = {
    AND: [
      q ? { OR: [{ firstName: { contains: q, mode: 'insensitive' as const } }, { lastName: { contains: q, mode: 'insensitive' as const } }, { phone: { contains: q } }] } : {},
      status ? { status } : {}
    ]
  };

  const [items, total] = await Promise.all([
    prisma.lead.findMany({ where, take, skip: (page - 1) * take, orderBy: { createdAt: 'desc' } }),
    prisma.lead.count({ where })
  ]);

  return NextResponse.json({ items, total, page, take });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const updated = await prisma.lead.update({
    where: { id: body.id },
    data: { status: body.status, nextAction: body.nextAction }
  });
  return NextResponse.json(updated);
}
