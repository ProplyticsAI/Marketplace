# EstateLead AI (MVP)

Produktionsnahe Next.js 14 App für B2B-SaaS Lead-Qualifizierung im Immobilienbereich. Verarbeitet ausschließlich Opt-in-Leads mit dokumentierter Einwilligung.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn-style UI Komponenten
- Prisma + PostgreSQL
- React Hook Form + Zod
- PapaParse + xlsx

## Module
- Auth (erweiterbare Dummy-Session)
- Dashboard KPI Übersicht
- Kampagnenmanagement (Create/List)
- Multi-Import (CSV, XLSX, Paste + vorbereitete Google Sheets/Webhook Schnittstellen)
- Mapping/Normalisierung/Validierung
- Lead-Liste & Lead-Details
- Statussystem für Import/Calling/Business
- Call Engine Vorbereitung (Provider Interface + Mock Service)
- Lead Scoring Service (regelbasiert, erweiterbar)

## Ordnerstruktur

```txt
app/
  (auth)/login
  dashboard/
    campaigns
    leads/[id]
    new-import
  api/
    auth/(login|logout)
    campaigns
    imports/(mapping|google-sheets|webhook)
    leads/[id]
    stats
components/
  forms/
  import/
  layout/
  leads/
  ui/
lib/
  auth/
  db/
  import/
  services/
  types/
  validators/
prisma/
  schema.prisma
  seed.ts
templates/
  leads_template.csv
```

## Setup
1. Dependencies installieren
   ```bash
   npm install
   ```
2. `.env` erstellen
   ```bash
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/estatelead"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```
3. Prisma vorbereiten
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```
4. App starten
   ```bash
   npm run dev
   ```

## Login (Demo)
- E-Mail: `admin@estatelead.local`
- Passwort: `admin123`

## Architektur kurz erklärt
1. **Input Adapter Layer**: Parser pro Quelle (`csv`, `xlsx`, `paste`, `google_sheets`, `webhook`).
2. **Parser Layer**: Konvertiert Rohinput in Tabellenzeilen (`RawRow`).
3. **Normalization Layer**: Vereinheitlicht Feldnamen über Mapping inkl. Auto-Suggestions.
4. **Validation Layer**: Zod validiert Pflichtfelder inkl. Consent/ConsentAt + Dublettencheck.
5. **Persistence Layer**: Speichert `LeadImport` und nur valide, deduplizierte Leads.

## Business-Regeln
- Leads ohne `consentGiven=true` und `consentAt` werden invalid markiert und **nicht** als `ready_to_call` gespeichert.
- Jede Zeile ist auf `LeadImport` rückführbar (`importId`, Mapping, Counts).
- Invalid-Gründe werden transparent im Importresultat ausgegeben.

## API Endpoints (Auszug)
- `POST /api/campaigns`
- `POST /api/imports`
- `POST /api/imports/mapping`
- `POST /api/imports/webhook`
- `GET /api/leads`
- `GET /api/leads/:id`
- `PATCH /api/leads`
- `GET /api/stats`
