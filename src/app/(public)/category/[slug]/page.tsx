'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdSlot } from '@/components/ads/AdSlot';
import { ArticleCard } from '@/components/news/ArticleCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/states/EmptyState';
import { useCategory, useCategoryArticles } from '@/hooks/api-hooks';
import { useLanguage } from '@/contexts/language-context';
import { getLocalizedText } from '@/lib/utils';
import { getCategoryBySlug, PLACEHOLDER_ARTICLES } from '@/lib/placeholder-data';

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const search = useSearchParams();
  const router = useRouter();
  const filter = search.get('filter') || 'latest';
  const { data: category } = useCategory(slug);
  const { data: articles } = useCategoryArticles(slug, {
    sort: filter,
    limit: 12,
  });
  const { language } = useLanguage();

  // Use placeholder data when API is unavailable
  const placeholderCategory = getCategoryBySlug(slug);
  const placeholderArticles = PLACEHOLDER_ARTICLES.filter((a) => a.category?.slug === slug)
    .sort((a, b) => {
      if (filter === 'featured') return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      if (filter === 'trending') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      return new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime();
    })
    .slice(0, 12);

  const categoryData = category || placeholderCategory;
  const articlesList = articles && articles.length > 0 ? articles : placeholderArticles;
  const categoryLabel = getLocalizedText(categoryData?.name, language) || 'Category';
  const categoryDescription = getLocalizedText(categoryData?.description, language);

  const filters = useMemo(
    () => [
      { key: 'latest', label: 'Latest' },
      { key: 'featured', label: 'Featured' },
      { key: 'trending', label: 'Trending' },
    ],
    []
  );

  const selectFilter = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('filter', value);
    router.replace(url.pathname + url.search);
  };

  return (
    <Stack spacing={3}>
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Chip
          label="Category"
          size="small"
          color="secondary"
          sx={{ mb: 1, fontWeight: 700, letterSpacing: 1 }}
        />
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          {categoryLabel}
        </Typography>
        {categoryDescription && (
          <Typography variant="body1" color="text.secondary">
            {categoryDescription}
          </Typography>
        )}
        <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? 'secondary' : 'outline'}
              size="small"
              onClick={() => selectFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {articlesList.length === 0 ? (
            <EmptyState
              title="No articles in this category yet"
              description="Please check back soon."
            />
          ) : (
            <Grid container spacing={2.5}>
              {articlesList?.map((article) => (
                <Grid key={article.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <ArticleCard article={article} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2.5}>
            <AdSlot position="sidebar" page="category" />
            <AdSlot position="banner" page="category" />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
