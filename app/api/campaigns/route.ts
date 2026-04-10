import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { campaignSchema } from '@/lib/validators/lead';

export async function GET() {
  const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(campaigns);
}

export async function POST(req: Request) {
  const payload = campaignSchema.parse(await req.json());
  const campaign = await prisma.campaign.create({ data: payload });
  return NextResponse.json(campaign, { status: 201 });
}
