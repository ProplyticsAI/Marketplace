import { cookies } from 'next/headers';

const COOKIE_NAME = 'estatelead_session';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

export function setSessionCookie(user: SessionUser) {
  cookies().set(COOKIE_NAME, JSON.stringify(user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}

export function getSessionUser(): SessionUser | null {
  const raw = cookies().get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}
