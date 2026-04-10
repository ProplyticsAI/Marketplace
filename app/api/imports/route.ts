import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { buildAutoMapping } from '@/lib/import/mapping';
import { csvAdapter, pasteAdapter, xlsxAdapter } from '@/lib/import/adapters';
import { normalizeRows } from '@/lib/import/normalize';

const adapters = { csv: csvAdapter, xlsx: xlsxAdapter, paste: pasteAdapter } as const;

function dedupeByPhone<T extends { phone: string }>(rows: T[]) {
  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = row.phone;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function POST(req: Request) {
  let kind: keyof typeof adapters;
  let rows;

  const isForm = req.headers.get('content-type')?.includes('multipart/form-data');
  if (isForm) {
    const form = await req.formData();
    kind = (form.get('kind') as keyof typeof adapters) ?? 'csv';
    const file = form.get('file') as File;
    const content = Buffer.from(await file.arrayBuffer());
    rows = await adapters[kind].parse(content);
  } else {
    const body = await req.json();
    kind = body.kind;
    rows = await adapters[kind].parse(body.content);
  }

  const mapping = buildAutoMapping(rows);
  const { valid, invalid } = normalizeRows(rows, mapping);

  const uniqueRows = dedupeByPhone(valid);
  const duplicatesInDb = await prisma.lead.findMany({ where: { phone: { in: uniqueRows.map((x) => x.phone) } } });
  const duplicatePhones = new Set(duplicatesInDb.map((x) => x.phone));

  const finalValid = uniqueRows.filter((row) => !duplicatePhones.has(row.phone));
  const invalidWithDuplicates = [...invalid, ...uniqueRows.filter((row) => duplicatePhones.has(row.phone)).map((row, index) => ({ row: index + 1, reason: `Dublette (${row.phone})` }))];

  const leadImport = await prisma.leadImport.create({
    data: {
      sourceType: kind,
      fileName: `import-${Date.now()}.${kind}`,
      rawRowCount: rows.length,
      validRowCount: finalValid.length,
      invalidRowCount: invalidWithDuplicates.length,
      mappingJson: mapping
    }
  });

  await prisma.lead.createMany({
    data: finalValid.map((lead) => ({
      ...lead,
      importId: leadImport.id,
      importStatus: 'validated',
      status: lead.consentGiven ? 'ready_to_call' : 'invalid'
    }))
  });

  return NextResponse.json({
    importId: leadImport.id,
    mapping,
    preview: rows.slice(0, 5),
    validCount: finalValid.length,
    invalid: invalidWithDuplicates
  });
}
