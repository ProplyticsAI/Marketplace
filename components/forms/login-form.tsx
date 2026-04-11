'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginForm() {
  const [email, setEmail] = useState('admin@estatelead.local');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      setError('Ungültige Zugangsdaten');
      return;
    }
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Mail" />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Passwort" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" className="w-full">
        Einloggen
      </Button>
    </form>
  );
}
