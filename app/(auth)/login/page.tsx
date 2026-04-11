import { LoginForm } from '@/components/forms/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border bg-white p-6">
        <h1 className="mb-2 text-xl font-semibold">Login</h1>
        <p className="mb-6 text-sm text-muted">Bitte anmelden, um Leads zu verwalten.</p>
        <LoginForm />
      </div>
    </div>
  );
}
