import { leadImportSchema } from '@/lib/validators/lead';
import { NormalizedLead, ValidationIssue } from '@/lib/types/lead';
import { FieldMapping, RawRow } from './types';

const boolFromUnknown = (value: unknown): boolean => {
  if (typeof value === 'boolean') return value;
  const raw = String(value ?? '').toLowerCase();
  return ['true', '1', 'ja', 'yes', 'opt-in'].includes(raw);
};

export function normalizeRows(rows: RawRow[], mapping: FieldMapping) {
  const valid: NormalizedLead[] = [];
  const invalid: ValidationIssue[] = [];

  rows.forEach((row, idx) => {
    const normalized: Record<string, unknown> = { rawData: row };

    Object.entries(mapping).forEach(([incomingField, targetField]) => {
      normalized[targetField] = row[incomingField];
    });

    normalized.phone = String(normalized.phone ?? '').replace(/\s+/g, '');
    normalized.consentGiven = boolFromUnknown(normalized.consentGiven);

    const consentAt = normalized.consentAt;
    if (consentAt) normalized.consentAt = new Date(String(consentAt));

    const result = leadImportSchema.safeParse(normalized);
    if (!result.success) {
      invalid.push({
        row: idx + 1,
        reason: result.error.issues.map((issue) => issue.message).join(', ')
      });
      return;
    }

    if (!result.data.consentGiven || !result.data.consentAt) {
      invalid.push({ row: idx + 1, reason: 'Einwilligung oder Datum fehlt' });
      return;
    }

    valid.push(result.data as NormalizedLead);
  });

  return { valid, invalid };
}
