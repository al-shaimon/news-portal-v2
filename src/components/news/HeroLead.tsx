import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { formatDate, heroGradientClass } from '@/lib/utils';

export function HeroLead({ article }: { article: Article }) {
  if (!article) return null;
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] ${heroGradientClass}`}>
      <div className="grid gap-6 p-6 md:grid-cols-2 md:items-center lg:p-10">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-[rgba(177,14,30,0.12)] px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
            Lead story
          </p>
          <Link href={`/article/${article.slug}`}>
            <h1 className="headline text-3xl font-extrabold leading-tight md:text-4xl">{article.title}</h1>
          </Link>
          {article.summary && <p className="text-lg leading-relaxed text-[var(--color-muted)]">{article.summary}</p>}
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
            <span>{article.author?.name || 'Staff Desk'}</span>
            {article.publishedAt && <span>• {formatDate(article.publishedAt)}</span>}
            {article.readingTime && <span>• {article.readingTime} min read</span>}
          </div>
        </div>
        <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-[var(--color-border)] sm:h-80">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[var(--color-muted)]">
              Image coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
