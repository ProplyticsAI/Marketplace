import { NextResponse } from 'next/server';
import { webhookAdapter } from '@/lib/import/adapters';

export async function POST(req: Request) {
  const body = await req.text();
  const rows = await webhookAdapter.parse(body);
  return NextResponse.json({ received: rows.length, status: 'webhook_received' });
}
