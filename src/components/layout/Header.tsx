'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useMenuCategories } from '@/hooks/api-hooks';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Header() {
  const { data: menu } = useMenuCategories();
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState<'EN' | 'BN'>(() => {
    if (typeof window === 'undefined') return 'EN';
    const stored = localStorage.getItem('newsportal:language') as 'EN' | 'BN' | null;
    return stored || 'EN';
  });

  useEffect(() => {
    localStorage.setItem('newsportal:language', language);
  }, [language]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/search?query=${encodeURIComponent(keyword.trim())}`);
  };

  const navItems = useMemo(() => menu || [], [menu]);
  const dateline = useMemo(() => {
    const now = new Date();
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(now);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[rgba(253,235,234,0.92)] backdrop-blur">
      <div className="container flex flex-col gap-2 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--color-muted)]">
          <span>{dateline}</span>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-semibold"
              onClick={() => setLanguage((cur) => (cur === 'EN' ? 'BN' : 'EN'))}
            >
              {language === 'EN' ? 'বাংলা' : 'EN'}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-xl font-black text-[var(--color-primary-contrast)] shadow-[0_8px_18px_rgba(229,64,69,0.35)]">
              CN
            </div>
            <div>
              <p className="headline text-lg font-extrabold leading-tight">The Contemporary News</p>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">Clarity over noise</p>
            </div>
          </Link>
          <form onSubmit={onSearch} className="flex flex-1 justify-center">
            <div className="flex w-full max-w-xl items-center gap-2 rounded-full border border-[var(--color-border)] bg-[#f6cfd4] px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
              <span className="text-sm text-[var(--color-muted)]">🔍</span>
              <input
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none"
                placeholder="Search news"
              />
            </div>
          </form>
          <div className="flex items-center gap-2">
            {user ? (
              <Button variant="ghost" className="px-3" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" className="px-3">
                  Login
                </Button>
              </Link>
            )}
            <Button
              variant="primary"
              className="rounded-xl px-3 py-2 text-xs font-bold"
              onClick={() => router.push('/admin')}
            >
              Admin
            </Button>
          </div>
        </div>
        <nav className="flex items-center justify-center gap-2 overflow-x-auto rounded-2xl bg-[var(--color-surface-elevated)] px-3 py-2 text-sm font-semibold">
          {navItems?.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={cn(
                'rounded-full px-3 py-1 transition-colors hover:bg-[rgba(229,64,69,0.1)]',
                pathname.includes(`/category/${cat.slug}`) && 'bg-[rgba(229,64,69,0.16)] text-[var(--color-primary)]',
              )}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
