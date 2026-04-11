'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function ImportWizard() {
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState('');
  const [result, setResult] = useState<any>(null);

  const submitFile = async (kind: 'csv' | 'xlsx') => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    form.append('kind', kind);

    const res = await fetch('/api/imports', { method: 'POST', body: form });
    setResult(await res.json());
  };

  const submitPaste = async () => {
    const res = await fetch('/api/imports', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kind: 'paste', content: pasteText })
    });
    setResult(await res.json());
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="space-y-3">
        <h3 className="font-medium">A/B) CSV oder XLSX Upload</h3>
        <Input type="file" accept=".csv,.xlsx" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <div className="flex gap-2">
          <Button onClick={() => submitFile('csv')} type="button">CSV importieren</Button>
          <Button onClick={() => submitFile('xlsx')} type="button">XLSX importieren</Button>
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="font-medium">C) Copy/Paste Import</h3>
        <textarea className="min-h-32 w-full rounded-md border p-2 text-sm" value={pasteText} onChange={(e) => setPasteText(e.target.value)} />
        <Button type="button" onClick={submitPaste}>Paste importieren</Button>
      </Card>

      <Card>
        <h3 className="font-medium">D) Google Sheets (vorbereitet)</h3>
        <p className="text-sm text-muted">Endpoint vorbereitet: POST /api/imports/google-sheets</p>
      </Card>

      <Card>
        <h3 className="font-medium">E) API/Webhook (vorbereitet)</h3>
        <p className="text-sm text-muted">Endpoint vorbereitet: POST /api/imports/webhook</p>
      </Card>

      {result ? (
        <Card className="lg:col-span-2">
          <h3 className="mb-2 font-medium">Import-Ergebnis</h3>
          <pre className="overflow-auto rounded bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
        </Card>
      ) : null}
    </div>
  );
}
