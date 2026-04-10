import { CampaignForm } from '@/components/forms/campaign-form';
import { prisma } from '@/lib/db/prisma';
import { Badge } from '@/components/ui/badge';

export default async function CampaignsPage() {
  const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Kampagnen</h2>
        <p className="text-sm text-muted">Erstellen und verwalten Sie Anrufkampagnen.</p>
      </div>
      <CampaignForm />
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th>Sprache</th>
              <th>Call Window</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-t">
                <td className="p-3">{campaign.name}</td>
                <td>{campaign.language}</td>
                <td>{campaign.callWindowStart} - {campaign.callWindowEnd}</td>
                <td><Badge>{campaign.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
