'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { AdminShell } from '@/components/layout/AdminShell';
import { useAdminCategories, useCategoryTree, useSaveCategory } from '@/hooks/api-hooks';

export default function CategoriesPage() {
  const { data: categories } = useAdminCategories();
  const { data: tree } = useCategoryTree();
  const { mutateAsync: saveCategory } = useSaveCategory();
  const [draft, setDraft] = useState({ name: '', slug: '', description: '', parentId: '' });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveCategory(draft);
    setDraft({ name: '', slug: '', description: '', parentId: '' });
  };

  return (
    <AdminShell
      title="Categories"
      description="Manage hierarchy, visibility, and menu order for navigation and landing pages."
    >
      <form className="grid gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4" onSubmit={onSubmit}>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Name"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            required
          />
          <Input
            label="Slug"
            value={draft.slug}
            onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
            required
          />
        </div>
        <Textarea
          label="Description"
          value={draft.description}
          onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
        />
        <Input
          label="Parent ID"
          value={draft.parentId}
          onChange={(e) => setDraft((d) => ({ ...d, parentId: e.target.value }))}
          helper="Leave blank for top level"
        />
        <Button type="submit" className="w-fit">Save category</Button>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => (
          <div key={category.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 shadow-sm">
            <p className="headline text-xl font-bold">{category.name}</p>
            <p className="text-sm text-[var(--color-muted)]">/{category.slug}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
        <p className="headline text-lg font-bold">Menu tree</p>
        <pre className="mt-2 overflow-x-auto rounded-xl bg-[rgba(0,0,0,0.04)] p-3 text-xs text-[var(--color-muted)]">
{JSON.stringify(tree, null, 2)}
        </pre>
      </div>
    </AdminShell>
  );
}
