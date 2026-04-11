import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { importId, mappingJson } = body as { importId: string; mappingJson: Record<string, string> };
  const updated = await prisma.leadImport.update({ where: { id: importId }, data: { mappingJson } });
  return NextResponse.json(updated);
}
