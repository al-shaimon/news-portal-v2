import Link from 'next/link';
import { Article } from '@/lib/types';

export function BreakingTicker({ items }: { items: Article[] }) {
  if (!items?.length) return null;
  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm">
      <div className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-black uppercase tracking-[0.3em] text-[var(--color-primary-contrast)]">
        Breaking
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-3 overflow-hidden">
        {items.map((item) => (
          <Link key={item.id} href={`/article/${item.slug}`} className="group flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
            <span className="group-hover:text-[var(--color-accent)]">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
