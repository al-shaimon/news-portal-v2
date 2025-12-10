'use client';

import { useState } from 'react';
import { AdminShell } from '@/components/layout/AdminShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useAdminAds, useSaveAd } from '@/hooks/api-hooks';

export default function AdsPage() {
  const { data: ads } = useAdminAds();
  const { mutateAsync: saveAd } = useSaveAd();
  const [draft, setDraft] = useState({ title: '', position: 'banner', targetUrl: '', imageUrl: '', priority: 5 });
  const positions: Array<'hero' | 'banner' | 'sidebar' | 'in_content' | 'popup'> = [
    'hero',
    'banner',
    'sidebar',
    'in_content',
    'popup',
  ];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveAd(draft);
    setDraft({ title: '', position: 'banner', targetUrl: '', imageUrl: '', priority: 5 });
  };

  return (
    <AdminShell
      title="Advertisements"
      description="Control placements, priorities, activation windows, and preview banners/sidebars/popup units."
    >
      <form className="grid gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4" onSubmit={onSubmit}>
        <Input
          label="Title"
          value={draft.title}
          onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
          required
        />
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
            <span className="font-semibold text-[var(--color-ink)]">Position</span>
            <div className="flex flex-wrap gap-2">
              {positions.map((pos) => (
                <Button
                  key={pos}
                  type="button"
                  variant={draft.position === pos ? 'primary' : 'outline'}
                  className="rounded-full px-3 py-1 text-xs"
                  onClick={() => setDraft((d) => ({ ...d, position: pos }))}
                >
                  {pos.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>
          <Input
            label="Priority"
            type="number"
            value={draft.priority}
            onChange={(e) => setDraft((d) => ({ ...d, priority: Number(e.target.value) }))}
          />
        </div>
        <Input
          label="Target URL"
          value={draft.targetUrl}
          onChange={(e) => setDraft((d) => ({ ...d, targetUrl: e.target.value }))}
        />
        <Textarea
          label="Image URL"
          value={draft.imageUrl}
          onChange={(e) => setDraft((d) => ({ ...d, imageUrl: e.target.value }))}
          helper="Upload via media library or paste external creative"
        />
        <Button type="submit" className="w-fit">Save advertisement</Button>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ads?.map((ad) => (
          <div key={ad.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
            <p className="headline text-lg font-bold">{ad.title}</p>
            <p className="text-sm text-[var(--color-muted)]">{ad.position} • priority {ad.priority}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--color-primary)]">{ad.type}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
