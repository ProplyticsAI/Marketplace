import { prisma } from '@/lib/db/prisma';
import { CallProvider } from './call-provider';

export class CallEngineService {
  constructor(private provider: CallProvider) {}

  async createQueuedAttempt(leadId: string, scriptVersion: string) {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new Error('Lead nicht gefunden');
    if (!lead.consentGiven || !lead.consentAt) throw new Error('Lead nicht anrufbar ohne Einwilligung');

    const response = await this.provider.enqueueCall({ leadId, phone: lead.phone, scriptVersion });

    return prisma.callAttempt.create({
      data: {
        leadId,
        provider: this.provider.name,
        providerCallId: response.providerCallId,
        status: response.status,
        transcript: null,
        summary: null,
        structuredResultJson: null
      }
    });
  }
}
