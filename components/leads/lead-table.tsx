import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type LeadRow = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phone: string;
  city: string | null;
  propertyType: string | null;
  source: string | null;
  status: string;
  leadScore: number;
  consentGiven: boolean;
  updatedAt: Date;
  nextAction: string | null;
};

export function LeadTable({ leads }: { leads: LeadRow[] }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="p-3">Name</th><th>Telefon</th><th>Ort</th><th>Objektart</th><th>Quelle</th><th>Status</th><th>Score</th><th>Consent</th><th>Letzte Aktivität</th><th>Nächste Aktion</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr className="border-t" key={lead.id}>
              <td className="p-3"><Link className="text-primary" href={`/dashboard/leads/${lead.id}`}>{lead.firstName} {lead.lastName}</Link></td>
              <td>{lead.phone}</td><td>{lead.city}</td><td>{lead.propertyType}</td><td>{lead.source}</td>
              <td><Badge>{lead.status}</Badge></td><td>{lead.leadScore}</td>
              <td><Badge className={lead.consentGiven ? 'bg-green-100' : 'bg-red-100'}>{lead.consentGiven ? 'Consent OK' : 'Consent fehlt'}</Badge></td>
              <td>{new Date(lead.updatedAt).toLocaleString('de-DE')}</td><td>{lead.nextAction ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
