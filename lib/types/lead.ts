export type NormalizedLead = {
  externalId?: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  email?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  propertyType?: string;
  source?: string;
  consentGiven: boolean;
  consentAt: Date;
  notes?: string;
  rawData?: Record<string, unknown>;
};

export type ValidationIssue = {
  row: number;
  reason: string;
};
