'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useAds } from '@/hooks/api-hooks';
import { apiClient } from '@/lib/api-client';

const slotSizes: Record<string, string> = {
  hero: 'h-48 md:h-56',
  banner: 'h-28',
  sidebar: 'h-72',
  in_content: 'h-52',
  popup: 'h-48',
};

export function AdSlot({ position, page }: { position: string; page?: string }) {
  const { data } = useAds(position, page);
  const ad = data?.[0];

  useEffect(() => {
    if (!ad?.id) return;
    apiClient.post(`/advertisements/${ad.id}/impression`).catch(() => {});
  }, [ad?.id]);

  if (!ad) return null;

  const sizeClass = slotSizes[position] || 'h-32';

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] ${sizeClass}`}>
      {ad.imageUrl ? (
        <a
          href={ad.targetUrl || '#'}
          target="_blank"
          rel="noreferrer"
          onClick={() => apiClient.post(`/advertisements/${ad.id}/click`).catch(() => {})}
        >
          <Image src={ad.imageUrl} alt={ad.title} fill className="object-cover" sizes="100vw" />
        </a>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-[var(--color-muted)]">
          <p>{ad.title}</p>
          <p className="rounded-full bg-[rgba(13,59,102,0.08)] px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">Sponsored</p>
        </div>
      )}
      <div className="absolute left-3 top-3 rounded-full bg-[rgba(0,0,0,0.56)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
        Advertisement
      </div>
    </div>
  );
}
