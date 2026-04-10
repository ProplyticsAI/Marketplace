export type RawRow = Record<string, unknown>;

export type ImportAdapter = {
  kind: 'csv' | 'xlsx' | 'paste' | 'google_sheets' | 'webhook';
  parse: (input: string | Buffer) => Promise<RawRow[]>;
};

export type FieldMapping = Record<string, string>;
