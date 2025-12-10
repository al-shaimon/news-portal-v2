import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-48 w-full overflow-hidden bg-[var(--color-border)]">
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
          {article.category?.name || 'News'}
          {article.isBreaking && <span className="rounded-full bg-[rgba(177,14,30,0.12)] px-2 py-0.5 text-[var(--color-primary)]">Breaking</span>}
          {article.isTrending && <span className="rounded-full bg-[rgba(13,59,102,0.08)] px-2 py-0.5 text-[var(--color-accent)]">Trending</span>}
        </div>
        <h3 className="headline text-xl font-bold leading-tight group-hover:text-[var(--color-accent)]">{article.title}</h3>
        {article.summary && <p className="line-clamp-2 text-sm text-[var(--color-muted)]">{article.summary}</p>}
        <div className="mt-auto flex items-center justify-between text-xs text-[var(--color-muted)]">
          <span>{article.author?.name || 'Staff Desk'}</span>
          {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
        </div>
      </div>
    </Link>
  );
}
