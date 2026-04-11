import { redirect } from 'next/navigation';
import { getSessionUser } from './session';

export function requireAuth() {
  const session = getSessionUser();
  if (!session) {
    redirect('/login');
  }
  return session;
}
