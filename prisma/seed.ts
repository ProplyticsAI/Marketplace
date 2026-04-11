import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@estatelead.local' },
    update: {},
    create: {
      email: 'admin@estatelead.local',
      name: 'Demo Admin',
      passwordHash: hash
    }
  });

  const campaign = await prisma.campaign.create({
    data: {
      name: 'Frühjahrs-Offmarket 2026',
      description: 'Opt-in Leads aus Bewertungsportal',
      language: 'de',
      callWindowStart: '09:00',
      callWindowEnd: '18:30',
      maxAttempts: 3,
      scriptVersion: 'v1',
      status: 'active',
      createdById: user.id
    }
  });

  const leadImport = await prisma.leadImport.create({
    data: {
      sourceType: 'csv',
      fileName: 'demo_leads.csv',
      rawRowCount: 2,
      validRowCount: 2,
      invalidRowCount: 0,
      mappingJson: {
        Vorname: 'firstName',
        Nachname: 'lastName',
        Telefon: 'phone',
        DSGVO: 'consentGiven',
        Einwilligungsdatum: 'consentAt'
      }
    }
  });

  await prisma.lead.createMany({
    data: [
      {
        firstName: 'Anna',
        lastName: 'Keller',
        phone: '+491701112233',
        city: 'München',
        propertyType: 'Eigentumswohnung',
        source: 'Landingpage',
        consentGiven: true,
        consentAt: new Date('2026-03-02T10:00:00.000Z'),
        status: 'ready_to_call',
        importStatus: 'validated',
        leadScore: 65,
        campaignId: campaign.id,
        importId: leadImport.id
      }
    ]
  });
}

main().finally(() => prisma.$disconnect());
