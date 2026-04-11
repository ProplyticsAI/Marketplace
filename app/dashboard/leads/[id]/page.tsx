import { prisma } from '@/lib/db/prisma';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: { import: true, callAttempts: { orderBy: { createdAt: 'desc' } } }
  });

  if (!lead) notFound();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Lead-Details</h2>
      <Card>
        <p><b>Name:</b> {lead.firstName} {lead.lastName}</p>
        <p><b>Telefon:</b> {lead.phone}</p>
        <p><b>Status:</b> {lead.status}</p>
        <p><b>Score:</b> {lead.leadScore}</p>
        <p><b>Quelle:</b> {lead.source}</p>
        <p><b>Import:</b> {lead.import?.sourceType} / {lead.import?.id}</p>
        <p><b>Rohdaten:</b></p>
        <pre className="overflow-auto rounded bg-slate-50 p-3 text-xs">{JSON.stringify(lead.rawData, null, 2)}</pre>
      </Card>
      <Card>
        <h3 className="mb-2 font-medium">Call Engine Platzhalter</h3>
        <p>Transcript: {lead.transcript ?? 'Noch nicht vorhanden'}</p>
        <p>Call Summary: {lead.callSummary ?? 'Noch nicht vorhanden'}</p>
        <p>structured_result_json:</p>
        <pre className="overflow-auto rounded bg-slate-50 p-3 text-xs">{JSON.stringify(lead.structuredResultJson, null, 2)}</pre>
      </Card>
      <Card>
        <h3 className="mb-2 font-medium">Call Attempt Historie</h3>
        <ul className="space-y-2 text-sm">
          {lead.callAttempts.map((attempt) => (
            <li key={attempt.id} className="rounded border p-2">
              {attempt.provider} · {attempt.status} · {new Date(attempt.createdAt).toLocaleString('de-DE')}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
