import { NextResponse } from 'next/server';
import { setSessionCookie } from '@/lib/auth/session';

export async function POST(req: Request) {
  const body = await req.json();
  if (body.email === 'admin@estatelead.local' && body.password === 'admin123') {
    setSessionCookie({ id: 'demo-user', email: body.email, name: 'Demo Admin' });
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
}
