'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { AdSlot } from '@/components/ads/AdSlot';
import { ArticleCard } from '@/components/news/ArticleCard';
import { Button } from '@/components/ui/Button';
import { useArticle, useRelatedArticles } from '@/hooks/api-hooks';
import { formatDate } from '@/lib/utils';

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const { data: article } = useArticle(slug);
  const { data: related } = useRelatedArticles(article?.categoryId);
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  if (!article) return <p className="text-center text-[var(--color-muted)]">Loading article...</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <article className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
          <span className="rounded-full bg-[rgba(13,59,102,0.08)] px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
            {article.category?.name || 'News'}
          </span>
          {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
          {article.readingTime && <span>• {article.readingTime} min read</span>}
          <div className="flex items-center gap-2">
            <Button variant="outline" className="px-3 py-1 text-xs" onClick={() => setLang('en')}>
              EN
            </Button>
            <Button variant="outline" className="px-3 py-1 text-xs" onClick={() => setLang('bn')}>
              বাংলা
            </Button>
          </div>
        </div>
        <h1 className="headline text-3xl font-extrabold leading-tight md:text-4xl">{article.title}</h1>
        {article.summary && <p className="text-lg text-[var(--color-muted)]">{article.summary}</p>}

        {article.coverImage && (
          <div className="relative h-80 w-full overflow-hidden rounded-2xl">
            <Image src={article.coverImage} alt={article.title} fill className="object-cover" sizes="100vw" />
          </div>
        )}

        <div className="prose max-w-none text-[var(--color-ink)] prose-headings:font-serif prose-headings:text-[var(--color-ink)] prose-a:text-[var(--color-accent)] dark:prose-invert">
          <p>{lang === 'en' ? article.content || article.summary : article.contentBn || 'বাংলা কন্টেন্ট আসছে।'}</p>
        </div>

        <AdSlot position="in_content" page="article" />
      </article>

      <aside className="space-y-4">
        <AdSlot position="sidebar" page="article" />
        <div className="surface-card p-4">
          <h3 className="headline mb-3 text-xl font-bold">Related stories</h3>
          <div className="space-y-3">
            {related?.slice(0, 4).map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
