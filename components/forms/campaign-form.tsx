'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { campaignSchema } from '@/lib/validators/lead';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type FormValues = z.infer<typeof campaignSchema>;

export function CampaignForm() {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      language: 'de',
      callWindowStart: '09:00',
      callWindowEnd: '18:00',
      maxAttempts: 3,
      scriptVersion: 'v1',
      status: 'draft'
    }
  });

  const onSubmit = async (values: FormValues) => {
    await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values)
    });
    reset();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 rounded-lg border bg-white p-4 md:grid-cols-4">
      <Input {...register('name')} placeholder="Kampagnenname" />
      <Input {...register('description')} placeholder="Beschreibung" />
      <Input {...register('language')} placeholder="de" />
      <Input {...register('scriptVersion')} placeholder="v1" />
      <Input {...register('callWindowStart')} placeholder="09:00" />
      <Input {...register('callWindowEnd')} placeholder="18:00" />
      <Input type="number" {...register('maxAttempts', { valueAsNumber: true })} placeholder="3" />
      <select className="rounded-md border px-3 py-2 text-sm" {...register('status')}>
        <option value="draft">draft</option><option value="active">active</option><option value="paused">paused</option><option value="archived">archived</option>
      </select>
      {Object.values(errors)[0] ? <p className="text-sm text-red-600 md:col-span-4">Bitte Pflichtfelder prüfen.</p> : null}
      <Button className="md:col-span-4" type="submit">Kampagne anlegen</Button>
    </form>
  );
}
