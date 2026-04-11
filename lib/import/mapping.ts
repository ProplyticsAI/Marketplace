import { FieldMapping, RawRow } from './types';

const suggestions: Record<string, string> = {
  telefonnummer: 'phone',
  'telefonnummer mobil': 'phone',
  handy: 'phone',
  leadquelle: 'source',
  'dsgvo opt-in': 'consentGiven',
  ansprechpartner: 'firstName',
  'ort des objekts': 'city',
  vorname: 'firstName',
  nachname: 'lastName',
  email: 'email',
  einwilligungsdatum: 'consentAt'
};

export function buildAutoMapping(rows: RawRow[]): FieldMapping {
  const keys = Object.keys(rows[0] ?? {});
  return keys.reduce<FieldMapping>((acc, key) => {
    const match = suggestions[key.trim().toLowerCase()];
    if (match) acc[key] = match;
    return acc;
  }, {});
}
