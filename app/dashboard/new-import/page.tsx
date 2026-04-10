import { ImportWizard } from '@/components/import/import-wizard';

export default function NewImportPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Lead-Import</h2>
      <p className="text-sm text-muted">CSV, XLSX, Copy/Paste sowie vorbereitete Google Sheets und Webhook Schnittstellen.</p>
      <ImportWizard />
    </div>
  );
}
