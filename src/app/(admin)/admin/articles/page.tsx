'use client';

import { useState } from 'react';
import { ArticleCard } from '@/components/news/ArticleCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { AdminShell } from '@/components/layout/AdminShell';
import { useAdminArticles, useSaveArticle } from '@/hooks/api-hooks';

export default function ArticlesAdminPage() {
  const { data: articles } = useAdminArticles({ limit: 12 });
  const { mutateAsync: saveArticle } = useSaveArticle();
  const [draft, setDraft] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    categoryId: '',
    status: 'draft',
  });
  const statusOptions: Array<'draft' | 'published' | 'scheduled'> = ['draft', 'published', 'scheduled'];

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveArticle(draft);
    setDraft({ title: '', slug: '', summary: '', content: '', categoryId: '', status: 'draft' });
  };

  return (
    <AdminShell
      title="Articles"
      description="Create, schedule, and manage featured/breaking/trending flags with bilingual content."
    >
      <form className="grid gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4" onSubmit={onCreate}>
        <div className="grid gap-3 md:grid-cols-2">
          <Input label="Title" value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} required />
          <Input label="Slug" value={draft.slug} onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))} required />
        </div>
        <Textarea
          label="Summary"
          value={draft.summary}
          onChange={(e) => setDraft((d) => ({ ...d, summary: e.target.value }))}
          helper="Short dek for card and hero contexts"
        />
        <Textarea
          label="Content (EN)"
          value={draft.content}
          onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
          rows={5}
        />
        <div className="flex flex-wrap gap-3">
          <Input
            label="Category ID"
            value={draft.categoryId}
            onChange={(e) => setDraft((d) => ({ ...d, categoryId: e.target.value }))}
          />
          <div className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
            <span className="font-semibold text-[var(--color-ink)]">Status</span>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={draft.status === option ? 'primary' : 'outline'}
                  className="rounded-full px-3 py-1 text-xs"
                  onClick={() => setDraft((d) => ({ ...d, status: option }))}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Button type="submit" className="w-fit px-4">Save article</Button>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </AdminShell>
  );
}
