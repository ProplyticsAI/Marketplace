import { z } from 'zod';

export const leadImportSchema = z.object({
  externalId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().min(5, 'Telefonnummer fehlt oder ungültig'),
  email: z.string().email().optional().or(z.literal('')),
  street: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  propertyType: z.string().optional(),
  source: z.string().optional(),
  consentGiven: z.boolean(),
  consentAt: z.coerce.date(),
  notes: z.string().optional()
});

export const campaignSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  language: z.string().default('de'),
  callWindowStart: z.string(),
  callWindowEnd: z.string(),
  maxAttempts: z.coerce.number().int().min(1).max(20),
  scriptVersion: z.string().min(1),
  status: z.enum(['draft', 'active', 'paused', 'archived'])
});
