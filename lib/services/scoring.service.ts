import { Lead } from '@prisma/client';

export class LeadScoringService {
  scoreLead(lead: Partial<Lead>) {
    let score = 0;
    if (lead.appointmentInterest) score += 30;
    if (lead.propertyType && ['Mehrfamilienhaus', 'Gewerbe'].includes(lead.propertyType)) score += 20;
    if (lead.callResult === 'callback_requested') score += 15;
    if (lead.notes?.toLowerCase().includes('verkaufsabsicht')) score += 20;
    return Math.min(score, 100);
  }
}
