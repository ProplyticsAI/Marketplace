import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Übersicht' },
  { href: '/dashboard/campaigns', label: 'Kampagnen' },
  { href: '/dashboard/new-import', label: 'Lead-Import' },
  { href: '/dashboard/leads', label: 'Leads' }
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-4">
      <h1 className="mb-6 text-lg font-semibold">EstateLead AI</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link className="block rounded px-3 py-2 text-sm hover:bg-slate-100" key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <form action="/api/auth/logout" method="post" className="mt-8">
        <button className="text-sm text-red-600">Logout</button>
      </form>
    </aside>
  );
}
