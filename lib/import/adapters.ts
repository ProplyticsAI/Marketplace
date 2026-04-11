import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { ImportAdapter, RawRow } from './types';

export const csvAdapter: ImportAdapter = {
  kind: 'csv',
  async parse(input) {
    const content = Buffer.isBuffer(input) ? input.toString('utf-8') : input;
    const parsed = Papa.parse<RawRow>(content, { header: true, skipEmptyLines: true });
    return parsed.data;
  }
};

export const xlsxAdapter: ImportAdapter = {
  kind: 'xlsx',
  async parse(input) {
    const workbook = XLSX.read(input, { type: Buffer.isBuffer(input) ? 'buffer' : 'string' });
    const firstSheet = workbook.SheetNames[0];
    return XLSX.utils.sheet_to_json<RawRow>(workbook.Sheets[firstSheet], { defval: '' });
  }
};

export const pasteAdapter: ImportAdapter = {
  kind: 'paste',
  async parse(input) {
    const content = Buffer.isBuffer(input) ? input.toString('utf-8') : input;
    return Papa.parse<RawRow>(content, { header: true, skipEmptyLines: true }).data;
  }
};

export const googleSheetsAdapter: ImportAdapter = {
  kind: 'google_sheets',
  async parse() {
    return [];
  }
};

export const webhookAdapter: ImportAdapter = {
  kind: 'webhook',
  async parse(input) {
    const content = Buffer.isBuffer(input) ? input.toString('utf-8') : input;
    const parsed = JSON.parse(content) as RawRow[];
    return Array.isArray(parsed) ? parsed : [parsed];
  }
};
