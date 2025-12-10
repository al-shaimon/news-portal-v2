'use client';

import Link from 'next/link';
import { AdSlot } from '@/components/ads/AdSlot';
import { ArticleCard } from '@/components/news/ArticleCard';
import { BreakingTicker } from '@/components/news/BreakingTicker';
import { HeroLead } from '@/components/news/HeroLead';
import { Button } from '@/components/ui/Button';
import {
  useArticles,
  useBreakingTicker,
  useFeaturedArticles,
  useLatestArticles,
  useMenuCategories,
  useTrendingArticles,
} from '@/hooks/api-hooks';

export default function HomePage() {
  const { data: featured } = useFeaturedArticles();
  const { data: breaking } = useBreakingTicker();
  const { data: trending } = useTrendingArticles();
  const { data: latest } = useLatestArticles();
  const { data: categories } = useMenuCategories();
  const lead = featured?.[0] || latest?.[0];

  const firstCategorySlug = categories?.[0]?.slug;
  const secondCategorySlug = categories?.[1]?.slug;
  const { data: firstCategoryArticles } = useArticles({ category: firstCategorySlug, limit: 3 });
  const { data: secondCategoryArticles } = useArticles({ category: secondCategorySlug, limit: 3 });

  return (
    <div className="space-y-8">
      <BreakingTicker items={breaking || []} />
      {lead && <HeroLead article={lead} />}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="headline text-2xl font-extrabold">Latest headlines</h2>
            <Link href="/search?sort=date">
              <Button variant="ghost" className="text-sm">
                See all
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest?.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="card-soft p-4">
            <h3 className="headline mb-3 text-xl font-bold">Trending now</h3>
            <div className="space-y-3">
              {trending?.slice(0, 6).map((story) => (
                <Link key={story.id} href={`/article/${story.slug}`} className="group flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                  <div>
                    <p className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-primary)]">{story.title}</p>
                    {story.summary && <p className="text-xs text-[var(--color-muted)]">{story.summary}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <AdSlot position="sidebar" page="home" />
        </div>
      </div>

      <AdSlot position="banner" page="home" />

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card-soft p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="headline text-xl font-extrabold">{categories?.[0]?.name || 'Top stories'}</h3>
            <Link
              href={`/category/${firstCategorySlug || 'news'}`}
              className="text-sm font-semibold text-[var(--color-primary)]"
            >
              View category
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {firstCategoryArticles?.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
        <section className="card-soft p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="headline text-xl font-extrabold">{categories?.[1]?.name || 'In depth'}</h3>
            <Link
              href={`/category/${secondCategorySlug || 'news'}`}
              className="text-sm font-semibold text-[var(--color-primary)]"
            >
              View category
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {secondCategoryArticles?.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>

      <section className="card-soft p-6">
        <div className="flex items-center justify-between">
          <h3 className="headline text-xl font-extrabold">Sections</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Browse by beat</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="headline text-lg font-bold group-hover:text-[var(--color-primary)]">{category.name}</p>
              {category.description && <p className="text-sm text-[var(--color-muted)]">{category.description}</p>}
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">Enter →</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
